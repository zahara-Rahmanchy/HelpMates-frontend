import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PetsIcon from "@mui/icons-material/Pets";
import React, {useEffect, useState} from "react";
import Logo from "../Navbar/Logo";
import Link from "next/link";
import {PeopleAltTwoTone} from "@mui/icons-material";
import {getUserInfo} from "@/services/auth.services";

export const SideBar = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const {role} = getUserInfo() as any;
    setRole(role);
  }, []);
  const drawer = (
    <div>
      <Toolbar />
      <Divider sx={{borderColor: "primary.light"}} />
      <List
        sx={{
          "& .MuiTypography-root": {
            color: "tertiary.light",
          },
          "& .MuiSvgIcon-root": {
            color: "secondary.light",
          },
        }}
      >
        <ListItem disablePadding>
          <Link href="/" style={{textDecoration: "none"}}>
            <ListItemButton
              sx={{
                color: "#fcbab8",
                "& .MuiButtonBase-root-MuiListItemButton-root": {
                  color: "primary.light",
                },
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                sx={{
                  color: "#fcbab8",
                  "& .MuiButtonBase-root-MuiListItemButton-root": {
                    color: "primary.light",
                  },
                }} // Ensure this is correct
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding sx={{color: "primary.light"}}>
          <Link
            href={role === "Admin" ? "/Dashboard/Admin" : "/Dashboard/User"}
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltTwoTone />
              </ListItemIcon>
              <ListItemText
                primary={"Dashboard"}
                sx={{color: "primary.light"}}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        {role === "Admin" && (
          <ListItem disablePadding sx={{color: "primary.light"}}>
            <Link href={"/Dashboard/Admin/Users"}>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltTwoTone />
                </ListItemIcon>
                <ListItemText
                  primary={"Manage Users"}
                  sx={{color: "primary.light"}}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        )}
      </List>
      <Divider sx={{borderColor: "primary.light"}} />
      <List
        sx={{
          "& .MuiTypography-root": {
            color: "tertiary.light",
          },
          "& .MuiSvgIcon-root": {
            color: "secondary.light",
          },
        }}
      >
        <ListItem disablePadding>
          <Link
            href={
              role === "Admin"
                ? "/Dashboard/Admin/AddOpportunity"
                : role === "User"
                ? "/Dashboard/User/MyApplications"
                : "/"
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <PetsIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  role === "Admin"
                    ? "Add Opportunity"
                    : role === "User" && "My Applications"
                }
              />
            </ListItemButton>
          </Link>
        </ListItem>

        {/* {role === "Admin" && (
          <ListItem disablePadding>
            <Link href={"/Dashboard/Admin/ManageOpportunity"}>
              <ListItemButton>
                <ListItemIcon>
                  <PetsIcon fontSize="small" />
                  <PetsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={"Manage Applications"} />
              </ListItemButton>
            </Link>
          </ListItem>
        )} */}
        {/* if mange application needed then use  */}
        <ListItem disablePadding>
          <Link
            href={
              role === "Admin"
                ? "/Dashboard/Admin/ManageOpportunity"
                : "/Dashboard/User/Participations"
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  role === "Admin" ? "Manage Opportunity" : "Participations"
                }
              />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      bgcolor={"secondary.dark"}
      height={"100%"}
      sx={{color: "primary.light"}}
    >
      <Box
        pt={4}
        textAlign={"center"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Logo />
      </Box>
      {drawer}
    </Box>
  );
};
