import React from "react";
import Chart from "react-apexcharts";

const StackedLineChartMV = ({ data }) => {
  // Obtener las entidades (municipios) únicos
  const municipalities = [...new Set(data.map((entry) => entry["MUNICIPIO DEL HECHO"]))];

  // Obtener los años únicos
  const years = [...new Set(data.map((entry) => entry.AÑO))].sort();

  // Crear las series para el gráfico de líneas
  const series = municipalities.map((municipality) => {
    return {
      name: municipality,
      data: years.map((year) => {
        const count = data.filter((entry) => entry["MUNICIPIO DEL HECHO"] === municipality && entry.AÑO === year).reduce((total, entry) => total + parseInt(entry.CANTIDAD), 0);
        return count;
      }),
    };
  });

  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: years,
    },
    yaxis: {
      title: {
        text: 'Número de muertes violentas',
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default StackedLineChartMV;