import {Card, Typography} from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export const BarChartComponent = ({barchartData}) => {
  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        width: "100%",

        height: "350px",
        marginX: {md: "10px", xs: "0px"},
        paddingY: 4,
        boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Typography
        variant="h6"
        marginY={2}
        fontWeight={"bold"}
        color={"primary.main"}
      >
        Application Status
      </Typography>{" "}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={150}
          height={40}
          data={barchartData}
          style={{background: "", paddingLeft: "30px", paddingRight: "30px"}}
        >
          <XAxis dataKey="status">
            <Label
              value="Status"
              fill="#F06D64"
              offset={0}
              position="insideBottom"
            />
          </XAxis>

          <YAxis
            label={{
              fill: "#F06D64",
              value: "No. of Applications",
              offset: 10,
              angle: -90,
              position: "insideBottomLeft",
            }}
          />

          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#872346" barSize={100} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
