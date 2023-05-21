import { AxiosResponse } from "axios";
import { getResaleListEndpoint } from "./endpoints";
import callWebService from "./web-service";
import { getToken } from "@/local-storage";
import { Resale } from "@/interface";


export interface GetResaleListResponse {
  data: Array<Resale>;
}

const getResaleList = (): Promise<AxiosResponse<GetResaleListResponse>> =>
  callWebService(getResaleListEndpoint.url, {
    method: getResaleListEndpoint.method,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

export default getResaleList;

