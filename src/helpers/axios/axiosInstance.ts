import {authKey} from "@/constants/authkey";
import {ResponseSuccessType} from "@/interfaces/IMeta";
import {getFromCookiesClient} from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor, acts as a middleware and add these before sending request to the backend
instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromCookiesClient(authKey);
    console.log("accesstoken axios: ", accessToken);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    const responseObj: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    // return response;
    return responseObj;
  },
  function (error) {
    console.log("error : ", error);
    const errorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!",
      errorMessages: error?.response?.data?.errorDetails,
    };
    // return Promise.reject(error);
    return Promise.reject(errorResponse);
  }
);

export {instance};
