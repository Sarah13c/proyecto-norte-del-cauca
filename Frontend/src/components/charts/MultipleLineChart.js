import React from 'react';
import ReactApexChart from 'react-apexcharts';

const MultipleLineChart = ({ data }) => {
  // Agrupar los datos por municipio y zona
  const groupedData = data.reduce((acc, curr) => {
    const { MUNICIPIO_HECHO_LePe, ZONA_LePe, total_lesiones, AÑO_LePe } = curr;
    const municipio = MUNICIPIO_HECHO_LePe;
    const zona = ZONA_LePe;

    if (!acc[municipio]) {
      acc[municipio] = {};
    }

    if (!acc[municipio][zona]) {
      acc[municipio][zona] = [];
    }

    acc[municipio][zona].push({ x: AÑO_LePe, y: parseInt(total_lesiones) });

    return acc;
  }, {});

  const chartSeries = Object.entries(groupedData).map(([municipio, dataByZona]) => {
    const series = Object.entries(dataByZona).map(([zona, data]) => ({
      name: `${municipio} - ${zona}`,
      data,
    }));

    return series;
  }).flat();

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
      text: 'Lesiones personales por municipio y zona',
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

export default MultipleLineChart;