import React from "react";
import { BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

const municipiosOfInterest = ['Santander De Quilichao', 'Puerto Tejada', 'Guachené'];

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
        data.filter((item) => municipiosOfInterest.includes(item.MunicipioAS)),
        "MunicipioAS"
      )
    : [];

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
          } // Manejador de eventos onClick en las barras
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;