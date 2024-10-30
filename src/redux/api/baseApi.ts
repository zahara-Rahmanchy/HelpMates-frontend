// Need to use the React-specific entry point to import createApi
import {axiosBaseQuery} from "@/helpers/axios/axiosBaseQuery";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {tagTypesList} from "../tag-types";

// Define a service using a base URL and expected endpoints
const url = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("url from redux: ", url);
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({baseUrl: url as string}),
  endpoints: builder => ({}),
  tagTypes: tagTypesList,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {} = baseApi;
