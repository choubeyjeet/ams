import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaShareAlt,
} from "react-icons/fa";
import ShareOptions from "../Feed/Extra/ShareOptions";
import CommentSection from "../Feed/Extra/CommentSection";
import Reactions from "../Feed/Extra/Reactions";

export default function EventPreview() {
  const [status, setStatus] = useState(null);
 const [open, setOpen] = useState(false);
  // Dummy event data
  const event = {
    title: "Cyber Security Awareness Summit 2025",
    venue: "Marina Bay Sands Convention Centre, Singapore",
    address: "10 Bayfront Avenue, Singapore 018956",
    startDate: "2025-11-15",
    endDate: "2025-11-16",
    startTime: "10:00 AM",
    endTime: "5:00 PM",
    description: `
      <p>
        Join global leaders, security researchers, and industry experts for the 
        <strong>Cyber Security Awareness Summit 2025</strong>. 
        Discover the latest innovations in AI-driven security, Zero Trust architecture, and cloud defense.
      </p>
      <ul>
        <li>🔐 Learn from 50+ top speakers</li>
        <li>🌐 Network with 1000+ professionals</li>
        <li>🚀 Live demos, workshops, and hands-on labs</li>
      </ul>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1000&q=80",
    url: "https://cybersummit2025.com",
  };

  const handleStatus = (newStatus) => setStatus(newStatus);

  return (
    <main className="flex-1 max-w-2xl mx-auto mt-6 h-[calc(100vh-4rem)] overflow-y-auto pb-10 scrollbar-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden">
          {/* Event Thumbnail */}
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-80 object-cover"
          />

          {/* Event Info */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {event.title}
            </h1>

            {/* Date & Time */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" />
                <span>
                  {new Date(event.startDate).toDateString()} –{" "}
                  {new Date(event.endDate).toDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-blue-600" />
                <span>
                  {event.startTime} – {event.endTime}
                </span>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <FaMapMarkerAlt className="text-red-500 mt-0.5" />
              <div>
                <p>{event.venue}</p>
                <p className="text-gray-500">{event.address}</p>
              </div>
            </div>

            {/* Description */}
            <div
              className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: event.description }}
            ></div>

            {/* RSVP Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => handleStatus("going")}
                className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${
                  status === "going"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-700/30"
                }`}
              >
                <FaCheckCircle />
                Going
              </button>

              <button
                onClick={() => handleStatus("interested")}
                className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${
                  status === "interested"
                    ? "bg-yellow-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-yellow-700/30"
                }`}
              >
                ⭐ Interested
              </button>

              <button
                onClick={() => handleStatus("not_going")}
                className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${
                  status === "not_going"
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-700/30"
                }`}
              >
                🚫 Not Going
              </button>
            </div>

            {/* Status Message */}
            {status && (
              <div className="pt-4">
                {status === "going" && (
                  <p className="text-green-600 font-medium flex items-center gap-2">
                    <FaCheckCircle /> You’re going to this event!
                  </p>
                )}
                {status === "interested" && (
                  <p className="text-yellow-600 font-medium">
                    You’re interested in this event.
                  </p>
                )}
                {status === "not_going" && (
                  <p className="text-red-600 font-medium">
                    You’re not attending this event.
                  </p>
                )}
              </div>
            )}

            {/* Divider */}
            <hr className="my-2" />

            {/* Reactions & Comments */}
            <div className=" ">
              <div className="flex items-center justify-between mb-8">
                <Reactions />
                <div className="flex items-center gap-2 text-gray-600 cursor-pointer" onClick={()=>{
                setOpen(true)
              }}>
                <FaShareAlt />
                <span className="font-semibold">Share this event</span>
              </div>
              </div>
              <CommentSection />
            </div>

            {/* Share Options */}
            
            
              <ShareOptions postUrl={event.url} open={open} setOpen={setOpen}/>
           
          </div>
        </div>
      </div>
    </main>
  );
}
