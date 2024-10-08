import { AxiosResponse } from 'axios'
import get from 'lodash/get'

import { User } from '@/interface'
import { Portfolio } from '@/interface/portfolio'
import { Wishlist } from '@/interface/wishlist'
import { getToken } from '@/local-storage'

import { createUserEndpoint, getUserListEndpoint } from './endpoints'
import callWebService from './web-service'

export interface GetUserDetailResponse {
  data: {
    userinfo: User
    portfolio: Array<Portfolio>
    Wishlist: Array<Wishlist>
  }
}

const getUserDetail = (id: number): Promise<AxiosResponse<GetUserDetailResponse>> =>
  callWebService(getUserListEndpoint.url + id, {
    method: getUserListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })

const createUser = (payload: User): Promise<AxiosResponse<void>> => {
  const formData = new FormData()
  Object.keys(payload).forEach((key: string) => formData.append(key, get(payload, key)))

  return callWebService(createUserEndpoint.url, {
    method: createUserEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}

const DownloadUserExcel = async (): Promise<AxiosResponse<Blob>> => {
  const apiUrl = `excel`
  //console.log(apiUrl)
  return callWebService(getUserListEndpoint.url + apiUrl, {
    method: getUserListEndpoint.method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: 'blob',
  })
}

export { getUserDetail, createUser, DownloadUserExcel }
