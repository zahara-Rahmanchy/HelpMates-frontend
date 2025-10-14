"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  HomeWorkOutlined,
  DashboardCustomizeOutlined,
  AddBoxOutlined,
  ManageHistoryOutlined,
  PeopleAltTwoTone,
  MenuOpenOutlined,
  MenuOutlined,
  PaymentOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import Logo from "../Navbar/Logo";
import { getUserInfo } from "@/services/auth.services";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export const SideBar = () => {
  const [role, setRole] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

 
  useEffect(() => {
    const user = getUserInfo() as any;
    if (user?.role) setRole(user.role);
  }, []);

  if (!role) return null; // prevent flicker before role loads


  const commonRoutes: NavItem[] = [
    { label: "Home", icon: <HomeWorkOutlined />, href: "/" },
  ];

  const adminRoutes: NavItem[] = [
    { label: "Dashboard Analytics", icon: <DashboardCustomizeOutlined />, href: "/Dashboard/Admin" },
    { label: "Manage Users", icon: <PeopleAltTwoTone />, href: "/Dashboard/Admin/Users" },
    { label: "Add Opportunity", icon: <AddBoxOutlined />, href: "/Dashboard/Admin/AddOpportunity" },
    { label: "Manage Opportunity", icon: <ManageHistoryOutlined />, href: "/Dashboard/Admin/ManageOpportunity" },
    { label: "Send Payments", icon: <PaymentOutlined />, href: "/Dashboard/Admin/SendPayouts" },
    { label: "Payment History", icon: <PaymentOutlined />, href: "/Dashboard/Admin/PaymentHistory" },
  ];

  const userRoutes: NavItem[] = [
    { label: "Dashboard Analytics", icon: <DashboardCustomizeOutlined />, href: "/Dashboard/User" },
    { label: "My Applications", icon: <AddBoxOutlined />, href: "/Dashboard/User/MyApplications" },
    { label: "Participations", icon: <ManageHistoryOutlined />, href: "/Dashboard/User/Participations" },
    { label: "My Payments", icon: <PaymentOutlined />, href: "/Dashboard/User/MyPayments" },
  ];

  const routes = [...commonRoutes, ...(role === "Admin" ? adminRoutes : userRoutes)];

  // ✅ 3. Sidebar component layout
  return (
    <Box
      bgcolor="#511128"
      height="100vh"
      sx={{
        color: "primary.light",
        transition: "width 0.3s ease",
        width: collapsed ? "80px" : "230px",
        overflowX: "hidden",
      }}
    >
      {/* Logo and collapse button */}
      <Box
        pt={3}
        pb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={collapsed ? 0 : 2}
      >
        {!collapsed && (
          <Box display="flex" justifyContent="center" alignItems="center" width="100%">
            <Logo />
          </Box>
        )}
        {/* <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{ color: "white", mx: collapsed ? "auto" : 0 }}
        >
         {collapsed ? <MenuOutlined /> : <MenuOpenOutlined />} 
        </IconButton> */}
      </Box>

      <Divider sx={{ borderColor: "primary.light", mb: 1 }} />

      {/* Menu items */}
      <List>
        {routes.map((item, index) => (
          <Link
            key={index}
            href={item.href}
         
            // style={{ textDecoration: "none",  }}
          >
            <Tooltip title={collapsed ? item.label : ""} placement="right">
              <ListItem disablePadding   >
                <ListItemButton
                
                  sx={{
                    // bgcolor:"yellow",
                    display:"flex",
                    gap:2,
                    justifyContent: "flex-start",
                    borderRadius: "12px",
                    // mx: collapsed ? "auto" : 1,
                    "&:hover": { backgroundColor: "#6a1b3f" },
                    
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "secondary.light",
                      minWidth: collapsed ? "auto" : "40px",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {/* {!collapsed && ( */}
                   <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: { color: "secondary.light", fontWeight: 500 },
                    }}
                  />

                  {/* )} */}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </Link>
        ))}
      </List>
    </Box>
  );
};
