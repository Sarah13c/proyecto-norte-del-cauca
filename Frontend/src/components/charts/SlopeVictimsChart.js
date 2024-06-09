import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const SlopeVictimsChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    // Extraer y ordenar los años de los datos
    const years = [...new Set(data.map(d => d.Indicador_VicDes))];

    // Transformar los datos para el gráfico
    const municipalities = [...new Set(data.map(d => d.Municipio))];
    
    const series = municipalities.map(municipality => {
      return {
        name: municipality,
        data: years.map(year => {
          const victimData = data.find(d => d.Municipio === municipality && d.Indicador_VicDes === year);
          return { x: year.toString(), y: victimData ? victimData.Numero_Victimas : 0 };
        })
      };
    });

    setChartOptions({
      chart: {
        type: 'line'
      },
      stroke: {
        width: [4],
        curve: 'smooth'
      },
      xaxis: {
        categories: years.map(year => year.toString()), // Convertir los años a cadenas de texto
        title: {
          text: 'Años'
        }
      },
      yaxis: {
        title: {
          text: 'Número de Víctimas'
        }
      },
      markers: {
        size: [6]
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    });

    setChartSeries(series);
  }, [data]);

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={350}
    />
  );
};

export default SlopeVictimsChart;
