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
import {SubmitHandler, useForm} from "react-hook-form";
import {
  IPetData,
  IPetDataInput,
  IPetDataInsert,
} from "@/interfaces/OpportunityInterface";
import {toast} from "sonner";
import {InsertPetData} from "@/services/actions/AddPetData";
import {uploadImage} from "@/utils/uploadImage";
import {processSpecialNeed} from "@/utils/processSpecialNeed";

const AddPetPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<IPetDataInput>();

  const onSubmit: SubmitHandler<IPetDataInput> = async data => {
    setImageLoading(true);
    // console.log(data);
    const {specialNeed, image, age, ...rest} = data;
    const specialNeedArr = processSpecialNeed(String(specialNeed));
    // console.log("specialNeedArr", specialNeedArr);

    /**************** Generating image urls************************* */
    const imgFiles = Object.values(image);

    const urls = imgFiles.map((file, index) => uploadImage(file));
    const allImageUrls = await Promise.all(urls);
    // console.log("allurls: ", allImageUrls);
    setImageLoading(false);
    setLoading(true);
    /**************** endGenerating image urls************************* */
    try {
      const insertData = {
        specialNeeds: specialNeedArr,
        image: allImageUrls,
        age: Number(age),
        ...rest,
      };
      // console.log("insertData: ", insertData);
      const res = await InsertPetData(insertData as IPetDataInsert);
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      // console.log(err);
      toast.error(err.message as string);
    } finally {
      setLoading(false);
    }
  };
  return (
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
                  label="name"
                  variant="standard"
                  fullWidth={true}
                  {...register("name", {
                    required: "Name is required!",
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
                  label="type"
                  variant="standard"
                  fullWidth={true}
                  {...register("species", {
                    required: "Type is required!",
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
                  label="Breed"
                  variant="standard"
                  type="text"
                  fullWidth={true}
                  {...register("breed", {
                    required: "breed is required!",
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
                  label="age"
                  type="number"
                  variant="standard"
                  fullWidth={true}
                  {...register("age", {
                    required: "Age is required!",
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
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={size}
                    sx={{textAlign: "left"}}
                    label="Size"
                    // onChange={handleFilterSize}
                    {...register("size", {required: true})}
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
                  label="special Needs(comma separated / none)"
                  variant="standard"
                  fullWidth={true}
                  {...register("specialNeed", {
                    required: `specialNeeds is required!If not, write "none" `,
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
                  label="gender"
                  variant="standard"
                  fullWidth={true}
                  {...register("gender", {
                    required: "gender is required!",
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
                  label="location"
                  variant="standard"
                  fullWidth={true}
                  {...register("location", {
                    required: "location is required!",
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
                    required: "location is required!",
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
                  id="standard-basic"
                  label="description"
                  variant="standard"
                  fullWidth={true}
                  {...register("description", {
                    required: "description is required!",
                  })}
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
                  label="temperament"
                  variant="standard"
                  fullWidth={true}
                  {...register("temperament", {
                    required: "temperament is required!",
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
                  label="health Status"
                  variant="standard"
                  fullWidth={true}
                  {...register("healthStatus", {
                    required: "healthStatus is required!",
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
                  label="adoptionRequirements"
                  variant="standard"
                  fullWidth={true}
                  {...register("adoptionRequirements", {
                    required: "adoptionRequirements is required!",
                  })}
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
                    required: "image is required!",
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
  );
};

export default AddPetPage;
