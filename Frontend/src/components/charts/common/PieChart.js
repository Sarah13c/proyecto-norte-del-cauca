import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e'];

const ApexPieChart = ({ data, onClick }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  useEffect(() => {
    // Extraer los valores y etiquetas de la data
    const seriesData = data.map((item) => item.Poblacion_DANE);
    const labels = data.map((item) => item.MunicipioAS);

    const chartOptions = {
      chart: {
        type: "pie",
        width: 380,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const selectedMunicipio = labels[config.dataPointIndex];
            onClick(selectedMunicipio); // Llama la función onClick
          },
        },
      },
      labels: labels,
      colors: COLORS,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom", // Leyenda en la parte inferior para pantallas pequeñas
            },
          },
        },
      ],
      legend: {
        position: 'bottom', // Cambiado a la parte inferior
        fontSize: '12px',
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${val}`, // Formateo del valor
        },
      },
    };

    setChartData({
      series: seriesData,
      options: chartOptions,
    });
  }, [data, onClick]);

  return (
    
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={320}
        />
      </div>
    
  );
};

export default ApexPieChart;
