"use server";

import getEnvVariable from "@/utils/getEnvVariable";

export type opportunityData = {
  opportunityId: string;
  volunteerExperience: string;
};

const VolunteerRequest = async (
  opportunityData: opportunityData,
  accessToken: string
) => {
  // console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/volunteer-application`);
  const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");
  const res = await fetch(`${url}/volunteer-application`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? accessToken : "",
    },
    body: JSON.stringify(opportunityData),
    cache: "no-store",
  });
  const volunteerData = await res.json();
  return volunteerData;
};

export default VolunteerRequest;
