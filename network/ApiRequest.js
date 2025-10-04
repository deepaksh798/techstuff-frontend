import { axiosClient } from "./ApiClient";

export const getRequest = (url, params, signal) => {
  // console.log("params--->", params);
  // console.log("url--->", url);

  return axiosClient.get(url, { params: params, signal });
};

export const postRequest = (url, payload) => {
  return axiosClient.post(url, payload);
};
