enum HTTP_METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface Endpoint {
  method: HTTP_METHOD
  url: string
}

export const loginEndpoint: Endpoint = {
  method: HTTP_METHOD.POST,
  url: '/login',
}

export const getInsuranceListEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/secadmin/policy/',
}

export const createInsuranceEndpoint: Endpoint = {
  method: HTTP_METHOD.PUT,
  url: '/secadmin/policy/',
}

export const getResaleListEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/secadmin/resale/',
}

export const createResaleEndpoint: Endpoint = {
  method: HTTP_METHOD.PUT,
  url: '/secadmin/resale/',
}

export const getUserListEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/secadmin/user/',
}

export const createUserEndpoint: Endpoint = {
  method: HTTP_METHOD.PUT,
  url: '/secadmin/user/',
}

export const getSpecialProductsListEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/secadmin/designprice/',
}

export const createSpecialProductsEndpoint: Endpoint = {
  method: HTTP_METHOD.PUT,
  url: '/secadmin/designprice/',
}

export const getStoreLocatorListEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/secadmin/store/list',
}

export const getStoreLocatorDetailEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/secadmin/store/',
}

export const getDashboardUserpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/secadmin/dashboard/info',
}

export const createPremiumChartEndpoint: Endpoint = {
  method: HTTP_METHOD.POST,
  url: '/secadmin/premiumdia/syncslab',
}

export const getExchangeRateListEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/secadmin/exchangerate/',
}

export const createExchangeRateEndpoint: Endpoint = {
  method: HTTP_METHOD.PUT,
  url: '/secadmin/exchangerate/',
}

export const ActivateExchangeRateEndpoint: Endpoint = {
  method: HTTP_METHOD.POST,
  url: '/secadmin/exchangerate/actv/',
}

export const DeleteExchangeRateEndpoint: Endpoint = {
  method: HTTP_METHOD.POST,
  url: '/secadmin/exchangerate/',
}
