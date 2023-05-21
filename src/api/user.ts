import { AxiosResponse } from "axios";
import { getUserListEndpoint } from "./endpoints";
import callWebService from "./web-service";
import { getToken } from "@/local-storage";
import { User } from "@/interface";


export interface GetUserListResponse {
  data: Array<User>;
}

const getUserList = (): Promise<AxiosResponse<GetUserListResponse>> =>
  callWebService(getUserListEndpoint.url, {
    method: getUserListEndpoint.method,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

export default getUserList;

