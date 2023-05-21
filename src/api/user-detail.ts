import { AxiosResponse } from "axios";
import get from "lodash/get";
import { createUserEndpoint, getUserListEndpoint } from "./endpoints";
import callWebService from "./web-service";
import { getToken } from "@/local-storage";
import { User, UserDetail } from "@/interface";
import { Portfolio } from "@/interface/portfolio";
import { Wishlist } from "@/interface/wishlist";

export interface GetUserDetailResponse {
  data: {
    userInfo: User;
    portfolio: Array<Portfolio>;
    Wishlist: Array<Wishlist>;
  };
}

const getUserDetail = (
  id: number
): Promise<AxiosResponse<GetUserDetailResponse>> =>
  callWebService(getUserListEndpoint.url + id, {
    method: getUserListEndpoint.method,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

const createUser = (payload: UserDetail): Promise<AxiosResponse<void>> => {
  const formData = new FormData();
  Object.keys(payload).forEach((key: string) =>
    formData.append(key, get(payload, key))
  );

  return callWebService(createUserEndpoint.url, {
    method: createUserEndpoint.method,
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

export { getUserDetail, createUser };
