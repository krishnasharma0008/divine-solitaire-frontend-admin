import { AxiosResponse } from 'axios'

import { Insurance } from '@/interface'
import { getToken } from '@/local-storage'

import { getInsuranceListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetInsuranceListResponse {
  data: Array<Insurance>
}

const getInsuranceList = (): Promise<AxiosResponse<GetInsuranceListResponse>> =>
  callWebService(getInsuranceListEndpoint.url, {
    method: getInsuranceListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

export default getInsuranceList
