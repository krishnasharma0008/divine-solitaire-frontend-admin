import { AxiosResponse } from 'axios'

import { SpecialProducts } from '@/interface'
import { getToken } from '@/local-storage'

import { getSpecialProductsListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetSpecialProductsListResponse {
  data: Array<SpecialProducts>
}

const getSpecialProductsList = (): Promise<AxiosResponse<GetSpecialProductsListResponse>> =>
  callWebService(getSpecialProductsListEndpoint.url, {
    method: getSpecialProductsListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

export default getSpecialProductsList
