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

export default function EventsSection() {
  const events = [
    {
      title: "Cybersecurity Workshop 2025",
      date: "Oct 18, 2025",
      attendees: 150,
      engagement: 95,
    },
    {
      title: "Zero Trust Summit",
      date: "Oct 12, 2025",
      attendees: 230,
      engagement: 89,
    },
    {
      title: "AI in Cloud Conference",
      date: "Sep 28, 2025",
      attendees: 310,
      engagement: 98,
    },
    {
      title: "Data Privacy Meetup",
      date: "Sep 20, 2025",
      attendees: 120,
      engagement: 76,
    },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0);
  const avgEngagement = (
    events.reduce((sum, e) => sum + e.engagement, 0) / events.length
  ).toFixed(1);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Events Created by You
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
          <p className="text-sm text-gray-600">Total Events</p>
          <p className="text-2xl font-semibold text-blue-600">{events.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
          <p className="text-sm text-gray-600">Total Attendees</p>
          <p className="text-2xl font-semibold text-green-600">{totalAttendees}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-center">
          <p className="text-sm text-gray-600">Avg. Engagement</p>
          <p className="text-2xl font-semibold text-yellow-600">
            {avgEngagement}%
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Attended Events */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Most Attended Events
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={events}>
              <XAxis dataKey="title" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendees" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-sm text-gray-500 text-center mt-2">
            Events ranked by attendee count
          </div>
        </div>

        {/* Event Engagement (Pie Chart) */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Event Performance (Engagement)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={events}
                dataKey="engagement"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {events.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-sm text-gray-500 text-center mt-2">
            Engagement rate (likes, comments, participation)
          </div>
        </div>
      </div>

      {/* Event List Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Your Events</h3>
        <div className="space-y-4">
          {events.map((e, i) => (
            <div
              key={i}
              className="bg-white p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-medium text-gray-800">{e.title}</h3>
              <p className="text-sm text-gray-500">
                {e.date} • {e.attendees} attendees • Engagement {e.engagement}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
