import React from 'react'
import { FaSave } from 'react-icons/fa'

export default function Profile() {
  return (
    <div>
       <form className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Headline</label>
        <input
          type="text"
          placeholder="e.g. Software Engineer at LinkedIn"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Location</label>
        <input
          type="text"
          placeholder="City, Country"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        <FaSave /> Save Changes
      </button>
    </form>
    </div>
  )
}
