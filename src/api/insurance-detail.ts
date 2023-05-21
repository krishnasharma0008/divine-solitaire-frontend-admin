import { AxiosResponse } from "axios";
import get from "lodash/get";
import { createInsuranceEndpoint, getInsuranceListEndpoint } from "./endpoints";
import callWebService from "./web-service";
import { getToken } from "@/local-storage";
import { Insurance, InsuranceDetail } from "@/interface";

export interface GetInsuranceDetailResponse {
  data: Insurance;
}

const getInsuranceDetail = (
  id: number
): Promise<AxiosResponse<GetInsuranceDetailResponse>> =>
  callWebService(getInsuranceListEndpoint.url + id, {
    method: getInsuranceListEndpoint.method,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

const createInsurance = (
  payload: InsuranceDetail
): Promise<AxiosResponse<void>> => {
  const formData = new FormData();
  Object.keys(payload).forEach((key: string) => {
    if (!get(payload, key)) return;
    if (["invfile", "polfile"].includes(key)) {
      formData.append(key, get(payload, key), get(payload, key));
      return;
    }
    formData.append(key, get(payload, key));
  });

  return callWebService(createInsuranceEndpoint.url, {
    method: createInsuranceEndpoint.method,
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export { getInsuranceDetail, createInsurance };
