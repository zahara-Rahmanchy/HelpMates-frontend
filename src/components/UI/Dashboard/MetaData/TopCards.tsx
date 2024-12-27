"use client";
import {
  Apps,
  Event,
  Group,
  Pending,
  People,
  Work,
  SupervisorAccountTwoTone,
  CorporateFare,
} from "@mui/icons-material";
import {Box, Card, CardContent, Stack, Typography} from "@mui/material";

import React from "react";

interface ICountData {
  totalAdmins?: number;
  activeUsers?: number;
  totalOpportunities?: number;
  PendingApplications?: number;
  totalApplications?: number;
  totalParticipated?: number;
}

// record and corresponding icons
const iconMapping: Record<string, JSX.Element> = {
  totalAdmins: (
    <SupervisorAccountTwoTone
      fontSize="large"
      sx={{bgcolor: "primary.light", borderRadius: "50%", padding: "3px"}}
    />
  ),
  activeUsers: (
    <People
      fontSize="large"
      sx={{bgcolor: "coral", borderRadius: "50%", padding: "3px"}}
    />
  ),
  totalOpportunities: (
    <CorporateFare
      fontSize="large"
      sx={{bgcolor: "secondary.main", borderRadius: "50%", padding: "3px"}}
    />
  ),
  PendingApplications: (
    <Pending
      fontSize="large"
      sx={{
        // bgcolor: "primary.main",
        // color: "white",
        outline: "2px solid",
        outlineColor: "coral",
        borderRadius: "50%",
        padding: "3px",
      }}
    />
  ),
  totalApplications: (
    <Apps
      fontSize="large"
      sx={{bgcolor: "secondary.main", borderRadius: "50%", padding: "3px"}}
    />
  ),
  totalParticipated: (
    <Event
      fontSize="large"
      sx={{bgcolor: "primary.light", borderRadius: "50%", padding: "3px"}}
    />
  ),
};
const TopCards = ({countData}: {countData: ICountData}) => {
  return (
    <>
      <Stack
        // bgcolor={"blue"}
        marginTop={{xs: "20px", lg: "10px"}}
        width={"100%"}
        marginX={"auto"}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        rowGap={2}
        flexDirection={{md: "row", xs: "column"}}
      >
        {Object.entries(countData).map(([key, value]) => (
          <Card
            key={key}
            sx={{
              borderRadius: "10px",
              width: "250px",
              marginX: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h6" component="div" fontSize={"18px"}>
                <Box component={"span"} marginRight={"8px"}>
                  {iconMapping[key] || <Apps fontSize="large" />}
                </Box>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, str => str.toUpperCase())}
              </Typography>
              <Typography variant="h4" component="div">
                {value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default TopCards;
