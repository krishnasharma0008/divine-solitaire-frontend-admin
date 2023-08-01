import { Button } from '@material-tailwind/react'
import dayjs from 'dayjs'
import utcPlugin from 'dayjs/plugin/utc'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useReducer } from 'react'
import React from 'react'

import { createInsurance, getInsuranceDetail, DownloadFile } from '@/api'
import { InputFile, MetaDetailsCard } from '@/components/common'
import DatePicker from '@/components/common/date-picker'
import InputText from '@/components/common/input-text'
import { CalendarIcon, DownloadIcon } from '@/components/icons'
import LoaderContext from '@/context/loader-context'
import { InsuranceDetail } from '@/interface'
import { formatByCurrency } from '@/util'

import SectionContainer from './sub-components/section-container'

dayjs.extend(utcPlugin)

interface InsuranceDetailAction {
  type: string
  payload?: string | InsuranceDetail | File
}

const initialState: InsuranceDetail = {
  phname: '',
  phemail: '',
  phcontactno: '',
  phaddress: '',
  phstate: '',
  phcity: '',
  phpincode: '',
  phdob: '',
  invno: '',
  invdate: '',
  invval: '',
  purstore: '',
  polcomp: '',
  polno: '',
  polstart: '',
  polend: '',
  polstatus: 'Open',
  rendate: '',
  requestno: '',
  polfile: '',
  invfile: '',
  remarks: '',
  createdat: '',
  current_price: '',
  uid: '',
  invdoc: '',
  poldoc: '',
}

const insuranceDetailReducer = (state: InsuranceDetail, action: InsuranceDetailAction) => {
  if (action.type === 'ALL') {
    return { ...state, ...(action.payload as unknown as InsuranceDetail) }
  }
  return { ...state, [action.type]: action.payload }
}

