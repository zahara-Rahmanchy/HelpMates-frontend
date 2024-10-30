// "use client";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import {IOpportunityData} from "@/interfaces/OpportunityInterface";

import ApplicationButton from "./ApplicationButton";
import {toast} from "sonner";
import {Router} from "next/router";
import dayjs from "dayjs";
import {convertDuration} from "@/utils/convertDuration";
import MainTitle from "@/components/shared/Title";

const OpportunityDetails = ({
  opportunity,
  error,
}: {
  opportunity: IOpportunityData;
  error: string | undefined;
}) => {
  console.log("data from ui: ", opportunity);
  const len = opportunity.skillsRequired.length;
  return (
    // <div style={{background: "whiteSmoke"}}>
    <Container>
      {error && error !== undefined && toast.message(error)}
      {opportunity && (
        <Stack
          textAlign="center"
          // container
          // bgcolor={"blue"}
          // spacing={2}
          direction={{xs: "column"}}
          justifyContent="center"

          // alignItems="center"
        >
          <Stack
            bgcolor={"white"}
            width={"90%"}
            height={{md: "400px", xs: "auto"}}
            borderRadius={"10px"}
            marginX={"auto"}
            marginBottom={"50px"}
            marginTop={10}
            flexDirection={{md: "row", xs: "column"}}
            justifyContent={"center"}
            alignItems={"center"}
            paddingY={4}
            gap={5}
          >
            <CardMedia
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
                // backgroundColor: "primary.main",
                height: {md: "200px", xs: "auto"},
              }}
            >
              <Box
                bgcolor={"red"}
                marginX={3}
                sx={{
                  // marginY: "100px",
                  border: "8px solid", // Adds a solid border
                  borderColor: "secondary.main",
                  outline: "1px  dotted",
                  outlineColor: "secondary.dark",
                  outlineOffset: "5px",
                  backgroundColor: "tertiary.main",
                }}
              >
                <Image
                  src={opportunity?.image[0] || "volunteer4.png"}
                  alt={`image`}
                  width={500}
                  height={200}
                  style={{
                    width: "500px",
                    maxHeight: "300px",
                    objectFit: "contain",
                    border: "7px solid",
                    backgroundColor: "secondary.dark",
                    borderColor: "secondary.main",
                    //   backgroundColor: "#1f2937",
                  }}
                />
              </Box>
            </CardMedia>
            <Box width={{md: "40%", xs: "100%"}} paddingLeft={{xs: 6, md: 0}}>
              {" "}
              <Typography
                textAlign="left"
                variant="h1"
                component="h6"
                marginBottom={"5px"}
                sx={{fontSize: "30px"}}
                color={"secondary.dark"}
              >
                {opportunity.organization}
              </Typography>
              <Typography
                textAlign="left"
                variant="h3"
                component="h6"
                color={"secondary.main"}
                sx={{fontSize: "20px", fontStyle: "italic"}}
              >
                {opportunity.title}
              </Typography>
              <Typography
                // color="blue"
                marginTop={"20px"}
                marginBottom={"3px"}
                sx={{textWrap: "nowrap"}}
                textAlign={"left"}
              >
                <Box color="secondary.dark" component="span">
                  {" "}
                  Date:{" "}
                </Box>
                {dayjs(opportunity.startDate).format("MMM D, YYYY")}
              </Typography>
              <Typography
                color="navyblue"
                sx={{textWrap: "nowrap"}}
                textAlign={"left"}
              >
                <Box color="secondary.dark" component="span">
                  Time:
                </Box>{" "}
                {dayjs(opportunity.startDate).format("hh : MM A")}
              </Typography>
              <Typography
                variant="body1"
                marginTop="20px"
                marginBottom="15px"
                textAlign={"left"}
                sx={{
                  fontSize: "15px",
                  // fontWeight: "bold",
                }}
                color="secondary.dark"
              >
                <FmdGoodOutlinedIcon
                  sx={{
                    marginRight: "5px",
                    fontSize: "18px",
                  }}
                />
                {opportunity.location}
              </Typography>
            </Box>
          </Stack>
          <Grid
            item
            xs={6}
            justifyContent="center"
            bgcolor={"white"}
            width={"90%"}
            marginX={"auto"}
            marginY={"40px"}
            borderRadius={"10px"}
          >
            <Box
              // bgcolor={"grey"}
              // paddingLeft="60px"
              // display="flex"
              padding={5}
              textAlign={"left"}
            >
              <Typography
                textAlign="left"
                variant="h1"
                component="h6"
                sx={{fontSize: "30px"}}
              >
                Hi there,
              </Typography>
              <Typography
                variant="body1"
                marginTop="3px"
                marginBottom="15px"
                sx={{
                  fontSize: "14px",
                  // fontWeight: "bold",
                }}
                color="secondary.dark"
              >
                <FmdGoodOutlinedIcon
                  sx={{
                    marginRight: "5px",
                    fontSize: "12px",
                  }}
                />
                {opportunity.location}
              </Typography>

              <Typography
                textAlign="left"
                marginBottom="15px"
                // width={"350px"}
                // maxWidth={"fit-content"}
                variant="body1"
                sx={{
                  fontSize: "16px",
                  // fontWeight: "bold",
                }}
                color="body1"
              >
                {opportunity.description}
              </Typography>
              <Typography
                variant="body1"
                marginTop="3px"
                marginBottom="15px"
                color="secondary.main"
                sx={{
                  fontSize: "14px",
                  // fontWeight: "bold",
                }}
              >
                <Box
                  component={"span"}
                  fontWeight={"bold"}
                  color={"secondary.dark"}
                >
                  Status: {""}
                </Box>
                {opportunity.status}
              </Typography>
              <Typography
                textAlign="left"
                variant="h6"
                component="h6"
                color={"secondary.dark"}
                sx={{fontSize: "18px", fontWeight: " bold"}}
              >
                Skills Required
              </Typography>
              <Grid container marginY={1}>
                {opportunity.skillsRequired.map(
                  (skill: string, index: number) => (
                    <Grid
                      item
                      xs={12} // Full width on extra small devices
                      sm={len <= 3 ? 4 : 6} // 4 columns (3 items per row) on small and larger devices
                      key={index}
                    >
                      <ListItem key={index} color="secondary.light">
                        <Typography color={"secondary.main"} fontSize={"19px"}>
                          <CheckCircleIcon
                            sx={{
                              mr: "10px",
                              width: "18px",
                              color: "primary.light",
                            }}
                          />
                          {skill[0].toLocaleUpperCase() + skill.slice(1)}
                        </Typography>
                      </ListItem>
                    </Grid>
                  )
                )}
              </Grid>
              <Typography
                textAlign="left"
                marginY="15px"
                variant="body1"
                sx={{
                  fontSize: "16px",
                  // fontWeight: "bold",
                }}
                color="body1"
              >
                <Box
                  color="secondary.dark"
                  marginRight={1}
                  component="span"
                  fontWeight="bold"
                >
                  Benefits:
                </Box>
                {opportunity?.benefit}
              </Typography>
              <Typography
                textAlign="left"
                // width={"350px"}
                // maxWidth={"fit-content"}
                variant="body1"
                sx={{
                  fontSize: "14px",
                  my: "2px",
                  // fontWeight: "bold",
                }}
                color="body1"
              >
                <Box
                  color="secondary.dark"
                  component="span"
                  fontWeight="bold"
                  fontSize="15px"
                >
                  Duration:{" "}
                </Box>
                {convertDuration(opportunity.duration)}
              </Typography>

              {/* age,breed,type box */}
              <hr style={{marginTop: "13px", marginBottom: "20px"}} />

              <Stack direction={"row"} justifyContent={"space-between"} gap={6}>
                <Typography
                  textAlign="left"
                  // marginRight="120px"
                  // width={"350px"}
                  // maxWidth={"fit-content"}
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    my: "2px",
                    display: {xs: "block", sm: "inline"},
                    // fontWeight: "bold",
                    textWrap: "wrap",
                  }}
                  color="body1"
                >
                  <Box
                    color="secondary.dark"
                    component="span"
                    fontWeight="bold"
                    // sx={{textWrap: "nowrap"}}
                  >
                    Starting Date:{" "}
                  </Box>
                  {dayjs(opportunity.startDate).format("MMMM D, YYYY")}
                </Typography>
                <Typography
                  textAlign="left"
                  // width={"350px"}
                  // maxWidth={"fit-content"}
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    my: "2px",
                    display: {xs: "block", sm: "inline"},

                    // fontWeight: "bold",
                  }}
                  color="body1"
                >
                  <Box
                    color="secondary.dark"
                    component="span"
                    fontWeight="bold"
                  >
                    Time:{" "}
                  </Box>
                  {dayjs(opportunity.startDate).format("hh:mm A")}
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                gap={6}
                marginY={2}
              >
                <Typography
                  textAlign="left"
                  // marginRight="60px"
                  // width={"350px"}
                  // maxWidth={"fit-content"}
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    my: "2px",
                    display: {xs: "block", sm: "inline"},
                    // fontWeight: "bold",
                  }}
                  color="body1"
                >
                  <Box
                    color="secondary.dark"
                    component="span"
                    fontWeight="bold"
                  >
                    Ending Date:{" "}
                  </Box>
                  {dayjs(opportunity.endDate).format("MMMM D, YYYY")}
                </Typography>
                <Typography
                  textAlign="left"
                  // width={"350px"}
                  // maxWidth={"fit-content"}
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    my: "2px",
                    display: {xs: "block", sm: "inline"},

                    // fontWeight: "bold",
                  }}
                  color="body1"
                >
                  <Box
                    color="secondary.dark"
                    component="span"
                    fontWeight="bold"
                  >
                    Time:{" "}
                  </Box>
                  {dayjs(opportunity.endDate).format("hh:mm A")}
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            {" "}
            <hr />
            {/* <ImageList
              cols={6}
              // cols={{xs: 12, sm: 6}}

              sx={{
                marginTop: "30px",
                textAlign: "center",
                backgroundColor: "primary.light",
              }}
              // cols={3}
              // rowHeight={164}
            >
              {pet.image.map((item, index) => (
                <ImageListItem
                  key={index}
                  sx={{padding: "5px", textAlign: "center"}}
                >
                  <Image
                    src={`${item}`}
                    alt={`${(pet.species, index)}`}
                    loading="lazy"
                    width={"400"}
                    height={"100"}
                    style={{
                      width: "300px",
                      height: "200px",
                      textAlign: "center",
                      padding: "6px",
                      // borderColor: "#865C97",
                      // borderWidth: "3px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList> */}
          </Grid>
        </Stack>
      )}
      {/* application Request button */}
      {opportunity && opportunity.status === "OPEN" && (
        <ApplicationButton
          id={opportunity.id}
          details={{
            title: opportunity.title,
            organization: String(opportunity.organization),
          }}
        />
      )}
    </Container>
  );
};

export default OpportunityDetails;
