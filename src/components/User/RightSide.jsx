import React from "react";
import { useNavigate } from "react-router-dom";

export default function RightSide() {
  const navigate = useNavigate();

  // News items with timestamps
  const newsItems = [
    { id: "124521545", title: "🔥 Tech layoffs slowing down", date: "2025-10-29T07:30:00Z" },
    { id: "124521546", title: "💡 AI reshaping design tools", date: "2025-10-29T09:10:00Z" },
    { id: "124521547", title: "🌍 Remote work trends 2025", date: "2025-10-28T20:45:00Z" },
    { id: "124521548", title: "📈 Startup funding rebounds", date: "2025-10-27T15:30:00Z" },
  ];

  // Function to calculate "time ago"
  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let [key, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) return `${interval}${key[0]} ago`;
    }

    return "Just now";
  };

  return (
    <aside className="hidden lg:block w-1/4 xl:w-1/4 p-4 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
      {/* News Feed Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h3 className="font-semibold mb-3">News Feeds</h3>
        <ul className="text-sm text-gray-700 space-y-3 pt-2">
          {newsItems.map((item) => (
            <li
              key={item.id}
              onClick={() => navigate(`/news/${item.id}`)}
              className="relative cursor-pointer overflow-hidden px-3 py-2 rounded-md group"
            >
              {/* Expanding background on hover */}
              <div className="absolute inset-0 bg-blue-50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>

              {/* News text */}
              <div className="relative z-10 flex justify-between items-center">
                <span className="font-medium text-gray-800 transition-all duration-300 group-hover:text-blue-700">
                  {item.title}
                </span>
                <span className="text-xs text-gray-400">{timeAgo(item.date)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Feed Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold mb-3">Add to your feed</h3>
        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://i.pravatar.cc/40?img=11"
            alt="Follow"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">React Developers</p>
            <button className="text-blue-600 text-sm font-semibold hover:underline">
              + Follow
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
