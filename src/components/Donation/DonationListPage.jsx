import React, { useState, useEffect } from "react";
import { FaBuilding, FaCalendarAlt, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DonationListPage() {
  const [donations, setDonations] = useState([]);
const navigate = useNavigate()
  // Dummy data (replace with API later)
  useEffect(() => {
    const dummyDonations = [
      {
        id: 1,
        title: "Help Build a School for Underprivileged Kids",
        organization: "Hope Foundation",
        goalAmount: 500000,
        collectedAmount: 320000,
        endDate: "2025-12-30",
        thumbnail:
          "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
      },
      {
        id: 2,
        title: "Support Women Empowerment Program",
        organization: "EmpowerHer Initiative",
        goalAmount: 300000,
        collectedAmount: 150000,
        endDate: "2025-11-25",
        thumbnail:
          "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
      },
      {
        id: 3,
        title: "Provide Clean Water to Villages",
        organization: "AquaLife NGO",
        goalAmount: 200000,
        collectedAmount: 180000,
        endDate: "2025-11-20",
        thumbnail:
          "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
      },
    ];
    setDonations(dummyDonations);
  }, []);

  const calculateProgress = (collected, goal) =>
    Math.min((collected / goal) * 100, 100).toFixed(1);

  const daysRemaining = (endDate) => {
    const diff =
      (new Date(endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.ceil(diff) : 0;
  };

  return (
      <main className="flex-1 max-w-2xl mx-auto mt-6 h-[calc(100vh-4rem)] overflow-y-auto pb-10 scrollbar-hidden">
    
    <div className="max-w-7xl mx-auto px-5 ">
      <div className="flex items-top justify-between">
             <div className="flex mb-8">
              <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
                <FaCalendarAlt className="text-blue-600" /> Ongoing Campaigns
              </h1>
      
            </div>
            <div><button className="hover:bg-light-primaryButtonHover hover:bg-dark-primaryButtonHover bg-light-primaryButton dark:bg-dark-primaryButton text-white h-[40px] w-[80px]" onClick={()=>{
             navigate("create")
            }}>Create</button></div>
           </div>
      

      {donations.length === 0 ? (
        <p className="text-gray-500 text-center">No donation campaigns found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {donations.map((item) => {
            const progress = calculateProgress(
              item.collectedAmount,
              item.goalAmount
            );
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                {/* Image */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-blue-600 cursor-pointer transition">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaBuilding className="text-gray-400" />
                    <span>{item.organization}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  {/* Amounts */}
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span>₹{item.collectedAmount.toLocaleString()} raised</span>
                    <span>of ₹{item.goalAmount.toLocaleString()}</span>
                  </div>

                  {/* Days Remaining */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>{daysRemaining(item.endDate)} days left</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1" onClick={()=>{
                      navigate("12154125")
                    }}>
                      <FaHeart className="text-white" />
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </main>
  );
}
