import { AxiosResponse } from 'axios'
//import get from 'lodash/get'

import { PremiumChart } from '@/interface'
import { getToken } from '@/local-storage'

import { createPremiumChartEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetPremiumChartResponse {
  message: 'SUCCESS' | 'FAILURE'
  data: PremiumChart
}

const createPremiumChart = (payload: File): Promise<AxiosResponse<void>> => {
  const formData = new FormData()
  formData.append('file', payload)

  return callWebService(createPremiumChartEndpoint.url, {
    method: createPremiumChartEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}

export { createPremiumChart }
