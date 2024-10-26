import CommonHeader from "@/components/shared/CommonHeader";
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
import React from "react";
const tableHeads = [
  "Name",
  "Species",
  "Breed",
  "Request Status",
  "Adopted Status",
  "Requested Date",
  "Details",
];
const RequestsTable = ({requests, error}: any) => {
  console.log("req:", requests, "name: ", requests[0].name);
  return (
    <>
      <hr />
      <CommonHeader headerFirst={"My Adopti"} headerSecond="on Requests" />
      <Container
        sx={{
          marginTop: "20px",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead
              sx={{
                bgcolor: "#f4e0fc",
              }}
            >
              <TableRow>
                {tableHeads.map((head, key) => (
                  <TableCell key={key}>
                    {" "}
                    <Typography color="primary.main" fontWeight={"bold"}>
                      {head}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {requests !== undefined ? (
                requests.map((value: any, key: number) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {value?.pet?.name as string}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {value?.pet?.species as string}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {value?.pet?.breed as string}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {value?.status as string}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {value?.pet?.adoptedStatus as string}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(value?.createdAt as string).toLocaleString()}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      // sx={{marginLeft: "-10px"}}
                    >
                      <Link
                        href={`PetPortfolio/${value?.petId}`}
                        sx={{
                          bgcolor: "#865C97",
                          padding: "10px",
                          borderRadius: "50px",
                          color: "white",
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
    </>
  );
};

export default RequestsTable;
