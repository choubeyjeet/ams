import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaDonate, FaChartLine, FaCalendarAlt } from "react-icons/fa";

export default function DonationsSection() {
  const [donations, setDonations] = useState([
    { campaign: "Flood Relief 2025", amount: 100, date: "Oct 20, 2025" },
    { campaign: "Child Education Fund", amount: 75, date: "Oct 12, 2025" },
    { campaign: "Tree Plantation Drive", amount: 50, date: "Oct 5, 2025" },
    { campaign: "Women Empowerment", amount: 120, date: "Sep 25, 2025" },
  ]);

  const totalAmount = donations.reduce((acc, d) => acc + d.amount, 0);
  const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171"];

  // Simulate fetching donation data
  useEffect(() => {
    // Example: Fetch from API in real app
    // axios.get("/api/user/donations").then(res => setDonations(res.data));
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Donations Raised by You
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-gray-500 text-sm">Total Donations</p>
            <p className="text-xl font-semibold text-blue-700">
              ${totalAmount}
            </p>
          </div>
          <FaDonate className="text-blue-500 text-2xl" />
        </div>

        <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-gray-500 text-sm">Total Campaigns</p>
            <p className="text-xl font-semibold text-green-700">
              {donations.length}
            </p>
          </div>
          <FaChartLine className="text-green-500 text-2xl" />
        </div>

        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-gray-500 text-sm">Last Donation</p>
            <p className="text-lg font-semibold text-yellow-700">
              {donations[0]?.date}
            </p>
          </div>
          <FaCalendarAlt className="text-yellow-500 text-2xl" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white border rounded-lg shadow-sm p-4">
          <h3 className="font-medium text-gray-700 mb-3">
            Donation Amount by Campaign
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campaign" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3B82F6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border rounded-lg shadow-sm p-4">
          <h3 className="font-medium text-gray-700 mb-3">Donation Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donations}
                dataKey="amount"
                nameKey="campaign"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {donations.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donation List */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Recent Donations
        </h3>
        <div className="space-y-3">
          {donations.map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <h4 className="font-medium text-gray-800">{d.campaign}</h4>
                <p className="text-sm text-gray-500">{d.date}</p>
              </div>
              <p className="font-semibold text-blue-600">${d.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
