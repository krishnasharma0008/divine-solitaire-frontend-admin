import dayjs from 'dayjs'
import utcPlugin from 'dayjs/plugin/utc'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useReducer, useState } from 'react'

import { createExchangeRate, getExchangeRateDetail } from '@/api'
//import { Dropdown } from '@/components/common'
import DatePicker from '@/components/common/date-picker'
import InputText from '@/components/common/input-text'
import { CalendarIcon } from '@/components/icons'
import { NOTIFICATION_MESSAGES } from '@/config'
import LoaderContext from '@/context/loader-context'
import NotificationContext from '@/context/notification-context'
import { ExchangeRateDetail } from '@/interface'

import SectionContainer from './sub-components/section-container'

dayjs.extend(utcPlugin)

interface ExchangeRateDetailAction {
  type: string
  payload?: string | boolean | ExchangeRateDetail
}

const initialState: ExchangeRateDetail = {
  edate: '',
  erate: '',
  erateAED: '',
  isactive: false,
}

const ExchangeRateDetailReducer = (state: ExchangeRateDetail, action: ExchangeRateDetailAction) => {
  if (action.type === 'ALL') {
    return {
      ...state,
      ...(action.payload as unknown as ExchangeRateDetail),
    }
  }
  return { ...state, [action.type]: action.payload }
}

const ExchangeRateDetailScreen: React.FC = () => {
  const { query, push } = useRouter()
  const [state, dispatch] = useReducer(ExchangeRateDetailReducer, initialState)
  const [editMode, setEditMode] = useState<boolean>(query?.id === 'new')
  const { notify, notifyErr } = useContext(NotificationContext)
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const DateFormat = 'YYYY-MM-DD HH:mm:ss'

  useEffect(() => {
    if (!query.id || query.id === 'new') {
      setEditMode(true)
      return
    }
    /**/
    showLoader()
    getExchangeRateDetail(query?.id as unknown as number)
      .then((res) => {
        dispatch({
          type: 'ALL',
          payload: { ...(res.data.data as unknown as ExchangeRateDetail) },
        })
        hideLoader()
      })
      .catch((err) => {
        hideLoader()
        console.log('errr', err)
      })
  }, [hideLoader, query.id, showLoader])

  const onChangeHandlerCreator = (fieldname: string) => {
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

  const onSubmitHandler = (isActive: boolean) => {
    const payload: ExchangeRateDetail = {
      erate: parseFloat(`${state.erate || 0}`),
      erateAED: parseFloat(`${state.erateAED || 0}`),
      edate: new Date(state.edate || Date.now()).toISOString(),
      isactive: isActive,
    }

    if (query?.id && query?.id !== 'new') {
      payload.id = parseInt(`${query.id}`, 10) as unknown as number
    }
    showLoader()
    createExchangeRate(payload)
      .then(() => {
        console.log('It is successfully created')
        notify(query?.id === 'new' ? NOTIFICATION_MESSAGES.ECHANGE_RATE_CREATE_SUCCESS : NOTIFICATION_MESSAGES.ECHANGE_RATE_UPDATE_SUCCESS)
        push('/admin/exchange-rate')
        hideLoader()
      })
      .catch((err) => {
        hideLoader()
        notifyErr(query?.id === 'new' ? NOTIFICATION_MESSAGES.ECHANGE_RATE_CREATE_FAILED : NOTIFICATION_MESSAGES.ECHANGE_RATE_UPDATE_FAILED)
        console.log('Error', err)
      })
  }

  const onActiveButtonClick = () => {
    onSubmitHandler(true) // Set isactive to true
  }

  const onSubmitButtonClick = () => {
    onSubmitHandler(false) // Set isactive to true
  }

  const onEditClickHandler = () => setEditMode(true)

  return (
    <div className="flex-1 w-full mt-1 bg-gray-50 pt-10 px-4 rounded-lg">
      <SectionContainer className="mt-6">
        {/* <div>
          <h1 className="py-2 font-medium text-base">Product Details:</h1>
        </div> */}
        <div className="flex pt-5 w-full">
          <div className="w-full flex flex-col gap-y-8 pt-5 items-center justify-center">
            <DatePicker
              showIcon={editMode}
              onChange={onDateChangeHandler('edate')}
              label="Date"
              value={state.edate ? new Date(dayjs.utc(state.edate).format(DateFormat)) : null}
              className="w-80 mb-4"
              icon={CalendarIcon}
            />
            <InputText
              className="w-80"
              containerClass="w-80"
              label="1 United States Dollar equals Indian Rupee"
              name="rate"
              onChange={onChangeHandlerCreator('erate')}
              placeholder="1 USD equals Indian Rupee"
              type="number"
              value={`${state.erate}`}
              disabled={!editMode}
              step="0.001"
            />
            <InputText
              className="w-80"
              containerClass="w-80"
              label="1 USD equals United Arab Emirates Dirham"
              name="rateAED"
              onChange={onChangeHandlerCreator('erateAED')}
              placeholder="1 United States Dollar equals United Arab Emirates Dirham"
              type="number"
              value={`${state.erateAED}`}
              disabled={!editMode}
              step="0.001"
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="mt-6 flex items-center justify-center gap-x-6 my-5 py-5">
            <Link href="/admin/exchange-rate">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 bg-Chinese-Black-sidebar border border-transparent rounded-md font-semibold capitalize text-white hover:bg-Chinese-Black-sidebar active:bg-Chinese-Black-sidebar focus:outline-none focus:bg-Chinese-Black-sidebar focus:ring focus:ring-red-200 disabled:opacity-25 transition"
              >
                Close
              </button>
            </Link>
            {editMode ? (
              <button
                type="submit"
                onClick={onSubmitButtonClick}
                className=" w-72 rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={onEditClickHandler}
                className=" w-72 rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
              >
                Edit
              </button>
            )}
            <button
              type="submit"
              onClick={onActiveButtonClick}
              className="inline-flex items-center justify-center px-4 py-2 bg-Chinese-Black-sidebar border border-transparent rounded-md font-semibold capitalize text-white hover:bg-Chinese-Black-sidebar active:bg-Chinese-Black-sidebar focus:outline-none focus:bg-Chinese-Black-sidebar focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              Active
            </button>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}

export default ExchangeRateDetailScreen
