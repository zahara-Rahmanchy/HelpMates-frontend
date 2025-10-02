import testimonials from "@/data/testimonial.json";
import { Box } from "@mui/material";
import CommonHeader from "@/components/shared/CommonHeader";
import TestimonialCard from "@/components/UI/Testimonials/TestimonialCard";

export default function TestimonialsPage() {
  return (
     <Box  paddingBottom={20}>
        <CommonHeader  headerFirst={"Testimonials"} headerSecond="How does our organizations feel!" />
      <h1 className="text-3xl font-bold mb-8 ms-10">Testimonials</h1>
      <div className="grid md:grid-cols-3 gap-6 px-10 bg-red-50">
        {testimonials.map((review, index) => (
          <TestimonialCard key={index} testimonial={review} />
        ))}
      </div>
    </Box>
  );
}
