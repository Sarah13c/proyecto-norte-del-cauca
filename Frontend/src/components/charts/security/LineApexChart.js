import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineApexChart = ({ data }) => {
  // Agrupar los datos por municipio
  const groupedData = data.reduce((acc, curr) => {
    const { MUNICIPIO_HECHO_Hurto, ZONA_Hurto, total_hurtos, AÑO_Hurto } = curr;
    const municipio = MUNICIPIO_HECHO_Hurto;

    if (!acc[municipio]) {
      acc[municipio] = [];
    }

    acc[municipio].push({ x: AÑO_Hurto, y: parseInt(total_hurtos), zona: ZONA_Hurto });

    return acc;
  }, {});

  const chartSeries = Object.entries(groupedData).map(([municipio, data]) => ({
    name: municipio,
    data,
  }));

  const chartOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5],
      curve: 'straight',
    },
    title: {
      text: 'Hurtos por municipio y zona',
      align: 'left',
    },
    xaxis: {
      title: {
        text: 'Año',
      },
    },
    yaxis: {
      title: {
        text: 'Cantidad de casos',
      },
    },
    grid: {
      borderColor: '#f1f1f1',
    },
    legend: {
      position: 'top',
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default LineApexChart;