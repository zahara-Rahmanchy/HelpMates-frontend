import {tagTypes} from "../tag-types";
import {baseApi} from "./baseApi";

const DashboardMetaApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getDashboardData: build.query({
      query: () => ({
        url: "/dashboradMetaData",
        method: "GET",
      }),
      providesTags: [
        tagTypes.opportunity,
        tagTypes.applications,
        tagTypes.users,
      ],
    }),
    getSignups: build.query({
      query: ({year, month}: {year?: number; month?: number}) => ({
        url: `/dashboradUserSignUps`,
        method: "GET",
        params: {year, month},
      }),
      providesTags: [tagTypes.users],
    }),
  }),
});

export const {useGetDashboardDataQuery, useGetSignupsQuery} = DashboardMetaApi;
