import Logo from "@/components/shared/Navbar/Logo";
import {Box} from "@mui/material";
import React from "react";

const AuthDesign = () => {
  return (
    <Box
      bgcolor="secondary.dark"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"white"}
      height={{lg: "100%", md: "300px"}}
      width={{lg: "40%", xs: "100%"}}
      sx={{
        // height: "900px",
        backgroundImage: 'url("/login1.png")', // path to your image
        // Ensures the image covers the entire box
        // backgroundSize: "cover",
        backgroundSize: {xs: "100%", md: "80%", lg: "110%"},
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box position={"absolute"} top="5px" left="10px">
        <Logo />
      </Box>
      <Box
        position={"absolute"}
        display={{xs: "none", md: "block"}}
        left="34%"
        bottom={{lg: "0px", md: "auto"}}
        component={"img"}
        src="/plus.svg"
        sx={{
          // position: "relative",
          // top: "-10px",
          // width: "20px",
          width: "110px",
          opacity: {md: "1", xs: 0},
        }}
      ></Box>

      <Box
        component={"img"}
        src="/heart.svg"
        sx={{
          position: "relative",
          top: "-10px",
          width: "20px",
          opacity: "0.8",
        }}
      ></Box>
      <Box
        component={"img"}
        src="/heart.svg"
        sx={{
          position: "relative",
          top: "10px",
          width: "20px",
          opacity: "0.8",
        }}
      ></Box>
      <Box
        component={"img"}
        src="/heart.svg"
        sx={{
          position: "relative",
          top: "120px",
          // bottom: "-110px",
          left: "-24%",
          width: "40px",
          opacity: "0.9",
        }}
      ></Box>

      {/* <Image
      src="/login1.png"
      alt="img"
      width={600}
      height={300}
      style={{
        // width: "100%",
        transform: "rotate(30deg)",
        position: "absolute",
      }}
    /> */}
    </Box>
  );
};

export default AuthDesign;
