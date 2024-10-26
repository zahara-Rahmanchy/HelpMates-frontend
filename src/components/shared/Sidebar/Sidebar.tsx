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
import React from "react";
import Logo from "../Navbar/Logo";
import Link from "next/link";
import {PeopleAltTwoTone} from "@mui/icons-material";

export const SideBar = () => {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link href="/">
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link href="/Dashboard/Admin/Users">
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltTwoTone />
              </ListItemIcon>
              <ListItemText primary={"Manage Users"} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link href="/Dashboard/Admin/AddPet">
            <ListItemButton>
              <ListItemIcon>
                <PetsIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Pet"} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link href="/Dashboard/Admin/ManagePets">
            <ListItemButton>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Manage Pets"} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box>
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
