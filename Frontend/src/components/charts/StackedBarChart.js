import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = ({ data, selectedMunicipio }) => {
  let keys = [];

  // Filtra los datos por el municipio seleccionado
  const filteredData = data.filter(entry => entry.municipioDAP === selectedMunicipio);

  // Verificar si filteredData no está vacío y su primer elemento es un objeto
  if (filteredData.length > 0 && typeof filteredData[0] === 'object' && filteredData[0] !== null) {
    keys = Object.keys(filteredData[0]).filter(key => key !== 'año' && key !== 'municipioDAP');
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map((key, index) => (
          <Bar
            key={index}
            dataKey={key}
            stackId="a"
            fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};


export default StackedBarChart;