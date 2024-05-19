import React from "react";
import { BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

const municipiosOfInterest = ['Santander de Quilichao', 'Puerto Tejada', 'Guachené'];

const BarChartComponent = ({ data, xAxisDataKey, barDataKey, onClick }) => {
  const handleClick = (municipio) => {
    onClick(municipio); // Llama a la función onClick definida en el componente padre
  };

  const removeDuplicates = (arr, prop) =>
    arr.filter(
      (obj, index) =>
        arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index
    );

  const filteredData = data
    ? removeDuplicates(
      data.filter((item) => {
        const matched = municipiosOfInterest.some(municipio =>
          item.MunicipioAS.toLowerCase().includes(municipio.toLowerCase())
        );

        return matched;
      }),
      "MunicipioAS"
    )
    : [];

  console.log(filteredData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={barDataKey}
          fill="#8884d8"
          onClick={(data, index) =>
            handleClick(filteredData[index].MunicipioAS)
          }
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;