import { AxiosResponse } from 'axios'
import get from 'lodash/get'

import { Resale, ResaleDetail } from '@/interface'
import { getToken } from '@/local-storage'

import { createResaleEndpoint, getResaleListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetResaleDetailResponse {
  data: Array<Resale>
}

const getResaleDetail = (id: number): Promise<AxiosResponse<GetResaleDetailResponse>> =>
  callWebService(getResaleListEndpoint.url + id, {
    method: getResaleListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

const createResale = (payload: ResaleDetail): Promise<AxiosResponse<void>> => {
  const formData = new FormData()
  Object.keys(payload).forEach((key: string) => formData.append(key, get(payload, key)))

  return callWebService(createResaleEndpoint.url, {
    method: createResaleEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}

const DownloadDocFile = async (filename: string): Promise<AxiosResponse<Blob>> => {
  const apiUrl = `doc/${filename}`
  //console.log(apiUrl)
  return callWebService(getResaleListEndpoint.url + apiUrl, {
    method: getResaleListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: 'blob',
  })
}

export { getResaleDetail, createResale, DownloadDocFile }
