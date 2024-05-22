import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF7C19', '#AB1D17', '#17ABAB', '#7A17AB', '#ABD717'];

const GroupedBarChart = ({ data, selectedMunicipio }) => {
  const filteredData = data.filter(entry => entry.municipioDAP === selectedMunicipio);
  const disabilities = Object.keys(filteredData[0] || {}).filter(key => key !== 'año' && key !== 'municipioDAP' && key !== 'totalDAP');
  const chartData = filteredData.map(entry => {
    const entryData = { year: entry.año };
    disabilities.forEach(disability => {
      entryData[disability] = entry[disability];
    });
    return entryData;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="año" />
        <YAxis />
        <Tooltip />
        {disabilities.map((disability, index) => (
          <Bar 
            key={index} 
            dataKey={disability} 
            fill={COLORS[index % COLORS.length]} 
            name={disability} 
            legendType="none"
          />
        ))}
        <Legend 
          align="center" 
          verticalAlign="bottom" 
          wrapperStyle={{ padding: '10px' }}
          formatter={(value, entry) => {
            const maxLength = 10; // Definir la longitud máxima de los textos de la leyenda
            return value.length > maxLength ? `${value.substring(0, maxLength)}...` : value;
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GroupedBarChart;
