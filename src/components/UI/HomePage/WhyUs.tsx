import MainTitle from '@/components/shared/Title'
import { Box, Card, CardContent, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { SparklesIcon, ClockIcon, AcademicCapIcon, UsersIcon, CursorArrowRaysIcon, ShieldCheckIcon, StarIcon } from "@heroicons/react/24/outline";
const WhyUs = () => {
  const points = [
    {
      title: "Make Real Impact",
      desc: "Connect directly with meaningful causes that truly need your help.",
    },
    {
      title: "Flexible Opportunities",
      desc: "Find volunteering roles that fit your schedule and skills.",
    },
    {
      title: "Grow Your Skills",
      desc: "Gain valuable experience and build a network while giving back.",
    },
    {
      title: "Community Support",
      desc: "Join a passionate community of volunteers and organizations.",
    },
    {
      title: "Easy to Use",
      desc: "Simple application process and clear tracking of your volunteer journey.",
    },
    {
      title: "Trusted Organizations",
      desc: "Volunteer with verified NGOs and social initiatives you can trust.",
    },
    {
      title: "Recognition & Growth",
      desc: "Get acknowledged for your contributions and grow into leadership roles.",
    },
  ];
  const iconMap = [
  SparklesIcon,
  ClockIcon,
  AcademicCapIcon,
  UsersIcon,
  CursorArrowRaysIcon,
  ShieldCheckIcon,
  StarIcon
];

// Soft pastel background colors for icons
const iconBgColors = [
  "#FFD1DC", // pastel pink
  "#FFE5B4", // peach
  "#C1E1C1", // pastel green
  "#B5E3FF", // pastel blue
  "#EACFFF", // pastel purple
  "#FFFACD", // pastel yellow
  "#FFB6B9"  // light coral/pink
];

  return (
    <Box textAlign={"center"} marginY={15}>
      <MainTitle 
         value={String("Why Choose Volunteering with HelpMates?")}
         colorCode="#F06D64"
        />  
    <Stack direction={{xs: "column", lg: "row"}} 
      // bgcolor={"blue"}
     
       justifyContent={"center"}
       marginTop={10}
       className="h-[600px] max-h-fit"
    >
       <Stack spacing={2} justifyContent={{lg:"center",xs:"left"}} //bgcolor={"red"}
       >
      {points.map((point, index) => {
        const Icon = iconMap[index];
        const bgColor = iconBgColors[index];
        return (
          <Card
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent:"center",
              // background: "linear-gradient(135deg, #6B143D 0%, #512C6E 100%)",
              color: "tertiary.dark",
              borderRadius: 2,
              marginTop:4,
              // boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              boxShadow:"none",
              padding: 5
            }}
          >
            <Box
              sx={{
                flexShrink: 0,
                // backgroundColor:"red",
                backgroundColor: bgColor,
                borderRadius: "50%",
                padding: 1.5,
                marginRight: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon style={{ width: 32, height: 32, color: "#6B143D" }} />
            </Box>
            <CardContent sx={{ paddingY: 0 }}>
              <Typography variant="h6" fontWeight="bold" textAlign={"left"}>
                {point.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }} color={""}>
                {point.desc}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
      <Box width={{md:"50%",xs:"100%"}} display={"flex"} justifyContent={"center"}   position={'relative'}
        sx={{
          
            // border: "8px solid #fcbab8", 
            // outline: "1px dotted", 
            // outlineOffset: "3px",
            // margin:10

        }}>
      <Image src="https://images.unsplash.com/photo-1652971876875-05db98fab376?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        height={"300"} width={"500"} alt='image' loading='lazy'
        style={{position:"absolute",borderRadius:"10px",boxShadow:"-9px 10px 50px 3px #731A42"}}/>
      
      
      <Image src="https://images.unsplash.com/photo-1557660559-42497f78035b?q=80&w=1246&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        height={"300"} width={"400"} alt='image' loading='lazy'  
        style={{position:"absolute",borderRadius:"10px",top:"50%", right:"-2%",  zIndex:1
          ,boxShadow:"-10px 0px 50px 3px #731A42"
        }}/>

         <Image src="/volunteers.jpg"
        height={"350"} width={"200"} alt='image' loading='lazy' 
         
        style={{position:"absolute",borderRadius:"10px",left:"20%",top:"55%",
          zIndex:2
          ,boxShadow:"-10px 0px 100px 3px #731A42"
        }}/>

      </Box>
    </Stack>

    </Box>
  )
}

export default WhyUs