import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './SalesAnalytics.css';

const SalesAnalytics = ({ data = [] }) => {
  // Custom tooltip to show total sales
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="sales">{`Sales: ${payload[0].value}`}</p>
          <p className="cumulative">{`Total Sales: ${payload[0].payload.cumulativeSales}`}</p>
        </div>
      );
    }
    return null;
  };

  // Ensure only 7-14 days are shown on the x-axis
  const displayData = data.slice(-14); // last 14 days max

  return (
    <div className="sales-analytics">
      <h2>Sales Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={displayData}>
          <XAxis dataKey="name" stroke="#BDBDBD" tick={{ fill: '#888', fontWeight: 500 }} />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="sales" fill="#BDBDBD" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalytics; 