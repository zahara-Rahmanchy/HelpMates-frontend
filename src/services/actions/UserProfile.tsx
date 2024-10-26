"use server";

import {authKey} from "@/constants/authkey";
import getEnvVariable from "@/utils/getEnvVariable";
import {cookies} from "next/headers";
import {storeUserInfo} from "../auth.services";
import {IProfile} from "@/components/UI/Profile/UserProfileUI";

const UserProfile = async () => {
  const accessToken = cookies().get(authKey)?.value;
  const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");

  const res = await fetch(`${url}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? accessToken : "",
    },
    cache: "no-store",
    // next: {
    //   revalidate: 60,
    // },
  });
  const profileData = await res.json();

  return profileData.data;
};

export default UserProfile;
