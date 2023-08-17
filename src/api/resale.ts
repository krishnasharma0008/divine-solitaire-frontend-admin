import { AxiosResponse } from 'axios'

import { Resale } from '@/interface'
import { getToken } from '@/local-storage'

import { getResaleListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetResaleListResponse {
  data: Array<Resale>
  total_page: number
  total_row: number
}

// const getResaleList = (): Promise<AxiosResponse<GetResaleListResponse>> =>
//   callWebService(getResaleListEndpoint.url, {
//     method: getResaleListEndpoint.method,
//     headers: {
//       Authorization: 'Bearer ' + getToken(),
//     },
//   })

// export default getResaleList

const getResaleListWithFilter = (fieldName?: string, fieldValue?: string, pageNo?: number): Promise<AxiosResponse<GetResaleListResponse>> => {
  let apiUrl = ``
  if (fieldName !== '' && fieldName !== undefined) {
    apiUrl += `?fldname=${fieldName}`
  }
  if (fieldValue !== null && fieldValue !== undefined) {
    apiUrl += `&fldvalue=${fieldValue}`
  }
  if (pageNo !== null && pageNo !== undefined) {
    apiUrl += `&pageno=${pageNo}`
  }
  console.log(apiUrl)
  return callWebService(getResaleListEndpoint.url + apiUrl, {
    method: getResaleListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export default getResaleListWithFilter
