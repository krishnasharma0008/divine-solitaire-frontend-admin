import { AxiosResponse } from 'axios'

import { User } from '@/interface'
import { getToken } from '@/local-storage'

import { getUserListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetUserListResponse {
  data: Array<User>
}

const getUserList = (): Promise<AxiosResponse<GetUserListResponse>> =>
  callWebService(getUserListEndpoint.url, {
    method: getUserListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

export default getUserList