const InsuranceDetailScreen: React.FC = () => {
  const [state, dispatch] = useReducer(insuranceDetailReducer, initialState)
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const DateFormat = 'YYYY-MM-DD HH:mm:ss'

  const { query, push } = useRouter()
  useEffect(() => {
    if (!query.id) {
      return
    }
    showLoader()
    getInsuranceDetail(query?.id as unknown as number)
      .then((res) => {
        dispatch({
          type: 'ALL',
          payload: { ...(res.data.data as unknown as InsuranceDetail) },
        })
        hideLoader()
      })
      .catch((err) => {
        hideLoader()
        console.log('errr', err)
      })
  }, [query.id, showLoader, hideLoader])

  const iconClick = async (filename: string) => {
    if (filename !== '') {
      try {
        showLoader()
        const result = await DownloadFile(filename)

        // Determine the file type based on the file extension (assuming the filename has a valid extension)
        const fileExtension = filename.split('.').pop()
        let fileType = ''
        switch (fileExtension?.toLowerCase()) {
          case 'pdf':
            fileType = 'application/pdf'
            break
          case 'jpg':
          case 'jpeg':
            fileType = 'image/jpeg'
            break
          case 'png':
            fileType = 'image/png'
          default:
            // If the file type is not recognized, fallback to 'application/octet-stream' (binary data)
            fileType = 'application/octet-stream'
        }

        const href = window.URL.createObjectURL(new Blob([result.data], { type: fileType }))
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
    }
    //console.log(filename)
  }

  const onChangeHandlerCreator = (fieldname: string) => {
    if (['invfile', 'polfile'].includes(fieldname)) {
      return (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          type: fieldname,
          payload: (e.target as HTMLInputElement)?.files?.[0],
        })
    }

    return (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: fieldname,
        payload: (e.target as HTMLInputElement).value,
      })
  }

  const onDateChangeHandler = (fieldname: string) => (date: Date) => {
    if (fieldname === 'polstart') {
      // Calculate the new end date by adding 365 days to the start date
      const endDate = dayjs(date).add(365, 'day').toDate()
      dispatch({ type: 'polend', payload: endDate.toISOString() })

      // Calculate the new renewal date by adding 1 day to the end date
      const renewalDate = dayjs(endDate).add(1, 'day').toDate()
      dispatch({ type: 'rendate', payload: renewalDate.toISOString() })
    }

    dispatch({
      type: fieldname,
      payload: date.toISOString(),
    })
  }
  const onSubmitHandler = (ActionType: string) => () => {
    const payload: InsuranceDetail = {
      ...state,
      phdob: new Date(state.phdob || Date.now()).toISOString(),
      invdate: new Date(state.invdate || Date.now()).toISOString(),
      polstart: new Date(state.polstart || Date.now()).toISOString(),
      polend: new Date(state.polend || Date.now()).toISOString(),
      rendate: new Date(state.rendate || Date.now()).toISOString(),
      polstatus: ActionType,
    }

    if (query?.id) {
      payload.id = query.id as unknown as number
    }
    showLoader()
    createInsurance(payload)
      .then(() => {
        console.log('It is successfully created')
        push('/admin/insurance')
        hideLoader()
      })
      .catch((err) => {
        hideLoader()
        console.log('Error', err)
      })
  }

  return (
    <div className="flex-1 w-full mt-1 bg-gray-50 pt-10 px-4 rounded-lg">
      <div>
        <SectionContainer>
          <MetaDetailsCard
            label="Details :"
            fields={[
              { name: 'Request No.', value: state.requestno },
              { name: 'UID', value: state.uid },
              {
                name: 'Status',
                value: (
                  <Button
                    className={`text-white font-bold py-2 px-4 rounded ${
                      state.polstatus === 'Cancelled' || state.polstatus === 'Expired' ? 'bg-red-400 ' : 'bg-light-muted-azure'
                    }`}
                  >
                    {state.polstatus}
                  </Button>
                ),
              },

              { name: 'Date of request', value: dayjs.utc(state.createdat).format('DD MMMM YYYY') },
              //dayjs.utc(state.dob).format(DateFormat)
              { name: 'Retail price', value: formatByCurrency(parseFloat(state.current_price)) },
            ]}
          />
        </SectionContainer>

        <SectionContainer className="mt-6">
          <div>
            <h1 className="py-2 font-medium text-base">Personal Details :</h1>
          </div>
          <div className="flex-row pt-5">
            <InputText
              className="w-full"
              label="Name"
              name="name"
              onChange={onChangeHandlerCreator('phname')}
              placeholder="Name"
              type="text"
              value={state.phname}
            />

            <div className="flex justify-between pt-5 ">
              <DatePicker
                showIcon={true}
                onChange={onDateChangeHandler('phdob')}
                label="Date of Birth"
                //value={new Date(state.phdob || Date.now())}
                //value={state.phdob ? new Date(dayjs.utc(state.phdob).format(DateFormat)) : null}
                value={state.phdob ? new Date(dayjs.utc(state.phdob).format(DateFormat)) : null}
                className=""
                icon={CalendarIcon}
              />
              {/* <InputText
                label="Date of Birth"
                name="dob"
                onChange={onChangeHandlerCreator('phdob')}
                placeholder="Date Of Birth"
                type="date"
                value={dayjs(state.phdob).format('YYYY-MM-DD')}
              /> */}
              <InputText
                className="w-full"
                containerClass="w-1/4"
                label="Email"
                name="email"
                onChange={onChangeHandlerCreator('phemail')}
                placeholder="Email"
                type="text"
                value={state.phemail}
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
            />

            <div className="flex justify-between pt-5 ">
              {/* <InputText label="State" name="state" onChange={onChangeHandlerCreator('phstate')} placeholder="State" type="text" value={state.phstate} /> */}
              <InputText label="City" name="city" onChange={onChangeHandlerCreator('phcity')} placeholder="City" type="text" value={state.phcity} />
              <InputText
                label="Pin Code"
                name="pincode"
                onChange={onChangeHandlerCreator('phpincode')}
                placeholder="Pin Code"
                type="text"
                value={state.phpincode}
              />
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="mt-6">
          <div>
            <h1 className="py-2 font-medium text-base mb-6">Transaction Details :</h1>
          </div>
          <InputText
            className="w-full"
            label="Jeweller Name"
            name="jname"
            onChange={onChangeHandlerCreator('purstore')}
            placeholder="Jeweller Name"
            type="text"
            value={state.purstore}
          />
          <div className="flex-row py-5">
            <div className="flex justify-between pt-5 ">
              <InputText
                label="Invoice Amount"
                name="iamt"
                onChange={onChangeHandlerCreator('invval')}
                placeholder="Invoice Amount"
                type="text"
                value={formatByCurrency(parseFloat(state.invval)) === 'NaN' ? '0.00' : formatByCurrency(parseFloat(state.invval))}
              />

              <InputText
                label="Invoice Number"
                name="iamt"
                onChange={onChangeHandlerCreator('invno')}
                placeholder="Invoice Number"
                type="text"
                value={state.invno}
              />

              <DatePicker
                onChange={onDateChangeHandler('invdate')}
                label="Invoice Date"
                //value={state.invdate ? new Date(state.invdate) : null}
                value={state.invdate ? new Date(dayjs.utc(state.invdate).format(DateFormat)) : null}
                className=""
                showIcon={true}
                icon={CalendarIcon}
              />
            </div>
          </div>
          <InputFile label="Invoice Documents" onChange={onChangeHandlerCreator('invfile')} value={state.invfile} placeholder="Drag & drop files here" />
          <button type="button" onClick={() => iconClick(state.invdoc)} className="px-5 py-2 block mb-[190px]" style={{ marginTop: -180, marginLeft: 120 }}>
            <DownloadIcon />
          </button>
        </SectionContainer>

        <SectionContainer className="mt-6">
          <div>
            <h1 className="py-2 font-medium text-base">
              Insurance Details : <span className="text-rose-600">(To be added by Service Desk team)</span>
            </h1>
          </div>
          <div className="flex-row py-5">
            {/* <div className="my-4">
            <label htmlFor="pnum">Policy Number : </label>
            <label htmlFor="pnum"> PO013564</label>
          </div> */}
            <div className="flex justify-between">
              <InputText
                containerClass="w-2/3"
                className="w-full"
                label="Insurance Provider Name *"
                name="polcomp"
                onChange={onChangeHandlerCreator('polcomp')}
                placeholder="Insurance Provider Name *"
                type="text"
                value={state.polcomp}
              />

              <InputText
                label="Policy Number*"
                name="polno"
                onChange={onChangeHandlerCreator('polno')}
                placeholder="Policy Number "
                type="text"
                value={state.polno}
              />
            </div>
            <div className="flex justify-between pt-5 pb-5">
              <DatePicker
                onChange={onDateChangeHandler('polstart')}
                label="Start Date"
                //value={new Date(state.polstart)}
                //value={state.polstart ? new Date(state.polstart) : null}
                value={state.polstart ? new Date(dayjs.utc(state.polstart).format(DateFormat)) : null}
                className=""
                showIcon={true}
                icon={CalendarIcon}
              />

              <DatePicker
                onChange={onDateChangeHandler('polend')}
                label="End Date"
                //value={state.polend ? new Date(state.polend) : null}
                value={state.polend ? new Date(dayjs.utc(state.polend).format(DateFormat)) : null}
                //value={new Date(dayjs(state.polstart).add(365, 'day').toDate())}
                className=""
                showIcon={true}
                icon={CalendarIcon}
              />
              <DatePicker
                onChange={onDateChangeHandler('rendate')}
                label="Renewal Date"
                //value={state.rendate ? new Date(state.rendate) : null}
                value={state.rendate ? new Date(dayjs.utc(state.rendate).format(DateFormat)) : null}
                className=""
                showIcon={true}
                icon={CalendarIcon}
              />
            </div>
            <div className="pb-5 pt-5">
              <InputText
                className="w-full"
                label="Remarks"
                name="remarks"
                onChange={onChangeHandlerCreator('remarks')}
                placeholder="Remarks"
                type="text"
                value={state.remarks}
              />
            </div>
            <InputFile label="Policy Documents" onChange={onChangeHandlerCreator('polfile')} value={state.polfile || ''} placeholder="Drag & drop files here" />
            <button
              type="button"
              onClick={() => {
                if (state.poldoc) iconClick(state.poldoc)
              }}
              className="px-5 py-2  block mb-[190px]"
              style={{ marginTop: -180, marginLeft: 140, zIndex: 999 }}
            >
              <DownloadIcon />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-x-6 my-5 py-5 gap-6">
            <Link href="/admin/insurance">Cancel</Link>
            {state.polstatus === 'In Process' && (
              <button
                type="submit"
                onClick={onSubmitHandler('Reject')}
                className="text-sm font-semibold text-gray-900 px-12 border-black border py-2 box-border rounded-md"
              >
                Reject
              </button>
            )}

            <button
              type="submit"
              onClick={onSubmitHandler('Approve')}
              className="rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
            >
              Approve
            </button>
          </div>
        </SectionContainer>
      </div>
    </div>
  )
}

export default InsuranceDetailScreen
