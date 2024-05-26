// PieChart.js
import React from "react";
import Chart from "react-apexcharts";

const PieChartAcc = ({ data }) => {
  // Filtrar los datos por zona (urbana y rural)
  const urbanData = data.filter((entry) => entry.ZONA_VioIn === "URBANA");
  const ruralData = data.filter((entry) => entry.ZONA_VioIn === "RURAL");

  // Obtener la cantidad de casos por municipio para cada zona
  const getCasesByMunicipality = (data) => {
    const municipalities = [...new Set(data.map((entry) => entry.MUNICIPIO_HECHO_VioIn))];
    return municipalities.map((municipality) =>
      data.reduce((acc, entry) => {
        if (entry.MUNICIPIO_HECHO_VioIn === municipality) {
          return acc + parseInt(entry.CANTIDAD);
        }
        return acc;
      }, 0)
    );
  };

  // Crear los datos para la gráfica de pastel (una sección para cada zona)
  const urbanSeriesData = getCasesByMunicipality(urbanData);
  const ruralSeriesData = getCasesByMunicipality(ruralData);

  // Crear las etiquetas de la gráfica
  const labels = [...new Set(data.map((entry) => entry.MUNICIPIO_HECHO_VioIn))];

  const options = {
    chart: {
      type: "pie",
      height: 300,
    },
    labels: labels,
    colors: ["#0088FE", "#00C49F", "#FFBB28"],
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ margin: "10px", width: "400px" }}>
          <h2 style={{ textAlign: "center", fontSize: "20px" }}>Zona Urbana</h2>
          <Chart options={options} series={urbanSeriesData} type="pie" height={300} />
        </div>
        <div style={{ margin: "10px", width: "400px" }}>
          <h2 style={{ textAlign: "center", fontSize: "20px" }}>Zona Rural</h2>
          <Chart options={options} series={ruralSeriesData} type="pie" height={300} />
        </div>
      </div>
    </div>
  );
};

export default PieChartAcc;
