import {Box, Card, Typography} from "@mui/material";
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  LabelList,
} from "recharts";

const COLORS = ["#F7A582", "#872346", "#FF8042"];
const PieChartComponent = ({piechartData}) => {
  console.log("piedata: ", piechartData);
  return (
    <Card
      sx={{
        backgroundColor: "#ff",
        borderRadius: "10px",
        width: "100%",
        height: "350px",
        marginX: {md: "10px", xs: "0px"},
        paddingY: 4,
        // boxShadow: "none",
        boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h6" fontWeight={"bold"} color={"primary.main"}>
        Opportunity Status
      </Typography>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart
          width={360}
          height={280} //style={{background: "lightgrey"}}
        >
          <Pie
            dataKey="percentage" // Use the numeric "percentage" field
            isAnimationActive={true}
            data={piechartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={({status}: {status: string}) => `${status}`}
            fill="#8884d8"
          >
            {/* Add Inside Labels for Percentages */}
            <LabelList
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fill: "#fff", // Text color
                textShadow: "none", // Remove unwanted shadow effects
                border: "none", // Remove borders if present
              }}
              dataKey="percentage"
              position="inside"
              formatter={(value: number) => `${value}%`}
            />
            {/* Add Outside Labels for Status */}

            {piechartData.map((_: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PieChartComponent;
