import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCheck, FaStar } from "react-icons/fa";
import CreateEventForm from "./CreateEventForm";
import { useNavigate } from "react-router-dom";

export default function EventList() {
const navigate = useNavigate()
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "AI & Cloud Security Summit 2025",
      date: "Nov 18, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "Marina Bay Sands, Singapore",
      attendees: 248,
      image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=800",
      rsvp: null,
    },
    {
      id: 2,
      title: "Hack the Future - Global Hackathon",
      date: "Dec 2–4, 2025",
      time: "All Day",
      location: "Online",
      attendees: 620,
      image: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800",
      rsvp: null,
    },
    {
      id: 3,
      title: "Cyber Range: Defense Challenge",
      date: "Jan 12, 2026",
      time: "9:00 AM - 6:00 PM",
      location: "CyberHub, Hyderabad",
      attendees: 312,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      rsvp: null,
    },
  ]);

  const handleRSVP = (id, status) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, rsvp: e.rsvp === status ? null : status } : e
      )
    );
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto px-6 mt-6 h-[calc(100vh-4rem)] overflow-y-auto pb-10 scrollbar-hidden">
 
  <div className="flex items-top justify-between">
       <div className="flex mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
          <FaCalendarAlt className="text-blue-600" /> Events
        </h1>

      </div>
      <div><button className="hover:bg-light-primaryButtonHover hover:bg-dark-primaryButtonHover bg-light-primaryButton dark:bg-dark-primaryButton text-white h-[40px] w-[80px]" onClick={()=>{
       navigate("create")
      }}>Create</button></div>
     </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Banner */}
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {event.rsvp && (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                  ✅ {event.rsvp}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-1 cursor-pointer" onClick={()=>{
                navigate("232656")
              }}>
                {event.title}
              </h3>
              <div className="text-gray-500 text-sm flex items-center gap-2 mb-1">
                <FaCalendarAlt /> {event.date}
              </div>
              <div className="text-gray-500 text-sm flex items-center gap-2 mb-1">
                <FaMapMarkerAlt /> {event.location}
              </div>
              <div className="text-gray-500 text-sm flex items-center gap-2 mb-3">
                <FaUsers /> {event.attendees} attending
              </div>

              {/* RSVP Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleRSVP(event.id, "Going")}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    event.rsvp === "Going"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 hover:bg-green-100 text-gray-700"
                  }`}
                >
                  ✅ 
                </button>
                <button
                  onClick={() => handleRSVP(event.id, "Interested")}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    event.rsvp === "Interested"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 hover:bg-yellow-100 text-gray-700"
                  }`}
                >
                  ⭐ 
                </button>
                <button
                  onClick={() => handleRSVP(event.id, "Not Going")}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    event.rsvp === "Not Going"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 hover:bg-red-100 text-gray-700"
                  }`}
                >
                  ❌ 
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
