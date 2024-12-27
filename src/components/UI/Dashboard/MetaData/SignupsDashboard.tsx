// import React, {useState, useEffect} from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Brush,
// } from "recharts";
// import {Box, Card, Typography, Button, Menu, MenuItem} from "@mui/material";

// const UserGrowthChart = ({data}) => {
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to the current year
//   const [filteredData, setFilteredData] = useState([]);

//   // Function to filter data based on the selected year
//   useEffect(() => {
//     const filtered = data.filter(item => {
//       const itemYear = new Date(item.date).getFullYear();
//       return itemYear === selectedYear;
//     });
//     setFilteredData(filtered);
//   }, [selectedYear, data]);

//   // Get unique years from the data
//   const years = Array.from(
//     new Set(data.map(item => new Date(item.date).getFullYear()))
//   );

//   // Handle year selection
//   const [anchorEl, setAnchorEl] = useState(null);
//   const openMenu = event => setAnchorEl(event.currentTarget);
//   const closeMenu = () => setAnchorEl(null);
//   const handleYearSelect = year => {
//     setSelectedYear(year);
//     closeMenu();
//   };

//   return (
//     <Card
//       sx={{
//         borderRadius: "10px",
//         width: "100%",
//         margin: "10px",
//         boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       <Typography
//         variant="h6"
//         marginTop={2}
//         fontWeight={"bold"}
//         color={"primary.main"}
//       >
//         User Growth: {selectedYear}
//       </Typography>

//       <Button variant="contained" color="primary" onClick={openMenu}>
//         Select Year
//       </Button>

//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
//         {years.map(year => (
//           <MenuItem key={year} onClick={() => handleYearSelect(year)}>
//             {year}
//           </MenuItem>
//         ))}
//       </Menu>

//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={filteredData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="count" stroke="#8884d8" />
//           <Brush />
//         </LineChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// };

// export default UserGrowthChart;

import React, {useState} from "react";
import {
  Box,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Bar,
  ComposedChart,
} from "recharts";
import {useGetSignupsQuery} from "@/redux/api/DashboardMetaApi";
// import {useGetSignupsQuery} from "../api/DashboardSignupsApi";

const SignupsDashboard: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<number>();

  // Fetch signups data
  const {data, isLoading} = useGetSignupsQuery({
    year: selectedYear,
    month: selectedMonth,
  });

  // Separate data for daily and monthly signups
  const dailySignups = data?.dailySignups || [];
  const monthlySignups = data?.monthlySignups || [];

  // Handle year selection change
  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const year = parseInt(event.target.value as string, 10);
    setSelectedYear(year);
    setSelectedMonth(currentMonth);
  };

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setSelectedMonth(parseInt(event.target.value as string, 10));
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{marginY: "60px"}}>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        color={"primary.main"}
        textAlign={"center"}
      >
        User Signup Analytics
      </Typography>

      {/* Year and Month Selectors */}
      <Box display="flex" gap={2} mb={4}></Box>

      {/* Daily Signups Graph */}

      <Card
        sx={{
          background: "white",
          borderRadius: "10px",
          width: "100%",

          // height: "350px",
          marginX: {md: "10px", xs: "0px"},
          padding: 4,
          boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          // alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Stack
          flexDirection={{md: "row", xs: "column"}}
          justifyContent={{md: "space-between"}}
          alignItems={"center"}
        >
          <Typography variant="h6">
            Daily Signups in{" "}
            {selectedMonth
              ? new Date(0, selectedMonth - 1).toLocaleString("default", {
                  month: "long",
                })
              : new Date(0, currentMonth - 1).toLocaleString("default", {
                  month: "long",
                })}
            - {selectedYear ? selectedYear : currentYear}
          </Typography>
          <FormControl sx={{width: "100px"}}>
            <InputLabel>Month</InputLabel>
            <Select value={selectedMonth} onChange={handleMonthChange}>
              {Array.from({length: 12}).map((_, index) => (
                <MenuItem
                  key={index + 1}
                  value={index + 1}
                  defaultValue={currentMonth}
                >
                  {new Date(0, index).toLocaleString("default", {
                    month: "long",
                  })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={dailySignups}
            margin={{top: 10, right: 10, bottom: 40, left: 30}}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              // style={{background: "blue", paddingLeft: "30px"}}
            />
            <XAxis
              dataKey="signup_day"
              label={{
                value: "Date",
                fill: "#F06D64",
                position: "insideBottom", // Position the label inside or outside the axis
                offset: -10,
              }}
              tick={{fill: "blue", fontSize: "16px"}}
            />
            <YAxis
              label={{
                fill: "#F06D64",
                value: " SignUps",
                // offset: -20,
                angle: -90,

                position: "insideLeft",
              }}
              tick={{fill: "blue", fontSize: "13px"}}
            >
              {/* <Label
                value="Total Signups"
                offset={0}
                angle={-90}
                // position=""
              /> */}
            </YAxis>
            <Tooltip />
            {/* <Bar
              dataKey="total_signups"
              fill="#8884d8"
              barSize={30} // Adjust bar width
            /> */}
            <Line
              type="monotone"
              dataKey="total_signups"
              stroke="red"
              fill="#872346"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Monthly Signups Graph in a year */}
      <Card
        sx={{
          background: "white",
          borderRadius: "10px",
          width: "100%",

          // height: "350px",
          marginY: 9,
          marginX: {md: "10px", xs: "0px"},
          padding: 4,
          boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          // alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {" "}
        <Stack
          flexDirection={{md: "row", xs: "column"}}
          justifyContent={{md: "space-between"}}
          alignItems={"center"}
        >
          <Typography variant="h6" mt={4}>
            Monthly Signups in {selectedYear ? selectedYear : currentYear}
          </Typography>
          <FormControl sx={{width: "100px"}}>
            <InputLabel>Year</InputLabel>
            <Select value={selectedYear} onChange={handleYearChange}>
              {[2024, 2025, 2026].map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={monthlySignups}
            margin={{top: 20, right: 30, bottom: 40, left: 50}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="signup_month"
              label={{value: "Month", fill: "#F06D64", offset: 10}}
              tick={{fill: "blue", fontSize: "17px"}}
            />
            <YAxis
              label={{
                fill: "#F06D64",
                value: "SignUps",
                angle: -90,
                position: "insideLeft",
              }}
              tick={{fill: "blue", fontSize: "13px"}}
            />
            <Tooltip />
            <Bar
              dataKey="total_signups"
              fill="#872346"
              barSize={30} // Adjust bar width
            />
            <Line
              type="monotone"
              dataKey="total_signups"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
        {/* <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySignups}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="signup_month"
              label={{value: "Month", fill: "#F06D64", offset: 10}}
              tick={{fill: "blue", fontSize: "17px"}}
            />
            <YAxis
              label={{
                fill: "#F06D64",
                value: "SignUps",
                // offset: -10,
                angle: -90,
                position: "insideLeft",
              }}
              tick={{fill: "blue", fontSize: "13px"}}
            />
            <Tooltip />
            <Line type="monotone" dataKey="total_signups" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer> */}
      </Card>
    </Container>
  );
};

export default SignupsDashboard;
