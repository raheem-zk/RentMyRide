// BarChart.js
import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChart = ({
  width,
  height,
  user,
  blockedUser,
  carOwnerData,
  blockedCarOwnerData,
  newOrders,
  totalOrders,
}) => {
  const data = [
    { name: "User", value: user },
    { name: "Blocked User", value: blockedUser },
    { name: "Car Owner", value: carOwnerData },
    { name: "Blocked Car Owner", value: blockedCarOwnerData },
    { name: "New Orders", value: newOrders },
    { name: "Total Orders", value: totalOrders },
  ];

  return (
    <div className="w-fit max-w-fit">
      <RechartsBarChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </RechartsBarChart>
    </div>
  );
};

export default BarChart;
