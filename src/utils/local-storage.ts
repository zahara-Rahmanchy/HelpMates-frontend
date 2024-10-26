import {deleteCookie, getCookie, setCookie} from "cookies-next";
import {cookies} from "next/headers";

export const setInCookies = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  // if (server) {
  //   return cookies().set(key, token);
  // }

  return setCookie(key, token);
};

export const getFromCookiesClient = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return getCookie(key);
};

// export const getFromCookiesServer = (key: string) => {
//   if (!key || typeof window === "undefined") {
//     return "";
//   }

//   return cookies().get(key)?.value;
// };
export const removeFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  // console.log("del: ", deleteCookie(key));
  return deleteCookie(key);
};
