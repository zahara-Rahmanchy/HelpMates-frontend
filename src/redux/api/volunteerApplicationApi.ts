import {tagTypes} from "../tag-types";
import {baseApi} from "./baseApi";

const volunteerApplicationApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getVolunteerApplicationDataForUser: build.query({
      query: () => ({
        url: "/my-volunteer-applications",
        method: "GET",
      }),
      providesTags: [tagTypes.applications],
    }),
    getVolunteerApplicationData: build.query({
      query: () => ({
        url: "/allvolunteer-applications",
        method: "GET",
      }),
      providesTags: [tagTypes.applications],
    }),
    // participated ones
    getParticipatedData: build.query({
      query: () => ({
        url: "/participated",
        method: "GET",
      }),
    }),
    updateVolunteerApplicationData: build.mutation({
      query: data => {
        // Log the data before making the request
        console.log("Data being sent:", data);

        return {
          url: `/volunteer-application/${data.id}`,
          method: "PUT",
          contentType: "application/json",
          data: data.body, // Body contains the form data you're updating
        };
      },
      invalidatesTags: [tagTypes.applications, tagTypes.opportunity],
    }),
    // delete
    // deleteVolunteerApplicationData: build.mutation({
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
    //   invalidatesTags: [tagTypes.applications],
    // }),
  }),
});

export const {
  useGetVolunteerApplicationDataQuery,
  useUpdateVolunteerApplicationDataMutation,
  useGetVolunteerApplicationDataForUserQuery,
  useGetParticipatedDataQuery,
} = volunteerApplicationApi;
