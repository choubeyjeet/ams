import React from "react";

export default function UserInfoSidebarSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 w-full md:w-64 animate-pulse">
      {/* Profile Skeleton */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gray-200 mb-3" />
        <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>

      <hr className="my-3" />

      {/* Links Skeleton */}
      <ul className="space-y-3">
        <li className="h-3 w-24 bg-gray-200 rounded" />
        <li className="h-3 w-20 bg-gray-200 rounded" />
        <li className="h-3 w-28 bg-gray-200 rounded" />
        <li className="h-3 w-16 bg-gray-200 rounded" />
      </ul>
    </div>
  );
}
