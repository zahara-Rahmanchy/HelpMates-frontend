import Link from "next/link";
import TestimonialCard from "./TestimonialCard";
import testimonials from "@/data/testimonial.json";
import MainTitle from "@/components/shared/Title";
import { Box, Button, Stack } from "@mui/material";
import SubTitle from "@/components/shared/SubTitle";

const TestimonialsPreview = () => {
  const preview = testimonials.slice(0, 3); 
  return (
    <Box marginX={"auto"} width={"100%"}>
       <MainTitle
        
        value={String("What our Partner says")}
        colorCode="#F06D64"
      />
     <SubTitle sub={"Testimonials"}/>
      <div className="grid md:grid-cols-3 m-0 p-0 place-items-center">
        {preview.map((t, index) => (
          <TestimonialCard key={index} testimonial={t} />
        ))}
      </div>
      <div className="my-20 w-full mx-auto text-center ">
        <Link href="/Testimonials">
          <Button sx={{
            width:"200px",
            bgcolor:"primary.main"
          }}  className=" text-white px-5 py-2 rounded hover:bg-rose-700 bg-rose-950 ">
            View More
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default TestimonialsPreview;
