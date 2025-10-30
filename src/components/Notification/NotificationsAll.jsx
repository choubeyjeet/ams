import React from "react";
import { FaBell, FaHeart, FaCommentDots, FaUserPlus } from "react-icons/fa";

export default function NotificationsAll() {
  // 🧩 Dummy notification data
  const notifications = [
    {
      id: 1,
      icon: <FaHeart className="text-red-500" />,
      message: "Aditi liked your post",
      time: "2 min ago",
      type: "like",
    },
    {
      id: 2,
      icon: <FaCommentDots className="text-blue-500" />,
      message: "Ravi commented: “Great job!”",
      time: "10 min ago",
      type: "comment",
    },
    {
      id: 3,
      icon: <FaUserPlus className="text-green-500" />,
      message: "Ananya started following you",
      time: "25 min ago",
      type: "follow",
    },
    {
      id: 4,
      icon: <FaBell className="text-yellow-500" />,
      message: "You have a new event invite",
      time: "1 hr ago",
      type: "event",
    },
    {
      id: 5,
      icon: <FaCommentDots className="text-blue-500" />,
      message: "Dev replied to your comment",
      time: "2 hrs ago",
      type: "reply",
    },
    {
      id: 6,
      icon: <FaHeart className="text-red-500" />,
      message: "Kiran liked your photo",
      time: "3 hrs ago",
      type: "like",
    },
  ];

  return (
    <main className="flex-1 max-w-2xl mx-auto px-3 mt-6 lg:px-0 h-[calc(100vh-4rem)] overflow-y-auto pb-10 scrollbar-hidden">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <FaBell className="text-blue-600" />
        Notifications
      </h2>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="text-xl">{n.icon}</div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{n.message}</p>
              <p className="text-xs text-gray-500 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
