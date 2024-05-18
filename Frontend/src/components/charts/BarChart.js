import React from "react";
import { BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

const municipiosOfInterest = ['Santander De Quilichao', 'Puerto Tejada', 'Guachené'];

const BarChartComponent = ({ data, xAxisDataKey, barDataKey }) => {
  const removeDuplicates = (arr, prop) => arr.filter((obj, index) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === index);

  const filteredData = data ? removeDuplicates(data.filter((item) => municipiosOfInterest.includes(item.MunicipioAS)), 'MunicipioAS') : [];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={barDataKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
