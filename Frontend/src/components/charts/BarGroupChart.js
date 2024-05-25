import React from "react";
import {
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

const BarGroupChart = ({ data, selectedYear }) => {
  // Filtrar los datos por el año seleccionado
  const filteredData = selectedYear
    ? data.filter((entry) => entry.Año === selectedYear)
    : data;

  // Agrupar los datos por MunicipioAS y Regimen
  const groupedData = filteredData.reduce((acc, curr) => {
    const { MunicipioAS, Regimen, Afiliados } = curr;
    if (!acc[MunicipioAS]) {
      acc[MunicipioAS] = {};
    }
    acc[MunicipioAS][Regimen] = Afiliados;
    return acc;
  }, {});

  // Convertir los datos agrupados a un formato adecuado para Recharts
  const chartData = Object.entries(groupedData).map(([MunicipioAS, regimenes]) => {
    return {
      MunicipioAS,
      ...regimenes,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="MunicipioAS" tick={{ fontSize: 13 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Subsidiado" fill="#8884d8" stackId="a" />
        <Bar dataKey="Excepción" fill="#82ca9d" stackId="a" />
        <Bar dataKey="Contributivo" fill="#ffc658" stackId="a" />
        <Bar dataKey="Sisben II" fill="#A3D2FF" stackId="a" />
        <Bar dataKey="Sisben I" fill="#9BC6FF" stackId="a" />
        <Bar dataKey="PPNA" fill="#ff7f0e" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGroupChart;
