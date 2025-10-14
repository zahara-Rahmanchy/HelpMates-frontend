"use client"
import { useGetApplicationsDataForPayoutsQuery } from "@/redux/api/payoutsApi";
import {
  AppBar,
  Backdrop,
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

const PayoutsTableHeads = ["Name","Email", "Paypal Email","Amount","Details","Application Status","Payment Status","Payment Date"]

const PaymentHistory = () => {
     const {data: userDataForPayouts, isLoading} = useGetApplicationsDataForPayoutsQuery("");
      console.log("userDataForPayouts: ", userDataForPayouts);
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
        <Typography component={"h5"} marginY={3} fontSize={"20px"}>
            Payment History
        </Typography>
        <TableContainer component={Paper} sx={{overflow: "scroll"}}>
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
              {PayoutsTableHeads?.map((head, key) => (
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
          
            {userDataForPayouts !== undefined &&
              !isLoading &&
              userDataForPayouts.map((value: any, key: number) => (
                <TableRow key={key}>
                  
                  <TableCell component="th" scope="row">
                    <Typography
                      textAlign={"center"}
                      fontSize={"14px"}
                      color={"primary.main"}
                      sx={{textWrap: "nowrap"}}
                    >
                      {value?.volunteerApplication?.user?.name as string}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      fontSize={"14px"}
                      color={"primary.main"}
                      sx={{textWrap: "nowrap"}}
                    >
                      {value?.volunteerApplication?.user?.email  as string}{" "}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                   
                      {value?.user?.paypalEmail  as string}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {value?.amount}
                  </TableCell>
             <TableCell component="th" scope="row">
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    {/* Organization Badge */}
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        // py: 0.5,
                        borderRadius: "12px",
                        bgcolor: "primary.main",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      {value?.volunteerApplication?.opportunity?.organization}
                    </Box>

                  {/* Title Badge */}
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "12px",
                        bgcolor: "secondary.light",
                        color: "white",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                      }}
                    >
                      {value?.volunteerApplication?.opportunity?.title}
                    </Box>
                  </Box>
                </TableCell>

                  <TableCell component="th" scope="row">
                    <Box
                      component={"span"}
                      // color={value?.status === "OPEN" ? "blue" : "red"}
                    >
                      {value?.volunteerApplication?.status}
                    </Box>
                  </TableCell>
                 <TableCell component="th" scope="row">
                      <Box
                        component="span"
                        sx={{
                          color:
                            value?.status === "PENDING"
                              ? "orange"
                              : value?.status === "FAILED"
                              ? "red"
                              : value?.status === "SUCCESS"
                              ? "green"
                              : "inherit",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {value?.status === "PENDING"
                          ? "Processing"
                          : value?.status === "FAILED"
                          ? "Failed"
                          : value?.status === "SUCCESS"
                          ? "Paid"
                          : value?.status}
                      </Box>
                    </TableCell>

                 
                 

                  <TableCell component="th" scope="row">
                    <Typography fontSize={"13px"} sx={{textWrap: "nowrap"}}>
                      {dayjs(value?.createdAt).format("hh:mm A")}
                      <br />
                      {dayjs(value?.createdAt).format("MMM D, YYYY")}
                    </Typography>
                  </TableCell>
                
                  {/* <TableCell component="th" scope="row">
                    <Typography color="blue" textAlign={"center"}>
                      {" "}
                      {/* {value?._count.volunteerApplications as string} 
                      <Button
                      sx={{
                        color: "blue",
                        width: "20px",
                        textDecoration:"underline",
                        backgroundColor: "transparent",
                        fontSize:"12px",
                        boxShadow: "none",
                        ":hover": {
                          backgroundColor: "transparent",
                          color: "secondary.dark",
                          boxShadow: "none",
                        },
                      }}
                    //   onClick={event => handleApplicationsRequests(event, value.volunteerApplications)}
                      //   component={Link}
                      //   href={`PetPortfolio/${value?.pet?.id}`}
                      size="small"
                    >
                      Send Payout
                    </Button>
                    </Typography>
                
                  </TableCell> */}
                  
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  )
}

export default PaymentHistory
