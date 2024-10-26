"use server";

import getEnvVariable from "@/utils/getEnvVariable";

interface EditData {
  name?: string;
  email?: string;
  role?: string;
  active?: boolean;
}
const EditUserProfile = async (
  editData: EditData,
  accessToken: string,
  id: string
) => {
  const data = {
    ...editData,
    id: id,
  };
  try {
    const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");
    const res = await fetch(`${url}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? accessToken : "",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    const profileData = await res.json();

    // console.log("update", profileData);

    return profileData;
  } catch (err) {
    console.log("err: ", err);
  }
};

export default EditUserProfile;
