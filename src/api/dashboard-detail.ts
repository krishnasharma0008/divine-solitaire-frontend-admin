import { AxiosResponse } from 'axios'

import { User_Activity } from '@/interface'
import { getToken } from '@/local-storage'

import { getDashboardUserpoint } from './endpoints'
import callWebService from './web-service'

export interface GetDashboardUserDetailResponse {
  data: {
    user_activity: User_Activity
  }
}

const getDasboardUserDetail = (): Promise<AxiosResponse<GetDashboardUserDetailResponse>> =>
  callWebService(getDashboardUserpoint.url, {
    method: getDashboardUserpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

export { getDasboardUserDetail }
