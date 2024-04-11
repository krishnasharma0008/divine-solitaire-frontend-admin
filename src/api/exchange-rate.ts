import { AxiosResponse } from 'axios'

import { ExchangeRate } from '@/interface'
import { getToken } from '@/local-storage'

import { getExchangeRateListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetExchangeRateListResponse {
  data: Array<ExchangeRate>
  total_page: number
  total_row: number
}

// const getExchangeRateList = (): Promise<AxiosResponse<GetExchangeRateListResponse>> =>
//   callWebService(getExchangeRateListEndpoint.url, {
//     method: getExchangeRateListEndpoint.method,
//     headers: {
//       Authorization: 'Bearer ' + getToken(),
//     },
//   })

// export default getExchangeRateList

const getExchangeRateListWithFilter = (fieldValue?: string, pageNo?: number): Promise<AxiosResponse<GetExchangeRateListResponse>> => {
  let apiUrl = `` 
  if (fieldValue !== null && fieldValue !== undefined) {
    apiUrl += `&fldvalue=${fieldValue}`
  }
  if (pageNo !== null && pageNo !== undefined) {
    apiUrl += `&pageno=${pageNo}`
  }
  console.log(apiUrl)
  return callWebService(getExchangeRateListEndpoint.url, {
    // + apiUrl, {
    method: getExchangeRateListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export default getExchangeRateListWithFilter
