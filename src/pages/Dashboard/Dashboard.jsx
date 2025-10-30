import React, { useState } from "react";
import {
  FaUsers,
  FaCalendarAlt,
  FaDonate,
  FaChartLine,
} from "react-icons/fa";
import FriendsSection from "./sections/FriendsSection";
import EventsSection from "./sections/EventsSection";
import DonationsSection from "./sections/DonationsSection";
import NewsSection from "./sections/NewsSection";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("friends");
  const [menuOpen, setMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "friends":
        return <FriendsSection />;
      case "events":
        return <EventsSection />;
      case "donations":
        return <DonationsSection />;
      case "news":
        return <NewsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">My Dashboard</h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4">
          {["friends", "events", "donations", "news"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-md text-sm font-medium capitalize ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 border px-3 py-2 rounded-md hover:bg-gray-100"
        >
          ☰
        </button>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-white border shadow-md rounded-md flex flex-col w-40 z-50">
            {["friends", "events", "donations", "news"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMenuOpen(false);
                }}
                className={`px-4 py-2 text-left text-sm capitalize ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Main content */}
        <main className="flex-1 p-6">{renderContent()}</main>

        {/* Sidebar */}
        <aside className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Overview</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <FaUsers className="text-blue-500" />
                <span className="font-medium text-gray-700">Total Friends</span>
              </div>
              <span className="font-semibold text-gray-800">56</span>
            </div>

            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-500" />
                <span className="font-medium text-gray-700">
                  Upcoming Events
                </span>
              </div>
              <span className="font-semibold text-gray-800">4</span>
            </div>

            <div className="flex items-center justify-between bg-pink-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <FaDonate className="text-pink-500" />
                <span className="font-medium text-gray-700">
                  Donations Made
                </span>
              </div>
              <span className="font-semibold text-gray-800">$1,250</span>
            </div>

            <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <FaChartLine className="text-yellow-500" />
                <span className="font-medium text-gray-700">My Activity</span>
              </div>
              <span className="font-semibold text-gray-800">Active</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
