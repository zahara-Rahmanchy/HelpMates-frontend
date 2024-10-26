import {authKey} from "@/constants/authkey";
import {DecodeToken} from "@/utils/jwt";
import {
  // getFromCookies,
  getFromCookiesClient,
  removeFromLocalStorage,
  setInCookies,
} from "@/utils/local-storage";

export interface IjwtPayload {
  email: string;
  exp: number;
  iat: number;
  id: string;
  role: string;
}
export const storeUserInfo = (token: string) => {
  return setInCookies(authKey, token);
};

export const getUserInfo = () => {
  const authToken = getFromCookiesClient(authKey);

  if (authToken) {
    const decodedData = DecodeToken(authToken);

    return decodedData as IjwtPayload;
  }
};

export const getUserRole = () => {
  // const decodedData = getUserInfo() as IjwtPayload;
  // console.log("decoded role: ", decodedData);
  // const {role} = decodedData;

  // return role;
  const authToken = getFromCookiesClient(authKey);

  if (authToken) {
    const decodedData = DecodeToken(authToken) as IjwtPayload;

    decodedData as IjwtPayload;
    return decodedData.role;
  }
};
export const isLoggedIn = () => {
  const authToken = getFromCookiesClient(authKey);
  if (authToken) {
    return !!authToken;
  }
};
export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};
