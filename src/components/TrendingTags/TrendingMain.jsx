import React, { useState } from "react";
import { FaHashtag, FaFire, FaRegClock } from "react-icons/fa";

export default function TrendingMain() {
  const [filter, setFilter] = useState("today");

  const trendingTags = [
    { tag: "AI", posts: 3200 },
    { tag: "CyberSecurity", posts: 2400 },
    { tag: "ReactJS", posts: 4100 },
    { tag: "CloudComputing", posts: 1800 },
    { tag: "DevOps", posts: 900 },
  ];

  const topPosts = [
    {
      id: 1,
      tag: "AI",
      title: "AI detects fraud 10x faster — real world results!",
      author: "Neha Verma",
      date: "Oct 29, 2025",
      likes: 210,
    },
    {
      id: 2,
      tag: "CyberSecurity",
      title: "Zero Trust is the future of enterprise networks 🔐",
      author: "Arjun Mehta",
      date: "Oct 27, 2025",
      likes: 175,
    },
    {
      id: 3,
      tag: "ReactJS",
      title: "10 React performance tips for large apps ⚛️",
      author: "Riya Sharma",
      date: "Oct 25, 2025",
      likes: 260,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-6 px-4 lg:px-0 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaFire className="text-orange-500" /> Trending Now
        </h1>

        {/* Filter Tabs */}
        <div className="flex gap-3 text-sm">
          {["today", "week", "month"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-full border ${
                filter === t
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100"
              } transition`}
            >
              {t === "today" && "Today"}
              {t === "week" && "This Week"}
              {t === "month" && "This Month"}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Tags */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaHashtag className="text-blue-600" /> Top Trending Tags
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {trendingTags.map((tag, i) => (
            <div
              key={i}
              className="bg-white border rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md transition flex flex-col items-center"
            >
              <p className="font-medium text-blue-600 text-sm">#{tag.tag}</p>
              <p className="text-xs text-gray-500">{tag.posts.toLocaleString()} posts</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Posts */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaRegClock className="text-blue-600" /> Top Posts {filter === "today" ? "Today" : filter === "week" ? "This Week" : "This Month"}
        </h2>

        <div className="space-y-4">
          {topPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg p-4 border shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-blue-600 font-medium mb-1">#{post.tag}</p>
              <h3 className="font-semibold text-gray-800">{post.title}</h3>
              <p className="text-xs text-gray-500 mt-1">
                By {post.author} • {post.date}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                👍 {post.likes.toLocaleString()} likes
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
