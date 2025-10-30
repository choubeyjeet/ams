import React, { useState } from "react";
import { FaCommentDots, FaUserTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FriendsList() {
  const [friends, setFriends] = useState([
    { id: 1, name: "Aditi Sharma", mutualFriends: 8, avatar: "https://i.pravatar.cc/150?img=6", status: "online" },
    { id: 2, name: "Ravi Kumar", mutualFriends: 5, avatar: "https://i.pravatar.cc/150?img=7", status: "offline" },
    { id: 3, name: "Ananya Gupta", mutualFriends: 12, avatar: "https://i.pravatar.cc/150?img=8", status: "online" },
    { id: 4, name: "Kiran Patel", mutualFriends: 2, avatar: "https://i.pravatar.cc/150?img=9", status: "offline" },
    { id: 5, name: "Devraj Mehta", mutualFriends: 10, avatar: "https://i.pravatar.cc/150?img=10", status: "online" },
    { id: 6, name: "Sakshi Verma", mutualFriends: 7, avatar: "https://i.pravatar.cc/150?img=11", status: "online" },
  ]);

  const navigate = useNavigate()

  const removeFriend = (id) => setFriends((prev) => prev.filter((f) => f.id !== id));

  return (
    <main className="flex-1 max-w-6xl mx-auto px-6 mt-6 h-[calc(100vh-4rem)] overflow-y-auto pb-10 scrollbar-hidden">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">👥 Friends</h2>

      {/* Grid: 1 col on very small, exactly 3 cols on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Top: avatar + basic info */}
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img src={friend.avatar} alt={friend.name} className="w-24 h-24 rounded-full object-cover border-2 border-gray-100" />
                <span
                  className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                    friend.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>

              <div className="flex-1">
                <p className="font-semibold cursor-pointer text-lg text-gray-900" onClick={()=>{
                  navigate("/user/1260")
                }}>{friend.name}</p>
                <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Buttons INSIDE the card (always visible) */}
            <div className="mt-4 flex gap-3 -ml-3">
              <button
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white text-sm px-2 py-1 rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigate(`/messages`)}
              >
                <FaCommentDots size={14} /> Message
              </button>

              <button
                className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-red-600 transition"
                onClick={() => removeFriend(friend.id)}
              >
                <FaUserTimes size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
