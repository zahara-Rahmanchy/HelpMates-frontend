import {authKey} from "@/constants/authkey";
import {useUpdateVolunteerApplicationDataMutation} from "@/redux/api/volunteerApplicationApi";
import {getFromCookiesClient} from "@/utils/local-storage";
import {
  Button,
  Container,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {useRouter} from "next/navigation";

import React from "react";
import {toast} from "sonner";

const tableHeads = [
  "User Name",
  "Email",
  "Contact",
  "Status",
  "Accept",
  "Reject",
];
const ApplicationRequests = ({volunteerRequests, setOpen}: any) => {
  const router = useRouter();
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
    console.log(
      "delete id: ",

      "conf: ",
      confirmed,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/adoption-requests/${id}`
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
            `Adoption Request ${
              params === "APPROVED" ? "accepted successfully!" : "rejected!"
            }`
          );
          router.refresh();
          setOpen(false);
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
      {volunteerRequests !== undefined || volunteerRequests !== "" ? (
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
        <Typography>No Requests</Typography>
      )}
    </Container>
  );
};

export default ApplicationRequests;
