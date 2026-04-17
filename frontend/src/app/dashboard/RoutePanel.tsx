"use client";

import { useEffect, useState } from "react";

export default function RoutePanel({ setDestination }: any) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const fetchPlaces = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/geocode?q=${query}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
    };

    fetchPlaces();
  }, [query]);

  return (
    <div className="relative z-50">

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destination"
        className="border p-3 w-full rounded"
      />

      {loading && (
        <div className="absolute bg-white p-2 w-full shadow">
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute bg-white w-full shadow max-h-60 overflow-auto z-[9999]">
          {results.map((r, i) => (
            <div
              key={i}
              onClick={() => {
                setDestination({ lat: r.lat, lng: r.lon });
                setQuery(r.display_name);
                setResults([]);
              }}
              className="p-2 border-b cursor-pointer hover:bg-gray-100 text-sm"
            >
              {r.display_name}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setDestination(query)}
        className="mt-2 bg-green-500 text-white p-3 w-full rounded"
      >
        Find Safe Route
      </button>
    </div>
  );
}
