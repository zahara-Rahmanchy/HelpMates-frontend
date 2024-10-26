import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import {OpporsProps} from "./Opportunities";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check circle icon
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Link from "next/link";
import {convertDuration} from "@/utils/convertDuration";

const OpportunityCard = ({
  opportunities,
}: {
  opportunities: OpporsProps["requests"];
}) => {
  return (
    <>
      {opportunities !== null &&
        opportunities.map((opportunity: any) => (
          <Grid
            width={"100%"}
            key={opportunity.id}
            item
            xs={12}
            sm={12}
            md={6}
            spacing={8}
            marginBottom={{xs: "100px", lg: "auto"}}
            // textAlign={"center"}
            // justifyContent={"center"}
            // alignItems={"center"}
            // bgcolor={"blue"}
            sx={{position: "relative"}} // Ensure relative positioning for overlay
          >
            <Card
              sx={{
                width: {xs: 345},
                justifyContent: "center",
                textAlign: "left",
                marginX: "auto",
                marginTop: "5px",
                // maxHeight: "fit-content",
                height: "430px",
                alignItems: "center",
                // backgroundColor: "white",
                // backgroundColor: "tertiary.main",
                position: "relative",
                overflow: "hidden",

                "&:hover .overlay": {
                  opacity: 1,
                },
              }}
            >
              <CardMedia
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: "10px",
                  //   backgroundColor: "primary.main",
                  height: "250px",
                }}
              >
                <Box
                  sx={{
                    border: "8px solid", // Adds a solid border
                    borderColor: "secondary.dark",
                    outline: "1px  dotted",
                    outlineColor: "secondary.dark",
                    outlineOffset: "5px",
                  }}
                >
                  <Image
                    src={"/volunteer2.png"}
                    alt={`image`}
                    width={300}
                    height={0}
                    style={{
                      objectFit: "contain",
                      border: "7px solid",
                      borderColor: "secondary.dark",
                      //   backgroundColor: "#1f2937",
                    }}
                  />
                </Box>
              </CardMedia>
              <CardContent
                sx={{
                  backgroundColor: "secondary.main",
                  color: "white",
                  padding: "30px",
                }}
              >
                <Typography variant="h5" color="primary.dark">
                  {opportunity.title}
                </Typography>
                <Typography variant="subtitle1" color="tert">
                  {opportunity.organization}
                </Typography>

                <Typography color="white">
                  Duration: {convertDuration(opportunity.duration)}
                </Typography>
                <Typography color={"white"}>
                  Status:{" "}
                  <Box component={"span"} color="yellow">
                    {opportunity.status}
                  </Box>
                </Typography>
                <Typography color="white">
                  <LocationOnIcon
                    sx={{
                      mr: "3px",
                      width: "20px",
                      color: "",
                    }}
                  />
                  {opportunity.location}
                </Typography>
              </CardContent>
              <Box
                // className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "secondary.dark", // Semi-transparent black
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  height: "100%",
                  opacity: 0,

                  ":hover": {
                    opacity: "0.95",

                    transition: "opacity 0.8s ease",
                  },
                  pointerEvents: "auto",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingX: "20px",
                    color: "secondary.light",
                    // backgroundOpacity: "0.7",
                    // justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  {/* <Typography variant="h6">Skills</Typography> */}

                  <List>
                    {opportunity.skillsRequired
                      .slice(0, 3)
                      .map((skill: string, index: number) => (
                        <ListItem key={index} color="secondary.light">
                          <Typography color={"white"}>
                            <CheckCircleIcon
                              sx={{
                                mr: "5px",
                                width: "18px",
                                color: "secondary.main",
                              }}
                            />
                            {skill[0].toLocaleUpperCase() + skill.slice(1)}
                          </Typography>
                        </ListItem>
                      ))}
                    <ListItem>
                      <Typography color="white" sx={{textWrap: "nowrap"}}>
                        <CheckCircleIcon
                          sx={{
                            mr: "5px",
                            width: "18px",
                            color: "secondary.main",
                          }}
                        />
                        Start Date:{" "}
                        {dayjs(opportunity.startDate).format(
                          "hh:mm A - MMM D, YYYY"
                        )}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography color="white" sx={{textWrap: "nowrap"}}>
                        <CheckCircleIcon
                          sx={{
                            mr: "5px",
                            width: "18px",
                            color: "secondary.main",
                          }}
                        />
                        End Date:{" "}
                        {dayjs(opportunity.endDate).format(
                          "hh:mm A - MMM D, YYYY"
                        )}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography textAlign={"left"} color="tertiary.main">
                        {" "}
                        {opportunity.description.length > 100
                          ? `${opportunity.description.slice(0, 100)} ...`
                          : opportunity.description}
                      </Typography>
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    width: "100%",
                    backgroundColor: "secondary.main",
                  }}
                >
                  {/* href={isLoggedIn() ? `PetPortfolio/${pet.id}` : `/Login`} */}
                  <Link href={`OpportunityDetails/${opportunity.id}`}>
                    <Button
                      variant="contained"
                      // color="primary.main"
                      sx={{
                        height: "30px",
                        width: "300px",
                        fontSize: "10px",
                        backgroundcolor: "#f7d588",
                        my: 1,
                      }}
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardActions>
              </Box>
            </Card>
          </Grid>
        ))}
    </>
  );
};

export default OpportunityCard;
