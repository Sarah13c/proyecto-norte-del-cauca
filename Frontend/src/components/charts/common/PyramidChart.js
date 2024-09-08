import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexPyramidChart = ({ data, selectedMunicipio }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState({
    series: [],
    options: {}
  });

  // Filtrar o agregar los datos por el municipio seleccionado
  useEffect(() => {
    let newData;

    if (selectedMunicipio && selectedMunicipio.toLowerCase() !== 'todos los municipios') {
      // Filtrar los datos por municipio específico
      newData = data.filter(entry => entry.municipio.toLowerCase() === selectedMunicipio.toLowerCase());
    } else {
      // Sumar los datos de todos los municipios
      const groupedData = {};
      
      data.forEach(entry => {
        if (!groupedData[entry.grupo_edad]) {
          groupedData[entry.grupo_edad] = {
            hombres_2022: 0,
            mujeres_2022: 0,
            grupo_edad: entry.grupo_edad
          };
        }
        groupedData[entry.grupo_edad].hombres_2022 += entry.hombres_2022;
        groupedData[entry.grupo_edad].mujeres_2022 += entry.mujeres_2022;
      });

      // Convertir el objeto agrupado en un array
      newData = Object.values(groupedData);
    }

    setFilteredData(newData);
  }, [data, selectedMunicipio]);

  // Actualizar los datos del gráfico
  useEffect(() => {
    if (filteredData.length === 0) return;

    // Preparar las series para hombres y mujeres
    const males = filteredData.map(entry => entry.hombres_2022);
    const females = filteredData.map(entry => -entry.mujeres_2022); // Las mujeres se representan en valores negativos

    const series = [
      { name: 'Hombres', data: males },
      { name: 'Mujeres', data: females }
    ];

    const categories = filteredData.map(entry => entry.grupo_edad);

    // Configuración de ApexCharts
    const chartOptions = {
      chart: {
        type: 'bar',
        height: 440,
        stacked: true
      },
      
      colors: ['#8884d8', '#ffc658'],
      plotOptions: {
        bar: {
          borderRadius: 5,
          horizontal: true,
          barHeight: '80%',
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      yaxis: {
        title: {
          text: 'Grupo de Edad'
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return Math.abs(val);
          }
        }
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'Población'
        },
        labels: {
          formatter: function (val) {
            return Math.abs(val); // Convertir a positivo en las etiquetas
          }
        }
      },
    };

    setChartData({
      series: series,
      options: chartOptions
    });
  }, [filteredData, selectedMunicipio]);

  if (!filteredData || filteredData.length === 0) {
    return null;
  }

  return (
    <div>
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={440} />
    </div>
  );
};

export default ApexPyramidChart;
