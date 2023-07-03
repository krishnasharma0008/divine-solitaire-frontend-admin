import { AxiosResponse } from 'axios'
import get from 'lodash/get'

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
  const formData = new FormData()
  Object.keys(payload).forEach((key: string) => formData.append(key, get(payload, key)))

  return callWebService(createSpecialProductsEndpoint.url, {
    method: createSpecialProductsEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}

//export { getSpecialProductsDetail, createResale };
export { getSpecialProductsDetail, createSpecialProducts }
