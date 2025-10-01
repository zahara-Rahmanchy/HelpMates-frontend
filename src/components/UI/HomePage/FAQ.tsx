import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainTitle from "@/components/shared/Title";
import { Fragment } from "react";

const faqs = [
  {
    question: "Why should I volunteer?",
    answer:
      "Volunteering allows you to make a positive impact, gain skills, meet new people, and give back to the community.",
  },
  {
    question: "Do I need experience to volunteer?",
    answer:
      "Most volunteering opportunities do not require prior experience. Enthusiasm and willingness to help are often enough.",
  },
  {
    question: "How much time do I need to commit?",
    answer:
      "Time commitments vary. Some roles require a few hours a week, while others are one-time events.",
  },
  {
    question: "Can volunteering help my career?",
    answer:
      "Yes! Volunteering can help you develop skills, build a network, and strengthen your resume.",
  },
  {
    question: "Are there online volunteering options?",
    answer:
      "Absolutely! Many organizations offer remote volunteering opportunities that you can do from home.",
  },
];

export default function VolunteeringFAQs() {
  return (
    <Container  maxWidth="lg" sx={{marginBottom:20,marginTop:5 }}>
    
        <Box marginBottom={4} textAlign={"center"}>
            <MainTitle
        value={String("Frequently Asked Questions!")}
         colorCode="#fcbab8"
         
        />
        </Box>
  
      {faqs.map((faq, index) => (
        <Accordion key={index} className=" mt-6 ">
          <AccordionSummary   expandIcon={<ExpandMoreIcon />} className="rounded-lg">
            <Typography variant="subtitle1" fontWeight="bold" className="text-lg text-blue-950">
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
