import { AxiosResponse } from "axios";
import { loginEndpoint } from "./endpoints";
import callWebService from "./web-service";

export interface LoginResponse {
  id: number;
  message: "SUCCESS" | "FAILURE";
  token: string;
}

const loginApi = (
  email: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> =>
  callWebService(loginEndpoint.url, {
    method: loginEndpoint.method,
    data: {
      email,
      password,
    },
  });

export default loginApi;
