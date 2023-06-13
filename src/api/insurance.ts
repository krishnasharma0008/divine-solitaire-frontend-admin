import { AxiosResponse } from 'axios'
import { getInsuranceListEndpoint } from './endpoints'
import callWebService from './web-service'
import { getToken } from '@/local-storage'
import { Insurance } from '@/interface'

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
