import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const SlopeChart = ({ data, year }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    // Determinar sufijo de columnas basado en el año
    const suffix = year === '2022' ? 'NA22' : 'NA21';

    // Transformar los datos para el gráfico
    const categories = [...new Set(data.map(d => d[`municipio${suffix}`]))];
    const series = [
      {
        name: 'Hombres',
        data: data.map(d => ({ x: d[`municipio${suffix}`], y: d[`hombres${suffix}`] }))
      },
      {
        name: 'Mujeres',
        data: data.map(d => ({ x: d[`municipio${suffix}`], y: d[`mujeres${suffix}`] }))
      },
      {
        name: 'Indeterminado',
        data: data.map(d => ({ x: d[`municipio${suffix}`], y: d[`indeterminado${suffix}`] }))
      }
    ];

    setChartOptions({
      chart: {
        type: 'line'
      },
      stroke: {
        width: [4, 4, 4],
        curve: 'smooth'
      },
      xaxis: {
        categories: categories
      },
      yaxis: {
        title: {
          text: 'Cantidad'
        }
      },
      markers: {
        size: [6, 6, 6]
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
  }, [data, year]);

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={350}
    />
  );
};

export default SlopeChart;