"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Dashboard() {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [routeRequest, setRouteRequest] = useState<any>(null);

  function handleRoute() {
    if (!destination) {
      alert("Enter destination");
      return;
    }

    setRouteRequest({
      start,
      destination,
    });
  }

  return (
    <div className="h-screen w-screen">

      {/* SEARCH PANEL */}
      <div className="absolute z-[1000] top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-xl bg-white p-4 rounded-xl shadow-lg space-y-3">

        <input
          placeholder="Start location (leave empty for current location)"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={handleRoute}
          className="w-full bg-green-500 text-white p-3 rounded"
        >
          Find Route
        </button>
      </div>

      {/* MAP */}
      <Map routeRequest={routeRequest} />
    </div>
  );
}