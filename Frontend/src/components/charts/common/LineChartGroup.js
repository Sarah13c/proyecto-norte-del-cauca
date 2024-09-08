import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexLineChart = ({ data, selectedArea }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const filteredData = data.filter(entry => entry.Area === selectedArea);
    if (filteredData.length === 0) return;

    const keys = Object.keys(filteredData[0]).filter(key => key !== 'year' && key !== 'Area');
    const years = filteredData.map(entry => entry.year);

    const newSeries = keys.map(key => ({
      name: key,
      data: filteredData.map(entry => entry[key])
    }));

    const newOptions = {
      chart: {
        height: 350,
        type: 'line',
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        width: 5,
        curve: 'straight',
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>';
        }
      },
      markers: {
        size: 0,
        hover: { sizeOffset: 6 }
      },
      xaxis: { categories: years },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          }
        }
      },
      grid: { borderColor: '#f1f1f1' }
    };

    setChartOptions(newOptions);
    setSeries(newSeries);
  }, [data, selectedArea]);

  if (series.length === 0) {
    return null;
  }

  return (
    <ReactApexChart 
      options={chartOptions} 
      series={series} 
      type="line" 
      height={350} 
    />
  );
};

export default ApexLineChart;