"use client";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import React, {ChangeEvent, useEffect, useState} from "react";

import {useRouter, useSearchParams} from "next/navigation";
import MainTitle from "@/components/shared/Title";
import SubTitle from "@/components/shared/SubTitle";
import DateTime from "./DateTime";
import OpportunityCard from "./OpportunityCard";
import {motion}  from "framer-motion";
import {staggerContainer, textVariant1,bannerAnimations,slideAnimation,fadeIn} from "@/DesignUtils/motion";
export interface OpporsProps {
  requests: [] | null;
  skills: string[] | null;
  error?: string;
}
export interface IQueryParams {
  searchTerm?: string;
  start_date?: string;
  skills?: string;
  sortBy?: string;
  sortOrder?: string;
}

const Opportunities = ({requests, error, skills}: OpporsProps) => {
  console.log("requests: ", requests);
  const router = useRouter();
  const {replace} = useRouter();
  // const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    searchTerm: "",
    start_date: "",
    skills: "",
    sortBy: "",
    sortOrder: "",
  });
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  console.log("togg: ", toggle);
  const [anchorEl, setAnchorEl] = useState<boolean | null>(false);
  const updateQueryParams = () => {
    const currentQueryParams = new URLSearchParams(window.location.search);
    // const currentQueryParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        currentQueryParams.set(key, value);
      } else {
        currentQueryParams.delete(key);
      }
    }

    const newUrl = currentQueryParams.toString()
      ? `${window.location.pathname}?${currentQueryParams.toString()}`
      : window.location.pathname;

    replace(newUrl, {scroll: false}); // Update the URL
    console.log("newurl: ", newUrl);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    // const value = event.target.value;
    const value = event.target.value;
    setQueryParams(prevParams => ({
      ...prevParams,
      searchTerm: value,
    }));
  };
  console.log("query params: ", queryParams);
  const handleReset = () => {
    setQueryParams({
      searchTerm: "",
      start_date: "",
      skills: "",
      sortBy: "",
      sortOrder: "",
    });
  };

  const handleSortBy = (
    event: ChangeEvent<HTMLInputElement>,
    type: "duration" | "startDate"
  ) => {
    event.preventDefault();
    const value = event.target.value;
    console.log("value: ", value, event);
    setQueryParams(prevParams => ({
      ...prevParams,
      sortBy: type,
      sortOrder: value,
    }));
  };

  const handleSkillsFilter = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (value === "") {
      setQueryParams(prevParams => ({
        ...prevParams,
        skills: "",
      }));
    }
    console.log("value: ", value);
    // Update local state

    setQueryParams(prevParams => ({
      ...prevParams,
      skills: value,
    }));
  };

  useEffect(() => {
    updateQueryParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  // console.log("needs: ", specialNeedsArray);
  //
  return (
    <Box
      maxWidth={"100%"}
      marginBottom={30}
      sx={{
        // backgroundColor: "grey",
        // padding: "50px",
        marginTop: "100px",
        textAlign: "center",
      }}
    >
      {/* <Container
        sx={{
          // backgroundColor: "grey",
          // padding: "50px",
          marginTop: "100px",
          textAlign: "center",
        }}
      > */}
      <MainTitle
        value={String("Opportunities To Contribute")}
        colorCode="#fcbab8"
      />
      <SubTitle
        sub=" Browse through a diverse set of roles aimed at empowering communities and
      driving social good. Each opportunity is an invitation to be part of a
      cause greater than yourself."
      />

      <Stack
        flexDirection={{lg: "row"}}
        justifyContent={"center"}
        gap={{xs: 10, lg: 2}}
        alignItems={{xs: "center", lg: "flex-start"}}
      >
        {/* filter and search */}
        <Box
        
          display={"flex"}
          width={{md: "90%", xs: "90%", lg: "25%"}}
          marginX="auto"
          flexDirection={{xs: "column"}}
          justifyContent="space-between"
          padding={"10px"}
          boxShadow={"2px 2px 2px 2px rgba(0, 0, 0, 0.01)"}
        >
          {" "}
          <TextField
            sx={{
              borderRadius: "50%",

              color: "primary.main",
              borderColor: "primary.main",
              m: 1,
              minWidth: 130,
            }}
            onChange={handleSearchChange}
            id="outlined-basic"
            label="Search"
            variant="standard"
          />
          <Box
            marginTop={{xs: "30px"}}
            display={"flex"}
            justifyContent="space-between"
            // bgcolor={"lightyellow"}
          >
            <Typography
              variant="body1"
              color="primary.main"
              fontWeight={"bold"}
              marginLeft={"5px"}
              fontSize={"20px"}
              textAlign={"left"}
            >
              Filters
            </Typography>
            <Button
              sx={{
                display: {xs: "block", sm: "block", lg: "none"},
                background: "transparent",
                color: "primary.main",
                boxShadow: "0",
                border: "none",
                outline: "none",
                fontSize: "18px",
                "&:hover": {
                  background: "transparent",
                  color: "primary.dark", // Darker primary color on hover
                  transform: "scale(1.05)", // Slightly enlarge on hover
                  transition: "all 0.2s ease-in-out", // Smooth transition
                },
              }}
              // className="lg:hidden block  text-sky-900 px-3  w-[90%] mx-auto rounded-md"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? <FilterListOffIcon /> : <FilterListIcon />}
            </Button>
          </Box>
          <Box
            display={{
              lg: "flex", // Always visible on lg and above
              xs: toggle ? "flex" : "none", // Toggles visibility for md and smaller
            }}
            flexDirection={{xs: "column"}}
          >
            {/* skills filter */}
            <FormControl variant="standard" sx={{m: 1, minWidth: 130}}>
              <InputLabel id="demo-simple-select-label">Skills</InputLabel>
              <Select
                sx={{textAlign: "left"}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={queryParams.skills}
                label="Skills"
                onChange={handleSkillsFilter}
              >
                <MenuItem
                  value={""}
                  sx={{
                    textAlign: "left",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                      color: "white", // Set hover color
                    },
                  }}
                >
                  All
                </MenuItem>

                {(skills !== null || undefined) &&
                  skills?.map((need: string) => (
                    <MenuItem
                      value={need}
                      key={need}
                      sx={{
                        textAlign: "left",
                        "&:hover": {
                          backgroundColor: "secondary.main",
                          color: "white", // Set hover color
                        },
                      }}
                    >
                      {need}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* sort By options */}

            <Typography
              variant="body1"
              color="primary.main"
              marginY={"20px"}
              fontWeight={"semibold"}
              marginLeft={"5px"}
              fontSize={"16px"}
              textAlign={"left"}
            >
              Sort By
            </Typography>
            <FormControl
              sx={{
                marginBottom: "20px",
                color: "primary.dark",
                paddingBottom: "20px",
                borderBottom: "1px solid",
                borderColor: "grey",
                // borderTop: "10px solid !important",
              }}
            >
              <FormLabel
                sx={{
                  textAlign: "left",
                  fontWeight: "normal",
                  marginLeft: "5px",
                }}
              >
                Duration
              </FormLabel>
              <RadioGroup
                row
                value={
                  queryParams.sortBy === "duration" ? queryParams.sortOrder : ""
                }
                onChange={event => handleSortBy(event, "duration")}
                sx={{
                  justifyContent: {md: "space-around"},
                  gap: {md: "30px", xs: "0px"},
                  marginTop: "10px",
                }}
              >
                <FormControlLabel
                  value="desc"
                  control={<Radio size="small" />}
                  label="High"
                />
                <FormControlLabel
                  value="asc"
                  control={<Radio size="small" />}
                  label="Low"
                />
              </RadioGroup>
            </FormControl>

            <FormControl
              sx={{
                color: "primary.dark",
                paddingBottom: "20px",
                borderBottom: "1px solid",
                borderColor: "grey",
              }}
            >
              <FormLabel
                sx={{
                  textAlign: "left",
                  fontWeight: "normal",
                  marginLeft: "5px",
                }}
              >
                Starting Date
              </FormLabel>
              <RadioGroup
                row
                value={
                  queryParams.sortBy === "startDate"
                    ? queryParams.sortOrder
                    : ""
                }
                onChange={event => handleSortBy(event, "startDate")}
                sx={{
                  justifyContent: {md: "space-around"},
                  gap: {xs: "70px", md: "10px"},
                  marginTop: "10px",
                }}
              >
                <FormControlLabel
                  value="desc"
                  control={<Radio size="small" />}
                  label="Latest"
                />
                <FormControlLabel
                  value="asc"
                  control={<Radio size="small" />}
                  label="Oldest"
                />
              </RadioGroup>
            </FormControl>

            {/******************************  DateTime ***********************************/}
            <DateTime />

            <Button
              sx={{
                marginTop: "40px",
                minWidth: 130,
                backgroundColor: "secondary.main",
                color: "white",
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
        </Box>

        {loading && (
          <p style={{textAlign: "center"}}>
            <CircularProgress color="inherit" />
          </p>
        )}
        <Grid
          width={{lg: "70%", xs: "100%"}}
          //
          container
          spacing={{lg: 9}}
          alignItems={"center"}
          justifyContent={{xs: "center", lg: "flex-start"}}

          // marginTop="10px"
        >
          {requests !== null ? (
            // <Typography textAlign={"center"} fontSize={"20px"} color={"purple"}>
            //   No pet data
            // </Typography>
            <OpportunityCard opportunities={requests} />
          ) : (
            //
            //
            <Typography textAlign={"center"} fontSize={"20px"}>
              No opportunities
            </Typography>
          )}{" "}
        </Grid>
      </Stack>

      {/* </Container> */}
    </Box>
  );
};

export default Opportunities;
