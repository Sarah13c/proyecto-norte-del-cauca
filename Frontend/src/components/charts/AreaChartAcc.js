// AreaChart.js
import React from "react";
import Chart from "react-apexcharts";

const AreaChartAcc = ({ data, selectedZone }) => {
  // Obtener la lista de municipios
  const municipalities = [...new Set(data.map((entry) => entry.MUNICIPIO_Homi1922_HECHO))];

  // Filtrar los datos por zona seleccionada
  const filteredData = selectedZone
    ? data.filter((entry) => entry.ZONA_Homi1922 === selectedZone)
    : data;

  // Crear la serie de datos para la gráfica
  const seriesData = municipalities.map((municipality) => ({
    name: municipality,
    data: filteredData
      .filter((entry) => entry.MUNICIPIO_Homi1922_HECHO === municipality)
      .map((entry) => parseInt(entry.CANTIDAD)),
  }));

  const options = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: filteredData.map((entry) => entry.AÑO_Homi1922),
      title: {
        text: "Año",
      },
    },
    yaxis: {
      title: {
        text: "Cantidad",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => val,
      },
    },
    colors: ["#0088FE", "#00C49F", "#FFBB28"],
  };

  return (
    <div id="chart">
      <Chart options={options} series={seriesData} type="area" height={350} />
    </div>
  );
};

export default AreaChartAcc;
