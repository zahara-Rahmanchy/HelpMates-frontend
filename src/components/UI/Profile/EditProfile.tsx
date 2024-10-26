"use client";
import {User} from "@/app/(mainLayout)/MyProfile/page";
import EditUserProfile from "@/services/actions/EditUserProfile";
import UserProfile from "@/services/actions/UserProfile";
import {IjwtPayload, getUserInfo} from "@/services/auth.services";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {useRouter} from "next/navigation";

import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "sonner";

interface props {
  accessToken: string;
  // updateProfile: Dispatch<SetStateAction<User | undefined>>;
}
const EditProfile: FC<props> = ({accessToken}) => {
  const userInfo = getUserInfo() as IjwtPayload;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async data => {
    setLoading(true);
    // console.log(data);

    for (let key in data) {
      if (data[key] === "" || data[key] === undefined || data[key] === null)
        delete data[key];
    }

    // console.log("Sanitized", data);
    try {
      const res = await EditUserProfile(data, accessToken, userInfo?.id);
      // console.log(res);
      if (res?.success) {
        // console.log("res.success: ", res.success);
        reset();
        router.refresh();

        toast.success(res?.message);
      }
    } catch (err) {
      console.log(err);
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
            maxWidth: 600,
            width: "100%",
            borderRadius: "5px",
            // boxShadow: 1,
            // backgroundColor: "secondary.light",
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
            Edit <Box component="span"></Box>
            <Box color="black" component="span">
              Profile
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
              <Grid item xs={12} md={12}>
                <TextField
                  sx={{color: "white"}}
                  id="standard-basic"
                  label="Username"
                  variant="standard"
                  fullWidth={true}
                  {...register("name")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  type="text"
                  fullWidth={true}
                  {...register("email")}
                />
              </Grid>
              <Grid item xs={12} textAlign="center"></Grid>
            </Grid>
            <Button
              sx={{
                width: "200px",
                textAlign: "center",
                marginBottom: 5,
                bgcolor: "#f7ad1b",
              }}
              type="submit"
            >
              Update
            </Button>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default EditProfile;
