// LegendDrawer.jsx
import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

const LegendDrawer = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const legendData = [
    { municipio: 'Santander de Quilichao', poblacion: 123456 },
    { municipio: 'Guachené', poblacion: 78901 },
    { municipio: 'Puerto Tejada', poblacion: 45678 },
  ];

  return (
    <div className="legend-drawer">
      {/* Coloca el botón dentro del div */}
      <Button type="primary" onClick={showDrawer}>
        Ver
      </Button>
      <Drawer
        title="Leyenda"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={300}
      >
        {legendData.map((item, index) => (
          <div key={index}>
            <h4>{item.municipio}</h4>
            <p>Población: {item.poblacion}</p>
          </div>
        ))}
      </Drawer>
    </div>
  );
};

export default LegendDrawer;
