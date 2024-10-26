import {Box, Button, Container, Stack, Typography} from "@mui/material";

import {authKey} from "@/constants/authkey";
import UserProfile from "@/services/actions/UserProfile";
import {AccountCircleRounded} from "@mui/icons-material";
import EditProfile from "@/components/UI/Profile/EditProfile";
import AdoptedPetTable from "@/components/UI/Profile/AdoptedPetTable";
import {cookies} from "next/headers";
import {IjwtPayload, getUserInfo} from "@/services/auth.services";
import UserProfileUI, {IProfile} from "@/components/UI/Profile/UserProfileUI";
import ChangePassword from "@/components/UI/Profile/ChangePassword";
import CommonHeader from "@/components/shared/CommonHeader";
// import { Container } from "@mui/material";

export interface User {
  id: String;
  name: String;
  email: String;
  contactNumber: String;
  createdAt: String;
  updatedAt: String;
}
const ProfilePage = async () => {
  const accessToken = cookies().get(authKey)?.value;

  const profile = await UserProfile();
  // console.log(profile);

  return (
    <>
      <hr style={{borderColor: "#FFEDC4", marginBottom: "40px"}} />
      <Container>
        <Typography
          width={"100%"}
          mx={{sm: 4, xs: 2}}
          my={4}
          textAlign="center"
          variant="h4"
          color="primary.main"
          component="span"
          fontWeight={"bold"}
        >
          My Pro
          <Box color="black" component="span">
            file
          </Box>
        </Typography>

        <Stack
          marginTop={2}
          sx={{backgroundColor: "#f4e0fc", borderRadius: "30px"}}
          direction={{xs: "column", sm: "row"}}
          // justifyContent={"space-evenly"}
          alignItems={"center"}
          width={"100%"}
        >
          <Stack
            width={{xs: "100%", sm: "50%"}}
            minHeight={"200px"}
            direction={{xs: "column", sm: "row"}}
            sx={{
              backgroundColor: "#eed4f9",
              borderRadius: "30px",
              margin: {sm: "10px", xs: "0px"},
              padding: {sm: "0px", xs: "30px"},
            }}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <UserProfileUI profile={profile as IProfile} />
          </Stack>
          <Box>
            <EditProfile
              accessToken={accessToken as string}

              // updateProfile={setProfile}
            />
          </Box>
        </Stack>
        <Box>
          <ChangePassword />
        </Box>
        <Typography
          width={"100%"}
          mx={{sm: 4, xs: 2}}
          my={4}
          textAlign="left"
          variant="h4"
          color="primary.main"
          // component="span"
          fontWeight={"bold"}
          // fontSize={"30px"}
        >
          My Adop
          <Box color="black" component="span">
            ted Paws
          </Box>
        </Typography>
        {/* accessToken={accessToken as string} */}
        <AdoptedPetTable />
      </Container>
    </>
  );
};

export default ProfilePage;
