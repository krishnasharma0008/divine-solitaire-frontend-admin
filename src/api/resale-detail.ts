import { AxiosResponse } from "axios";
import get from "lodash/get";
import { createResaleEndpoint, getResaleListEndpoint } from "./endpoints";
import callWebService from "./web-service";
import { getToken } from "@/local-storage";
import { Resale, ResaleDetail } from "@/interface";

export interface GetResaleDetailResponse {
  data: Array<Resale>;
}

const getResaleDetail = (
  id: number
): Promise<AxiosResponse<GetResaleDetailResponse>> =>
  callWebService(getResaleListEndpoint.url + id, {
    method: getResaleListEndpoint.method,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

const createResale = (payload: ResaleDetail): Promise<AxiosResponse<void>> => {
  const formData = new FormData();
  Object.keys(payload).forEach((key: string) =>
    formData.append(key, get(payload, key))
  );

  return callWebService(createResaleEndpoint.url, {
    method: createResaleEndpoint.method,
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export { getResaleDetail, createResale };
