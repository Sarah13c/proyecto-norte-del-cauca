import React from 'react';
import Chart from 'react-apexcharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF7C19', '#AB1D17', '#17ABAB', '#7A17AB', '#ABD717'];

const GroupedBarChart = ({ data, selectedMunicipio }) => {
  let filteredData;
  if (selectedMunicipio === 'all') {
    filteredData = data;
  } else {
    filteredData = data.filter(entry => entry.municipioDAP === selectedMunicipio);
  }

  const disabilities = Object.keys(filteredData[0] || {}).filter(key => key !== 'año' && key !== 'municipioDAP' && key !== 'totalDAP');
  const categories = [...new Set(filteredData.map(entry => entry.año))];

  const series = disabilities.map((disability, index) => {
    const seriesData = categories.map(category => {
      if (selectedMunicipio === 'all') {
        return filteredData
          .filter(entry => entry.año === category)
          .reduce((sum, entry) => sum + (entry[disability] || 0), 0);
      } else {
        const entry = filteredData.find(entry => entry.año === category);
        return entry ? entry[disability] : 0;
      }
    });

    return {
      name: disability,
      data: seriesData,
    };
  });

  const options = {
    chart: {
      type: 'bar',
      height: 400,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
        formatter: function (val) {
          return val.length > 10 ? `${val.substring(0, 10)}...` : val;
        }
      }
    },
    yaxis: {
      title: {
        text: 'Valores'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        }
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 20,
      formatter: function (seriesName) {
        const maxLength = 20;
        return seriesName.length > maxLength ? `${seriesName.substring(0, maxLength)}...` : seriesName;
      }
    },
    colors: COLORS,
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default GroupedBarChart;