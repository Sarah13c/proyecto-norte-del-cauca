import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const BarGroupChartApex = ({ data, selectedYear }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {
    const processData = () => {
      if (!data || data.length === 0) return { series: [], years: [] };

      // Filtrar los datos por el año seleccionado
      const filteredData = selectedYear
        ? data.filter(entry => entry.Año === selectedYear)
        : data;

      // Agrupar los datos por MunicipioAS y Regimen
      const groupedData = filteredData.reduce((acc, curr) => {
        const { MunicipioAS, Regimen, Afiliados } = curr;
        if (!acc[MunicipioAS]) {
          acc[MunicipioAS] = {};
        }
        acc[MunicipioAS][Regimen] = Afiliados;
        return acc;
      }, {});

      // Convertir los datos agrupados a un formato adecuado para ApexCharts
      const series = Object.keys(groupedData).map(municipio => {
        return {
          name: municipio,
          data: Object.entries(groupedData[municipio]).map(([regimen, afiliados]) => ({
            x: regimen,
            y: afiliados
          }))
        };
      });

      const categories = Object.keys(groupedData[Object.keys(groupedData)[0]] || {});

      return { series, categories };
    };

    const { series, categories } = processData();

    const options = {
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true, // Cambiar a false si deseas barras verticales
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Afiliados por Municipio y Régimen'
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'Número de Afiliados'
        }
      },
      yaxis: {
        title: {
          text: 'Regimen'
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      },
      colors: [
        '#8884d8', // Púrpura claro
        '#82ca9d', // Verde menta claro
        '#ffc658', // Amarillo dorado
      ]
    };

    setChartData({ series, options });
  }, [data, selectedYear]);

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles para mostrar</div>;
  }

  return (
    <div>
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default BarGroupChartApex;
