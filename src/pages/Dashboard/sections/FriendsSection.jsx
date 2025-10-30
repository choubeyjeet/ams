import React from "react";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function FriendsSection() {
  const friends = [
    {
      name: "Riya Sharma",
      mutual: 12,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Aarav Singh",
      mutual: 8,
      avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    },
    {
      name: "Meera Kapoor",
      mutual: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Aditya Verma",
      mutual: 15,
      avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          👥 Your Friends
        </h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
          <FaUserPlus /> Add Friend
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
          <p className="text-sm text-gray-500">Total Friends</p>
          <p className="text-2xl font-semibold text-blue-600">
            {friends.length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center border border-green-100">
          <p className="text-sm text-gray-500">Avg. Mutuals</p>
          <p className="text-2xl font-semibold text-green-600">
            {(
              friends.reduce((sum, f) => sum + f.mutual, 0) / friends.length
            ).toFixed(1)}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-100">
          <p className="text-sm text-gray-500">Most Mutuals</p>
          <p className="text-2xl font-semibold text-yellow-600">
            {Math.max(...friends.map((f) => f.mutual))}
          </p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg text-center border border-pink-100">
          <p className="text-sm text-gray-500">Friend Growth</p>
          <p className="text-2xl font-semibold text-pink-600">+12%</p>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Mutual Friends Comparison
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={friends}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="mutual" radius={[8, 8, 0, 0]}>
              {friends.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-500 text-center mt-2">
          Mutual friends comparison chart
        </p>
      </div>

      {/* Friends Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Your Friends List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {friends.map((f, i) => (
            <div
              key={i}
              className="p-4 bg-white border rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={f.avatar}
                alt={f.name}
                className="w-12 h-12 rounded-full border"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{f.name}</p>
                <p className="text-sm text-gray-500">{f.mutual} mutual friends</p>
              </div>
              <button className="text-blue-500 font-medium hover:underline">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
