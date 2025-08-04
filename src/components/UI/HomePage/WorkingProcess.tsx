

import Image from "next/image";
import { Box, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  "Join the Community: Sign up as a volunteer or admin and complete your profile in minutes.",
  "Explore Opportunities: Browse verified roles with filtering by location, skills, org.",
  "Apply with Confidence: Submit your experience and track your application status.",
  "Make an Impact: Once approved, contribute meaningfully and build your journey.",
  "Manage with Ease (Admins): Post, update, and review applications from your dashboard.",
];

export default function HowItWorksSection() {
  return (
    <Box component="section" sx={{ py: 10, px: { xs: 3, md: 10 }, bgcolor: "#fff" }}>
      <Grid container spacing={6} alignItems="center">
        {/* Image on the left */}
        <Grid item xs={12} md={6}>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Image
              src="/images/volunteering-illustration.png" 
              alt=""
              width={600}
              height={400}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Grid>

        {/* Steps on the right */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom color="primary" fontWeight={600}>
            🚀 How It Works
          </Typography>

          <List>
            {steps.map((step, index) => (
              <ListItem key={index} alignItems="flex-start" disableGutters>
                <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
                  <CheckCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body1">{step}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
