import {authKey} from "@/constants/authkey";
import getEnvVariable from "@/utils/getEnvVariable";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {cookies} from "next/headers";
import Image from "next/image";
import Link from "next/link";

const tableHeads = ["", "Name", "Adoption Date", "Details"];

const AdoptedPetTable = async () => {
  const accessToken = cookies().get(authKey)?.value;

  const url = getEnvVariable("NEXT_PUBLIC_BACKEND_URL");

  const res = await fetch(`${url}/adopted-pets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? accessToken : "",
    },

    cache: "no-store",
  });
  const petsData = await res.json();
  // console.log("petsData: ", petsData);
  const adopteds = petsData.data;

  // console.log("adp:", adopteds);
  return (
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
          {adopteds !== undefined &&
            adopteds.map((value: any, key: number) => (
              <TableRow key={key}>
                <TableCell
                  component="th"
                  scope="row"
                  // sx={{bgcolor: "blue", textAlign: "center", mx: "auto"}}
                >
                  <Image
                    style={{borderRadius: "50%", textAlign: "center"}}
                    src={value?.pet?.image[0]}
                    alt="pet img"
                    width={100}
                    height={0}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.pet?.name as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  {value?.updatedAt as string}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    component={Link}
                    href={`PetPortfolio/${value?.pet?.id}`}
                    size="small"
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdoptedPetTable;
