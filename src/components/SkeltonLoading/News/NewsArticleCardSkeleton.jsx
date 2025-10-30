import React from "react";

export default function NewsArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200 w-full" />

      {/* Content placeholder */}
      <div className="p-5 flex flex-col justify-between h-[180px]">
        <div>
          <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
          <div className="h-3 w-full bg-gray-200 rounded mb-2" />
          <div className="h-3 w-5/6 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-4/5 bg-gray-200 rounded" />
        </div>

        {/* Button placeholder */}
        <div className="mt-4 h-9 w-full bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}
