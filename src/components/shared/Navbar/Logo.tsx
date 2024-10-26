import {Box, Typography} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" passHref>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src="/helpLogo.png"
          alt="logo"
          width={100}
          height={100}
          style={{
            transform: "rotate(-90deg)",
            width: "50px",
          }}
        />
        <Typography variant="h5" fontSize={"16px"}>
          {/* <Box color="primary." component="span">
        HelpMates
      </Box> */}

          <Box color="secondary.light" component="span">
            HelpM
          </Box>

          <Box color="white" component="span">
            ates
          </Box>
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
