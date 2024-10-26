"use server";
import {authKey} from "@/constants/authkey";
import {IPetDataInput, IPetDataInsert} from "@/interfaces/OpportunityInterface";
import getEnvVariable from "@/utils/getEnvVariable";
import {cookies} from "next/headers";

export const InsertPetData = async (petData: IPetDataInsert) => {
  const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");
  // console.log("url: ", url);
  const accessToken = cookies().get(authKey)?.value;
  const res = await fetch(`${url}/pets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? accessToken : "",
    },
    body: JSON.stringify(petData),
    cache: "no-store",
  });
  const petInfo = await res.json();

  return petInfo;
};
