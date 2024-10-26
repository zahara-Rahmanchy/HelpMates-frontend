"use server";
import {cookies} from "next/headers";

export const getServerCookies = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  // console.log("k", key, "cok", cookies().get(key)?.value);
  return cookies().get(key)?.value;
};
