import React from 'react';
import '../../assets/css/LegendStyles.css'; 

const LegendComponent = () => {
    const municipios = [
      { name: 'Santander de Quilichao', color: '#7c1d6f', location: [3.0136, -76.4833] },
      { name: 'Guachené', color: '#b9257a', location: [3.0369, -76.4644] },
      { name: 'Puerto Tejada', color: '#dc3977', location: [3.2314, -76.4225] }
    ];
  
    return (
      <div className="legend-container">
        <h4>Leyenda de Municipios</h4>
        <ul>
          {municipios.map((municipio, index) => (
            <li key={index}>
              <span className="legend-color" style={{ backgroundColor: municipio.color }} />
              {municipio.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default LegendComponent;