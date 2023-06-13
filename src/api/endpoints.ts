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
  url: '/api/login',
}

export const getInsuranceListEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/api/secadmin/policy/',
}

export const createInsuranceEndpoint: Endpoint = {
  method: HTTP_METHOD.PUT,
  url: '/api/secadmin/policy/',
}

export const getResaleListEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/api/secadmin/resale/',
}

export const createResaleEndpoint: Endpoint = {
  method: HTTP_METHOD.PUT,
  url: '/api/secadmin/resale/',
}

export const getUserListEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/api/secadmin/user/',
}

export const createUserEndpoint: Endpoint = {
  method: HTTP_METHOD.PUT,
  url: '/api/secadmin/user/',
}

export const getSpecialProductsListEndpoint: Endpoint = {
  method: HTTP_METHOD.GET,
  url: '/api/secadmin/designprice/',
}

export const createSpecialProductsEndpoint: Endpoint = {
  method: HTTP_METHOD.PUT,
  url: '/api/secadmin/designprice/',
}

// export const updateSpecialProductsEndpoint: Endpoint = {
//   method: HTTP_METHOD.PUT,
//   url: "/api/secadmin/designprice/",
// };
