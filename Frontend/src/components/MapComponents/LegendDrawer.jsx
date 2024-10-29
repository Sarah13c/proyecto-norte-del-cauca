import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';

const LegendDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [legendData, setLegendData] = useState([]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const removeDuplicates = (arr, prop) =>
    arr.filter(
      (obj, index) =>
        arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index
    );

  useEffect(() => {
    const fetchLegendData = async () => {
      try {
        const response = await fetch('https://backend-norte-cauca-prod-rbud.onrender.com/datos2022Poblacion');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la leyenda del servidor');
        }
        const data = await response.json();
        // Filtra los datos para incluir solo los municipios deseados
        const filteredData = data.filter(item =>
          ["Santander De Quilichao", "Guachené", "Puerto Tejada"].includes(item.MunicipioAS)
        );
        // Elimina los duplicados
        const uniqueData = removeDuplicates(filteredData, "MunicipioAS");
        setLegendData(uniqueData);
      } catch (error) {
        console.error('Error al obtener los datos de la leyenda:', error);
      }
    };
    fetchLegendData();
  }, []);

  return (
    <div className="legend-drawer">
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
            <h4>{item.MunicipioAS}</h4>
            <p>Población: {item.Poblacion_DANE}</p>
          </div>
        ))}
      </Drawer>
    </div>
  );
};

export default LegendDrawer;
