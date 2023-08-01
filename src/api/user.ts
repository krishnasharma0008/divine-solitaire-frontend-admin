import { AxiosResponse } from 'axios'

import { User } from '@/interface'
import { getToken } from '@/local-storage'

import { getUserListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetUserListResponse {
  data: Array<User>
  total_page: number
  total_row: number
}

// const getUserList = (): Promise<AxiosResponse<GetUserListResponse>> =>
//   callWebService(getUserListEndpoint.url, {
//     method: getUserListEndpoint.method,
//     headers: {
//       Authorization: 'Bearer ' + getToken(),
//     },
//   })

// export default getUserList

const getUserListWithFilter = (fieldName?: string, fieldValue?: string, pageNo?: number): Promise<AxiosResponse<GetUserListResponse>> => {
  let apiUrl = `list?fldname=${fieldName}`

  if (fieldValue !== null && fieldValue !== undefined) {
    apiUrl += `&fldvalue=${fieldValue}`
  }
  if (pageNo !== null && pageNo !== undefined) {
    apiUrl += `&pageno=${pageNo}`
  }
  //console.log(apiUrl)
  return callWebService(getUserListEndpoint.url + apiUrl, {
    method: getUserListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export default getUserListWithFilter
