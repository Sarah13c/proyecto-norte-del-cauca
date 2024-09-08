import React from 'react';
import tinycolor from 'tinycolor2';

let Chart;
if (typeof window !== 'undefined') {
  Chart = require('react-apexcharts').default;
}

const CalidadEducativaChart = ({ data, year, chartType }) => {
  const getFieldName = (field) => year === "2022" ? `${field}_caedu22` : `${field.toLowerCase()}_caedu21`;

  const colorMap = {
    'Guachené': '#8884d8',
    'Puerto Tejada': '#82ca9d',
    'Santander de Quilichao': '#ffc658'
  };

  // Generar una paleta de colores a partir del color principal
  const generateColorPalette = (baseColor) => {
    return [
      tinycolor(baseColor).lighten(10).toString(),
      tinycolor(baseColor).lighten(20).toString(),
      tinycolor(baseColor).lighten(30).toString(),
      tinycolor(baseColor).darken(10).toString(),
      tinycolor(baseColor).darken(20).toString()
    ];
  };

  // Filtrar datos únicos por departamento
  const uniqueData = data.reduce((acc, current) => {
    const departamento = current[year === "2022" ? "Departamento_caedu22" : "departamento_caedu21"];
    if (!acc.find(item => item[year === "2022" ? "Departamento_caedu22" : "departamento_caedu21"] === departamento)) {
      acc.push(current);
    }
    return acc;
  }, []);

  const departamentos = uniqueData.map(item => item[year === "2022" ? "Departamento_caedu22" : "departamento_caedu21"]);

  // Generar colores para cada departamento
  const departamentoColors = departamentos.map(dep => {
    return generateColorPalette(colorMap[dep]);
  });

  const commonOptions = {
    chart: {
      fontFamily: 'Helvetica, Arial, sans-serif',
      foreColor: '#333'
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px'
      }
    },
    legend: {
      fontSize: '14px',
      fontWeight: 500,
      labels: {
        colors: '#333'
      }
    }
  };

  if (chartType === 'bar') {
    const barOptions = {
      ...commonOptions,
      chart: {
        ...commonOptions.chart,
        type: 'bar',
        height: 450
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1);
        },
        style: {
          fontSize: '10px',
          colors: ['#000'],
          fontWeight: 600
        },
        offsetY: -20,
        textAnchor: 'middle'
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: departamentos,
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        title: {
          text: 'Puntaje',
          style: {
            fontSize: '14px',
            fontWeight: 600
          }
        },
        min: 0,
        max: 100,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetY: -10
      },
      colors: departamentoColors.flat() // Usar la paleta de colores generada
    };

    const barSeries = [
      {
        name: 'Promedio Global',
        data: uniqueData.map(item => parseFloat(item[getFieldName("Promedio_del_puntaje_global")]) / 5)
      },
      {
        name: 'Lectura Crítica',
        data: uniqueData.map(item => parseFloat(item[getFieldName("Lectura_Critica")]))
      },
      {
        name: 'Matemáticas',
        data: uniqueData.map(item => parseFloat(item[getFieldName("Matematicas")]))
      },
      {
        name: 'Sociales y Ciudadanas',
        data: uniqueData.map(item => parseFloat(item[getFieldName("Sociales_y_Ciudadanas")]))
      },
      {
        name: 'Ciencias Naturales',
        data: uniqueData.map(item => parseFloat(item[getFieldName("Ciencias_Naturales")]))
      },
      {
        name: 'Inglés',
        data: uniqueData.map(item => parseFloat(item[getFieldName("Ingles")]))
      }
    ];

    return <Chart options={barOptions} series={barSeries} type="bar" height={450} />;
  }
  else if (chartType === 'radar') {
    const radarOptions = {
      ...commonOptions,
      chart: {
        ...commonOptions.chart,
        type: 'radar',
        height: 350
      },
      xaxis: {
        categories: ['Lectura Crítica', 'Matemáticas', 'Sociales y Ciudadanas', 'Ciencias Naturales', 'Inglés'],
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 2,
        },
        style: {
          fontSize: '10px',
          fontWeight: 600
        }
      },
      colors: departamentos.map(dep => colorMap[dep]),
      markers: {
        size: 4,
        colors: ['#fff'],
        strokeColor: departamentos.map(dep => colorMap[dep]),
        strokeWidth: 2,
      }
    };

    const radarSeries = uniqueData.map(item => ({
      name: item[year === "2022" ? "Departamento_caedu22" : "departamento_caedu21"],
      data: [
        parseFloat(item[getFieldName("Lectura_Critica")]),
        parseFloat(item[getFieldName("Matematicas")]),
        parseFloat(item[getFieldName("Sociales_y_Ciudadanas")]),
        parseFloat(item[getFieldName("Ciencias_Naturales")]),
        parseFloat(item[getFieldName("Ingles")])
      ]
    }));

    return <Chart options={radarOptions} series={radarSeries} type="radar" height={350} />;
  }

  return null;
};

export default CalidadEducativaChart;