import React from 'react';
import '../../assets/css/LegendStyles.css'; // Asegúrate de tener estilos CSS para el componente Legend

const LegendComponent = ({ municipality, population }) => {
  return (
    <div className="legend-container">
      <div className="legend-item">
        <div className="legend-text">{municipality}</div>
        <div className="legend-text">Población: {population}</div>
      </div>
    </div>
  );
};

export default LegendComponent;
