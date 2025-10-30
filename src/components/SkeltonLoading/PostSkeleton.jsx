import React from "react";

export default function PostSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      {/* Post text */}
      <div className="space-y-2 mb-3">
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Post image */}
      <div className="w-full h-48 bg-gray-300 rounded-lg mb-3"></div>

      {/* Actions */}
      <div className="flex justify-between text-sm">
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-14"></div>
      </div>
    </div>
  );
}
