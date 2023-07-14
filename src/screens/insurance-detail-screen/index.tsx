import { Button } from '@material-tailwind/react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'

import { createInsurance, getInsuranceDetail } from '@/api'
import { InputFile, MetaDetailsCard } from '@/components/common'
import InputText from '@/components/common/input-text'
import { DownloadIcon } from '@/components/icons'
import { InsuranceDetail } from '@/interface'
import { formatByCurrency } from '@/util'

import SectionContainer from './sub-components/section-container'

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
  uid: '',
}

const insuranceDetailReducer = (state: InsuranceDetail, action: InsuranceDetailAction) => {
  if (action.type === 'ALL') {
    return { ...state, ...(action.payload as unknown as InsuranceDetail) }
  }
  return { ...state, [action.type]: action.payload }
}

const InsuranceDetailScreen: React.FC = () => {
  const [state, dispatch] = useReducer(insuranceDetailReducer, initialState)

  const { query, push } = useRouter()
  useEffect(() => {
    if (!query.id) {
      return
    }

    getInsuranceDetail(query?.id as unknown as number)
      .then((res) => {
        dispatch({
          type: 'ALL',
          payload: { ...(res.data.data as unknown as InsuranceDetail) },
        })
      })
      .catch((err) => {
        console.log('errr', err)
      })
  }, [query?.id])

  //const initialEndDate = dayjs(state.polend).add(365, 'day').format('YYYY-MM-DD');

  const iconClick = (downloadType: string) => {
    console.log(downloadType)
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
    //console.log(payload);
    createInsurance(payload)
      .then(() => {
        console.log('It is successfully created')
        push('/admin/insurance')
      })
      .catch((err) => console.log('Error', err))
  }

  return (
    <div className="flex-1 w-full mt-1 bg-gray-50 pt-10 px-4 rounded-lg">
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

            { name: 'Date of request', value: dayjs(state.invdate).format('YYYY-MM-DD') },
            { name: 'Retail price', value: formatByCurrency(1000000) }, //add state.invval
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
            <InputText
              label="Date of Birth"
              name="dob"
              onChange={onChangeHandlerCreator('phdob')}
              placeholder="Date Of Birth"
              type="date"
              value={dayjs(state.phdob).format('YYYY-MM-DD')}
            />
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
            <InputText label="State" name="state" onChange={onChangeHandlerCreator('phstate')} placeholder="State" type="text" value={state.phstate} />
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
              value={formatByCurrency(parseFloat(state.invval))}
            />

            <InputText
              label="Invoice Number"
              name="iamt"
              onChange={onChangeHandlerCreator('invno')}
              placeholder="Invoice Number"
              type="number"
              value={state.invno}
            />

            <InputText
              label="Invoice Date"
              name="idate"
              onChange={onChangeHandlerCreator('invdate')}
              placeholder="Invoice Date"
              type="date"
              value={dayjs(state.invdate).format('YYYY-MM-DD')}
            />
          </div>
        </div>
        <InputFile label="Invoice Documents" onChange={onChangeHandlerCreator('invfile')} value={state.invfile} placeholder="Drag & drop files here" />
        <button
          type="button"
          onClick={() => iconClick('Invoice Documents')}
          className="px-10 py-2 rounded border border-slate-200 block mb-[190px]"
          style={{ marginTop: -190, marginLeft: 180 }}
        >
          <DownloadIcon />
        </button>
        {/* <div
          onClick={() => iconClick('Invoice Documents')}
          style={{ zIndex: 10, marginTop: InputFile.length ? -170 : 0, marginLeft: 180 }}
          className="mb-[170px] mr-[180px]"
        >
          <DownloadIcon />
        </div> */}
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
            <InputText
              label="Start Date"
              name="idate"
              onChange={onChangeHandlerCreator('polstart')}
              placeholder="Start Date"
              type="date"
              value={dayjs(state.polstart).format('YYYY-MM-DD')}
            />

            <InputText
              label="End Date"
              name="idate"
              onChange={onChangeHandlerCreator('polend')}
              placeholder="End Date"
              type="date"
              //value={dayjs(state.polend).format('YYYY-MM-DD')}
              value={dayjs(state.polend).add(365, 'day').format('YYYY-MM-DD')}
            />

            <InputText
              label="Renewal Date *"
              name="idate"
              onChange={onChangeHandlerCreator('rendate')}
              placeholder="Renewal Date *"
              type="date"
              //value={dayjs(state.rendate).format('YYYY-MM-DD')}
              value={dayjs(state.polend).add(366, 'day').format('YYYY-MM-DD')}
            />
          </div>
          <InputFile label="Customer Documents" onChange={onChangeHandlerCreator('polfile')} value={state.polfile || ''} placeholder="Drag & drop files here" />
          <button
            type="button"
            onClick={() => iconClick('Customer Documents')}
            className="px-10 py-2 rounded border border-slate-200 block mb-[190px]"
            style={{ marginTop: -190, marginLeft: 180, zIndex: 999 }}
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
  )
}

export default InsuranceDetailScreen
