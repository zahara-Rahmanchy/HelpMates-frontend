import {jwtDecode} from "jwt-decode";

export const DecodeToken = (token: string) => {
  return jwtDecode(token);
};
