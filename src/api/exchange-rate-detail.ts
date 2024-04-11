import { AxiosResponse } from 'axios'

import { ExchangeRateDetail } from '@/interface'
import { getToken } from '@/local-storage'

import { ActivateExchangeRateEndpoint, createExchangeRateEndpoint, getExchangeRateListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetExchangeRateDetailResponse {
  data: Array<ExchangeRateDetail>
}

const getExchangeRateDetail = (id: number): Promise<AxiosResponse<GetExchangeRateDetailResponse>> =>
  callWebService(getExchangeRateListEndpoint.url + id, {
    method: getExchangeRateListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

const createExchangeRate = (payload: ExchangeRateDetail): Promise<AxiosResponse<void>> => {
  console.log('iaactive', payload)
  if (payload.isactive === true) {
    return callWebService(ActivateExchangeRateEndpoint.url + payload.id, {
      method: ActivateExchangeRateEndpoint.method,
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      data: payload,
    })
  } else {
    return callWebService(createExchangeRateEndpoint.url, {
      method: createExchangeRateEndpoint.method,
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      data: payload,
    })
  }
}

export { getExchangeRateDetail, createExchangeRate }
