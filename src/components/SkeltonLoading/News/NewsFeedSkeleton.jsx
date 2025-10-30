import React from "react";

export default function NewsFeedSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200 animate-pulse">
      {/* Section title */}
      <div className="h-4 w-28 bg-gray-200 rounded mb-4" />

      {/* News list */}
      <ul className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <li
            key={i}
            className="flex justify-between items-center px-3 py-2 rounded-md border border-gray-100"
          >
            <div className="flex-1">
              <div className="h-3 w-48 bg-gray-200 rounded mb-1" />
              <div className="h-3 w-24 bg-gray-100 rounded" />
            </div>
            <div className="h-3 w-10 bg-gray-200 rounded" />
          </li>
        ))}
      </ul>
    </div>
  );
}
