import { AxiosResponse } from 'axios'

import { Resale } from '@/interface'
import { getToken } from '@/local-storage'

import { getResaleListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetResaleListResponse {
  data: Array<Resale>
}

const getResaleList = (): Promise<AxiosResponse<GetResaleListResponse>> =>
  callWebService(getResaleListEndpoint.url, {
    method: getResaleListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

export default getResaleList
