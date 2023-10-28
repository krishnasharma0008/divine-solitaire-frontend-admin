import React, { useContext, useState } from 'react'

import { createPremiumChart } from '@/api'
import { InputFileExcel } from '@/components/common'
import { NOTIFICATION_MESSAGES } from '@/config'
import LoaderContext from '@/context/loader-context'
import NotificationContext from '@/context/notification-context'

const PremiumChartsScreen: React.FC = () => {
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const { notify, notifyErr } = useContext(NotificationContext)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setSelectedFile(file ?? null)
  }

  const onSubmitHandler = () => {
    if (selectedFile) {
      showLoader()
      createPremiumChart(selectedFile)
        .then(() => {
          //console.log('File uploaded successfully')
          notify(NOTIFICATION_MESSAGES.PREMIUM_CHART_SUCESS)
          setSelectedFile(null)
          hideLoader()
        })
        .catch((err) => {
          console.error('Error uploading file', err)
          notifyErr('Error uploading file')
          hideLoader()
        })
    } else {
      notifyErr('No file selected.')
    }
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
