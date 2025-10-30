import React, { useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotificationPanel({ open, onClose }) {
  const panelRef = useRef(null);
  const navigate = useNavigate()
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-12 w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50"
    >
      <div className="p-3 border-b border-gray-100 font-semibold text-gray-700">
        Notifications
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer"
          >
            <FaUserCircle className="text-gray-500 w-8 h-8 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-gray-800">
                <span className="font-semibold">John Doe</span> liked your post.
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 text-center border-t border-gray-100">
        <button
          onClick={()=>{
            navigate('/notifications')
            onClose();
            
          }}
          className="text-blue-600 text-sm hover:underline"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
}
