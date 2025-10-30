import React from "react";
import { FaTrophy, FaMedal, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function WallOfFame() {
  const navigate = useNavigate()
  const achievers = [
    {
      id: 1,
      name: "Aditi Sharma",
      title: "Top Contributor",
      avatar: "https://i.pravatar.cc/150?img=32",
      achievement: "Posted 120+ valuable tech articles",
      rank: 1,
      badge: "🥇",
    },
    {
      id: 2,
      name: "Ravi Kumar",
      title: "Community Helper",
      avatar: "https://i.pravatar.cc/150?img=33",
      achievement: "Helped 80+ users in forums",
      rank: 2,
      badge: "🥈",
    },
    {
      id: 3,
      name: "Neha Verma",
      title: "Innovator",
      avatar: "https://i.pravatar.cc/150?img=34",
      achievement: "Built 5 open-source AI tools",
      rank: 3,
      badge: "🥉",
    },
    {
      id: 4,
      name: "Kiran Patel",
      title: "Top Designer",
      avatar: "https://i.pravatar.cc/150?img=35",
      achievement: "Won 3 design hackathons",
      rank: 4,
      badge: "⭐",
    },
    {
      id: 5,
      name: "Ananya Gupta",
      title: "Content Creator",
      avatar: "https://i.pravatar.cc/150?img=36",
      achievement: "Created 50+ video tutorials",
      rank: 5,
      badge: "🌟",
    },
  ];

  return (
    <main className="flex-1 max-w-6xl mx-auto px-6 mt-6 h-[calc(100vh-4rem)] overflow-y-auto pb-10 scrollbar-hidden">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
          <FaTrophy className="text-yellow-500" /> Wall of Fame
        </h1>
        <p className="text-gray-500 mt-2">
          Celebrating our top community members and their incredible contributions 🚀
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {achievers.map((person) => (
          <div
            key={person.id}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Badge */}
            <div className="absolute top-3 left-3 text-2xl">{person.badge}</div>

            {/* Avatar */}
            <div className="flex flex-col items-center text-center p-6">
              <div className="relative">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-yellow-400 shadow-md group-hover:scale-105 transition-transform duration-300"
                />
                {person.rank <= 3 && (
                  <span className="absolute -bottom-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    #{person.rank}
                  </span>
                )}
              </div>

              {/* Info */}
              <h3 className="mt-4 text-lg font-semibold text-gray-900 cursor-pointer" onClick={()=>{
                navigate(`/user/${person.id}`)
              }}>
                {person.name}
              </h3>
              <p className="text-sm text-blue-600 font-medium">{person.title}</p>
              <p className="text-sm text-gray-500 mt-2">{person.achievement}</p>

              {/* Stars */}
              <div className="flex justify-center mt-3 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`${i < person.rank ? "opacity-100" : "opacity-40"}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
