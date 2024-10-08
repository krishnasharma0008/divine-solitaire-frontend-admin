import dayjs from 'dayjs'
import utcPlugin from 'dayjs/plugin/utc'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useReducer, useState } from 'react'

import { createResale, getResaleDetail, DownloadDocFile } from '@/api'
import { Dropdown, MetaDetailsCard } from '@/components/common'
import DatePicker from '@/components/common/date-picker'
import InputText from '@/components/common/input-text'
import { CalendarIcon, DownloadIcon } from '@/components/icons'
import LoaderContext from '@/context/loader-context'
import { RESALE_DETAIL_STATUS } from '@/enums'
import { ResaleDetail } from '@/interface'
import { formatByCurrency } from '@/util'

import SectionContainer from './sub-components/section-container'

dayjs.extend(utcPlugin)

interface ResaleDetailAction {
  type: string
  payload?: string | ResaleDetail
}

const initialState: ResaleDetail = {
  uid: '',
  rstatus: '',
  requestno: '',
  etype: '',
  invdate: '',
  phname: '',
  phcontactno: '',
  userid: '',
  phemail: '',
  phaddress: '',
  phcity: '',
  phpincode: '',
  phdob: '',
  invno: '',
  invval: '',
  docname: '',
  currentval: '',
  newval: '',
  jewelname: '',
  createdat: '',
  remarks: '',
}

const resaleDetailReducer = (state: ResaleDetail, action: ResaleDetailAction) => {
  if (action.type === 'ALL') {
    return { ...state, ...(action.payload as unknown as ResaleDetail) }
  }
  return { ...state, [action.type]: action.payload }
}

