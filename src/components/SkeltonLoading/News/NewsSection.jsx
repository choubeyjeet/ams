import React from "react";

export default function NewsSection({ 
  title, 
  description, 
  image, 
  time, 
  source 
}) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden my-6 hover:shadow-md transition">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer transition">
          {title}
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-gray-400"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
            </svg>
            <span>{time}</span>
          </div>
          <span className="font-medium text-gray-700">{source}</span>
        </div>
      </div>
    </div>
  );
}
