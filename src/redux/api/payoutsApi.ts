import {tagTypes} from "../tag-types";
import {baseApi} from "./baseApi";

const payoutsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getApplicationsDataForPayouts: build.query({
      query: () => ({
        url: "/getPayouts",
        method: "GET",
      }),
      providesTags: [
       tagTypes.payments
      ],
    }),
    
    sendPayoutsToVolunteers: build.mutation({
      query:(payments: { volunteerApplicationId: string }[])=>{
        console.log("data from payout redux: ",payments)
        return{
         url: "/send-payout",
         method:"POST",
        contentType: "application/json",
        data: payments
      }},
      invalidatesTags:[tagTypes.payments]
    })

  }),
});

export const {useGetApplicationsDataForPayoutsQuery,useSendPayoutsToVolunteersMutation} = payoutsApi;
