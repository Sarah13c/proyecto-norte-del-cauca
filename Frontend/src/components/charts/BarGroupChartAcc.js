// BarGroupChartAcc.js
import React from "react";
import Chart from "react-apexcharts";

const BarGroupChartAcc = ({ data }) => {
  const municipios = ['PUERTO TEJADA', 'GUACHENÉ', 'SANTANDER DE QUILICHAO'];
  const years = [2020, 2021, 2022];
  const zonas = ['URBANA', 'RURAL'];

  const seriesData = municipios.map((municipio) => ({
    name: municipio,
    data: years.map((year) =>
      zonas.map((zona) => {
        const entry = data.find(
          (d) =>
            d.MUNICIPIO_HECHO_AcceCar === municipio &&
            d.AÑO_AcceCar === year &&
            d.ZONA_AcceCar === zona
        );
        return entry ? parseInt(entry.CANTIDAD) : 0;
      })
    ).flat(),
  }));

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: years.flatMap((year) => zonas.map((zona) => `${year} ${zona}`)),
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Cantidad",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => val,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      offsetY: 10,
    },
    colors: ["#0088FE", "#00C49F", "#FFBB28"],
  };

  return (
    <div id="chart">
      <Chart options={options} series={seriesData} type="bar" height={350} />
    </div>
  );
};

export default BarGroupChartAcc;
