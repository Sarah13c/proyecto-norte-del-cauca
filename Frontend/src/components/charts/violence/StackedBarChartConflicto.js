import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaBrushChart = ({ data, selectedEntity }) => {
  const getColor = (entity) => {
    switch (entity) {
      case "Guachené":
        return "#8884d8";
      case "Puerto Tejada":
        return "#82ca9d";
      case "Santander de Quilichao":
        return "#ffc658";
      default:
        return "#008FFB";
    }
  };

  const color = getColor(selectedEntity);

  const commonOptions = {
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
        },
        rotateAlways: true,
        rotate: -45,
        hideOverlappingLabels: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.round(value)
      }
    },
    tooltip: {
      x: {
        format: "yyyy"
      }
    }
  };

  const options1 = {
    chart: {
      id: "chart2",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true
      }
    },
    colors: [color],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    ...commonOptions,
    yaxis: {
      ...commonOptions.yaxis,
      title: {
        text: "Número de conflictos"
      }
    }
  };

  const options2 = {
    chart: {
      id: "chart1",
      height: 130,
      type: "bar",
      brush: {
        target: "chart2",
        enabled: true
      },
      selection: {
        enabled: true,
        xaxis: {
          min: data.length > 0 ? data[0].x : undefined,
          max: data.length > 0 ? data[data.length - 1].x : undefined
        }
      }
    },
    colors: [color],
    ...commonOptions,
    plotOptions: {
      bar: {
        columnWidth: '80%',
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val);
      },
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: ["#304758"]
      },
      rotateAlways: true,
    },
    xaxis: {
      ...commonOptions.xaxis,
      tickAmount: 'dataPoints',
      tickPlacement: 'on',
      labels: {
        ...commonOptions.xaxis.labels,
        show: true,
        style: {
          fontSize: '8px',
        }
      }
    }
  };

  return (
    <>
      <ReactApexChart options={options1} series={[{ name: "Conflictos", data: data }]} type="area" height={350} />
      <ReactApexChart options={options2} series={[{ name: "Conflictos", data: data }]} type="bar" height={130} />
    </>
  );
};

export default AreaBrushChart;