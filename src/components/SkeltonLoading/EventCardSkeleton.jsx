import React from "react";

export default function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-200" />

      {/* Content Placeholder */}
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />

        <div className="flex gap-2 pt-3">
          <div className="flex-1 h-8 bg-gray-200 rounded-lg" />
          <div className="flex-1 h-8 bg-gray-200 rounded-lg" />
          <div className="flex-1 h-8 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
