"use server";

import getEnvVariable from "@/utils/getEnvVariable";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};
const RegisterUser = async (userData: RegisterData) => {
  const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");
  const res = await fetch(`${url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    cache: "no-store",
  });
  const userInfo = await res.json();
  return userInfo;
};

export default RegisterUser;
