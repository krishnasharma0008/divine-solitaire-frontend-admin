import { AxiosResponse } from 'axios'

import { StoreLocator } from '@/interface'
import { getToken } from '@/local-storage'

import { getStoreLocatorDetailEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetStoreLocatorDetailResponse {
  data: {
    data: StoreLocator
  }
}

const getStoreLocatorDetail = (id: number): Promise<AxiosResponse<GetStoreLocatorDetailResponse>> =>
  callWebService(getStoreLocatorDetailEndpoint.url + id, {
    method: getStoreLocatorDetailEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

const DownloadStoreExcel = async (): Promise<AxiosResponse<Blob>> => {
  const apiUrl = 'excel'
  //console.log(apiUrl)
  return callWebService(getStoreLocatorDetailEndpoint.url + apiUrl, {
    method: getStoreLocatorDetailEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: 'blob',
  })
}

export { getStoreLocatorDetail, DownloadStoreExcel }
