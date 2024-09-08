import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChartGroup = ({ data, selectedArea }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState({
    series: [],
    options: {}
  });

  // Filtrar los datos según el área seleccionada
  useEffect(() => {
    const newData = data.filter(entry => entry.Area === selectedArea);
    setFilteredData(newData);
  }, [data, selectedArea]);

  // Actualizar el gráfico cuando cambian los datos filtrados
  useEffect(() => {
    if (filteredData.length === 0) return;

    const keys = Object.keys(filteredData[0]).filter(key => key !== 'year' && key !== 'Area');
    
    // Preparar los datos de las series para ApexCharts
    const series = keys.map(key => ({
      name: key,
      data: filteredData.map(entry => entry[key])
    }));

    // Obtener las categorías (los años)
    const categories = filteredData.map(entry => entry.year);

    // Configurar el gráfico de ApexCharts
    const chartOptions = {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'Año'
        }
      },
      yaxis: {
        title: {
          text: 'Valores'
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };

    setChartData({
      series: series,
      options: chartOptions
    });
  }, [filteredData]);

  // Si no hay datos, no renderizar el gráfico
  if (!filteredData || filteredData.length === 0) {
    return null;
  }

  return (
    <div>
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default ApexChartGroup;
