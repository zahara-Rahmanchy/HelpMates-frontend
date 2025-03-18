"use client";
import {teamInformation} from "@/constants/teamInformation";
// import {teamInformation} from "@/constants/teamInformation";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import {BorderColor} from "@mui/icons-material";
import CommonHeader from "@/components/shared/CommonHeader";
import MainTitle from "@/components/shared/Title";
import SubTitle from "@/components/shared/SubTitle";
const About = () => {
  return (
    <>
      {" "}
      <Box bgcolor={"tertiary.light"} paddingBottom={20}>
        <CommonHeader headerFirst={"About Us"} headerSecond="Make an Impact" />

        <Container>
          <Box
            marginTop={5}
            // marginBottom={3}
            textAlign={"center"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <MainTitle value="Know Our Members" colorCode="#fcbab8" />
            <SubTitle
              sub=" At HelpMates, we believe in the power of community and the
              impact each individual can make by offering their time and skills.
              Our mission is to connect volunteers with meaningful opportunities
              to support causes that truly matter. Whether you're
              passionate about education, environment, healthcare, or community
              outreach, there's a place for you here to make a difference."
            />
          </Box>
          <Grid container rowSpacing={10} justifyContent="center">
            {teamInformation?.map((t: any) => (
              <Grid
                key={t.id}
                item
                xs={12}
                sm={6}
                lg={4}
                textAlign={"center"}
                justifyContent={"center"}
                zIndex={5}
              >
                <Card
                  sx={{
                    maxWidth: 345,
                    // textAlign: "center",
                    // maxHeight: "fit-content",
                    height: 430,

                    backgroundColor: "primary.light",
                  }}
                >
                  <Typography
                    marginX={3}
                    paddingTop={2}
                    textAlign={"left"}
                    variant="body1"
                    sx={{fontSize: "25px"}}
                    color="primary.main"
                    fontWeight={"bold"}
                  >
                    {t.name}
                  </Typography>
                  <CardMedia
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "15px",
                    }}
                  >
                    <Image
                      src={t.image}
                      alt={`${t.name} image`}
                      width={300}
                      height={0}
                      style={{objectFit: "cover"}}
                    />
                    {/* title={pet.species + "img"} */}
                  </CardMedia>
                  <CardContent>
                    <hr style={{marginTop: "8px"}} />
                    <Typography
                      mx="10px"
                      textAlign={"left"}
                      variant="body1"
                      sx={{fontSize: "13px", my: 1, paddingBottom: 1}}
                      color="white"
                    >
                      {t.bio}
                    </Typography>
                    {/* </Box> */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Stack
            direction={{xs: "column", sm: "row"}}
            // bgcolor={"tertiary.light"}
            borderRadius={"10px"}
            justifyContent={"space-betweeen"}
            width={"97%"}
            marginTop={20}
            // px={4}s
            sx={{
              backgroundImage:
                'url("https://cdn.pixabay.com/photo/2018/12/14/11/55/volunteers-3874924_1280.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center bottom",
            }}
          >
            {/* <Stack */}
            <Box
              bgcolor={"white"}
              sx={{
                // maxWidth: 600,
                width: {xs: "100%", sm: "50%"},

                borderRadius: "5px",
                opacity: 0.96,
                textAlign: "center",
                paddingTop: "15px",
              }}
            >
              <form>
                <Typography
                  color={"primary.main"}
                  variant="h6"
                  fontWeight={"bold"}
                  fontSize={"26px"}
                  mx={3}
                  marginTop={3}
                >
                  Contact Us
                </Typography>
                <Grid
                  container
                  spacing={2}
                  gap={2}
                  px={4}
                  py={5}
                  width="100%"
                  justifyContent={"center"}
                >
                  <Grid item xs={12} md={12}>
                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      fullWidth={true}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="standard-basic"
                      label="Your Message"
                      variant="standard"
                      type="text"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="center"></Grid>
                </Grid>
                <Button
                  sx={{
                    width: "200px",
                    textAlign: "center",
                    marginBottom: 5,
                    bgcolor: "secondary.dark",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Box>
            <Box
              bgcolor={"white"}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // maxWidth: 600,
                opacity: 0.95,
                width: {xs: "100%", sm: "50%"},
                borderRadius: "5px",

                textAlign: "center",
                paddingTop: "15px",
                paddingBottom: {xs: "40px", sm: "0px"},
              }}
            >
              <Typography
                color={"secondary.dark"}
                variant="h6"
                fontWeight={"bold"}
                fontSize={"26px"}
                mx={3}
                my={3}
              >
                Call Us On:
                <Box component={"span"} fontWeight={"normal"} fontSize={"23px"}>
                  {" "}
                  018978709990
                </Box>
              </Typography>
              <hr style={{borderColor: "black", width: "80%"}} />
              <Typography
                color={"secondary.dark"}
                variant="h6"
                fontWeight={"bold"}
                fontSize={"24px"}
                mx={3}
                marginTop={3}
              >
                Or Follow Us:
                <Box
                  color={"secondary.dark"}
                  display={"flex"}
                  justifyContent="center"
                  gap={6}
                  marginTop="9px"
                >
                  <InstagramIcon />
                  <FacebookOutlinedIcon />
                  <TwitterIcon />
                </Box>
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default About;
