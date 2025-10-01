
import { Avatar, CardContent, CardHeader, Typography,Card } from "@mui/material";
import React from "react";

type Testimonial = {
  organization: string;
  author: string;
  designation:string;
  testimonial: string;
  image?:string
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: 360,
      p: 2,
      boxShadow: 3,
      borderRadius: 3,
      backgroundColor: "#fff",
    }}
  >
    <CardHeader
      avatar={
        <Avatar
          src={testimonial.image|| ""}
          alt={testimonial.author}
          sx={{ width: 75, height: 65, bgcolor: "#6B143D",borderColor:"primary.light",
            borderWidth:"3px" }}
        >
          {testimonial.author[0]}
        </Avatar>
      }
      title={
      <>
        <Typography
          variant="subtitle1"
          fontSize={"18px"}
          sx={{ fontWeight: 600, textAlign: "left" }}
        >
          {testimonial.author}
        </Typography>
         <Typography
          variant="subtitle1"
          fontSize={"16px"}
          sx={{ fontWeight: 600, textAlign: "left" }}
        >
          {testimonial.designation}
        </Typography>
      </>
        
      }
      
      subheader={
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left" }}
        >
          {testimonial.organization}
        </Typography>
      }
    />
    <CardContent>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: "italic", textAlign: "center" }}
      >
        “{testimonial.testimonial}”
      </Typography>
    </CardContent>
  </Card>
);

export default TestimonialCard;
