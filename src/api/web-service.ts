import { API_CONFIG } from '@/config'
import { deleteToken } from '@/local-storage'
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

const callWebService: AxiosInstance = axios.create({
  baseURL: API_CONFIG.host,
  timeout: API_CONFIG.timeout,
})

const successInterceptor = (response: AxiosResponse) => response
const failureInterceptor = (errorResponse: AxiosError) => {
  if (errorResponse.response?.status === 401) {
    deleteToken()
  }
  return errorResponse
}

callWebService.interceptors.response.use(successInterceptor, failureInterceptor)

export default callWebService
