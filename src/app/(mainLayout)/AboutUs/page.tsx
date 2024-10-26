"use client";
// import About from "@/components/UI/About/About";
import {teamInformation} from "@/constants/teamInformation";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, {useEffect, useState} from "react";

const About = dynamic(() => import("@/components/UI/About/About"), {
  ssr: false,
});
const AboutPage = () => {
  return <About />;
};

export default AboutPage;
