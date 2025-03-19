"use client";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import SignupsDashboard from "@/components/UI/Dashboard/MetaData/SignupsDashboard";
import {getUserInfo} from "@/services/auth.services";

const DashboardComp = () => {
  return (
    <Box margin={"0 auto"} width="100%">
      <Typography
        height={"100%"}
        textAlign={"center"}
        variant="h6"
        fontSize={"20px"}
        mt={2}
      >
        Welcome to Dashbaord
      </Typography>
    </Box>
  );
};

export default DashboardComp;
