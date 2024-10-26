"use client";
import {
  Box,
  Button,
  Grid,
  TextField,
  Container,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, {useState} from "react";

import {SubmitHandler, useForm} from "react-hook-form";
import VolunteerRequest, {
  opportunityData,
} from "@/services/actions/VolunteerRequest";
import {opportunityId} from "@/constants/opportunityId";
import {toast} from "sonner";
import {getFromCookiesClient} from "@/utils/local-storage";
import {getUserInfo} from "@/services/auth.services";
import {useRouter, useSearchParams} from "next/navigation";
import CommonHeader from "@/components/shared/CommonHeader";
import Image from "next/image";
import MainTitle from "@/components/shared/Title";
// import {getUserInfo} from "@/services/actions/auth.services";

const ApplicationPage = ({params}: opportunityId) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Retrieve query parameters
  const title = searchParams.get("title");
  const organization = searchParams.get("organization");
  // console.log(params, title, organization);

  const accessToken = getFromCookiesClient("accessToken");
  const userData: any = getUserInfo();
  const [loading, setLoading] = useState(false);
  const [agreeConditions, setAgreeConditions] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async data => {
    // console.log(data);
    setLoading(true);
    const {volunteerExperience, ...userInfo} = data;
    const opportunitydata = {
      opportunityId: params.opportunityId,
      volunteerExperience,
    };
    // console.log(petdata);
    try {
      const res = await VolunteerRequest(
        opportunitydata as opportunityData,
        String(accessToken)
      );
      // console.log(res);

      if (res?.data) {
        toast.success(res?.message);
        reset();
        router.back();
      } else {
        toast.error(res?.message);
        router.back();
      }
    } catch (err: any) {
      // console.log(err);
      toast.error(err?.message);
      router.back();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      bgcolor={"tertiary.light"}
      paddingBottom={"200px"}
      textAlign={"center"}
    >
      <CommonHeader
        headerFirst={title as string}
        headerSecond={`Make an Impact | ${organization}`}
      />
      <MainTitle value={String("Apply To Volunteer")} colorCode="#F06D64" />
      <Container sx={{marginTop: "100px"}}>
        <Stack
          my={5}
          // bgcolor={"red"}
          gap={9}
          flexDirection={{md: "row", xs: "column"}}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
          // sx={{
          //   border: "8px solid", // Adds a solid border
          //   borderColor: "secondary.main",
          //   outline: "1px  dotted",
          //   outlineColor: "secondary.dark",
          //   outlineOffset: "5px",
          //   // backgroundColor: "tertiary.main",
          // }}
          >
            <Image
              src="https://cdn.pixabay.com/photo/2018/12/14/11/55/volunteers-3874924_1280.png"
              width={600}
              height={500}
              alt="volunteer"
              style={{borderColor: "secondary.main", border: "7px solid"}}
            />
          </Box>
          <Box
            sx={{
              maxWidth: 900,
              width: {md: "70%", xs: "100%"},
              borderRadius: "5px",
              boxShadow: 1,
              backgroundColor: "white",
              // backgroundColor: "tertiary.light",
              textAlign: "center",
              // paddingTop: "25px",
              color: "primary.main",
              backgroundImage:
                'url("https://cdn.pixabay.com/photo/2018/12/14/11/55/volunteers-3874924_1280.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center bottom",
            }}
          >
            {/* <Typography
              textAlign="center"
              variant="h6"
              color="primary.main"
              component="span"
              fontWeight={"bold"}
            >
              Make an Adopt
              <Box component="span" color="secondary.dark">
                ion Request
              </Box>
            </Typography> */}
            <Backdrop
              sx={{color: "#fff", zIndex: theme => theme.zIndex.drawer + 1}}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{backgroundColor: "white", opacity: "0.95"}}
            >
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
                    type="text"
                    id="email"
                    label="Email"
                    variant="standard"
                    fullWidth={true}
                    defaultValue={userData?.email}
                    {...register("email")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="contactNumber"
                    label="Contact Number"
                    variant="standard"
                    type="text"
                    defaultValue={
                      userData.contactNumber ? userData.contactNumber : ""
                    }
                    fullWidth={true}
                    {...register("contactNumber")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="volunteerExperience"
                    label="Additonal Information ( Skills and Experience,please write in details)"
                    variant="standard"
                    type="text"
                    fullWidth={true}
                    required
                    {...register("volunteerExperience")}
                  />
                </Grid>
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      checked={agreeConditions}
                      onChange={() => setAgreeConditions(!agreeConditions)}
                    />
                  }
                  label="Agree To Terms & Conditions"
                />
              </Grid>

              {/* <Checkbox label="Agree To Terms & Conditions" /> */}
              <Button
                disabled={!agreeConditions || loading}
                sx={{
                  marginBottom: 5,
                  width: "200px",
                  textAlign: "center",
                  backgroundColor: "secondary.dark",
                }}
                type="submit"
              >
                Submit Request
              </Button>
            </form>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ApplicationPage;
