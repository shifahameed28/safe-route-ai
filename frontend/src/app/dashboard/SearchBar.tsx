"use client";

import { useState } from "react";

export default function SearchBar({ setDestination }: any) {
  const [value, setValue] = useState("");

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-xl z-[1000]">
      <div className="bg-white rounded-2xl shadow-xl p-3 flex gap-2 items-center">

        <input
          type="text"
          placeholder="Search destination..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 outline-none text-lg"
        />

        <button
          onClick={() => setDestination(value)}
          className="bg-green-500 text-white px-4 py-2 rounded-xl"
        >
          Go
        </button>

      </div>
    </div>
  );
}
