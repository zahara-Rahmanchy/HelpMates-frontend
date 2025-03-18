"use client";
import React, {useState} from "react";
import {
  Backdrop,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {useRouter} from "next/navigation";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

import {toast} from "sonner";

import {uploadImage} from "@/utils/uploadImage";

import {useInsertOpportunityDataMutation} from "@/redux/api/opportunityApi";
import {DateTimePicker, DesktopDateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {processSkillsArray} from "@/utils/processSkillsArray";
const AddOpportunityPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [insertOpportunityData] = useInsertOpportunityDataMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async data => {
    setImageLoading(true);
    // console.log(data);
    const {image, startDate, endDate, skillsRequired, ...rest} = data;
    const startDateString = startDate.toISOString(); // Converts to ISO string
    const endDateString = endDate.toISOString();
    const skillsRequiredArr = processSkillsArray(skillsRequired);
    // console.log(
    //   "dates: ",
    //   startDateString,
    //   endDateString,
    //   "arr: ",
    //   skillsRequiredArr
    // );
    /**************** Generating image urls************************* */
    const imgFiles = Object.values(image);

    const urls = imgFiles?.map((file, index) => uploadImage(file));
    const allImageUrls = await Promise.all(urls);
    // console.log("allurls: ", allImageUrls);
    setImageLoading(false);
    setLoading(true);
    /**************** endGenerating image urls************************* */
    try {
      const insertData = {
        image: allImageUrls,
        startDate: startDateString,
        endDate: endDateString,
        skillsRequired: skillsRequiredArr,
        ...rest,
      };
      // console.log("insertData: ", insertData);
      const res = await insertOpportunityData(insertData).unwrap();
      // console.log("res: ", res);
      if (res?.id) {
        toast.success("New Opportunity added successfully");
        reset();
      } else {
        // console.log("error: ", res.message);
        toast.error(res.message);
      }
    } catch (err: any) {
      // console.log(err);
      toast.error(err.message as string);
    } finally {
      setLoading(false);
      reset();
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Stack
          my={5}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Backdrop
            sx={{color: "#fff", zIndex: theme => theme.zIndex.drawer + 1}}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box
            sx={{
              // maxWidth: 600,
              width: "100%",
              borderRadius: "5px",
              boxShadow: 1,
              backgroundColor: "white",
              textAlign: "center",
              paddingTop: "15px",
            }}
          >
            <Typography
              textAlign="center"
              variant="h6"
              color="primary.main"
              component="span"
              fontWeight={"bold"}
            >
              Fill in the Volunteering Opportunity Details
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                spacing={2}
                gap={2}
                px={4}
                py={5}
                width="100%"
                justifyContent={"center"}
              >
                <Grid item xs={12} md={4}>
                  <TextField
                    id="standard-basic"
                    label="Organization name"
                    variant="standard"
                    fullWidth={true}
                    {...register("organization", {
                      required: "Organization name is required!",
                    })}
                  />
                  {/* {errors.name && (
                  <span className="text-red-500 text-xs m-1">
                    {errors.name.message}
                  </span>
                )} */}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="standard-basic"
                    label="Volunteering Title"
                    variant="standard"
                    fullWidth={true}
                    {...register("title", {
                      required: "Title is required!",
                    })}
                  />
                  {/* {errors.species && (
                  <span className="text-red-500 text-xs m-1">
                    {errors.species.message}
                  </span>
                )} */}
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    id="standard-basic"
                    label="Location"
                    variant="standard"
                    type="text"
                    fullWidth={true}
                    {...register("location", {
                      required: "Location information is required!",
                    })}
                  />
                  {/* {errors.breed && (
                  <span className="text-red-500 text-xs m-1">
                    {errors.breed.message}
                  </span>
                )} */}
                </Grid>

                <Grid item xs={12} md={5}>
                  <TextField
                    id="standard-basic"
                    label="Description (please write a detailed description of the work)"
                    variant="standard"
                    fullWidth={true}
                    {...register("description", {
                      required: "description is required!",
                    })}
                  />
                  {/* {errors.description && (
                  <span className="text-red-500 text-xs m-1">
                    {errors.description.message}
                  </span>
                )} */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="standard-basic"
                    label="Skills required for participation(write skills separated by comma / none)"
                    variant="standard"
                    fullWidth={true}
                    {...register("skillsRequired", {
                      required: `Skill is required!If not, write "none" `,
                    })}
                  />
                  {/* {errors.specialNeed && (
                  <span className="text-red-500 text-xs m-1">
                    {errors.specialNeed.message}
                  </span>
                )} */}
                </Grid>

                <Grid
                  item
                  // bgcolor={"red"}
                  xs={12}
                  md={5}
                  // justifyContent={"flex-start"}
                  // alignItems={"flex-start"}
                  // borderBottom="1px solid"
                  marginLeft={1}
                  textAlign={"left"}
                  // bgcolor={"wheat"}
                >
                  <Controller
                    name="startDate"
                    control={control}
                    // style={{width = "100%"}}
                    // defaultValue={dayjs()}
                    render={({field}) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          orientation="landscape"
                          label="Starting Date and Time"
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            margin: "0px",
                            padding: "0px",
                            alignItems: "flex-start",
                            borderBottom: "1px solid grey",

                            "& .MuiInputBase-root": {
                              border: "none",
                              // Remove the border
                              borderRadius: "0px",
                              padding: 0,
                              margin: "0px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                              margin: "0px",
                              padding: 0,
                            },
                          }}
                          {...field}
                          slots={{
                            textField: params => (
                              <TextField
                                {...params}
                                helperText="invalid mask"
                                {...register("startDate", {
                                  required:
                                    "Starting Date and Time is required!",
                                })}
                              />
                            ),
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="endDate"
                    control={control}
                    // defaultValue={dayjs()}
                    render={({field}) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          orientation="landscape"
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            margin: "0px",
                            padding: "0px",
                            alignItems: "flex-start",
                            borderBottom: "1px solid grey",
                            "& .MuiInputBase-root": {
                              border: "none", // Remove the border
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none", // Remove the border for outlined variant
                            },
                          }}
                          label="Ending Date and Time"
                          {...field}
                          slots={{
                            textField: params => (
                              <TextField
                                {...params}
                                id="standard-basic"
                                label="Starting Date and Time"
                                variant="standard"
                                fullWidth={true}
                                sx={{
                                  "& .MuiInputBase-root": {
                                    border: "none", // Remove the border
                                  },
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none", // Remove the border for outlined variant
                                  },
                                  "& .MuiInput-underline:before": {
                                    borderBottom: "none", // Remove the underline on focus
                                  },
                                  "& .MuiInput-underline:after": {
                                    borderBottom: "none", // Remove the underline after focus
                                  },
                                  "& .MuiInputBase-input-MuiOutlinedInput-input":
                                    {
                                      paddingX: "0px",
                                      marginX: "0px",
                                    },
                                }}
                                {...register("endDate", {
                                  required: "Ending Date and Time is required!",
                                })}
                              />
                            ),
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    id="standard-basic"
                    label="Benefits/Rewards"
                    variant="standard"
                    fullWidth={true}
                    {...register("benefit", {
                      required: "benefits is required!",
                    })}
                  />
                  {/* {errors.temperament && (
                  <span className="text-red-500 text-xs m-1">
                    {errors.temperament.message}
                  </span>
                )} */}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  // bgcolor={"blue"}
                  // alignItems={"flex-end"}
                  sx={{borderBottom: "1px solid grey"}}
                  padding={2}
                >
                  {/* <Input /> */}
                  <input
                    style={{borderBottom: "4px", borderColor: "black"}}
                    id="standard-basic"
                    // label="image"
                    type="file"
                    multiple
                    // variant="standard"
                    // fullWidth={true}
                    {...register("image", {
                      required: "image is required!",
                    })}
                  />
                  {/* {errors.image && (
                  <span className="text-red-500 text-xs m-1">
                    {errors.image.message}
                  </span>
                )} */}
                  {imageLoading && (
                    <LinearProgress color="primary" sx={{marginTop: "5px"}} />
                  )}
                </Grid>
              </Grid>
              <Button
                // textAlign="center"
                disabled={loading || imageLoading}
                sx={{
                  width: {md: "40%", xs: "80%"},
                  textAlign: "center",
                  bgcolor: "secondary.dark",
                  marginBottom: 5,
                  marginX: 3,
                }}
                type="submit"
              >
                Save opportunity to the database
              </Button>
            </form>
          </Box>
        </Stack>
      </Container>
    </LocalizationProvider>
  );
};

export default AddOpportunityPage;
