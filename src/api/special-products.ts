import { AxiosResponse } from "axios";
import { getSpecialProductsListEndpoint } from "./endpoints";
import callWebService from "./web-service";
import { getToken } from "@/local-storage";
import { SpecialProducts } from "@/interface";

export interface GetSpecialProductsListResponse {
  data: Array<SpecialProducts>;
}

const getSpecialProductsList = (): Promise<
  AxiosResponse<GetSpecialProductsListResponse>
> =>
  callWebService(getSpecialProductsListEndpoint.url, {
    method: getSpecialProductsListEndpoint.method,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

export default getSpecialProductsList;
