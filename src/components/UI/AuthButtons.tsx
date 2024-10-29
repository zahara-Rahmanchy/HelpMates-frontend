import {authKey} from "@/constants/authkey";
import {getUserInfo, removeUser} from "@/services/auth.services";
// import {getUserInfo, removeUser} from "@/services/actions/auth.services";
import {AccountCircle} from "@mui/icons-material";
import {Box, Button, Typography} from "@mui/material";
import {getCookie} from "cookies-next";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React from "react";
import {toast} from "sonner";

const AuthButtons = () => {
  const userData: any = getUserInfo();
  const router = useRouter();
  const handleLogout = () => {
    removeUser();
    router.push("/");
    router.refresh();
    toast.success("Logged Out!");
  };
  return (
    <Box>
      {userData?.id ? (
        <>
          {/* <Link href="/MyRequests">
            <Typography>My Requests</Typography>
          </Link> */}
          <Link href={"/MyProfile"}>
            <AccountCircle
              fontSize="large"
              sx={{
                borderWidth: "2px",
                borderRadius: "50%",
                padding: "1px",
                borderColor: "tertiary.main",
                color: "secondary.light",
                marginRight: "15px",
              }}
            />
          </Link>

          <Button
            sx={{backgroundColor: "primary.light"}}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            component={Link}
            href="/Login"
            variant="outlined"
            // color="secondary"
            sx={{
              color: "white",
              borderColor: "secondary.light",
              marginRight: "15px",
            }}
          >
            Login
          </Button>
          <Button
            sx={{
              color: "#933b3b",
              backgroundColor: "secondary.light",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "primary.main",
              },
            }}
            component={Link}
            href="/Register"
          >
            Register
          </Button>
        </>
      )}
    </Box>
  );
};

export default AuthButtons;
