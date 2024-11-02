"use client";

import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  Polygon,
} from "react-leaflet";

import "leaflet-defaulticon-compatibility";

interface Props {
  position?: [number, number];
  zoom?: number;
}
export default function MyMap(props: Props) {
  const { position = [47.751076, -120.740135], zoom = 9 } = props;

  return (
    <div style={{ height: "720px", width: "900px" }}>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution="Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap"
        />
        <Marker position={position}>
          <Tooltip>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Tooltip>
        </Marker>
        <Polygon
          positions={[
            [46.6514, -122.2543], // Northwestern point
            [46.2756, -122.1434],
            [46.1667, -121.9882],
            [46.1375, -121.7316],
            [45.9931, -121.5158],
            [45.9147, -121.7371], // Southern boundary
            [45.9039, -121.8951],
            [45.9039, -122.0531],
            [46.0483, -122.2708],
            [46.2864, -122.3872], // Western edge
            [46.6514, -122.2543], // Back to start
          ]}
          pathOptions={{
            color: "purple",
            fillColor: "purple",
            fillOpacity: 0.3,
            weight: 2,
          }}
        >
          <Tooltip>Gifford Pinchot National Forest</Tooltip>
        </Polygon>
      </MapContainer>
    </div>
  );
}
