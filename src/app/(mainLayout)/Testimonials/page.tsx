import testimonials from "@/data/testimonial.json";
import { Box, Grid } from "@mui/material";
import CommonHeader from "@/components/shared/CommonHeader";
import TestimonialCard from "@/components/UI/Testimonials/TestimonialCard";

export default function TestimonialsPage() {
  return (
     <Box  paddingBottom={20} bgcolor={"#fef2f2"} width={"100%"}>
        <CommonHeader  headerFirst={"Testimonials"} headerSecond="How does our organizations feel!" />
      
      <Grid
          container
          spacing={2} // gap between items
          justifyContent="center" // horizontal centering
          alignItems="center" // vertical centering
          py={5}
          marginTop={{md:10}}
        >
          {testimonials.map((review, index) => (
            <Grid
              item
              key={index}
              py={5}
              xs={12} // 1 column for small screens
              md={4}  // 3 columns for medium and above (12/4=3)
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <TestimonialCard testimonial={review} />
            </Grid>
        ))}
      </Grid>
    </Box>
  );
}
