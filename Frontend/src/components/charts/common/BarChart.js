import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const municipiosOfInterest = ["Santander de Quilichao", "Puerto Tejada", "Guachené"];

const ApexBarChartComponent = ({ data, xAxisDataKey, barDataKey, onClick }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  // Función para eliminar duplicados
  const removeDuplicates = (arr, prop) =>
    arr.filter(
      (obj, index) =>
        arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index
    );

  useEffect(() => {
    // Filtrar los datos por los municipios de interés
    const filteredData = data
      ? removeDuplicates(
          data.filter((item) => {
            const matched = municipiosOfInterest.some((municipio) =>
              item.MunicipioAS.toLowerCase().includes(municipio.toLowerCase())
            );
            return matched;
          }),
          "MunicipioAS"
        )
      : [];

    // Preparar datos para las series de ApexCharts
    const seriesData = filteredData.map((item) => item[barDataKey]);
    const categories = filteredData.map((item) => item[xAxisDataKey]);

    const chartOptions = {
      chart: {
        type: "bar",
        height: 350,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const selectedMunicipio = filteredData[config.dataPointIndex].MunicipioAS;
            onClick(selectedMunicipio); // Llama la función onClick
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      colors: ['#8884d8', '#82ca9d', '#ffc658'],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
        title: {
          text: xAxisDataKey,
        },
      },
      yaxis: {
        title: {
          text: barDataKey,
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${val}`,
        },
      },
      legend: {
        show: true,
      },
    };

    setChartData({
      series: [
        {
          name: barDataKey,
          data: seriesData,
        },
      ],
      options: chartOptions,
    });
  }, [data, xAxisDataKey, barDataKey, onClick]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ApexBarChartComponent;
