import RequestsTable from "@/components/UI/MyRequests/RequestsTable";
import {authKey} from "@/constants/authkey";
import {IApiResponse} from "@/interfaces/OpportunityInterface";
import getEnvVariable from "@/utils/getEnvVariable";
import {cookies} from "next/headers";
import React from "react";

const RequestPage = async () => {
  const accessToken = cookies().get(authKey)?.value;

  const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");

  // try{
  const res = await fetch(`${url}/my-adoption-requests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? String(accessToken) : "",
    },

    cache: "no-store",
  });
  const result: IApiResponse = await res.json();
  // console.log("result: ", result);
  let requestsData;
  let error;
  if (result?.success === true) {
    requestsData = result.data;
  }
  if (result.success === false) {
    error = result.message;
  }
  return <RequestsTable requests={requestsData} error={error} />;
};

export default RequestPage;
