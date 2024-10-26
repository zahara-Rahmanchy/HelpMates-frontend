import OpportunityDetails from "@/components/UI/OpportunityDetails/OpportunityDetails";
import PetPortfolio from "@/components/UI/OpportunityDetails/OpportunityDetails";
import CommonHeader from "@/components/shared/CommonHeader";

import {authKey} from "@/constants/authkey";
import {opportunityId} from "@/constants/opportunityId";
import {
  IApiResponse,
  IOpportunityData,
} from "@/interfaces/OpportunityInterface";

import {getUserInfo} from "@/services/auth.services";
import getEnvVariable from "@/utils/getEnvVariable";
import {Box} from "@mui/material";

import {cookies} from "next/headers";

// import {toast} from "sonner";

const DetailsPage = async ({params}: opportunityId) => {
  console.log("params.opportunityId: ", params.opportunityId);
  const accessToken = cookies().get(authKey)?.value;

  const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");
  console.log("url: ", `${url}/opportunities/${params.opportunityId}`);
  // try{
  const res = await fetch(`${url}/opportunities/${params.opportunityId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: accessToken ? String(accessToken) : "",
    },

    cache: "no-store",
  });
  const result: IApiResponse = await res.json();
  console.log("result: ", result);
  let opportunityData;
  let error;
  if (result?.success === true) {
    opportunityData = result.data;
  }
  if (result.success === false) {
    error = result.message;
  }

  return (
    <Box bgcolor={"tertiary.light"} height={"100%"} paddingBottom={"100px"}>
      {" "}
      <CommonHeader
        headerFirst="Volunteer Position Overview"
        headerSecond="Make an Impact"
      />
      <OpportunityDetails
        opportunity={opportunityData as IOpportunityData}
        error={error as string}
      />
    </Box>
  );
};

export default DetailsPage;
