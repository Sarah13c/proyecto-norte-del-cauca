import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChartES = ({ data, selectedMunicipio }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {
    const processData = () => {
      if (!data || data.length === 0) return { series: [], years: [] };

      let filteredData = selectedMunicipio && selectedMunicipio !== "Todos los municipios"
        ? data.filter(entry => entry.municipio === selectedMunicipio)
        : data;

      const years = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
      const indicators = [...new Set(filteredData.map(entry => entry.indicador))];

      // Agrupar y sumar datos si se selecciona "Todos los municipios"
      const aggregateData = (data) => {
        return indicators.map(indicator => ({
          name: indicator,
          data: years.map(year => {
            return data.reduce((total, entry) => {
              if (entry.indicador === indicator) {
                return total + (entry[year] || 0);
              }
              return total;
            }, 0);
          })
        }));
      };

      const series = aggregateData(filteredData);

      return { series, years };
    };

    const { series, years } = processData();

    const options = {
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false, // Cambiar a true si deseas barras horizontales
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
      xaxis: {
        categories: years,
        title: {
          text: 'Año'
        }
      },
      yaxis: {
        title: {
          text: 'Número de Estudiantes'
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
        '#a4a0a8', // Gris lila suave
        '#4a9ac3', // Azul claro
        '#f2a5a5', // Rosa suave
        '#ffab91', // Melocotón
        '#d0e6f5', // Azul muy claro
        '#c2c1f0', // Azul lavanda
        '#f4b9b0'  // Rosa coral
      ]
    };

    setChartData({ series, options });
  }, [data, selectedMunicipio]);

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles para mostrar</div>;
  }

  return (
    <div>
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default BarChartES;
