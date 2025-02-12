"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix: Use require() instead of direct imports
const markerIcon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41], // Set proper size
  iconAnchor: [12, 41], // Anchor point for correct positioning
});

interface MapProps {
  center?: number[];
}

const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {center && <Marker position={center as L.LatLngExpression} icon={markerIcon} />}
    </MapContainer>
  );
};

export default Map;
