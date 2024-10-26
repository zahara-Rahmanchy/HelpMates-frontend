import HeroSection from "@/components/UI/HomePage/HeroSection";
import HomeCards from "@/components/UI/HomePage/HomeCards";
import GetOppr from "@/components/UI/HomePage/Opportunity/GetOppr";
import Opportunities from "@/components/UI/HomePage/Opportunity/Opportunities";

import {Button, Container, Typography} from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    // <Container>
    <>
      <HeroSection />
      <HomeCards />
      {/* <Opportunities /> */}
      <GetOppr />
    </>
    // </Container>
  );
}
