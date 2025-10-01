import Link from "next/link";
import TestimonialCard from "./TestimonialCard";
import testimonials from "@/data/testimonial.json";
import MainTitle from "@/components/shared/Title";
import { Box, Button, Stack } from "@mui/material";
import SubTitle from "@/components/shared/SubTitle";

const TestimonialsPreview = () => {
  const preview = testimonials.slice(0, 3); 
  return (
    <Box className="pb-10  px-4 md:px-10 text-center" >
       <MainTitle
        
        value={String("What our Partner says")}
        colorCode="#F06D64"
      />
     <SubTitle sub={"Testimonials"}/>
      <div className="grid md:grid-cols-3 gap-6">
        {preview.map((t, index) => (
          <TestimonialCard key={index} testimonial={t} />
        ))}
      </div>
      <div className="mt-10">
        <Link href="/Testimonials">
          <Button sx={{
            width:"200px",
            bgcolor:"primary.main"
          }}  className=" text-white px-5 py-2 rounded hover:bg-rose-700 bg-rose-950">
            View More
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default TestimonialsPreview;
