import React, { useState } from "react";
import { FaUser, FaLock, FaBell, FaShieldAlt, FaSave } from "react-icons/fa";
import Profile from "../../components/UserSetting/Profile";
import Privacy from "../../components/UserSetting/Privacy";
import Security from "../../components/UserSetting/Security";
import Notifications from "../../components/UserSetting/Notifications";

export default function UserSettingPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-gray-100 min-h-screen mt-6">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          <TabButton
            label="Profile"
            icon={<FaUser />}
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <TabButton
            label="Privacy"
            icon={<FaShieldAlt />}
            active={activeTab === "privacy"}
            onClick={() => setActiveTab("privacy")}
          />
          <TabButton
            label="Security"
            icon={<FaLock />}
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          />
          <TabButton
            label="Notifications"
            icon={<FaBell />}
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
          />
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === "profile" && <Profile />}
          {activeTab === "privacy" && <Privacy />}
          {activeTab === "security" && <Security />}
          {activeTab === "notifications" && <Notifications />}
        </div>
      </div>
    </div>
  );
}


function TabButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

