"use client";
import {BarChartComponent} from "@/components/UI/Dashboard/MetaData/BarChartComponent";
import PieChartComponent from "@/components/UI/Dashboard/MetaData/PieChartComponent";
import TopCards from "@/components/UI/Dashboard/MetaData/TopCards";
import UserGrowthLine from "@/components/UI/Dashboard/MetaData/SignupsDashboard";
import {useGetDashboardDataQuery} from "@/redux/api/DashboardMetaApi";
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

const UserDashboard = () => {
  const {data: dashboardData, isLoading} = useGetDashboardDataQuery("");
  // console.log("dashboard: ", dashboardData);
  // const {role} = getUserInfo() as any;

  // const countData = dashboardData?.counts;
  return (
    <Box margin={"0 auto"} width="100%">
      {/* <Typography
        height={"100%"}
        textAlign={"center"}
        variant="h6"
        fontSize={"20px"}
        mt={2}
      >
        Welcome to Admin Dashbaord
      </Typography> */}
      {isLoading && (
        <Backdrop
          sx={{color: "#fff", zIndex: theme => theme.zIndex.drawer + 1}}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {!isLoading && (
        <>
          {dashboardData?.counts !== undefined && (
            <TopCards countData={dashboardData?.counts} />
          )}
          <Grid container spacing={2} my={8}>
            {/* <Grid item xs={12} lg={6} sx={{gridRow: "span 2"}}>
              {dashboardData?.opportunityPieDataWithPercentages !==
                undefined && (
                <PieChartComponent
                  piechartData={dashboardData.opportunityPieDataWithPercentages}
                />
              )}
            </Grid> */}
            <Grid item xs={12} lg={8}>
              {dashboardData?.applicationStatusBarChart !== undefined && (
                <BarChartComponent
                  barchartData={dashboardData?.applicationStatusBarChart}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {/* {role === "Admin" && <SignupsDashboard />} */}
              {/* {dashboardData?.applicationStatusBarChart !== undefined && (
                <UserGrowthLine data={dashboardData?.userGrowthData} />
              )} */}
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default UserDashboard;
