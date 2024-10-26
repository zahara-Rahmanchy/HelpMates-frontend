import {Box, Stack, Typography} from "@mui/material";
import React from "react";
interface IProp {
  headerFirst: string;
  headerSecond?: string;
}
const CommonHeader = (props: IProp) => {
  //   console.log("rest", rest);
  const {headerFirst, headerSecond} = props;
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      sx={{
        overflow: "hidden",
        // backgroundColor: "rgba(135, 35, 70, 0.05)",
        backgroundColor: "rgba(135 35 70)", // Gradient background
        clipPath: "ellipse(69% 100% at 50% 0%)",
        minHeight: "200px",
        paddingLeft: "50px",
        paddingY: "60px",
        // padding: {sm: "90px 1px 110px 1px", xs: "100px 1px 150px 1px"},
        textAlign: "left",

        color: "white",
      }}
    >
      <Typography
        marginLeft={10}
        textAlign="left"
        fontSize={"14px"}
        color="tertiary.light"
      >
        {headerSecond}
      </Typography>
      <Typography
        width={"100%"}
        marginX={10}
        textAlign="left"
        variant="h4"
        color="secondary.light"
        component="span"
        fontWeight={"bold"}
      >
        {headerFirst}
      </Typography>
      <Box
        component={"img"}
        src="/heart.svg"
        sx={{
          position: "relative",
          top: "10px",
          width: "20px",
          opacity: "0.5",
        }}
      ></Box>{" "}
      <Box
        component={"img"}
        src="/heart.svg"
        sx={{
          position: "relative",
          top: "10px",
          right: "-10px",
          // left: "100%",
          width: "20px",
          opacity: "0.5",
        }}
      ></Box>{" "}
      <Box
        component={"img"}
        src="/heart.svg"
        sx={{
          position: "relative",
          top: "10px",
          width: "20px",
          opacity: "0.2",
        }}
      ></Box>
    </Box>
  );
};

export default CommonHeader;
