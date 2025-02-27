import getEnvVariable from "@/utils/getEnvVariable";
import Opportunities from "./Opportunities";

const GetOppr = async ({
  searchParams = {},
}: {
  searchParams?: {
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: string;
    rentalPlan?: string;
  };
}) => {
  const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");
  const query = new URLSearchParams(searchParams);
  const queries = query.toString();
  console.log("que: ", queries, "\n without string: ", query);
  const paramValue = searchParams.searchTerm || "No param provided";
  console.log("paramValue: ", paramValue);
  console.log(
    "searchParams: ",
    searchParams,
    "url: ",
    `${url}/vehicles${queries}`
  );
  const res = await fetch(`${url}/opportunities?${queries}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

    cache: "no-store",
  });
  const result = await res.json();
  // console.log("result: ", result);
  const skiils = await fetch(`${url}/skills`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const skiilsArr = await skiils.json();
  let requestsData;
  let error;
  if (result?.success === true) {
    requestsData = result.data;
    console.log("data: ", requestsData);
  }
  if (result.success === false) {
    error = result.message;
  }
  return (
    <>
      {" "}
      <Opportunities
        requests={result.data}
        error={error}
        skills={skiilsArr.data}
      />
    </>
  );
};

export default GetOppr;
