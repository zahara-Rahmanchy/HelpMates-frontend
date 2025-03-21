"use server";
import getEnvVariable from "@/utils/getEnvVariable";
import Opportunities from "./Opportunities";
// {
//   searchParams = {},
// }: {
//   searchParams?: {
//     searchTerm?: string;
//     sortBy?: string;
//     sortOrder?: string;
//     rentalPlan?: string;
//   };
// }

const GetOppr = async ({searchParams}: any) => {
  console.log("pro: ", searchParams);
  const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");
  // // console.log("Se: ", searchParams);
  const query = new URLSearchParams(searchParams);
  const queries = query.toString();
  // console.log("que: ", queries, "\n without string: ", query);

  // console.log(
  //   "searchParams: ",
  //   searchParams,
  //   "url: ",
  //   `${url}/vehicles${queries}`
  // );
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
  const skillsArr = await skiils.json();
  // console.log("skills: ", skiilsArr.data);
  const uniqueSkills: string[] = [
    ...new Set(
      (skillsArr?.data as string[])?.map((item: string) => item.trim())
    ),
  ];
  let requestsData;
  let error;
  if (result?.success === true) {
    requestsData = result.data;
    // console.log("data: ", requestsData);
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
        skills={uniqueSkills}
        // skills={skillsArr}
      />
    </>
  );
};

export default GetOppr;
