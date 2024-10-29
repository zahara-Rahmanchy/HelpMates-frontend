import {tagTypes} from "../tag-types";
import {baseApi} from "./baseApi";

const opportunityApi = baseApi.injectEndpoints({
  endpoints: build => ({
    insertOpportunityData: build.mutation({
      query: data => ({
        url: "/opportunity",
        method: "POST",
        contentType: "application/json",
        data,
      }),
    }),

    getOpportunityData: build.query({
      query: () => ({
        url: "/detailed-opportunities",
        method: "GET",
      }),
      providesTags: [tagTypes.opportunity],
    }),
    updateOpportunityData: build.mutation({
      query: data => {
        // Log the data before making the request
        console.log("Data being sent:", data);

        return {
          url: `/opportunity/${data.id}`,
          method: "PUT",
          contentType: "application/json",
          data: data.body, // Body contains the form data you're updating
        };
      },
      invalidatesTags: [tagTypes.opportunity],
    }),
    // delete
    deleteOpportunityData: build.mutation({
      query: data => {
        // Log the data before making the request
        console.log("Data being sent:", data);

        return {
          url: `/opportunity/${data.id}`,
          method: "DELETE",
          contentType: "application/json",
          data: data.body, // Body contains the form data you're updating
        };
      },
      invalidatesTags: [tagTypes.opportunity],
    }),
  }),
});

export const {
  useInsertOpportunityDataMutation,
  useGetOpportunityDataQuery,
  useUpdateOpportunityDataMutation,
  useDeleteOpportunityDataMutation,
} = opportunityApi;
