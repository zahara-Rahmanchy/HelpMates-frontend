"use client";
import React, {useState} from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {getFromCookiesClient} from "@/utils/local-storage";
import {authKey} from "@/constants/authkey";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
  const [viewNew, setViewNew] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async data => {
    const accessToken = getFromCookiesClient(authKey);

    // console.log(data);
    const confirmed = confirm(`Are you sure you want to change password?`);
    if (confirmed) {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/change-password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken ? accessToken : "",
            },
            body: JSON.stringify(data),
            cache: "no-store",
          }
        );
        const result = await res.json();
        console.log("resutlt: ", result);
        if (result.success) {
          toast.success("Password updated Successfully");
          reset();
          router.refresh();
        } else {
          toast.error(result.message);
        }
      } catch (err: any) {
        toast.error(err.message as string);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Box id="changePassword">
      <Typography
        width={"100%"}
        mx={{sm: 4, xs: 2}}
        my={4}
        textAlign="left"
        variant="h4"
        color="primary.main"
        // component="span"
        fontWeight={"bold"}
        // fontSize={"30px"}
        marginTop={10}
      >
        Change Your
        <Box color="black" component="span">
          {" "}
          Password
        </Box>
      </Typography>
      <Stack
        // bgcolor={"#eed4f9"}
        bgcolor={"secondary.light"}
        width={"100%"}
        borderRadius={"20px"}
        marginBottom={10}
        py={{sm: 2, xs: 6}}
        minHeight={"200px"}
        // alignItems={"center"}
        justifyContent={"center"}
      >
        <Backdrop
          sx={{color: "#fff", zIndex: theme => theme.zIndex.drawer + 1}}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* <Stack id={"changePassword"} sx={{background: "#eed4f9"}} gap={5}> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={{xs: "column", sm: "row"}}
            gap={4}
            mx={7}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TextField
              sx={{color: "white"}}
              id="standard-basic"
              label="Old Password"
              type={view ? "text" : "password"}
              variant="standard"
              // width={{xs: "100%", sm: "50%"}}
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setView(!view)}
                      edge="end"
                    >
                      {view ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("oldPassword", {
                required: "Old password is required",
                minLength: {
                  value: 6,
                  message: "Password must be least of 6 characters",
                },
                maxLength: {
                  value: 12,
                  message: "Password must be at most of 12 characters",
                },
              })}
            />{" "}
            {errors.oldPassword && (
              <span className="text-red-500 text-xs m-1">
                {errors.oldPassword.message as string}
              </span>
            )}
            <TextField
              sx={{color: "white"}}
              id="standard-basic"
              label="New Password"
              // type="password"
              variant="standard"
              fullWidth={true}
              type={viewNew ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setViewNew(!viewNew)}
                      edge="end"
                    >
                      {viewNew ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "New Password must be least of 6 characters",
                },
                maxLength: {
                  value: 12,
                  message: "New Password must be at most of 12 characters",
                },
              })}
            />{" "}
            {errors.newPassword && (
              <span className="text-red-500 text-xs m-1">
                {errors.newPassword.message as string}
              </span>
            )}
            <Button
              sx={{
                px: "4",
                width: "200px",
                textAlign: "center",
                mx: "auto 0",
                bgcolor: "#865C97",
              }}
              type="submit"
            >
              Change
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default ChangePassword;
