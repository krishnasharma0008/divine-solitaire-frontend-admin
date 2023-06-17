import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'

import { createResale, getResaleDetail } from '@/api'
import { MetaDetailsCard } from '@/components/common'
import InputText from '@/components/common/input-text'
import { ResaleDetail } from '@/interface'
import { formatByCurrency } from '@/util'

import SectionContainer from './sub-components/section-container'

interface ResaleDetailAction {
  type: string
  payload?: string | ResaleDetail
}

const initialState: ResaleDetail = {
  uid: '',
  polstatus: '',
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
}

const resaleDetailReducer = (state: ResaleDetail, action: ResaleDetailAction) => {
  if (action.type === 'ALL') {
    return { ...state, ...(action.payload as unknown as ResaleDetail) }
  }
  return { ...state, [action.type]: action.payload }
}

const ResaleDetailScreen: React.FC = () => {
  const [state, dispatch] = useReducer(resaleDetailReducer, initialState)

  const { query, push } = useRouter()
  useEffect(() => {
    if (!query.id) {
      return
    }
    /**/
    getResaleDetail(query?.id as unknown as number)
      .then((res) => {
        dispatch({
          type: 'ALL',
          payload: { ...(res.data.data as unknown as ResaleDetail) },
        })
      })
      .catch((err) => {
        console.log('errr', err)
      })
  }, [query?.id])

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

  const onSubmitHandler = () => {
    const payload: ResaleDetail = {
      //...state,
      id: state.id,
      uid: state.uid,
      polstatus: 'Open',
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
    }

    if (query?.id) {
      payload.id = query.id as unknown as number
    }

    createResale(payload)
      .then(() => {
        console.log('It is successfully created')
        push('/admin/resale')
      })
      .catch((err) => console.log('Error', err))
  }

  return (
    <div className="flex-1 w-full mt-1 bg-gray-50 pt-10 px-4 rounded-lg">
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
                <button className={`text-white font-bold py-2 px-4 rounded ${state.polstatus ? 'bg-light-muted-azure ' : 'bg-red-400 '}`}>
                  {state.polstatus ? 'Open' : 'Close'}
                </button>
              ),
            },

            {
              name: 'Date of request',
              value: dayjs(state.invdate).format('YYYY-MM-DD'),
            },
            {
              name: 'Retail price',
              value: formatByCurrency(parseFloat(state.currentval)),
            },
          ]}
        />
      </SectionContainer>

      <SectionContainer className="mt-6">
        {/* <div>
          <h1 className="py-2 font-medium text-base">Personal Details :</h1>
        </div> */}
        <div className="bg-[#28A0B0] w-full">
          <h1 className="py-2 font-medium text-base ml-4 my-2.5 text-white">Personal Details:</h1>
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
            <InputText label="City" name="city" onChange={onChangeHandlerCreator('phcity')} placeholder="City" type="text" value={state.phcity} />
            <InputText
              label="Pin Code"
              name="pincode"
              onChange={onChangeHandlerCreator('phpincode')}
              placeholder="Pin Code"
              type="text"
              value={state.phpincode}
            />
            <InputText
              label="Date of Birth"
              name="dob"
              onChange={onChangeHandlerCreator('phdob')}
              placeholder="Date Of Birth"
              type="date"
              value={dayjs(state.phdob).format('YYYY-MM-DD')}
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
          />
        </div>
      </SectionContainer>

      <SectionContainer className="mt-6">
        {state.etype !== 'buyback' ? (
          <div>
            <div>
              <h1 className="py-2 font-medium text-base">Buyback Through :</h1>
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
                      placeholder="1,00,000"
                      value={state.issamestore === true ? state.newval : ''}
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
                      placeholder="1,00,000"
                      value={state.issamestore === false ? state.newval : ''}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        ) : (
          <div className="flex-row py-5 mx-4">
            <InputText
              className="w-full"
              label="Upgrade Amount"
              name="pugradeamt"
              onChange={onChangeHandlerCreator('newval')}
              placeholder="Upgrade Amount"
              type="text"
              value={state.newval}
            />
          </div>
        )}
        <div className="flex-row py-5 mx-4">
          <div className="flex justify-between pt-5 ">
            <InputText
              label="Invoice Number"
              name="iamt"
              onChange={onChangeHandlerCreator('invno')}
              placeholder="Invoice Number"
              type="number"
              value={state.invno}
            />
            <InputText
              label="Invoice Amount"
              name="iamt"
              onChange={onChangeHandlerCreator('invval')}
              placeholder="Invoice Amount"
              type="text"
              value={formatByCurrency(parseFloat(state.invval))}
            />
            <InputText
              label="Invoice Date"
              name="idate"
              onChange={onChangeHandlerCreator('invdate')}
              placeholder="Invoice Date"
              type="text"
              value={dayjs(state.invdate).format('YYYY-MM-DD')}
            />
          </div>
        </div>
        <div></div>
      </SectionContainer>

      <SectionContainer className="mt-6">
        <div className="mt-6 flex items-center justify-center gap-x-6 my-5 py-5">
          <Link href={'/admin/resale'}>
            <button type="button" className="text-sm font-semibold text-gray-900 px-12 border-black border py-2 box-border rounded-md">
              {' '}
              Cancel{' '}
            </button>
          </Link>
          <button
            type="submit"
            onClick={onSubmitHandler}
            className="rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
          >
            Submit
          </button>
        </div>
      </SectionContainer>
    </div>
  )
}

export default ResaleDetailScreen
