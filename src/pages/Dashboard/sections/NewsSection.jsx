import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function NewsSection() {
  const news = [
    { title: "AI Helps Detect Fraud Faster", date: "Oct 18, 2025", views: 1200, shares: 300 },
    { title: "Zero Trust Security: 2025 Trends", date: "Oct 12, 2025", views: 950, shares: 200 },
    { title: "How Cloud Security Evolved in 2025", date: "Oct 5, 2025", views: 1450, shares: 400 },
    { title: "Cyber Resilience: The New Buzzword", date: "Sep 28, 2025", views: 800, shares: 150 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        News Published by You
      </h2>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Viewed Posts Bar Chart */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Most Viewed Posts
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={news}>
              <XAxis dataKey="title" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-sm text-gray-500 text-center mt-2">
            Total views across your articles
          </div>
        </div>

        {/* Most Viral (Based on Shares) Pie Chart */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Most Viral Posts
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={news}
                dataKey="shares"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {news.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-sm text-gray-500 text-center mt-2">
            Posts with highest engagement (shares)
          </div>
        </div>
      </div>

      {/* News List Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Published Articles</h3>
        <div className="space-y-4">
          {news.map((n, i) => (
            <div
              key={i}
              className="bg-white p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-medium text-gray-800">{n.title}</h3>
              <p className="text-sm text-gray-500">
                {n.date} • {n.views} views • {n.shares} shares
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
