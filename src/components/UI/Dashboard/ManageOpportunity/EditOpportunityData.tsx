"use client";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Popover,
  Popper,
  Select,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, {FC, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {TransitionProps} from "@mui/material/transitions";
import {uploadImage} from "@/utils/uploadImage";
import {processSkillsArray} from "@/utils/processSkillsArray";
import {useRouter} from "next/navigation";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IOpportunityDataInput} from "@/interfaces/OpportunityInterface";
import {toast} from "sonner";
import {Height, Visibility, VisibilityOff} from "@mui/icons-material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
  useGetOpportunityDataQuery,
  useUpdateOpportunityDataMutation,
} from "@/redux/api/opportunityApi";
import CommonPopover from "./component/CommonPopover";
import TextFieldPopover from "./component/TextFieldPopover";
import dayjs from "dayjs";
import Image from "next/image";
import ApplicationRequests from "./ApplicationRequests";

interface IEditProps {
  opportunityData?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const EditOpportunityData: FC<IEditProps> = ({
  opportunityData,
  open,
  setOpen,
}) => {
  // console.log("petData", petData.adoptionRequest);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorElTemp, setAnchorElTemp] =
    React.useState<HTMLButtonElement | null>(null);
  const view = Boolean(anchorEl);
  const viewTemp = Boolean(anchorElTemp);
  const desc = opportunityData?.description?.slice(0, 30) || "";
  const [imageLoading, setImageLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: {errors},
  } = useForm<Partial<IOpportunityDataInput>>();

  const [updateOpportunityData] = useUpdateOpportunityDataMutation();
  const onSubmit: SubmitHandler<Partial<any>> = async data => {
    console.log("upd data:", data);

    console.log("upd data:", data);
    const {image, startDate, endDate, skillsRequired, ...rest} = data;
    console.log("endDate: ", endDate);
    const startDateString = startDate !== "" ? dayjs(startDate) : null;
    const endDateString = endDate !== "" ? dayjs(endDate).toISOString() : null;
    // const startDateString = startDate?.toISOString(); // Converts to ISO string
    // const endDateString = endDate?.toISOString();

    let skillsRequiredArr;
    if (skillsRequired) {
      skillsRequiredArr = processSkillsArray(skillsRequired);
    }
    let allImageUrls;
    /**************** Generating image urls************************* */
    if (image) {
      setImageLoading(true);
      const imgFiles = Object.values(image);
      const urls = imgFiles?.map((file, index) => uploadImage(file));
      allImageUrls = await Promise.all(urls);
      // console.log("allurls: ", allImageUrls);
      setImageLoading(false);
    }

    // /**************** endGenerating image urls************************* */
    try {
      setLoading(true);
      const insertData = {
        skillsRequired: skillsRequiredArr,
        image: allImageUrls,
        startDate: startDateString,
        endDate: endDateString,
        ...rest,
      };
      console.log("insert: ", insertData);
      for (let key in insertData) {
        if (
          (insertData as any)[key] === "" ||
          (insertData as any)[key] === undefined ||
          (insertData as any)[key] === null
        )
          delete (insertData as any)[key];
        if (insertData.image?.length === 0) {
          delete insertData.image;
        }
      }
      console.log("insertData: ", insertData);
      const res = await updateOpportunityData({
        id: opportunityData.id,
        body: insertData,
      }).unwrap();
      console.log("res: ", res);
      if (res?.id) {
        toast.success("Opportunity Data updated Successfully!");
        reset();
        setOpen(false);
      }
    } catch (err: any) {
      console.log("err: ", err);
      if (err?.data) {
        toast.error(`${err.data}`);
      } else {
        toast.error("Something went wrong");
      }
      setLoading(false);
    } finally {
      setLoading(false);
      // setOpen(false);
      // router.refresh();
    }
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{position: "relative"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              Edit Opportunity Information
            </Typography>
            <Button
              autoFocus
              sx={{bgcolor: "secondary.main"}}
              onClick={() => setOpen(false)}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{backgroundColor: "tertiary.light"}}>
          <Container>
            {" "}
            <Stack
              my={5}
              flexDirection={"row"}
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
                  Please <Box component="span">Fill </Box>
                  <Box color="black" component="span">
                    in Opportunity Information
                  </Box>
                </Typography>
                {opportunityData ? (
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
                          label={`Organization : ${opportunityData.organization}`}
                          variant="standard"
                          fullWidth={true}
                          {...register("organization", {
                            // required: "Organization name is required!",
                          })}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          id="standard-basic"
                          label={`Volunteering Title: ${opportunityData.title}`}
                          variant="standard"
                          fullWidth={true}
                          {...register("title", {})}
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <TextField
                          id="standard-basic"
                          label={`Location: ${opportunityData.location}`}
                          variant="standard"
                          type="text"
                          fullWidth={true}
                          {...register("location", {})}
                        />
                      </Grid>

                      <Grid item xs={12} md={5}>
                        <TextField
                          type="textarea"
                          id="standard-basic"
                          sx={{height: "100px"}}
                          // defaultValue={petData.description}
                          label={`Description: ${desc}`}
                          variant="standard"
                          fullWidth={true}
                          {...register("description", {
                            //required: "description is //required!",
                          })}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  style={{color: "purple"}}
                                  aria-describedby={
                                    view ? "simple-popover" : undefined
                                  }
                                  // variant="contained"
                                  onClick={event =>
                                    setAnchorEl(event.currentTarget)
                                  }
                                >
                                  {<Visibility />}
                                </IconButton>
                                <Popover
                                  id={view ? "simple-popover" : undefined}
                                  open={view}
                                  anchorEl={anchorEl}
                                  onClose={() => setAnchorEl(null)}
                                  anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                  }}
                                >
                                  <Typography sx={{p: 2}}>
                                    {opportunityData.description}
                                  </Typography>
                                </Popover>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="standard-basic"
                          label={`Skills (comma separated / none): ${opportunityData.skillsRequired}`}
                          variant="standard"
                          fullWidth={true}
                          {...register("skillsRequired", {})}
                        />
                      </Grid>

                      {/* testing startdata */}
                      <Grid item xs={12} md={3} textAlign={"left"}>
                        <Controller
                          name="startDate"
                          control={control}
                          render={({field}) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                {...field}
                                defaultValue={
                                  opportunityData?.startDate
                                    ? dayjs(opportunityData?.startDate)
                                    : null
                                }
                                label={`Start: ${dayjs(
                                  opportunityData.startDate
                                ).format("hh:mm A , D MMM,YY")}`}
                                value={field.value ? dayjs(field.value) : null} // Ensure it receives a Day.js object
                                onChange={date => field.onChange(date)} // Update the form state
                                sx={{
                                  "& .MuiInputBase-root": {
                                    border: "none",
                                    borderRadius: "0",
                                    // borderBottom: "1px solid grey",
                                  },
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                    borderRadius: "0",
                                    borderBottom: "1px solid grey",
                                  },
                                  "& .MuiInputBase-input-MuiOutlinedInput-input":
                                    {
                                      paddingX: "0px",

                                      marginX: "0px",
                                    },
                                }}
                                //@ts-ignore
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    variant="standard"
                                    fullWidth={true}
                                    sx={{
                                      "& .MuiInputBase-input-MuiOutlinedInput-input":
                                        {
                                          padding: "0px",
                                          gap: "5px",
                                          marginX: "0px",
                                        },
                                    }}
                                    {...register("startDate")}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Controller
                          name="endDate"
                          control={control}
                          render={({field}) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                {...field}
                                defaultValue={
                                  opportunityData?.endDate
                                    ? dayjs(opportunityData?.endDate)
                                    : null
                                }
                                label={`End: ${dayjs(
                                  opportunityData.startDate
                                ).format("hh:mm A , D MMM, YY")}`}
                                value={field.value ? dayjs(field.value) : null} // Ensure it receives a Day.js object
                                onChange={date => field.onChange(date)} // Update the form state
                                sx={{
                                  "& .MuiInputBase-root": {
                                    border: "none",
                                    borderRadius: "0",
                                    // borderBottom: "1px solid grey",
                                  },
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                    borderRadius: "0",
                                    borderBottom: "1px solid grey",
                                  },
                                  "& .MuiInputBase-input-MuiOutlinedInput-input":
                                    {
                                      paddingX: "0px",
                                      marginX: "0px",
                                    },
                                }}
                                //@ts-ignore
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    variant="standard"
                                    fullWidth={true}
                                    {...register("endDate")}
                                    sx={{
                                      "& .MuiInputBase-input-MuiOutlinedInput-input":
                                        {
                                          paddingX: "0px",
                                          marginX: "0px",
                                        },
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          )}
                        />
                      </Grid>
                      {/* <Grid
                        item
                        // bgcolor={"red"}
                        xs={12}
                        md={3}
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
                                {...field}
                                slots={{
                                  textField: params => (
                                    <TextField
                                      {...params}
                                      label={`Start: ${dayjs(
                                        opportunityData.startDate
                                      ).format("hh:mm A , D MMM, YY")}`}
                                      variant="standard"
                                      fullWidth={true}
                                      sx={{
                                        "& .MuiInputBase-root": {
                                          borderBottom: "1x solid grey", // Remove the border
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderBottom: "1px solid grey", // Remove the border for outlined variant
                                        },

                                        "& .MuiInputBase-input-MuiOutlinedInput-input":
                                          {
                                            paddingX: "0px",
                                            marginX: "0px",
                                          },
                                      }}
                                      {...register("startDate")}
                                    />
                                  ),
                                }}
                              />
                            </LocalizationProvider>
                          )}
                        />
                      </Grid> */}

                      {/* <Grid item xs={12} md={3}>
                        <Controller
                          name="endDate"
                          control={control}
                          // defaultValue={dayjs()}
                          render={({field}) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                {...field}
                                slots={{
                                  textField: params => (
                                    <TextField
                                      {...params}
                                      id="standard-basic"
                                      label={`End: ${dayjs(
                                        opportunityData.endDate
                                      ).format("hh:mm A , D MMM, YY")}`}
                                      variant="standard"
                                      fullWidth={true}
                                      sx={{
                                        "& .MuiInputBase-root": {
                                          borderBottom: "1px solid grey", // Remove the border
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderBottom: "1px solid grey", // Remove the border for outlined variant
                                        },

                                        "& .MuiInputBase-input-MuiOutlinedInput-input":
                                          {
                                            paddingX: "0px",
                                            marginX: "0px",
                                          },
                                      }}
                                      {...register("endDate")}
                                    />
                                  ),
                                }}
                              />
                            </LocalizationProvider>
                          )}
                        />
                      </Grid> */}
                      <Grid item xs={12} md={5}>
                        <TextField
                          id="standard-basic"
                          label="Benefits/Rewards"
                          variant="standard"
                          fullWidth={true}
                          {...register("benefit", {
                            // required: "benefits is required!",
                          })}
                        />
                        {/* {errors.temperament && (
                  <span className="text-red-500 text-xs m-1">
                    {errors.temperament.message}
                  </span>
                )} */}
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <TextField
                          id="standard-basic"
                          label={`Status: ${opportunityData.status}`}
                          variant="standard"
                          fullWidth={true}
                          {...register("status", {
                            //required: "medicalHistory is //required!",
                          })}
                        />
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
                        <input
                          style={{borderBottom: "4px", borderColor: "black"}}
                          id="standard-basic"
                          // label="image"
                          type="file"
                          multiple
                          // variant="standard"
                          // fullWidth={true}
                          {...register("image", {
                            //required: "image is //required!",
                          })}
                        />
                        {errors.image && (
                          <span className="text-red-500 text-xs m-1">
                            {errors.image.message}
                          </span>
                        )}
                        {imageLoading && (
                          <LinearProgress
                            color="primary"
                            sx={{marginTop: "5px"}}
                          />
                        )}
                      </Grid>
                    </Grid>
                    <Button
                      // textAlign="center"
                      disabled={loading || imageLoading}
                      sx={{
                        width: "200px",
                        textAlign: "center",
                        marginBottom: 5,
                      }}
                      type="submit"
                    >
                      Update
                    </Button>
                  </form>
                ) : (
                  "No data,please reopen"
                )}
              </Box>
            </Stack>
          </Container>
          {/* <ApplicationRequests
            volunteerRequests={opportunityData.volunteerApplications}
            setOpen={setOpen}
            // fetchPets={fetchPets}
          /> */}
        </Box>
      </Dialog>
    </>
  );
};

export default EditOpportunityData;
