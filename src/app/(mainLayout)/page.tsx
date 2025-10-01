import VolunteeringFAQs from "@/components/UI/HomePage/FAQ";
import HeroSection from "@/components/UI/HomePage/HeroSection";
import HomeCards from "@/components/UI/HomePage/HomeCards";
import GetOppr from "@/components/UI/HomePage/Opportunity/GetOppr";
import Opportunities from "@/components/UI/HomePage/Opportunity/Opportunities";
import VolunteeringStories from "@/components/UI/HomePage/VolunteeringStories";
import WhyUs from "@/components/UI/HomePage/WhyUs";
// import WhyUs from "@/components/UI/HomePage/WhyUs";
import HowItWorksSection from "@/components/UI/HomePage/WorkingProcess";
import TestimonialsPreview from "@/components/UI/Testimonials/TestimonialPreview";

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
      {/* <HowItWorksSection/> */}
      <WhyUs/>
      <GetOppr searchParams={searchParams} />
      <VolunteeringStories/>
      <TestimonialsPreview/>
      <VolunteeringFAQs/>
    </>
    // </Container>
  );
}
