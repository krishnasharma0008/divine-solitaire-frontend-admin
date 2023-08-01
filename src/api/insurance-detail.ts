import { AxiosResponse } from 'axios'
import get from 'lodash/get'

import { Insurance, InsuranceDetail } from '@/interface'
import { getToken } from '@/local-storage'

import { createInsuranceEndpoint, getInsuranceListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetInsuranceDetailResponse {
  data: Insurance
}

const getInsuranceDetail = (id: number): Promise<AxiosResponse<GetInsuranceDetailResponse>> =>
  callWebService(getInsuranceListEndpoint.url + id, {
    method: getInsuranceListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

const createInsurance = (payload: InsuranceDetail): Promise<AxiosResponse<void>> => {
  const formData = new FormData()
  Object.keys(payload).forEach((key: string) => {
    if (!get(payload, key)) return

    if (['invfile', 'polfile'].includes(key)) {
      formData.append(key, get(payload, key), get(payload, key))
      return
    }
    formData.append(key, get(payload, key))
  })

  return callWebService(createInsuranceEndpoint.url, {
    method: createInsuranceEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}

const DownloadExcel = async (status: string, id: number): Promise<AxiosResponse<Blob>> => {
  const apiUrl = `excel?policy_status=${status}&id=${id}`
  //console.log(apiUrl)
  return callWebService(getInsuranceListEndpoint.url + apiUrl, {
    method: getInsuranceListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: 'blob',
  })
}

const DownloadFile = async (filename: string): Promise<AxiosResponse<Blob>> => {
  const apiUrl = `doc/${filename}`
  //console.log(apiUrl)
  return callWebService(getInsuranceListEndpoint.url + apiUrl, {
    method: getInsuranceListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: 'blob',
  })
}

export { getInsuranceDetail, createInsurance, DownloadExcel, DownloadFile }