const ResaleDetailScreen: React.FC = () => {
  const [state, dispatch] = useReducer(resaleDetailReducer, initialState)
  const [Dropvalue, setDropvalue] = useState<string>()
  const { query, push } = useRouter()
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const [editMode, setEditMode] = useState<boolean>(false)

  const DateFormat = 'YYYY-MM-DD HH:mm:ss'

  useEffect(() => {
    if (!query.id) {
      return
    }
    showLoader()
    getResaleDetail(query?.id as unknown as number)
      .then((res) => {
        dispatch({
          type: 'ALL',
          payload: { ...(res.data.data as unknown as ResaleDetail) },
        })
        hideLoader()
      })
      .catch((err) => {
        hideLoader()
        console.log('errr', err)
      })
  }, [hideLoader, query.id, showLoader])

  const onChangeHandlerCreator = (fieldname: string) => {
    if (fieldname == 'samestore') {
      if (fieldname == 'samestore') {
        return () =>
          dispatch({
            type: 'issamestore',
            payload: 'true',
          })
      } else {
        return () =>
          dispatch({
            type: 'issamestore',
            payload: 'false',
          })
      }
    }
    //alert(issamestore.toISOString());
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: fieldname,
        payload: (e.target as HTMLInputElement).value,
      })
  }

  const onDateChangeHandler = (fieldname: string) => (date: Date) => {
    dispatch({
      type: fieldname,
      payload: date.toISOString(),
    })
  }

  //download click
  const iconClick = async (filename: string) => {
    if (filename !== '') {
      try {
        showLoader()
        const result = await DownloadDocFile(filename)
        const href = window.URL.createObjectURL(new Blob([result.data]))
        const anchorElement = document.createElement('a')
        anchorElement.href = href
        anchorElement.download = filename
        document.body.appendChild(anchorElement)
        anchorElement.click()
        document.body.removeChild(anchorElement)
        window.URL.revokeObjectURL(href)
        hideLoader()
      } catch (error) {
        hideLoader()
        console.log(error)
      }
    } else {
      alert('Document not available to Download')
      //alert('Work in Progress.....')
    }
    //console.log(filename)
  }

  const onSubmitHandler = () => {
    const payload: ResaleDetail = {
      //...state,
      id: state.id,
      uid: state.uid,
      rstatus: state.rstatus,
      requestno: state.requestno,
      etype: state.etype,
      invdate: new Date(state.invdate || Date.now()).toISOString(),
      phname: state.phname,
      phcontactno: state.phcontactno,
      userid: state.userid,
      phemail: state.phemail,
      phaddress: state.phaddress,
      phcity: state.phcity,
      phpincode: state.phpincode,
      phdob: new Date(state.phdob || Date.now()).toISOString(),
      invno: state.invno,
      invval: state.invval,
      docname: state.docname,
      currentval: state.currentval,
      newval: state.newval,
      jewelname: state.jewelname,
      issamestore: state.issamestore,
      createdat: state.createdat,
      remarks: state.remarks,
    }
    console.log('dropdown value', Dropvalue)
    //return

    if (query?.id) {
      payload.id = query.id as unknown as number
    }
    showLoader()
    createResale(payload)
      .then(() => {
        console.log('It is successfully created')
        push('/admin/resale')
        hideLoader()
      })
      .catch((err) => {
        hideLoader()
        console.log('Error', err)
      })
  }

  const changeProductStatus = (elem?: React.ReactNode, idx?: number) => {
    if (idx === -1) {
      let resalestatus
      if (state.rstatus === 'Open') {
        resalestatus = RESALE_DETAIL_STATUS.OPEN
      } else if (state.rstatus === 'Reject') {
        resalestatus = RESALE_DETAIL_STATUS.REJECT
      } else if (state.rstatus === 'InReview') {
        resalestatus = RESALE_DETAIL_STATUS.IN_REVIEW
      } else {
        resalestatus = RESALE_DETAIL_STATUS.APPROVED
      }
      return resalestatus
    }
    const newVal = Object.values(RESALE_DETAIL_STATUS)[idx || 0]
    if (newVal === RESALE_DETAIL_STATUS.OPEN) {
      setDropvalue('Open')
    } else if (newVal === RESALE_DETAIL_STATUS.REJECT) {
      setDropvalue('Reject')
    } else if (newVal === RESALE_DETAIL_STATUS.IN_REVIEW) {
      setDropvalue('InReview')
    } else {
      setDropvalue('Approved')
    }
    if (Dropvalue !== state.rstatus) {
      //console.log(Dropvalue)
      dispatch({
        type: 'rstatus',
        payload: Dropvalue,
      })
    }

    return newVal
  }

  const onEditClickHandler = () => setEditMode(true)

  return (
    <>
      <div className="flex-1 w-full mt-1 bg-gray-50 pt-10 px-4 rounded-lg">
        {/* <button type="button" onClick={() => iconClick('')} className="absolute top-[124px] right-7">
          <DownloadIcon />
        </button> */}
        <SectionContainer>
          <MetaDetailsCard
            label="Details :"
            containerClass="bg-[#28A0B0] w-full"
            className=" ml-4 my-2.5 text-white"
            fields={[
              { name: 'Request No.', value: state.requestno },
              { name: 'Request Type.', value: state.etype },
              { name: 'UID', value: state.uid },
              {
                name: 'Status',
                value: (
                  <Dropdown
                    options={Object.values(RESALE_DETAIL_STATUS)}
                    value={state.rstatus}
                    selected={changeProductStatus}
                    className="w-48"
                    disabled={!editMode}
                  />
                ),
              },
              {
                name: 'Date of request',
                value: dayjs.utc(state.createdat).format('DD MMMM YYYY'),
              },
              {
                name: 'Retail price',
                value: formatByCurrency(parseFloat(state.currentval)) === 'NaN' ? '0.00' : formatByCurrency(parseFloat(state.currentval)),
              },
            ]}
          />
        </SectionContainer>

        <SectionContainer className="mt-6">
          <div className="bg-[#28A0B0] w-full">
            <h1 className="py-2 font-medium text-base ml-4 my-2.5 text-white">Personal Details:</h1>
          </div>
          <div className="flex-row pt-10">
            <InputText
              className="w-full"
              label="Name"
              name="name"
              onChange={onChangeHandlerCreator('phname')}
              placeholder="Name"
              type="text"
              value={state.phname}
              disabled={!editMode}
            />

            <div className="flex justify-between pt-5 ">
              <InputText
                className="w-full"
                containerClass="w-1/4"
                label="Email"
                name="email"
                onChange={onChangeHandlerCreator('phemail')}
                placeholder="Email"
                type="text"
                value={state.phemail}
                disabled={!editMode}
              />
              <InputText
                className="w-full"
                containerClass="w-1/4"
                label="Mobile No."
                name="mno"
                onChange={onChangeHandlerCreator('phcontactno')}
                placeholder="Mobile No."
                type="text"
                value={state.phcontactno}
                disabled={!editMode}
              />
            </div>
          </div>

          <div className="flex-row pt-5">
            <InputText
              className="w-full"
              label="Address"
              name="address"
              onChange={onChangeHandlerCreator('phaddress')}
              placeholder="Address"
              type="text"
              value={state.phaddress}
              disabled={!editMode}
            />

            <div className="flex justify-between pt-5 pb-5 ">
              <InputText
                label="City"
                name="city"
                onChange={onChangeHandlerCreator('phcity')}
                placeholder="City"
                type="text"
                value={state.phcity}
                className="w-full"
                containerClass="w-1/4"
                disabled={!editMode}
              />
              <InputText
                label="Pin Code"
                name="pincode"
                onChange={onChangeHandlerCreator('phpincode')}
                placeholder="Pin Code"
                type="text"
                value={state.phpincode}
                className="w-full"
                containerClass="w-1/4"
                disabled={!editMode}
              />
              <DatePicker
                showIcon={editMode}
                onChange={onDateChangeHandler('phdob')}
                label="Date of Birth"
                value={state.phdob ? new Date(dayjs.utc(state.phdob).format(DateFormat)) : null}
                className=""
                icon={CalendarIcon}
              />
            </div>
            <InputText
              className="w-full"
              label="Jeweller Name"
              name="jewelname"
              onChange={onChangeHandlerCreator('jewelname')}
              placeholder="Jeweller Name"
              type="text"
              value={state.jewelname}
              disabled={!editMode}
            />
          </div>
        </SectionContainer>

        <SectionContainer className="mt-6">
          {state.etype === 'buyback' ? (
            <div>
              {/* <div>
                <h1 className="py-2 font-medium text-base">Buyback Through :</h1>
              </div> */}
              <div className="bg-[#28A0B0] w-full">
                <h1 className="py-2 font-medium text-base ml-4 my-2.5 text-white">Buyback Through :</h1>
              </div>
              <div>
                <fieldset>
                  <div className="flex justify-between mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="samestore"
                        name="buyback-through"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value={state.issamestore === true ? 'true' : 'false'}
                        checked={state.issamestore === true}
                        onChange={onChangeHandlerCreator('samestore')}
                      />
                      <label htmlFor="samestore" className="block text-sm font-medium leading-6 text-gray-900">
                        Same Store
                      </label>
                      <input
                        type="text"
                        name="samestore"
                        id="samestore"
                        autoComplete="Same Store"
                        className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block"
                        value={state.issamestore === true ? state.newval : ''}
                        disabled={!editMode}
                      />
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="diffstore"
                        name="buyback-through"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value={state.issamestore === false ? 'true' : 'false'}
                        checked={state.issamestore === false}
                        onChange={onChangeHandlerCreator('diffstore')}
                      />
                      <label htmlFor="diffstore" className="block text-sm font-medium leading-6 text-gray-900">
                        Different Store
                      </label>
                      <input
                        type="text"
                        name="diffstore"
                        id="diffstore"
                        autoComplete="Different Store"
                        className="pl-5 py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block"
                        value={state.issamestore === false ? state.newval : ''}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          ) : (
            <div className="flex-row pb-5">
              <InputText
                className="w-full"
                label="Upgrade Amount"
                name="pugradeamt"
                onChange={onChangeHandlerCreator('newval')}
                placeholder="Upgrade Amount"
                type="text"
                //value={state.newval}
                value={formatByCurrency(parseFloat(state.newval)) === 'NaN' ? '0.00' : formatByCurrency(parseFloat(state.newval))}
                disabled={!editMode}
              />
            </div>
          )}
          <div className="flex-row py-5">
            <div className="flex justify-between pt-5 ">
              <InputText
                label="Invoice Number"
                name="iamt"
                onChange={onChangeHandlerCreator('invno')}
                placeholder="Invoice Number"
                type="text"
                value={state.invno}
                className="w-full"
                containerClass="w-1/4"
                disabled={!editMode}
              />
              <InputText
                label="Invoice Amount"
                name="iamt"
                onChange={onChangeHandlerCreator('invval')}
                placeholder="Invoice Amount"
                type="text"
                value={formatByCurrency(parseFloat(state.invval)) === 'NaN' ? '0.00' : formatByCurrency(parseFloat(state.invval))}
                className="w-full"
                containerClass="w-1/4"
                disabled={!editMode}
              />
              {/* <DatePicker onChange={onDateChangeHandler('invdate')} label="Invoice Date" value={new Date(state.invdate || Date.now())} className="" /> */}
              <DatePicker
                showIcon={editMode}
                onChange={onDateChangeHandler('invdate')}
                label="Invoice Date"
                value={state.invdate ? new Date(dayjs.utc(state.invdate).format(DateFormat)) : null}
                className=""
                icon={CalendarIcon}
              />
            </div>
            <div className="pt-5">
              <InputText
                className="w-full"
                label="Remarks"
                name="remarks"
                onChange={onChangeHandlerCreator('remarks')}
                placeholder="Remarks"
                type="text"
                value={state.remarks}
                disabled={!editMode}
              />
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="mt-6">
          <div className="bg-[#28A0B0] w-full">
            <h1 className="py-2 font-medium text-base ml-4 my-2.5 text-white">Invoice Proof:</h1>
          </div>
          {/* {editMode ? ( */}
          <div className="flex pt-5">
            <label htmlFor="diffstore" className="block text-sm font-medium leading-6 text-gray-900">
              Download document
            </label>
            {editMode ? (
              <button type="button" onClick={() => iconClick(state.docname)} className="absolute left-56">
                <DownloadIcon strokeColor="#161616" />
              </button>
            ) : null}
          </div>
          {/* ) : null} */}
        </SectionContainer>

        <SectionContainer className="mt-6">
          <div className="mt-6 flex items-center justify-center gap-x-6 my-5 py-5">
            <Link href={'/admin/resale'}>
              <button type="button" className="text-sm font-semibold text-gray-900 px-12 border-black border py-2 box-border rounded-md">
                {' '}
                Cancel{' '}
              </button>
            </Link>
            {editMode ? (
              <button
                type="submit"
                onClick={onSubmitHandler}
                className="rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={onEditClickHandler}
                className="rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
              >
                Edit
              </button>
            )}
          </div>
        </SectionContainer>
      </div>
    </>
  )
}

export default ResaleDetailScreen
