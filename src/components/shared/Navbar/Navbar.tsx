"use client";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Logo from "./Logo";
import Link from "next/link";
import dynamic from "next/dynamic";
import MenuIcon from "@mui/icons-material/Menu";
import {getUserInfo, IjwtPayload} from "@/services/auth.services";
import {useRouter} from "next/router";
import {usePathname} from "next/navigation";

const Navbar = () => {
  const AuthButtons = dynamic(() => import("@/components/UI/AuthButtons"), {
    ssr: false,
  });
  const [userInfo, setUserInfo] = useState<IjwtPayload | null>(null);

  const [show, setShow] = useState(false);
  // const userInfo = getUserInfo();
  const location = usePathname();
  // console.log("userinfo: ", userInfo);
  const hideNav: boolean = location === "/Login" || location === "/Register";
  console.log("hide: ", hideNav);

  useEffect(() => {
    const user = getUserInfo();
    setUserInfo(user || null);
  }, []);

  return (
    <Box sx={{backgroundColor: "#872346"}}>
      {!hideNav && (
        <Container sx={{width: "100%"}}>
          <Stack
            direction={{xs: "column", lg: "row"}}
            justifyContent="space-between"
            alignItems={"center"}
            py={2}
            width="100%"
            sx={{backgroundColor: "#872346"}}
          >
            <Stack
              width={{xs: "100%", lg: "fit-content"}}
              direction={{xs: "row"}}
              gap="5"
              justifyContent="space-between"
              alignItems={{lg: "stretch", xs: "center"}}
              sx={{backgroundColor: "#872346"}}
            >
              <Logo />
              <Box display={{lg: "none"}}>
                <MenuIcon
                  color="primary"
                  sx={{color: "secondary.light"}}
                  onClick={() => setShow(!show)}
                >
                  Menu
                </MenuIcon>
              </Box>
            </Stack>
            <Stack
              display={{xs: show ? "flex" : "none", lg: "flex"}}
              direction={{xs: "column", lg: "row"}}
              justifyContent="space-between"
              gap={4}
              alignItems="center"
              zIndex={6}
              sx={{
                backgroundColor: "#872346",
              }}
            >
              <Typography component={Link} href="/" color={"white"}>
                Home
              </Typography>
              <Typography component={Link} href="/AboutUs" color={"white"}>
                About Us
              </Typography>
               <Typography component={Link} href="/AllOpportunity" color={"white"}>
                All Opportunity
              </Typography>
              <Typography component={Link} href="/Testimonials" color={"white"}>
                Testimonials
              </Typography>

              <Typography component={Link} href="/AboutUs" color={"white"}>
                Blogs
              </Typography>

              <Typography
                component={Link}
                color={"white"}
                href={
                  userInfo?.role === "Admin"
                    ? "/Dashboard/Admin"
                    : userInfo?.role === "User"
                    ? "/Dashboard/User"
                    : "/Login"
                }
              >
                Dashboard
              </Typography>
            </Stack>
            {/* display={{xs: show ? "flex" : "none", lg: "flex"}} */}
            <Stack
              display={{xs: show ? "flex" : "none", lg: "flex"}}
              paddingY={{xs: "20px", lg: "0"}}
            >
              {" "}
              <AuthButtons />{" "}
            </Stack>
          </Stack>
        </Container>
      )}
    </Box>
  );
};

export default Navbar;
