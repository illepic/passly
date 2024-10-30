"use client";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export function MapboxMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<null | mapboxgl.Map>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN) throw new Error("MAPBOX_TOKEN is not set.");
    if (mapRef.current || !mapContainerRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-74.5, 40], // New York area
      zoom: 9,
    });

    mapRef.current.on("load", () => {
      // Add a data source containing GeoJSON data
      mapRef.current?.addSource("polygons", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-74.5, 40],
                    [-74.3, 40],
                    [-74.3, 40.2],
                    [-74.5, 40.2],
                    [-74.5, 40],
                  ],
                ],
              },
              properties: {
                name: "Sample Polygon 1",
              },
            },
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-74.7, 40.1],
                    [-74.5, 40.1],
                    [-74.5, 40.3],
                    [-74.7, 40.3],
                    [-74.7, 40.1],
                  ],
                ],
              },
              properties: {
                name: "Sample Polygon 2",
              },
            },
          ],
        },
      });

      // Add a layer showing the polygons
      mapRef.current?.addLayer({
        id: "polygon-layer",
        type: "fill",
        source: "polygons",
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.5,
          "fill-outline-color": "#000000",
        },
      });

      // Add hover effect
      mapRef.current?.addLayer({
        id: "polygon-outline",
        type: "line",
        source: "polygons",
        paint: {
          "line-color": "#000",
          "line-width": 2,
        },
      });
    });

    // Cleanup on unmount
    return () => mapRef.current?.remove();
  }, []);
  return (
    <div>
      <h2>{MAPBOX_TOKEN}</h2>
    </div>
  );
}

export default MapboxMap;
