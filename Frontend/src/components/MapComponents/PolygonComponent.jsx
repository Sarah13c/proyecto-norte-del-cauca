import React, { useState, useEffect } from 'react';
import { Polygon, Popup, Marker, CircleMarker } from 'react-leaflet'; // Importa CircleMarker
import '../../styles/PopupStyles.css';
import { Icon } from 'leaflet';

const PolygonComponent = ({ state, mousePosition, setMousePosition }) => {
  const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
  const stateName = state.properties.text;
  const [totalPoblacion, setTotalPoblacion] = useState(null);
  const [maxPoblacion, setMaxPoblacion] = useState(0);

  useEffect(() => {
    const fetchTotalPoblacion = async () => {
      try {
        const response = await fetch('http://localhost:3001/datos2022Poblacion');
        if (!response.ok) {
          throw new Error('Error al obtener los datos del servidor');
        }
        const data = await response.json();
        setTotalPoblacion(data);
        const maxPoblacionValue = Math.max(...data.map(item => item.Poblacion_DANE));
        setMaxPoblacion(maxPoblacionValue);
      } catch (error) {
        console.error('Error al obtener el total de población:', error);
      }
    };
    fetchTotalPoblacion();
  }, []);

  const mapPolygonColorToDensity = (density) => {
    const percentage = (density / maxPoblacion) * 100;
    return percentage > 80
      ? '#7c1d6f'
      : percentage > 60
        ? '#b9257a'
        : percentage > 40
          ? '#dc3977'
          : percentage > 20
            ? '#e34f6f'
            : percentage > 10
              ? '#f0746e'
              : '#faa476';
  };

  const normalizeAndCompare = (name1, name2) => {
    const normalizedName1 = name1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedName2 = name2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalizedName1 === normalizedName2) {
      return true;
    }
    const words1 = normalizedName1.split(/\s+/);
    const words2 = normalizedName2.split(/\s+/);
    const cleanedWords1 = words1.filter(word => !["de", "del", "De", "Del"].includes(word));
    const cleanedWords2 = words2.filter(word => !["de", "del", "De", "Del"].includes(word));
    return cleanedWords1.join(" ") === cleanedWords2.join(" ");
  };

  const findPopulationByMunicipality = (municipalityName) => {
    if (totalPoblacion) {
      const municipalityData = totalPoblacion.find((item) => normalizeAndCompare(item.MunicipioAS, municipalityName));
      if (municipalityData) {
        return municipalityData.Poblacion_DANE;
      }
    }
    return null;
  };

  const getCenterCoordinates = () => {
    if (coordinates.length > 0) {
      let sumLat = 0;
      let sumLng = 0;
      coordinates.forEach(([lat, lng]) => {
        sumLat += lat;
        sumLng += lng;
      });
      const centerLat = sumLat / coordinates.length;
      const centerLng = sumLng / coordinates.length;
      return [centerLat, centerLng];
    }
    return null;
  };

  const centerCoordinates = getCenterCoordinates();

  return (
    <>
      <Polygon
        key={state.id}
        pathOptions={{
          fillColor: mapPolygonColorToDensity(findPopulationByMunicipality(stateName)),
          fillOpacity: 0.7,
          weight: 2,
          opacity: 1,
          dashArray: 3,
          color: 'white',
        }}
        positions={coordinates}
      >
        {(mousePosition || centerCoordinates) && (
          <Popup className="custom-popup" position={mousePosition || centerCoordinates}>
            <div className="popup-header">
              <strong>{stateName}</strong>
            </div>
            <div>Personas: {findPopulationByMunicipality(stateName)}</div>
          </Popup>
        )}
      </Polygon>
      {['Santander de Quilichao', 'Guachené', 'Puerto Tejada'].includes(stateName) && (
        <CircleMarker center={centerCoordinates} fillColor="#4B4B4B" color= "#4B4B4B"radius={3} eventHandlers={{ click: () => setMousePosition(centerCoordinates) }}></CircleMarker>
      )}
    </>
  );
};

export default PolygonComponent;
