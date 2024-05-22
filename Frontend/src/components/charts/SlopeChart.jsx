import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const SlopeChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  console.log(data)

  useEffect(() => {
    // Transformar los datos para el gráfico
    const categories = [...new Set(data.map(d => d.municipioNA22))];

    const series = [
      {
        name: 'Hombres',
        data: data.map(d => ({ x: d.municipioNA22, y: d.hombresNA22 }))
      },
      {
        name: 'Mujeres',
        data: data.map(d => ({ x: d.municipioNA22, y: d.mujeresNA22  }))
      },
      {
        name: 'Indeterminado',
        data: data.map(d => ({ x: d.municipioNA22, y: d.indeterminadoNA22  }))
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

export default SlopeChart;
