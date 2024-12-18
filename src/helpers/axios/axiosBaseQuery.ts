import {IMeta} from "@/interfaces/IMeta";
import {BaseQueryFn} from "@reduxjs/toolkit/query";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {instance as axiosInstance} from "./axiosInstance";

export const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ""}
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?: IMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({url, method, data, params, headers, contentType}) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": contentType || "application/json",
        },
      });
      return {data: result.data};
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
