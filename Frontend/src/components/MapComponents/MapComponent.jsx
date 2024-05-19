import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import PolygonComponent from './PolygonComponent.jsx';
import { statesData } from '../../files/data';
import Legend from './LegendComponent.jsx'; // Importamos el componente Legend
import '../../styles/MapStyles.css';

export default function MapComponent({ center, mousePosition, setMousePosition }) {
  return (
    <div className="map-container">
      {/* Agregamos el componente Legend fuera del MapContainer */}
      <Legend />
      <div style={{ width: '800px', height: '700px' }}>
        <MapContainer
          center={center}
          zoom={8}
          style={{ width: '100%', height: '100%' }}
          onMouseMove={(e) => setMousePosition(e.latlng)}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=bPH7ayo05grPl639LD7n"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          <GeoJSON data={statesData} />
          {statesData.features.map((state) => (
            <PolygonComponent
              key={state.id}
              state={state}
              mousePosition={mousePosition}
              setMousePosition={setMousePosition}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
