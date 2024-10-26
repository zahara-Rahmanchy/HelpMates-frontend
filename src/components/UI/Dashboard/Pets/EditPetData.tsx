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
import AdoptionRequests from "./AdoptionRequests";
import {uploadImage} from "@/utils/uploadImage";
import {processSpecialNeed} from "@/utils/processSpecialNeed";
import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import {IPetDataInput, IPetDataInsert} from "@/interfaces/OpportunityInterface";
import {toast} from "sonner";
import {InsertPetData} from "@/services/actions/AddPetData";
import {updatePetData} from "@/services/actions/UpdatePet";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface IEditProps {
  petData: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // fetchPets: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const EditPetData: FC<IEditProps> = ({petData, open, setOpen}) => {
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
  const [imageLoading, setImageLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm<Partial<IPetDataInput>>();

  const onSubmit: SubmitHandler<Partial<IPetDataInput>> = async data => {
    // console.log("upd data:", data);

    for (let key in data) {
      if (
        (data as any)[key] === "" ||
        (data as any)[key] === undefined ||
        (data as any)[key] === null
      )
        delete (data as any)[key];
      if (data.image?.length === 0) {
        delete data.image;
      }
    }
    console.log("upd data:", data);
    const {specialNeed, image, age, ...rest} = data;
    let specialNeedArr;
    if (specialNeed) {
      specialNeedArr = processSpecialNeed(String(specialNeed));
    }
    let allImageUrls;
    /**************** Generating image urls************************* */
    if (image) {
      setImageLoading(true);
      const imgFiles = Object.values(image);

      const urls = imgFiles.map((file, index) => uploadImage(file));
      allImageUrls = await Promise.all(urls);
      // console.log("allurls: ", allImageUrls);
      setImageLoading(false);
    }

    let Age;
    if (age) {
      Age = Number(age);
    }
    /**************** endGenerating image urls************************* */
    try {
      setLoading(true);
      const insertData = {
        specialNeeds: specialNeedArr,
        image: allImageUrls,
        age: Age,
        ...rest,
      };
      // console.log("insertData: ", insertData);
      const res = await updatePetData(insertData as IPetDataInsert, petData.id);
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        reset();
        // router.redirect("")
        router.refresh();

        window.location.reload();
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } catch (err: any) {
      // console.log(err);
      toast.error(err.message as string);
      setLoading(false);
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
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
              Edit Pet Information
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
        <Container>
          {" "}
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
                backgroundColor: "secondary.light",
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
                  in Pet Information!
                </Box>
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
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="standard-basic"
                      label={`Name: ${petData.name}`}
                      // defaultValue=
                      variant="standard"
                      fullWidth={true}
                      {...register("name", {
                        ////required: "Name is //required!",
                      })}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.name.message}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      label={`Type: ${petData.species}`}
                      fullWidth={true}
                      {...register("species", {
                        //required: "Type is //required!",
                      })}
                    />
                    {errors.species && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.species.message}
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      id="standard-basic"
                      label={`Breed: ${petData.breed}`}
                      variant="standard"
                      type="text"
                      fullWidth={true}
                      {...register("breed", {
                        //required: "breed is //required!",
                      })}
                    />
                    {errors.breed && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.breed.message}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="standard-basic"
                      label={`Age: ${petData.age}`}
                      type="number"
                      // defaultValue={petData.name}
                      variant="standard"
                      fullWidth={true}
                      {...register("age", {
                        //required: "Age is //required!",
                      })}
                    />
                    {errors.age && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.age.message}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl variant="standard" sx={{width: "100%"}}>
                      <InputLabel id="demo-simple-select-label">
                        {" "}
                        {`Size: ${petData.size}`}
                      </InputLabel>
                      <Select
                        variant="standard"
                        // sx={{width: "100%"}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={petData.size}
                        sx={{textAlign: "left", width: "100%"}}
                        // onChange={handleFilterSize}{required: true}
                        {...register("size")}
                      >
                        <MenuItem value={"Large"}>Large</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"Small"}>Small</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.size && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.size.message}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="standard-basic"
                      label={`special Needs(comma separated / none): ${petData.specialNeeds}`}
                      variant="standard"
                      fullWidth={true}
                      {...register("specialNeed", {
                        //required: `specialNeeds is //required!If not, write "none" `,
                      })}
                    />
                    {errors.specialNeed && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.specialNeed.message}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="standard-basic"
                      label={`Gender: ${petData.gender}`}
                      variant="standard"
                      fullWidth={true}
                      {...register("gender", {
                        //required: "gender is //required!",
                      })}
                    />
                    {errors.gender && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.gender.message}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="standard-basic"
                      label={`Location: ${petData.location}`}
                      variant="standard"
                      fullWidth={true}
                      {...register("location", {
                        //required: "location is //required!",
                      })}
                    />
                    {errors.location && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.location.message}
                      </span>
                    )}
                    {/* <TextField
                  id="standard-basic"
                  label="location"
                  variant="standard"
                  fullWidth={true}
                  {...register("location", {
                    //required: "location is //required!",
                  })}
                />
                {errors.location && (
                  <span className="text-red-500 text-xs m-1">
                    {errors.location.message}
                  </span>
                )} */}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      type="textarea"
                      id="standard-basic"
                      sx={{height: "100px"}}
                      // defaultValue={petData.description}
                      label={`Description: ${petData.description}`}
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
                                {petData.description}
                              </Typography>
                            </Popover>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {errors.description && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.description.message}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="standard-basic"
                      label={`Temperament: ${petData.temperament}`}
                      variant="standard"
                      fullWidth={true}
                      {...register("temperament", {
                        //required: "temperament is //required!",
                      })}
                    />
                    {errors.temperament && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.temperament.message}
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      id="standard-basic"
                      label={`Health Status: ${petData.healthStatus}`}
                      variant="standard"
                      fullWidth={true}
                      {...register("healthStatus", {
                        //required: "medicalHistory is //required!",
                      })}
                    />
                    {errors.temperament && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.temperament.message}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="standard-basic"
                      label={`Adoption Requirements: ${petData.adoptionRequirements}`}
                      variant="standard"
                      fullWidth={true}
                      {...register("adoptionRequirements", {
                        //required: "adoptionRequirements is //required!",
                      })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              style={{color: "purple"}}
                              aria-describedby={
                                viewTemp ? "simple-popover" : undefined
                              }
                              // variant="contained"
                              onClick={event =>
                                setAnchorElTemp(event.currentTarget)
                              }
                            >
                              {<Visibility />}
                            </IconButton>
                            <Popover
                              id={viewTemp ? "simple-popover" : undefined}
                              open={viewTemp}
                              anchorEl={anchorElTemp}
                              onClose={() => setAnchorElTemp(null)}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                            >
                              <Typography sx={{p: 2}}>
                                {petData.adoptionRequirements}
                              </Typography>
                            </Popover>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.temperament && (
                      <span className="text-red-500 text-xs m-1">
                        {errors.temperament.message}
                      </span>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={3}
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
                      <LinearProgress color="primary" sx={{marginTop: "5px"}} />
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
                  Add
                </Button>
              </form>
            </Box>
          </Stack>
        </Container>
        <AdoptionRequests
          adoptionRequests={petData.adoptionRequest}
          setOpen={setOpen}
          // fetchPets={fetchPets}
        />
      </Dialog>
    </>
  );
};

export default EditPetData;
function value(
  value: [string, string | number | string[]],
  index: number,
  array: [string, string | number | string[]][]
): value is [string, string | number | string[]] {
  throw new Error("Function not implemented.");
}
