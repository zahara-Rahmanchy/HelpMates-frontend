"use client";
import EditPetData from "@/components/UI/Dashboard/Pets/EditOpportunityData";
import {authKey} from "@/constants/authkey";

import {usersTableHeads} from "@/constants/usersTableHeads";
import EditUserProfile from "@/services/actions/EditUserProfile";
import {getFromCookiesClient} from "@/utils/local-storage";
import {DeleteSweep, EditNoteRounded} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
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
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {toast} from "sonner";

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const accessToken = getFromCookiesClient(authKey);
  const fetchUsers = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/all-users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? accessToken : "",
        },
        cache: "no-store",
      }
    );
    const data = await res.json();
    // console.log("user data: ", data);
    setUsers(data.data);
  };

  const handleDataEdit = async (
    key: string,
    value: string | boolean,
    id: string,
    message: string
  ) => {
    const confirmed = confirm(`Are you sure you want to ${message}?`);

    const data = {
      [key]: value,
    };
    // console.log("data: ", data);
    if (confirmed) {
      try {
        setLoading(true);
        const res = await EditUserProfile(data, accessToken as string, id);
        console.log(res);
        if (res?.success) {
          // console.log("res.success: ", res.success);
          fetchUsers();
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("users: ");
  return (
    <Box>
      <Typography
        margin={3}
        component={"h5"}
        fontSize={"20px"}
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: "5px",
          padding: "10px",
          width: "200px",
        }}
        color={"secondary.dark"}
      >
        Total Users: {users?.length}
      </Typography>
      <Backdrop
        sx={{color: "#fff", zIndex: theme => theme.zIndex.drawer + 1}}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table
          sx={{minWidth: 650, borderRadius: "30px"}}
          aria-label="simple table"
        >
          <TableHead
            sx={{
              bgcolor: "tertiary.light",
            }}
          >
            <TableRow>
              {usersTableHeads.map((head, key) => (
                <TableCell key={key}>
                  {" "}
                  <Typography
                    textAlign={"center"}
                    fontWeight={"bold"}
                    color="secondary.dark"
                    fontSize={"12px"}
                  >
                    {head}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((value: any, key: number) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  <Typography textAlign={"center"} fontSize={"14px"}>
                    {value?.name as string}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography textAlign={"center"} fontSize={"12px"}>
                    {value?.email as string}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography textAlign={"center"} fontSize={"12px"}>
                    {value?.contactNumber as string}
                  </Typography>
                </TableCell>

                <TableCell component="th" scope="row">
                  <Typography
                    textAlign={"center"}
                    fontSize={"12px"}
                    color={value?.role === "Admin" ? "blue" : "body1"}
                  >
                    {value?.role as string}
                  </Typography>
                </TableCell>

                <TableCell component="th" scope="row">
                  <Typography textAlign={"center"} fontSize={"12px"}>
                    {new Date(value?.createdAt as string).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography textAlign={"center"} fontSize={"12px"}>
                    {new Date(value?.updatedAt as string).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography
                    textAlign={"center"}
                    fontSize={"12px"}
                    color={value?.active ? "blue" : "red"}
                  >
                    {value?.active === true ? "Active" : "Inactive"}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.role === "User" ? (
                    <Button
                      variant="outlined"
                      sx={{borderColor: "secondary.dark"}}
                      onClick={() =>
                        handleDataEdit(
                          "role",
                          "Admin",
                          value.id,
                          `make ${value?.name} an admin`
                        )
                      }
                      //   component={Link}
                      //   href={`PetPortfolio/${value?.pet?.id}`}
                      size="small"
                    >
                      {" "}
                      <Typography
                        fontSize={"12px"}
                        color="secondary.dark"
                        fontWeight={"bold"}
                      >
                        Make Admin
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      sx={{backgroundColor: "secondary.main"}}
                      onClick={() =>
                        handleDataEdit(
                          "role",
                          "User",
                          value?.id,
                          `change ${value?.name} back to user`
                        )
                      }
                      //   component={Link}
                      //   href={`PetPortfolio/${value?.pet?.id}`}

                      size="small"
                    >
                      <Typography
                        fontSize={"12px"}
                        color="white"
                        fontWeight={"bold"}
                      >
                        Make User
                      </Typography>
                    </Button>
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.active ? (
                    <Button
                      sx={{backgroundColor: "crimson"}}
                      onClick={() =>
                        handleDataEdit(
                          "active",
                          false,
                          value.id,
                          `deactivate ${value?.name}'s account`
                        )
                      }
                      size="small"
                    >
                      <Typography
                        fontSize={"12px"}
                        color="white"
                        fontWeight={"bold"}
                      >
                        Deactivate
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      sx={{background: "seagreen"}}
                      onClick={() =>
                        handleDataEdit(
                          "active",
                          true,
                          value.id,
                          `re-activate  ${value?.name}'s account`
                        )
                      }
                      size="small"
                    >
                      <Typography
                        fontSize={"12px"}
                        color="white"
                        fontWeight={"bold"}
                      >
                        Activate
                      </Typography>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersPage;
