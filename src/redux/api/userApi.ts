import {tagTypes} from "../tag-types";
import {baseApi} from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    // insertOpportunityData: build.mutation({
    //   query: data => ({
    //     url: "/opportunity",
    //     method: "POST",
    //     contentType: "application/json",
    //     data,
    //   }),
    // }),

    getAllUsers: build.query({
      query: () => ({
        url: "/all-users",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
    updateUserData: build.mutation({
      query: data => ({
        url: `/profile`,
        method: "PUT",
        contentType: "application/json",
        data,
      }),

      invalidatesTags: [tagTypes.users],
    }),
    // delete
    // deleteOpportunityData: build.mutation({
    //   query: data => {
    //     // Log the data before making the request
    //     console.log("Data being sent:", data);

    //     return {
    //       url: `/opportunity/${data.id}`,
    //       method: "DELETE",
    //       contentType: "application/json",
    //       data: data.body, // Body contains the form data you're updating
    //     };
    //   },
    //   invalidatesTags: [tagTypes.opportunity],
    // }),/ Log the data before making the request
    // console.log("Data being sent:", data);

    // return {
  }),
});

export const {useGetAllUsersQuery, useUpdateUserDataMutation} = userApi;
