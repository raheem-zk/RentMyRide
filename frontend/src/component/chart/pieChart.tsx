// PieChart.js
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const PieChart = ({ width, height, totalRevenue, newOrder, totalCars }) => {
  const data = [
    { name: 'Total Revenue', value: totalRevenue },
    { name: 'New Order', value: newOrder },
    { name: 'Total Cars', value: totalCars },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="w-full max-w-md mx-auto">
      <RechartsPieChart width={width} height={height}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          label={(entry) => entry.name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </RechartsPieChart>
    </div>
  );
};

export default PieChart;
