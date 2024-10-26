import {authKey} from "@/constants/authkey";
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
  "Adoption Status",
  "Accept",
  "Reject",
];
const AdoptionRequests = ({adoptionRequests, setOpen}: any) => {
  // console.log("adoptionR", adoptionRequests);
  const router = useRouter();
  const accessToken = getFromCookiesClient(authKey);
  //   const {adoptionRequest} = adoptionRequests;
  //   console.log("d", adoptionRequest);
  const handleStatus = async (params: string, id: string, petId: string) => {
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
    const updata = {
      petId: petId,
      status: params,
    };
    // console.log("upd: ", updata);
    if (confirmed) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/adoption-requests/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken ? accessToken : "",
          },
          body: JSON.stringify(updata),
          cache: "no-store",
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(
          `Adoption Request ${
            params === "APPROVED" ? "accepted successfully!" : "rejected!"
          }`
        );
        router.refresh();
        setOpen(false);
        router.refresh();
        window.location.reload();
        // fetchPets();
      } else {
        toast.error(data.message);
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
        Adoption Requests
      </Typography>
      {adoptionRequests !== undefined ? (
        <TableContainer component={Paper}>
          <Table
            sx={{lg: {minWidth: 650}, xs: {minWidth: "100%"}}}
            aria-label="simple table"
          >
            <TableHead
              sx={{
                bgcolor: "#f4e0fc",
              }}
            >
              <TableRow>
                {tableHeads.map((head, key) => (
                  <TableCell key={key}>
                    {" "}
                    <Typography
                      textAlign={"center"}
                      color="primary.main"
                      fontWeight={"bold"}
                    >
                      {head}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {adoptionRequests.map((value: any, key: number) => (
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
                          handleStatus("APPROVED", value.id, value.petId)
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
                          handleStatus("REJECTED", value.id, value.petId)
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

export default AdoptionRequests;
