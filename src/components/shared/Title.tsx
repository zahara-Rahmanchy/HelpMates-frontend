import {Box, Typography} from "@mui/material";

const MainTitle = ({value, colorCode}: {value: string; colorCode: string}) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        position: "relative",
        width:'100%',
       
        // display: "inline-block",
        mx: "auto",
        marginTop: "40px",
        marginBottom: "5px",
      }}
    >
      {/* Title Text */}
      <Typography
        variant="h3"
        component="h1"
        color={"#1f2937"}
        fontSize={{md:"40px",xs:"30px"}}
        sx={{fontWeight: "bold", display: "inline-block", zIndex: 90}}
      >
        {value}
      </Typography>

      {/* SVG Underline */}
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 375 22"
        fill="none"
        sx={{
          position: "relative",
          bottom: "10px", // Align it under the text
          left: "50%",
          transform: "translateX(-50%)",
          width: "50%",
          height: "auto", // Adjust based on preference
          zIndex: 0,
        }}
      >
        <path
          d="M0.5 8.77505C48.9252 6.35597 225.193 1.65103 369.5 8.77508C294.592 8.77507 196.994 9.49544 134.154 17"
          stroke={colorCode}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </Box>
    </Box>
  );
};

export default MainTitle;
