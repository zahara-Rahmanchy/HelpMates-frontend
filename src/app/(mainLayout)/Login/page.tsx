"use client";
import {LoginInputs} from "@/interfaces/LoginInputs";
import {LoginUser} from "@/services/actions/LoginUser";
import {storeUserInfo} from "@/services/auth.services";
// import {storeUserInfo} from "@/services/actions/auth.services";
import {
  Backdrop,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "sonner";
import MainLayout from "../layout";
import Link from "next/link";

import Logo from "@/components/shared/Navbar/Logo";
import AuthDesign from "@/components/UI/Auth/AuthDesign";
import {Visibility, VisibilityOff} from "@mui/icons-material";
const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async data => {
    setLoading(true);
    // console.log(data);

    try {
      const res = await LoginUser(data);

      if (res?.data?.token) {
        storeUserInfo(res.data.token);
        router.push("/");
        router.refresh();
        toast.success(res?.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message as string);
    } finally {
      setLoading(false);
    }
  };
  const getRandomPosition = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  // Number of hearts to show
  const heartCount = 3;
  return (
    <>
      <Stack
        height={{lg: "100vh"}}
        flexDirection={{lg: "row", xs: "column"}}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AuthDesign />
        <Backdrop
          sx={{color: "#fff", zIndex: theme => theme.zIndex.drawer + 1}}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Stack
          justifyContent={"center"}
          width={{md: "60%", xs: "100%"}}
          alignItems={"center"}
        >
          <Box
            width={{lg: "40%", md: "80%"}}
            marginY={"80px"}
            sx={{
              // maxWidth: 600,

              borderRadius: "5px",
              boxShadow: 1,

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
              marginTop={"20px"}
            >
              Please Log in To Use
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
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    fullWidth={true}
                    {...register("email", {
                      required: "Email is required!",
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs m-1">
                      {errors.email.message}
                    </span>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    type={show ? "text" : "password"}
                    fullWidth={true}
                    {...register("password", {
                      required: "Password is required!",

                      minLength: {
                        value: 6,
                        message: "Password must be least of 6 characters",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password must be at most of 12 characters",
                      },
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShow(!show)}>
                            {show ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs m-1">
                      {errors.password.message}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} textAlign="center"></Grid>
              </Grid>
              <Button
                // textAlign="center"
                sx={{
                  width: "200px",
                  textAlign: "center",
                  marginBottom: 5,
                }}
                type="submit"
              >
                Login
              </Button>
            </form>
            <Typography paddingBottom={"20px"}>
              Don&apos;t have an account? Please{" "}
              <Link href="/Register" passHref>
                <Box
                  component="span"
                  color="secondary.main"
                  sx={{
                    textDecoration: "underline",
                    textDecorationColor: "#872346",
                    "&:hover": {
                      color: "blue",
                      textDecorationColor: "secondary.dark",
                      // transition: "color 10s ease",
                    },
                  }}
                >
                  Register
                </Box>
              </Link>
            </Typography>
            {/* <Box display={"flex"} ><hr/> OR <hr/></Box> */}
            
            <Stack  width="100%"
                justifyContent={"center"}  spacing={2} alignItems={"center"} mb={3}>
              <Button
              sx={{
                  width: "200px",
                  textAlign: "center",
                  marginBottom: 5,
                }}
                variant="outlined"
                onClick={() =>
                  onSubmit({
                    email: "jane@gmail.com",
                    password: "jane1234",
                  } as LoginInputs)
                }
              >
                Magic Login as Admin
              </Button>
              <Button
                variant="outlined"
                 sx={{
                  width: "300px",
                
                  textAlign: "center",
                  fontSize:"14px",
                  marginBottom: 5,
                }}
               onClick={() =>
                onSubmit({
                  email: "robert@gmail.com",
                  password: "robert123",
                } as LoginInputs)
              }
              >
                Magic Login as Volunteer
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default LoginPage;
