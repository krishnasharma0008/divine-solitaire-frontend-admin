import { AxiosResponse } from 'axios'

import { SpecialProductsDetail } from '@/interface'
import { getToken } from '@/local-storage'

import { createSpecialProductsEndpoint, getSpecialProductsListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetSpecialProductsDetailResponse {
  data: Array<SpecialProductsDetail>
}

const getSpecialProductsDetail = (id: number): Promise<AxiosResponse<GetSpecialProductsDetailResponse>> =>
  callWebService(getSpecialProductsListEndpoint.url + id, {
    method: getSpecialProductsListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

const createSpecialProducts = (payload: SpecialProductsDetail): Promise<AxiosResponse<void>> => {
  return callWebService(createSpecialProductsEndpoint.url, {
    method: createSpecialProductsEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    data: payload,
  })
}

export { getSpecialProductsDetail, createSpecialProducts }
