import { AxiosResponse } from "axios";
import get from "lodash/get";
import { createResaleEndpoint, getSpecialProductsListEndpoint } from "./endpoints";
import callWebService from "./web-service";
import { getToken } from "@/local-storage";
import { SpecialProducts, SpecialProductsDetail } from "@/interface";

export interface GetSpecialProductsDetailResponse {
  data: Array<SpecialProductsDetail>;
}

const getSpecialProductsDetail = (
  id: number
): Promise<AxiosResponse<GetSpecialProductsDetailResponse>> =>
  callWebService(getSpecialProductsListEndpoint.url + id, {
    method: getSpecialProductsListEndpoint.method,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

const createSpecialProducts = (payload: SpecialProductsDetail): Promise<AxiosResponse<void>> => {
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

//export { getSpecialProductsDetail, createResale };
export { getSpecialProductsDetail, createSpecialProducts };
