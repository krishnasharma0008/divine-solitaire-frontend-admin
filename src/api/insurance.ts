import { AxiosResponse } from 'axios'

import { Insurance } from '@/interface'
import { getToken } from '@/local-storage'

import { getInsuranceListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetInsuranceListResponse {
  data: Array<Insurance>
  total_page: number
  total_row: number
}

// const getInsuranceList = (): Promise<AxiosResponse<GetInsuranceListResponse>> =>
//   callWebService(getInsuranceListEndpoint.url, {
//     method: getInsuranceListEndpoint.method,
//     headers: {
//       Authorization: 'Bearer ' + getToken(),
//     },
//   })

// export default getInsuranceList

const getInsuranceListWithFilter = (fieldName?: string, fieldValue?: string, pageNo?: number): Promise<AxiosResponse<GetInsuranceListResponse>> => {
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
  //console.log(apiUrl)
  return callWebService(getInsuranceListEndpoint.url + apiUrl, {
    method: getInsuranceListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export default getInsuranceListWithFilter
