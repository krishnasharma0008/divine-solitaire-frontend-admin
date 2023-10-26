import React, { useContext, useReducer } from 'react'

import { createPremiumChart } from '@/api'
import { InputFileExcel } from '@/components/common'
import { NOTIFICATION_MESSAGES } from '@/config'
import LoaderContext from '@/context/loader-context'
import NotificationContext from '@/context/notification-context'
import { PremiumChart } from '@/interface'

interface PremiumChartsAction {
  type: string
  payload?: string | PremiumChart | File
}

const initialState: PremiumChart = {
  premiumChart: '',
}

const premiumchartReducer = (state: PremiumChart, action: PremiumChartsAction) => {
  if (action.type === 'ALL') {
    return { ...state, ...(action.payload as unknown as PremiumChart) }
  }
  return { ...state, [action.type]: action.payload }
}

const PremiumChartsScreen: React.FC = () => {
  const [state, dispatch] = useReducer(premiumchartReducer, initialState)
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const { notify, notifyErr } = useContext(NotificationContext)

  const onChangeHandlerCreator = (fieldname: string) => {
    //console.log('check file')
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: fieldname,
        payload: (e.target as HTMLInputElement)?.files?.[0],
      })
    //}
  }

  const onSubmitHandler = () => {
    //console.log('Button Clicked')
    showLoader()
    const payload: PremiumChart = { ...state }
    //console.log(payload)
    createPremiumChart(payload)
      .then(() => {
        //console.log('File uploaded successfully')
        notify(NOTIFICATION_MESSAGES.PREMIUM_CHART_SUCESS)
        hideLoader()
      })
      .catch((err) => {
        console.error('Error uploading file', err)
        notifyErr('Error uploading file')
        hideLoader()
      })
  }

  return (
    <div className="flex-1 w-full mt-1 bg-gray-50 pt-10 px-4 rounded-lg">
      <InputFileExcel label="Premium Chart" onChange={onChangeHandlerCreator('premiumChart')} value={state.premiumChart} placeholder="Drag & drop files here" />
      <button
        type="submit"
        onClick={onSubmitHandler}
        className="rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
      >
        Upload
      </button>
    </div>
  )
}

export default PremiumChartsScreen
