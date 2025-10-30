import React, { useState } from "react";
import { FaUserGraduate, FaMapMarkerAlt, FaEnvelope, FaPhone, FaBriefcase, FaCalendarAlt, FaShareAlt } from "react-icons/fa";
import ShareOptions from "../Feed/Extra/ShareOptions";

export default function UserProfilePage() {
  const [open, setOpen] = useState(false);
  const user = {
    name: "Aditi Sharma",
    title: "Full Stack Developer",
    avatar: "https://i.pravatar.cc/150?img=47",
    location: "Bangalore, India",
    email: "aditi.sharma@example.com",
    phone: "+91 9876543210",
    education: "B.Tech in Computer Science, IIT Delhi",
    experience: "5 years in Web Development",
    joined: "March 2020",
    bio: "Passionate about building modern web apps with React, Node.js, and cloud technologies. Loves open-source and mentoring new developers.",
  };

  const recentActivity = [
    {
      id: 1,
      action: "🚀 Published a new article on React performance optimization",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "💬 Commented on 'AI and the Future of Work'",
      time: "1 day ago",
    },
    {
      id: 3,
      action: "🛠️ Updated portfolio project 'TaskFlow Dashboard'",
      time: "3 days ago",
    },
    {
      id: 4,
      action: "🏆 Earned 'Top Contributor' badge on DevNetwork",
      time: "1 week ago",
    },
  ];

  return (
    <main className="flex-1 max-w-4xl mx-auto px-6 mt-6 pb-10">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
        />

        <div className="flex-1">
          <h1 className="flex items-center justify-between"><div className="text-2xl font-bold text-gray-800 ">{user.name}</div>  <button
                              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
                              onClick={() => setOpen(true)}
                            >
                              <FaShareAlt />
                              <span className="font-semibold">Share</span>
                            </button></h1>
          <p className="text-blue-600 font-medium">{user.title}</p>
          <p className="mt-3 text-gray-600">{user.bio}</p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" /> {user.location}
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" /> {user.email}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-blue-500" /> {user.phone}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" /> Joined {user.joined}
            </p>
          </div>
        </div>
      </div>

      {/* Education & Experience */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">🎓 Education & Experience</h2>

        <div className="space-y-3 text-gray-700">
          <p className="flex items-center gap-2">
            <FaUserGraduate className="text-blue-500" /> {user.education}
          </p>
          <p className="flex items-center gap-2">
            <FaBriefcase className="text-blue-500" /> {user.experience}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">🕒 Recent Activity</h2>
        <ul className="space-y-3">
          {recentActivity.map((activity) => (
            <li
              key={activity.id}
              className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition"
            >
              <p className="text-gray-800 text-sm">{activity.action}</p>
              <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative z-50">
              <ShareOptions  open={open} setOpen={setOpen} />
            </div>
    </main>
  );
}
