import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import PolygonComponent from './PolygonComponent.jsx';
import { statesData } from '../../files/data';
import LegendDrawer from './LegendDrawer.jsx';
import 'leaflet/dist/leaflet.css';
import '../../styles/MapStyles.css';

// Componente para actualizar la vista del mapa
function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent({ center, mousePosition, setMousePosition }) {
  return (
    <div className="map-container" style={{ width: '100%', height: '500px' }}>
      <MapContainer
        center={center}
        zoom={8}
        style={{ width: '100%', height: '100%' }}
        whenCreated={(map) => {
          map.on('mousemove', (e) => setMousePosition(e.latlng));
        }}
      >
        <MapUpdater center={center} zoom={8} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON 
          data={statesData} 
          style={() => ({
            color: '#4a83ec',
            weight: 1,
            fillColor: "#1a1d62",
            fillOpacity: 0.1,
          })}
        />
        {statesData.features.map((state) => (
          <PolygonComponent
            key={state.properties.name}
            state={state}
            mousePosition={mousePosition}
            setMousePosition={setMousePosition}
          />
        ))}
        <LegendDrawer />
      </MapContainer>
    </div>
  );
}