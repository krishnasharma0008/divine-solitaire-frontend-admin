import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

import { API_CONFIG } from '@/config'
import { deleteToken } from '@/local-storage'

const callWebService: AxiosInstance = axios.create({
  baseURL: API_CONFIG.host,
  timeout: API_CONFIG.timeout,
})

const successInterceptor = (response: AxiosResponse) => response
const failureInterceptor = (errorResponse: AxiosError) => {
  if (errorResponse.response?.status === 401) {
    deleteToken()
  } else if (errorResponse.response?.status === 400) {
    // Handle 400 Bad Request error
    const { data } = errorResponse.response

    // Type assertion to inform TypeScript about the structure of 'data'
    const errorMessage =
      data && (data as { message?: string }).message ? `Bad Request: ${data && (data as { message?: string }).message}` : 'Bad Request: Invalid request.'

    console.error(errorMessage)
    // You can choose to do additional handling for 400 errors here
  }

  return Promise.reject(errorResponse)

  //return errorResponse
}

callWebService.interceptors.response.use(successInterceptor, failureInterceptor)

export default callWebService
