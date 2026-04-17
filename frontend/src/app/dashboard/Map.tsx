"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Map({ routeRequest }: any) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [safeRoute, setSafeRoute] = useState<any[]>([]);
  const [unsafeRoute, setUnsafeRoute] = useState<any[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    if (routeRequest && position) {
      findRoute(routeRequest);
    }
  }, [routeRequest]);

  async function geocode(place: string) {
    const res = await fetch(
      `https://safe-route-ai-wmmb.onrender.com/api/geocode?q=${encodeURIComponent(place)}`
    );
    const data = await res.json();
    return data[0];
  }

  async function findRoute(req: any) {
    try {
      let startLat = position![0];
      let startLng = position![1];

      if (req.start) {
        const startGeo = await geocode(req.start);
        if (startGeo) {
          startLat = startGeo.lat;
          startLng = startGeo.lon;
        }
      }

      const endGeo = await geocode(req.destination);

      if (!endGeo) return alert("Destination not found");

      const endLat = Number(endGeo.lat);
      const endLng = Number(endGeo.lon);

      const osrm = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&alternatives=true`
      );

      const data = await osrm.json();

      const routes = data.routes;
      if (!routes || routes.length === 0) {
        alert("Route not found");
        return;
      }

      // safest route (first route)
      const first = routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);

      // second route if exists
      const second = routes[1]
      ? routes[1].geometry.coordinates.map((c: any) => [c[1], c[0]])
      : null;

      setSafeRoute(first);

      // if second route exists → unsafe
      if (second) {
        setUnsafeRoute(second);
      } else {
         setUnsafeRoute([]);
         alert("Only one route available — no unsafe routes detected.");
      }

      
    } catch (err) {
      console.error(err);
    }
  }

  if (!position) return <p>Loading map...</p>;

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={position}>
        <Popup>Current Location</Popup>
      </Marker>

      {safeRoute.length > 0 && (
        <Polyline positions={safeRoute} color="green" />
      )}

      {unsafeRoute.length > 0 && (
        <Polyline positions={unsafeRoute} color="red" />
      )}  
    </MapContainer>
  );
}