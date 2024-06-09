import React from "react";
import Chart from "react-apexcharts";

const StackedBarChartAcc = ({ data }) => {
  // Obtener las entidades (municipios) únicos
  const municipalities = [...new Set(data.map((entry) => entry.Entidad))];

  // Obtener los años únicos
  const years = [...new Set(data.map((entry) => entry.Año))].sort();

  // Crear las series para el gráfico de líneas
  const series = municipalities.map((municipality) => {
    return {
      name: municipality,
      data: years.map((year) => {
        const entry = data.find((item) => item.Entidad === municipality && item.Año === year);
        return entry ? parseFloat(entry.Dato_Numérico.replace(",", ".")) : 0;
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
        text: 'Número acumulado de personas secuestradas',
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default StackedBarChartAcc;