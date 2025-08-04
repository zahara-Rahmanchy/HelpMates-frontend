import testimonials from "@/data/testimonial.json";
import { Box } from "@mui/material";
import CommonHeader from "@/components/shared/CommonHeader";
import TestimonialCard from "@/components/UI/Testimonials/TestimonialCard";

export default function TestimonialsPage() {
  return (
     <Box  paddingBottom={20} marginX={30}>
        <CommonHeader headerFirst={"Testimonials"} headerSecond="How does our organizations feel!" />
      <h1 className="text-3xl font-bold mb-8">Testimonials</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, index) => (
          <TestimonialCard key={index} testimonial={t} />
        ))}
      </div>
    </Box>
  );
}
