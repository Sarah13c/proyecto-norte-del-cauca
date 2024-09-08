import React from 'react';

let Chart;
if (typeof window !== 'undefined') {
  Chart = require('react-apexcharts').default;
}

const CalidadEducativaChart = ({ data, year }) => {
  const getFieldName = (field) => year === "2022" ? `${field}_caedu22` : `${field.toLowerCase()}_caedu21`;

  const options = {
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type:'solid',
      opacity: [0.35, 1],
    },
    labels: data.map(item => item[year === "2022" ? "Departamento_caedu22" : "departamento_caedu21"]),
    markers: {
      size: 0
    },
    yaxis: [
      {
        title: {
          text: 'Promedio Global',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Otras Materias',
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return y.toFixed(0) + " puntos";
          }
          return y;
        }
      }
    }
  };

  const series = [
    {
      name: 'Promedio Global',
      type: 'area',
      data: data.map(item => parseFloat(item[getFieldName("Promedio_del_puntaje_global")]))
    },
    {
      name: 'Lectura Crítica',
      type: 'line',
      data: data.map(item => parseFloat(item[getFieldName("Lectura_Critica")]))
    },
    {
      name: 'Matemáticas',
      type: 'line',
      data: data.map(item => parseFloat(item[getFieldName("Matematicas")]))
    },
    {
      name: 'Sociales y Ciudadanas',
      type: 'line',
      data: data.map(item => parseFloat(item[getFieldName("Sociales_y_Ciudadanas")]))
    },
    {
      name: 'Ciencias Naturales',
      type: 'line',
      data: data.map(item => parseFloat(item[getFieldName("Ciencias_Naturales")]))
    },
    {
      name: 'Inglés',
      type: 'line',
      data: data.map(item => parseFloat(item[getFieldName("Ingles")]))
    }
  ];

  if (typeof window === 'undefined') {
    return null; // o un placeholder para SSR
  }

  return (
    <Chart options={options} series={series} type="line" height={350} />
  );
};

export default CalidadEducativaChart;