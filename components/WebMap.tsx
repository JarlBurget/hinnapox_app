import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
// No react-native imports needed here usually, unless you use View for layout

interface WebMapProps {
  userLocation: { latitude: number; longitude: number } | null;
  displayLocation: { latitude: number; longitude: number };
  stations: any[];
  brandColors: Record<string, string>;
  isDark: boolean;
  t: (key: string, defaultText: string) => string;
  flyToCoords: { lat: number; lng: number } | null; // New Prop
}

// 1. Controller Component to handle programmatic map moves
const MapController = ({ 
  userLocation, 
  flyToCoords 
}: { 
  userLocation: { latitude: number; longitude: number } | null,
  flyToCoords: { lat: number; lng: number } | null
}) => {
  const map = useMap();

  // Handle initial User Location centering
  useEffect(() => {
    if (userLocation) {
        // Only set view if we haven't manually moved yet (optional logic, or just force it)
        map.setView([userLocation.latitude, userLocation.longitude], 13);
    }
  }, [userLocation, map]);

  // Handle "Fly To" requests (from City Search)
  useEffect(() => {
    if (flyToCoords) {
      map.flyTo([flyToCoords.lat, flyToCoords.lng], 12, {
        duration: 1.5 // Smooth animation like Native
      });
    }
  }, [flyToCoords, map]);

  return null;
};

// Helper to inject Leaflet CSS
const LeafletStyles = () => {
  useEffect(() => {
    const linkId = 'leaflet-css';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);
  return null;
};

const WebMap: React.FC<WebMapProps> = ({ 
  userLocation, 
  displayLocation, 
  stations, 
  brandColors, 
  isDark,
  t,
  flyToCoords
}) => {
  
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}>
      <LeafletStyles />
      <MapContainer
        center={[displayLocation.latitude, displayLocation.longitude]}
        zoom={userLocation ? 13 : 8}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', background: isDark ? '#202020' : '#ddd' }}
      >
        {/* Add the controller to handle logic that requires 'useMap' */}
        <MapController userLocation={userLocation} flyToCoords={flyToCoords} />

        <TileLayer
          attribution={isDark 
            ? '&copy; <a href="http://www.esri.com/">Esri</a>' 
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
          url={isDark 
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />
        
        {/* User Location Marker */}
        {userLocation && (
            <CircleMarker 
              center={[userLocation.latitude, userLocation.longitude]} 
              pathOptions={{ fillColor: '#3b82f6', color: '#fff', fillOpacity: 1, weight: 2 }}
              radius={8}
            >
              <Popup>{t('youAreHere', 'You are here')}</Popup>
            </CircleMarker>
        )}

        {/* Station Markers */}
        {stations.map((station) => (
          <CircleMarker
            key={station.id}
            center={[station.lat, station.lon]}
            pathOptions={{ 
                fillColor: brandColors[station.brand_name] || 'gray', 
                color: '#fff', 
                weight: 1, 
                fillOpacity: 0.8 
            }}
            radius={10}
          >
            <Popup>
              <div style={{ textAlign: 'center', color: '#000' }}>
                  <strong style={{ fontSize: '14px' }}>{station.brand_name} - {station.name}</strong><br/>
                  <span style={{ fontSize: '12px', color: '#666' }}>{station.address}, {station.city}</span>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WebMap;