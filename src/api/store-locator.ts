import { AxiosResponse } from 'axios'

import { StoreLocator } from '@/interface'
import { getToken } from '@/local-storage'

import { getStoreLocatorListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetStoreLocatorListResponse {
  data: Array<StoreLocator>
}

const getStoreLocatorList = (): Promise<AxiosResponse<GetStoreLocatorListResponse>> =>
  callWebService(getStoreLocatorListEndpoint.url, {
    method: getStoreLocatorListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

export default getStoreLocatorList
