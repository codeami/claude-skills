"use client";

import { useState } from "react";
import type { FeedItem } from "@/lib/types";
import FeedCard from "./FeedCard";

interface SourceFilterProps {
  items: FeedItem[];
  sourceNames: string[];
}

export default function SourceFilter({ items, sourceNames }: SourceFilterProps) {
  const [activeSource, setActiveSource] = useState<string | null>(null);

  const filtered = activeSource
    ? items.filter((item) => item.sourceName === activeSource)
    : items;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSource(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeSource === null
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
          }`}
        >
          All Sources
        </button>
        {sourceNames.map((name) => (
          <button
            key={name}
            onClick={() =>
              setActiveSource(activeSource === name ? null : name)
            }
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeSource === name
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-zinc-500">No items found. Check your source configuration.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
