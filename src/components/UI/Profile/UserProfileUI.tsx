"use client";
import {AccountCircleRounded} from "@mui/icons-material";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import React, {useRef} from "react";
import {useForm} from "react-hook-form";

export interface IProfile {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
}
const UserProfileUI = ({profile}: {profile: IProfile}) => {
  const handleClick = () => {
    console.log("clucked");
    const changePassword = document.getElementById("changePassword");
    console.log(changePassword);
    if (changePassword) {
      changePassword?.scrollIntoView({behavior: "smooth"});
    }
  };
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<any>();
  return (
    <Box textAlign={"center"} paddingBottom={3}>
      <Stack
        width={{xs: "100%", sm: "100%"}}
        minHeight={"200px"}
        gap={2}
        direction={{xs: "column", sm: "row"}}
        sx={{
          backgroundColor: "#eed4f9",
          borderRadius: "30px",
          // margin: "10px",
        }}
        textAlign={"left"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <AccountCircleRounded
          // fontSize="large"
          sx={{
            fontSize: "100px",
          }}
        />
        <Box color={"black"}>
          <Typography color={"black"} fontSize={"18px"} fontWeight={"bold"}>
            {profile?.name}
          </Typography>
          <Typography color="primary.main">Email: {profile?.email}</Typography>
          <Typography color="primary.main" marginBottom={2}>
            Contact: {profile?.contactNumber}
          </Typography>
        </Box>
      </Stack>
      <Button
        sx={{
          width: "200px",
          textAlign: "center",
          marginBottom: 5,
          bgcolor: "#865C97",
        }}
        onClick={handleClick}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default UserProfileUI;
