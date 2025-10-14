"use client"
import {authKey} from "@/constants/authkey";
import {useUpdateVolunteerApplicationDataMutation} from "@/redux/api/volunteerApplicationApi";
import {getFromCookiesClient} from "@/utils/local-storage";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import {
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Link,
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
import {useRouter} from "next/navigation";

import React, { FC, useState } from "react";
import {toast} from "sonner";
import { Transition } from "./EditOpportunityData";

const tableHeads = [
  "User Name",
  "Email",
  "Contact",
  "Status",
  "Accept",
  "Reject",
];
interface IApplicationsProps {
  volunteerRequests?: any;
  applicationOpen: boolean;
  setApplicationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ApplicationRequests: FC<IApplicationsProps> = ({volunteerRequests,applicationOpen, setApplicationOpen}) => {
  console.log("open: ",applicationOpen)
  const router  = useRouter();

    
  const [updateVolunteerRequest] = useUpdateVolunteerApplicationDataMutation();
  const handleStatus = async (
    params: string,
    id: string,
    opportunityId: string
  ) => {
    const confirmed = confirm(
      `Are you sure you want to ${
        params === "APPROVED" ? "approve" : "reject"
      } the request?`
    );
  
    const update = {
      opportunityId: opportunityId,
      status: params,
    };
    // console.log("upd: ", updata);
    try {
      if (confirmed) {
        const res = await updateVolunteerRequest({id, body: update}).unwrap();

        if (res?.id) {
          toast.success(
            `Application Request ${
              params === "APPROVED" ? "accepted successfully!" : "rejected!"
            }`
          );
          router.refresh();
          setApplicationOpen(false);
          // router.refresh();
          // window.location.reload();
          // fetchPets();
        }
      }
    } catch (err: any) {
      if (err?.data) {
        toast.error(`${err.data}`);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
      <Dialog
            fullScreen
            open={applicationOpen}
            onClose={() => setApplicationOpen(false)}
            TransitionComponent={Transition}
          >
            <AppBar sx={{position: "relative"}}>
              <Toolbar>
               
                <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                  Volunteer Applications 
                </Typography>
                <Button
                  autoFocus
                  sx={{bgcolor: "secondary.main"}}
                  onClick={() => setApplicationOpen(false)}
                >
                  close
                </Button>
              </Toolbar>
            </AppBar>
                  
            <Container sx={{marginBottom: "100px"}}>
              <Typography
                variant="h5"
                color="primary.main"
                fontWeight={"bold"}
                my={4}
                // marginTop={"10px"}
              >
                Application Requests
              </Typography>
              {volunteerRequests !== undefined || volunteerRequests !== ""  || volunteerRequests.length>0 ? (
                <TableContainer component={Paper}>
                  <Table
                    sx={{lg: {minWidth: 650}, xs: {minWidth: "100%"}}}
                    aria-label="simple table"
                  >
                    <TableHead
                      sx={{
                        bgcolor: "primary.main",
              }}
            >
              <TableRow>
                {tableHeads?.map((head, key) => (
                  <TableCell key={key}>
                    {" "}
                    <Typography
                      textAlign={"center"}
                      color="white"
                      fontWeight={"bold"}
                    >
                      {head}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {volunteerRequests?.map((value: any, key: number) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    {value?.user?.name as string}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value?.user?.email as string}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value?.user?.contactNumber as string}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value?.status as string}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography textAlign={"center"}>
                      <Button
                        onClick={() =>
                          handleStatus(
                            "APPROVED",
                            value.id,
                            value.opportunityId
                          )
                        }
                        // size="small"
                        disabled={value.status === "APPROVED"}
                        sx={{background: "seaGreen"}}
                      >
                        Accept
                      </Button>
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography textAlign={"center"}>
                      <Button
                        // disabled={value.status === "APPROVED"}
                        onClick={() =>
                          handleStatus(
                            "REJECTED",
                            value.id,
                            value.opportunityId
                          )
                        }
                        size="small"
                        sx={{background: "crimson"}}
                      >
                        Reject
                      </Button>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography className="bg-red-400 text-5xl">No Requests</Typography>
      )}
    </Container>
     </Dialog>
  );
};

export default ApplicationRequests;
