import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://pokeapi.co",
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {

    if (config.data instanceof FormData) {
      config.headers["Content-type"] = "multipart/form-data";
    } else {
      config.headers["Content-type"] = "application/json";
    }
    return config;
  },
  (error) => {
    logError(error);
    return Promise.reject(error);
  },
  { synchronous: true }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    } else if (response.data) {
      return { ...response.data };
    }
    return Promise.reject(response.data);
  },
  (error) => {
    logError(error);

    switch (error?.response?.status) {
      case 400:
        return Promise.reject(error.response.data);
      case 401:
        unauthorizeAccess();
        return Promise.reject(error.response.data);
      case 403:
        unauthorizeAccess();
        return Promise.reject(error.response.data);
      case 404:
        return Promise.reject(error.response.data);
      case 405:
        return Promise.reject(error.response.data);
      case 500:
        return Promise.reject(error.response.data);
      case 501:
        return Promise.reject(error.response.data);
      case 502:
        return Promise.reject(error.response.data);
      case 422:
        unauthorizeAccess();
        return Promise.reject(error.response.data);
      default:
        return Promise.reject(error);
    }
  }
);

function getUrl(config) {
  if (config?.baseURL) {
    const _url = config?.url;
    return _url.replace(config?.baseURL, "");
  }
  return config?.url;
}

const logError = (error) => {
  console.log(
    `% c#ERROR ${error?.response?.status} - ${getUrl(
      error?.response?.config
    )}: `,
    "color: #f44336; font-weight: bold",
    error?.response?.statusText
  );
};

const unauthorizeAccess = () => {
  removeToken();
  window?.location?.reload();
};
