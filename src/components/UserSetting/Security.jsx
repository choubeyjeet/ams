import React from 'react'
import { FaSave } from 'react-icons/fa'

export default function Security() {
  return (
    <div>
       <form className="space-y-5">
            <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
      
            <div>
              <label className="block text-sm text-gray-600 mb-1">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
      
            <div>
              <label className="block text-sm text-gray-600 mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
      
            <div>
              <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
      
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <FaSave /> Update Password
            </button>
          </form>
    </div>
  )
}
