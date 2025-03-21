import HeroSection from "@/components/UI/HomePage/HeroSection";
import HomeCards from "@/components/UI/HomePage/HomeCards";
import GetOppr from "@/components/UI/HomePage/Opportunity/GetOppr";
import Opportunities from "@/components/UI/HomePage/Opportunity/Opportunities";

import {Button, Container, Typography} from "@mui/material";
import Image from "next/image";

export default function Home({
  searchParams = {},
}: {
  searchParams?: {
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: string;
    rentalPlan?: string;
  };
}) {
  console.log("searchparams: ", searchParams);
  const query = new URLSearchParams(searchParams);
  const queries = query.toString();
  console.log("que: ", queries, "\n without string: ", query);

  return (
    // <Container>
    <>
      <HeroSection />
      <HomeCards />

      <GetOppr searchParams={searchParams} />
    </>
    // </Container>
  );
}
