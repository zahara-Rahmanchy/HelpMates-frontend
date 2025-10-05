
"use client"
import {Box, Container, duration, Stack, Typography} from "@mui/material";
import {motion, stagger} from "framer-motion";
import {staggerContainer,slideAnimation,fadeIn} from "@/DesignUtils/motion";

const cards = [
  {
    title: "Opening Hours",
    text: "Open 9.00 am to ",
    text2: "5.00pm Everyday",
    bg: "secondary.main",
    svg: (
      <svg
        className="ml-4 w-7"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 12.5V25H34.375M43.75 25C43.75 27.4623 43.265 29.9005 42.3227 32.1753C41.3805 34.4502 39.9993 36.5172 38.2582 38.2582C36.5172 39.9993 34.4502 41.3805 32.1753 42.3227C29.9005 43.265 27.4623 43.75 25 43.75C22.5377 43.75 20.0995 43.265 17.8247 42.3227C15.5498 41.3805 13.4828 39.9993 11.7417 38.2582C10.0006 36.5172 8.61953 34.4502 7.67726 32.1753C6.73498 29.9005 6.25 27.4623 6.25 25C6.25 20.0272 8.22544 15.2581 11.7417 11.7417C15.2581 8.22544 20.0272 6.25 25 6.25C29.9728 6.25 34.7419 8.22544 38.2582 11.7417C41.7746 15.2581 43.75 20.0272 43.75 25Z"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Our Locations",
    text: "Dhanmondi 17, Dhaka",
    text2: "-1200, Bangladesh",
    bg: "secondary.dark",
    svg: (
      <svg
        className="ml-4 w-7"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.25 21.875C31.25 23.5326 30.5915 25.1223 29.4194 26.2944C28.2473 27.4665 26.6576 28.125 25 28.125C23.3424 28.125 21.7527 27.4665 20.5806 26.2944C19.4085 25.1223 18.75 23.5326 18.75 21.875C18.75 20.2174 19.4085 18.6277 20.5806 17.4556C21.7527 16.2835 23.3424 15.625 25 15.625C26.6576 15.625 28.2473 16.2835 29.4194 17.4556C30.5915 18.6277 31.25 20.2174 31.25 21.875V21.875Z"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40.625 21.875C40.625 36.7542 25 45.3125 25 45.3125C25 45.3125 9.375 36.7542 9.375 21.875C9.375 17.731 11.0212 13.7567 13.9515 10.8265C16.8817 7.8962 20.856 6.25 25 6.25C29.144 6.25 33.1183 7.8962 36.0485 10.8265C38.9788 13.7567 40.625 17.731 40.625 21.875V21.875Z"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Contact Us",
    text: "+88 01750 00 00 00",
    text2: "+88 01750 00 00 00",
    bg: "primary.light",
    svg: (
      <svg
        className="ml-6 w-6"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42.1875 7.8125V17.1875M42.1875 7.8125H32.8125M42.1875 7.8125L29.6875 20.3125M35.9375 45.3125C18.6792 45.3125 4.6875 31.3208 4.6875 14.0625V9.375C4.6875 8.1318 5.18136 6.93951 6.06044 6.06044C6.93951 5.18136 8.1318 4.6875 9.375 4.6875H12.2333C13.3083 4.6875 14.2458 5.41875 14.5062 6.4625L16.8104 15.6771C17.0396 16.5937 16.6979 17.5562 15.9417 18.1208L13.2479 20.1417C12.8624 20.4208 12.5771 20.8168 12.4345 21.2709C12.2918 21.7251 12.2995 22.2131 12.4562 22.6625C13.7102 26.0732 15.6904 29.1705 18.26 31.74C20.8295 34.3096 23.9268 36.2898 27.3375 37.5437C28.2562 37.8812 29.2708 37.5354 29.8583 36.7521L31.8792 34.0583C32.1558 33.6891 32.5352 33.4097 32.9699 33.2551C33.4046 33.1006 33.8753 33.0778 34.3229 33.1896L43.5375 35.4938C44.5792 35.7542 45.3125 36.6917 45.3125 37.7667V40.625C45.3125 41.8682 44.8186 43.0605 43.9396 43.9396C43.0605 44.8186 41.8682 45.3125 40.625 45.3125H35.9375V45.3125Z"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const HomeCards = () => {

  return (
    <Box>
      <Container>
        <Stack
         component={motion.div}
         animate="show"
        //  variants={staggerContainer}
          direction={{md: "row", xs: "column"}}
          gap={6}
          justifyContent="center"
          alignItems={"center"}
        >
        
          {cards.map((card, index) => (
            <Stack
              key={index}
              component={motion.div}
              variants={slideAnimation("down")}
              initial="initial"
              // whileInView="whileInView"
              // direction="row"
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.35, ease: "easeInOut" },
            }}
              // justifyContent={"center"}
              alignItems={"normal"}
              bgcolor={card.bg}
              paddingX={5}
              paddingY="30px"
              borderRadius="10px"
              // gap={2}
              width="300px"
            >
              {/* Icon and title */}
              <Typography
                color="white"
                variant="body1"
                fontSize="20px"
                fontWeight="bold"
                display="flex"
                flexDirection={"row"}
                // bgcolor={"red"}
                // justifyContent={"center"}
                alignItems="center"
                gap={1}
              >
                {card.svg}
                {card.title}
              </Typography>

              {/* Description */}
              <Box >
                <Typography
                  variant="body1"
                  color="white"
                
                // bgcolor={"red"}
                // justifyContent={"center"}
                marginLeft={3}
             
                  paragraph
                  sx={{ fontSize: "16px", lineHeight: 1.6, textAlign: "left" }}
                >
                 {card.text}
                 <br/>
                 {card.text2 &&card.text2} 
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
        {/* </Stack> */}




      </Container>
    </Box>
  );
};

export default HomeCards;
