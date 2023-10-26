import { AxiosResponse } from 'axios'
import get from 'lodash/get'

import { PremiumChart } from '@/interface'
import { getToken } from '@/local-storage'

import { createPremiumChartEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetPremiumChartResponse {
  message: 'SUCCESS' | 'FAILURE'
  data: PremiumChart
}

const createPremiumChart = (payload: PremiumChart): Promise<AxiosResponse<void>> => {
  const formData = new FormData()
  console.log(payload)
  Object.keys(payload).forEach((key: string) => {
    if (['premiumChart'].includes(key)) {
      formData.append(key, get(payload, key))

      return
    }
  })

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
