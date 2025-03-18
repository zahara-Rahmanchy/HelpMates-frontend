"use client";

import {
  useGetParticipatedDataQuery,
  useGetVolunteerApplicationDataForUserQuery,
} from "@/redux/api/volunteerApplicationApi";
import {convertDuration} from "@/utils/convertDuration";
import {DeleteSweep} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

const tableHeads = [
  "Title",
  "Organization",
  "Application Status",
  "Status",
  "Experiences",
  "Duration",
  "Start",
  "End",
  "Details",
];

const ParticipationPage = () => {
  const {data, isLoading} = useGetParticipatedDataQuery("");
  console.log("Participation data:", data);
  return (
    <Container>
      {isLoading && (
        <Backdrop
          sx={{color: "#fff", zIndex: theme => theme.zIndex.drawer + 1}}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Typography
        component={"h5"}
        fontSize={"20px"}
        margin={3}
        color="secondary.dark"
      >
        Volunteering Services Completed : {data?.length}
      </Typography>
      <TableContainer component={Paper} sx={{overflowX: "scroll"}}>
        <Table
          sx={{
            backgroundColor: "white",
            lg: {minWidth: 650},
            xs: {width: "100%"},
            borderRadius: "50px",
            overflowX: "scroll",
          }}
          aria-label="simple table"
        >
          <TableHead
            sx={{
              bgcolor: "tertiary.light",
              borderRadius: "100px",
              overflowX: "scroll",
            }}
          >
            <TableRow>
              {tableHeads.map((head, key) => (
                <TableCell key={key}>
                  {" "}
                  <Typography
                    textAlign={"center"}
                    color="secondary.dark"
                    fontWeight={"bold"}
                    fontSize={"12px"}
                  >
                    {head}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data !== undefined ? (
              data?.map((value: any, key: number) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    {value?.opportunity?.title as string}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value?.opportunity?.organization as string}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {value?.status as string}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value?.opportunity?.status as string}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value?.volunteerExperience as string}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {convertDuration(value?.opportunity?.duration)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography fontSize={"13px"} sx={{textWrap: "nowrap"}}>
                      {dayjs(value?.opportunity?.startDate).format("hh:mm A")}
                      <br />
                      {dayjs(value?.opportunity?.startDate).format(
                        "MMM D, YYYY"
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography fontSize={"13px"} sx={{textWrap: "nowrap"}}>
                      {dayjs(value?.opportunity?.endDate).format("hh:mm A")}
                      <br />
                      {dayjs(value?.opportunity?.endDate).format("MMM D, YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    // sx={{marginLeft: "-10px"}}
                  >
                    <Link
                      href={`Opportunity/${value?.opportunityId}`}
                      style={{
                        // backgroundColor: "secondary.light",
                        padding: "10px",
                        borderRadius: "50px",
                        color: "crimson",
                        textDecoration: "underline",
                      }}
                    >
                      Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell>No Requests Yet!</TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ParticipationPage;
