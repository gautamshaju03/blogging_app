import axios from 'axios';
import { SERVICE_URLS } from '../constants/config';
import { getAccessToken } from "../utils/utils";

const API_URL = "https://blogging-app-1-sm6l.onrender.com";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = getAccessToken();
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const processRes = (res) => {
  if (res?.status === 200 || res?.status === 201) {
    return { isSuccess: true, data: res.data };
  } else {
    return { isSuccess: false, message: res.message || res.data?.message || 'Unknown error', status: res.status, data: res.data };
  }
};

axiosInstance.interceptors.response.use(
  function(response) {
    return processRes(response);
  },
  function(error) {
    const response = error.response || {};
    return Promise.reject(processRes(response));
  }
);

const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (params) => {
    const config = {
      method: value.method,
      url: typeof value.url === 'function' ? value.url(params) : value.url,
      headers: {
        authorization: getAccessToken()
      },
      responseType: value.responseType
    };

    if (value.method === 'GET' && typeof value.url !== 'function') {
      config.params = params;
    } else if (value.method === 'DELETE') {
      if (!params.id) {
        throw new Error('DELETE request requires `id` parameter.');
      }
      config.url = value.url(params.id);
    } else if (value.method === 'PATCH') {
      config.url = value.url(params.id);
      config.data = params;
    } else {
      config.data = params;
    }

    return axiosInstance(config);
  };
}

export { API };
