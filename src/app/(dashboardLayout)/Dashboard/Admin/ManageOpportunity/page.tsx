"use client";
import CommonPopover from "@/components/UI/Dashboard/Pets/component/CommonPopover";
import EditOpportunityData from "@/components/UI/Dashboard/Pets/EditOpportunityData";
import {authKey} from "@/constants/authkey";
import {opportunityTableHeads} from "@/constants/TableHeads";

import {
  useDeleteOpportunityDataMutation,
  useGetOpportunityDataQuery,
} from "@/redux/api/opportunityApi";
import {convertDuration} from "@/utils/convertDuration";
import {getFromCookiesClient} from "@/utils/local-storage";
import {DeleteSweep, EditNoteRounded} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {toast} from "sonner";

const ManagePetPage = () => {
  const [open, setOpen] = useState(false);
  const [adoptData, setAdoptData] = useState([]);
  const {
    data: opportunityData,
    isLoading,
    error,
  } = useGetOpportunityDataQuery("");

  const [deleteOpportunityData] = useDeleteOpportunityDataMutation();
  if (error) {
    console.log(error);
    toast.error("Something went wrong!");
  }
  console.log("oppor: ", opportunityData);
  const accessToken = getFromCookiesClient(authKey);
  // const fetchPets = async () => {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailed-pets`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: accessToken ? accessToken : "",
  //       },
  //       cache: "no-store",
  //     }
  //   );
  //   const data = await res.json();
  //   // console.log("pet data: ", data);
  //   setPets(data.data);
  // };

  //   handle edit
  const handleEdit = async (adoptionRequests: any) => {
    setOpen(true);
    setAdoptData(adoptionRequests);
  };

  const handleDeleteOpportunity = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete the data?");
    console.log(
      "delete id: ",
      id,
      "conf: ",
      confirmed,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/pet/${id}`
    );
    if (confirmed) {
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/pet/${id}`,
      //   {
      //     method: "DELETE",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: accessToken ? accessToken : "",
      //     },
      //     cache: "no-store",
      //   }
      // );
      // const data = await res.json();
      try {
        const res = await deleteOpportunityData({
          id,
        }).unwrap();

        console.log("res: ", res);
        if (res?.id) {
          toast.success("Opportunity Data updated Successfully!");
        }
      } catch (error: any) {
        if (error?.data)
          toast.success("Opportunity Data updated Successfully!");
        else toast.error("Something went wrong!");
      }
    }
  };
  return (
    <Container>
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
              {opportunityTableHeads.map((head, key) => (
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
            {isLoading && (
              <CircularProgress
                sx={{textAlign: "center", width: "100%", margin: "auto 0"}}
              />
            )}
            {opportunityData &&
              opportunityData.map((value: any, key: number) => (
                <TableRow key={key}>
                  <TableCell
                    component="th"
                    scope="row"
                    // colSpan={3}
                  >
                    <CommonPopover
                      imageSrc={value?.image[0]} // Provide this to display an avatar and a larger image in the popover
                      flexDirection="column" // Optional, can be "row" or "column"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      textAlign={"center"}
                      fontSize={"14px"}
                      color={"primary.main"}
                      sx={{textWrap: "nowrap"}}
                    >
                      {value?.title as string}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      fontSize={"14px"}
                      color={"primary.main"}
                      sx={{textWrap: "nowrap"}}
                    >
                      {value?.organization as string}{" "}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value?.skillsRequired.length > 3 ? (
                      <CommonPopover
                        label={
                          value?.skillsRequired
                            .slice(0, 3)
                            .join(",\n ") as string
                        }
                        description={
                          value?.skillsRequired.join(",\n ") as string
                        }
                        flexDirection="column"
                      />
                    ) : (
                      (value?.skillsRequired.join(", ") as string)
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value?.location}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <CommonPopover
                      label={value?.description.slice(0, 60) as string}
                      description={value?.description as string}
                      flexDirection="column"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Box
                      component={"span"}
                      color={value?.status === "OPEN" ? "blue" : "red"}
                    >
                      {value?.status}
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {" "}
                    <Typography
                      fontSize={"14px"}
                      color={"primary.main"}
                      sx={{textWrap: "nowrap"}}
                    >
                      {convertDuration(value?.duration) as string}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography fontSize={"13px"} sx={{textWrap: "nowrap"}}>
                      {dayjs(value?.startDate).format("hh:mm A")}
                      <br />
                      {dayjs(value?.startDate).format("MMM D, YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography fontSize={"13px"} sx={{textWrap: "nowrap"}}>
                      {dayjs(value?.endDate).format("hh:mm A")}
                      <br />
                      {dayjs(value?.endDate).format("MMM D, YYYY")}
                    </Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <CommonPopover
                      label={value?.benefit.slice(0, 30) as string}
                      description={value?.benefit as string}
                      flexDirection="column"
                    />
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography fontSize={"13px"} sx={{textWrap: "nowrap"}}>
                      {dayjs(value?.createdAt).format("hh:mm A")}
                      <br />
                      {dayjs(value?.createdAt).format("MMM D, YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography fontSize={"13px"} sx={{textWrap: "nowrap"}}>
                      {dayjs(value?.updatedAt).format("hh:mm A")}
                      <br />
                      {dayjs(value?.updatedAt).format("MMM D, YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography color="blue" textAlign={"center"}>
                      {" "}
                      {value?._count.volunteerApplications as string}
                    </Typography>
                    {/* <Link href={`${}`}></Link> */}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      sx={{
                        color: "blue",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        ":hover": {
                          backgroundColor: "secondary.dark",
                          color: "white",
                        },
                      }}
                      onClick={() => handleEdit(value)}
                      //   component={Link}
                      //   href={`PetPortfolio/${value?.pet?.id}`}
                      size="small"
                    >
                      <EditNoteRounded />
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      onClick={() => handleDeleteOpportunity(value?.id)}
                      size="small"
                      sx={{
                        color: "red",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        ":hover": {
                          backgroundColor: "secondary.main",
                          color: "white",
                        },
                      }}
                    >
                      <DeleteSweep />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditOpportunityData
        opportunityData={adoptData}
        setOpen={setOpen}
        open={open}
      />
    </Container>
  );
};

export default ManagePetPage;
