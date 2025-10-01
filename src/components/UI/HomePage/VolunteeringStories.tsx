"use client"
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Avatar, Paper } from '@mui/material';
import Image from 'next/image';

const stories = [
  {
    name: "John Doe",
    image: "https://images.unsplash.com/photo-1455354269813-737d9df115bb?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    story: "Volunteering here changed my perspective. I realized how small actions can create a huge impact. Each day I spend helping out brings new challenges, but also incredible rewards. Meeting people from different walks of life and seeing the direct results of our efforts has been truly inspiring.",
  },
  {
    name: "Jane Smith",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    story: "Helping others brought me immense joy and satisfaction. Every effort counts! From organizing events to lending a listening ear, I discovered that even small gestures can make someone’s day brighter. This experience has helped me grow both personally and professionally, and I’m motivated to continue contributing.",
  },
  {
    name: "Mark Lee",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    story: "Being part of the volunteering community made me feel more connected to society. I’ve built lasting friendships while working on meaningful projects. The sense of purpose I get from contributing to something bigger than myself is unparalleled, and it has taught me the value of empathy, teamwork, and perseverance.",
  },
];


const VolunteeringStories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, 5000); // change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ py: 6 }} bgcolor={"secondary.dark"} marginBottom={10}>
      {stories.map((item, index) => (
        <Paper
          key={index}
          elevation={3}
        
          sx={{
            bgcolor:"secondary.dark",
            boxShadow:"0",
            p: 4,
            borderRadius: 3,
            maxWidth: 900,
            mx: 'auto',
            mb: 4,
            display: index === activeIndex ? 'block' : 'none', // only show active slide
            transition: 'all 0.5s ease-in-out',
          }}
        >
          <Grid container spacing={10} alignItems="center" justifyContent={"space-evenly"} bgcolor={"transparent"}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#fff', fontSize: '2rem',textWrap:"nowrap" }} marginBottom={2}>
                Voluntering Stories
              </Typography>
              <Image  src={item.image}
                alt={item.name}
                width={350}
                height={350}
                style={{margin: 'auto',boxShadow:"10px 5px 10px #fcbab8" ,height:"200px",width:"400px"}} />
           
            </Grid>
            <Grid item xs={12} md={8} padding={4}>
              <Typography variant="body1" sx={{ color: '#fff', fontSize: '1.1rem' }} marginTop={10}>
                {item.story}
              </Typography> 
               <Typography variant="h6" sx={{ mt: 2, color: 'tertiary.main' }}>
                - {item.name}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default VolunteeringStories;
