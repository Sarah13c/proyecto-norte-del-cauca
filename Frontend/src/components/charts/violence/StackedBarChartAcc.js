import React from "react";
import Chart from "react-apexcharts";

const StackedBarChartAcc = ({ data }) => {
  const groupedData = data.reduce((acc, entry) => {
    const year = entry.AÑO;
    const municipality = entry["MUNICIPIO DEL HECHO"];
    const count = entry.CANTIDAD;

    if (!acc[municipality]) {
      acc[municipality] = {};
    }
    if (!acc[municipality][year]) {
      acc[municipality][year] = 0;
    }
    acc[municipality][year] += parseInt(count, 10);

    return acc;
  }, {});

  const municipalities = Object.keys(groupedData);
  const years = [...new Set(data.map((entry) => entry.AÑO))].sort((a, b) => a - b);

  const series = municipalities.map((municipality) => ({
    name: municipality,
    data: years.map((year) => groupedData[municipality][year] || 0),
  }));

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: years,
    },
    legend: {
      position: "top",
    },
    fill: {
      opacity: 1,
    },
  };

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default StackedBarChartAcc;
