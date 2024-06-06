// src/components/Maps.tsx
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -33.446994,
  lng: -70.656863,
};

const Maps: React.FC = () => {
  const [marker, setMarker] = useState<{ lat: number, lng: number } | null>(null);
  const [selected, setSelected] = useState<{ lat: number, lng: number } | null>(null);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
      setSelected(null);  // Clear any existing selection
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onClick={handleMapClick}
      >
        {marker && (
          <Marker 
            position={{ lat: marker.lat, lng: marker.lng }} 
            onClick={() => setSelected(marker)}
          />
        )}
        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <a
                href={`https://www.google.com/maps/@${selected.lat},${selected.lng},16z?hl=es-419&entry=ttu`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en Google Maps
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;
