import getEnvVariable from "@/utils/getEnvVariable";
import {BorderColor} from "@mui/icons-material";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {blue} from "@mui/material/colors";
import Image from "next/image";
import React from "react";
// import assets from "@assets";
const HeroSection = () => {
  function gradient(at: any, arg1: number) {
    throw new Error("Function not implemented.");
  }

  return (
    <Box sx={{backgroundColor: "#872346"}}>
      <svg
        className="absolute w-[100px] top-[2%]"
        width="239"
        height="253"
        viewBox="0 0 239 253"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-5.10515e-06 136.208C0.688424 167.418 13.5809 197.117 35.9165 218.947C58.2521 240.776 88.255 253 119.5 253C150.745 253 180.748 240.776 203.083 218.947C225.419 197.117 238.312 167.418 239 136.208L239 -2.53482e-05L6.97331e-06 -1.49012e-05L-5.10515e-06 136.208ZM195.606 136.208C195.611 134.443 196.315 132.753 197.564 131.505C198.812 130.257 200.505 129.554 202.271 129.549C204.025 129.556 205.705 130.251 206.951 131.485C207.576 132.103 208.074 132.838 208.414 133.649C208.755 134.459 208.932 135.329 208.936 136.208C208.915 159.901 199.486 182.617 182.718 199.37C165.95 216.123 143.214 225.544 119.5 225.565C117.734 225.56 116.042 224.856 114.793 223.609C113.544 222.361 112.84 220.67 112.835 218.906C112.84 217.141 113.544 215.45 114.793 214.203C116.042 212.955 117.734 212.252 119.5 212.246C139.671 212.201 159.002 204.175 173.265 189.925C187.528 175.675 195.56 156.361 195.606 136.208Z"
          fill="white"
          fill-opacity="0.05"
        />
      </svg>
      <Container
        sx={{
          marginBottom: "200px",
          minHeight: "500px",
          paddingY: {md: "100px"},
          // paddingBottom:{md:}
        }}
      >
        <Stack
          direction={{
            xs: "column-reverse",
            // sm: "column-reverse",
            md: "row-reverse",
            lg: "row",
          }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            bgcolor={blue}
            width={{md: "90%", xs: "100%"}}
            // height="500px"
            // position={{md: "relative", xs: "static"}}
            // top="35%"

            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              paddingTop: {xs: "50px"},
              paddingBottom: {xs: "100px"},
              // background: "blue",
            }}
          >
            <Box
              sx={{
                // display: {xs: "none", md: "none", lg: "block"},
                border: "8px solid", // Adds a solid border
                borderColor: "secondary.light",
                outline: "1px  dotted",
                outlineColor: "white",
                outlineOffset: "3px",
                background: "#872346",
                position: "relative",
                right: {md: "7%", xs: "-9%"},
                // bottom: {md: "none", xs: "20px"},
                zIndex: {md: 3, xs: 0},
              }}
            >
              <Image
                src="/volunteer3.png"
                alt="img"
                width={600}
                height={300}
                // sx={{width: "200px"}}
                style={{width: "120rem"}}
              />
            </Box>
            <Box
              sx={{
                display: {xs: "none", md: "block"},
                border: "8px solid", // Adds a solid border
                borderColor: "secondary.main",
                outline: "1px  dotted",
                outlineColor: "white",
                outlineOffset: "3px",
                position: "relative",
                background: "#872346",
                right: {md: "16%", xs: "0"},
                // top: "30%",
                bottom: {md: "-130px", xs: "0"},
                zIndex: 2,
              }}
            >
              <Image
                src="/volunteer2.png"
                alt="img"
                width={600}
                height={280}
                style={{width: "120rem"}}
              />
            </Box>
            <Box
              sx={{
                display: {xs: "block"},
                position: "relative",

                right: {md: "29%", xs: "0%"},
                bottom: {md: "90px", xs: "25px"},
                border: "8px solid", // Adds a solid border
                borderColor: "primary.light",
                background: "#872346",
                outline: "1px  dotted",
                outlineColor: "white",
                outlineOffset: "3px",
                zIndex: {md: 2, xs: 1},
              }}
            >
              <Image
                src="/volunteer4.png"
                alt="img"
                width={600}
                height={600}
                style={{width: "120rem"}}
              />
            </Box>
            <Box
              sx={{
                display: "block",
                position: "relative",
                right: {md: "43%", xs: "9%"},
                bottom: {md: "-40px", xs: "0px"},
                // bottom: "-2px",
                background: "#872346",
                border: "8px solid", // Adds a solid border
                borderColor: "white",
                outline: "1px  dotted",
                outlineColor: "primary.light",
                outlineOffset: "3px",
                zIndex: {md: 1, xs: 2},
              }}
            >
              <Image
                src="/volunteer!.png"
                alt="img"
                width={600}
                height={600}
                style={{width: "120rem"}}
              />
            </Box>

            <Box
              sx={{
                display: {xs: "none", md: "block"},
                border: "8px solid", // Adds a solid border
                borderColor: "secondary.light",
                outline: "1px  dotted",
                outlineColor: "white",
                outlineOffset: "3px",
                background: "#872346",
                position: "relative",
                right: {md: "52%", xs: "0"},
                bottom: {md: "50px", xs: "0"},
                zIndex: 0,
              }}
            >
              <Image
                src="/volunteer5.png"
                alt="img"
                width={280}
                height={280}
                style={{width: "120rem"}}
              />
            </Box>
          </Box>
          <Box
            py={2}
            position={{md: "absolute", xs: "static"}}
            left="55%"
            top={{lg: "20%"}}
          >
            <Typography
              // fontSize={"60px"}
              fontSize={{md: "40px", xs: "30px"}}
              fontWeight={"bold"}
              variant="h3"
              color="white"
              component="h3"
            >
              Empower Communities,
              <br />
              <Box
                color="secondary.light"
                // fontSize={"40px"}
                fontSize={{md: "65px", xs: "48px"}}
                fontStyle={"italic"}
                component="span"
              >
                Volunteer with <br />
                Purpose
              </Box>
            </Typography>
            <Typography
              variant="body1"
              color={"white"}
              fontStyle={{md: "italic", xs: "normal"}}
              sx={{
                width: {lg: "70%", xs: "100%"},
                marginY: "10px",
                // margin: "10px",
              }}
            >
              Join hands with us to create a lasting impact in communities and
              transform lives through meaningful volunteer opportunities.
            </Typography>

            <Button
              color="primary"
              sx={{
                backgroundColor: "secondary.main",

                color: "white",
                borderColor: "secondary.main",

                boxShadow: "10px",
              }}
            >
              Explore
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
