import React from "react";

export default function WallOfFameSkeleton() {
  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden p-6 animate-pulse">
      <div className="absolute top-3 left-3 w-6 h-6 bg-gray-200 rounded-full" />
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-gray-100" />
          <span className="absolute -bottom-2 -right-2 bg-gray-300 text-gray-300 text-xs font-bold px-2 py-1 rounded-full">
            #
          </span>
        </div>

        <div className="h-4 bg-gray-200 w-32 mt-4 rounded" />
        <div className="h-3 bg-gray-200 w-20 mt-2 rounded" />
        <div className="h-3 bg-gray-200 w-44 mt-3 rounded" />

        <div className="flex justify-center mt-4 space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
