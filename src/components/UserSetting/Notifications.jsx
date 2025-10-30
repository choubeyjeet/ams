import React, { useState } from 'react'


function ToggleSetting({ label }) {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        type="button"
        className={`w-10 h-5 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        } relative`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}

export default function Notifications() {
  return (
    <div>
        <div>
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <ToggleSetting label="Email notifications" />
              <ToggleSetting label="Push notifications" />
              <ToggleSetting label="Job recommendation alerts" />
              <ToggleSetting label="News and updates" />
            </div>
          </div>
    </div>
  )
}
