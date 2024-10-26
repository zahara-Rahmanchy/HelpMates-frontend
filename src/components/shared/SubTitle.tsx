import {Typography} from "@mui/material";
import React from "react";

const SubTitle = ({sub}: {sub: string}) => {
  return (
    <Typography
      variant="body1"
      width={"50%"}
      marginX={"auto"}
      color={"secondary.dark"}
      fontSize={"14px"}
      fontStyle={"italic"}
      textAlign={"center"}
      marginBottom="100px"
    >
      {sub}
    </Typography>
  );
};

export default SubTitle;
