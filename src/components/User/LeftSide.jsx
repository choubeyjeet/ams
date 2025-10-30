import React from 'react'
import TrendingTags from '../TrendingTags/TrendingTags'

export default function LeftSide() {
  return (
    <aside className="hidden lg:block w-1/4 xl:w-1/5 p-4 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hidden">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col items-center">
            <img
              src="https://i.pravatar.cc/80"
              alt="User"
              className="w-20 h-20 rounded-full border-2 border-gray-300"
            />
            <h2 className="text-lg font-semibold mt-2">Jitender Singh</h2>
            <p className="text-sm text-gray-500">Frontend Developer</p>
          </div>
          <hr className="my-3" />
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="hover:text-blue-600 cursor-pointer">My Network</li>
            <li className="hover:text-blue-600 cursor-pointer">Groups</li>
            <li className="hover:text-blue-600 cursor-pointer">Events</li>
            <li className="hover:text-blue-600 cursor-pointer">Hashtags</li>
          </ul>
        </div>
        <TrendingTags />
      </aside>
  )
}
