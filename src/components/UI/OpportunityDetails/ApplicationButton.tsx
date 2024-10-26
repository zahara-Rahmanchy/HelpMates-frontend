"use client";

import {getUserInfo, getUserRole, isLoggedIn} from "@/services/auth.services";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {blueGrey} from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {FC} from "react";
// sx={{bgcolor: "lightblue"}}
interface ApplicationButtonProps {
  id: string;
  details: {
    title: string;
    organization: string;
  };
}
const ApplicationButton = ({id, details}: ApplicationButtonProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log("scrren: ", isSmallScreen);
  return (
    <Container>
      <Stack alignItems={"center"}>
        <Image
          style={{
            // background: "red",
            padding: "0px",
            margin: "0px",
            // top: "100%",
            bottom: "50px",
            position: "relative",
            // marginTop: "20px",
            color: "purple",
            transform: "rotate(180deg)",
            textAlign: "center",
            // objectFit: "cover",
            // height: "200px",
          }}
          src="https://cdn.pixabay.com/animation/2023/04/10/02/45/02-45-10-385_512.gif"
          width={200}
          height={400}
          alt={"gif"} // src="https://media.tenor.com/YFxmLLI0Og8AAAAi/kstr-kochstrasse.gif"
        />
        {/* <Link
          href={
            isLoggedIn() && getUserRole() === "User"
              ? `/VolunteerApplication/${id}`
              : "/"
          }
        > */}
        <Button
          component="a"
          href={`/VolunteerApplication/${id}?title=${details.title}&organization=${details.organization}`}
          sx={{
            width: "50%",
            margin: "0px",
            py: "20px",
            color: "tertiary.light",
            backgroundColor: "secondary.dark",
            fontSize: "20px",
            fontFamily: "bold",
          }}
        >
          Apply for this position{" "}
        </Button>
        {/* </Link>{" "} */}
      </Stack>
    </Container>
  );
};

export default ApplicationButton;
