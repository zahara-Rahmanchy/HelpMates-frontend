"use client";
import EditPetData from "@/components/UI/Dashboard/Pets/EditPetData";
import {authKey} from "@/constants/authkey";
import {petTableHeads} from "@/constants/petTableHeads";
import {getFromCookiesClient} from "@/utils/local-storage";
import {DeleteSweep, EditNoteRounded} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
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
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {toast} from "sonner";

const ManagePetPage = () => {
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);
  const [adoptData, setAdoptData] = useState([]);

  const accessToken = getFromCookiesClient(authKey);
  const fetchPets = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/detailed-pets`,
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
    // console.log("pet data: ", data);
    setPets(data.data);
  };

  //   handle edit
  const handleEdit = async (adoptionRequests: any) => {
    setOpen(true);
    setAdoptData(adoptionRequests);
  };

  const handleDeletePet = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete the data?");
    console.log(
      "delete id: ",
      id,
      "conf: ",
      confirmed,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/pet/${id}`
    );
    if (confirmed) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/pet/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken ? accessToken : "",
          },
          cache: "no-store",
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Deleted Successfully");
        fetchPets();
      } else {
        toast.error(data.message);
      }
    }
  };
  useEffect(() => {
    fetchPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("pets: ", pets);
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table
          sx={{lg: {minWidth: 650}, xs: {maxWidth: "100%"}}}
          aria-label="simple table"
        >
          <TableHead
            sx={{
              bgcolor: "#f4e0fc",
            }}
          >
            <TableRow>
              {petTableHeads.map((head, key) => (
                <TableCell key={key}>
                  {" "}
                  <Typography
                    textAlign={"center"}
                    color="primary.main"
                    fontWeight={"bold"}
                    fontSize={"14px"}
                  >
                    {head}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((value: any, key: number) => (
              <TableRow key={key}>
                <TableCell
                  component="th"
                  scope="row"
                  // colSpan={2}
                  // sx={{bgcolor: "blue", textAlign: "center", mx: "auto"}}
                >
                  <Image
                    src={value?.image[0]}
                    alt="pet img"
                    width={200}
                    height={160}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.name as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.species as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.breed as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.age}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.size as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.specialNeeds}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.gender}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.location}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.description as string}
                </TableCell>

                <TableCell component="th" scope="row">
                  {value?.temperament as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.adoptedStatus as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.healthStatus as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.adoptionRequirements as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.createdAt as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.updatedAt as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography color="orange">
                    {" "}
                    {value?._count.adoptionRequest as string}
                  </Typography>
                  {/* <Link href={`${}`}></Link> */}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    sx={{background: "transparent"}}
                    onClick={() => handleEdit(value)}
                    //   component={Link}
                    //   href={`PetPortfolio/${value?.pet?.id}`}
                    size="small"
                  >
                    <EditNoteRounded style={{color: "green"}} />
                  </Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => handleDeletePet(value?.id)}
                    size="small"
                  >
                    <DeleteSweep />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditPetData
        petData={adoptData}
        setOpen={setOpen}
        open={open}
        // fetch={fetchPets}
      />
    </Container>
  );
};

export default ManagePetPage;
