import React, { useState } from "react";
import {
  FaDonate,
  FaCheckCircle,
  FaBuilding,
  FaShareAlt,
} from "react-icons/fa";
import Reactions from "../Feed/Extra/Reactions";
import ShareOptions from "../Feed/Extra/ShareOptions";

export default function DonationView() {
  const [open, setOpen] = useState(false);

  const donation = {
    id: 1,
    title: "Help Build a School for Underprivileged Kids",
    organization: "Hope Foundation",
    description:
      "Join us in building a school that will provide education to 500+ children in rural India. Your small contribution can bring a big change in their lives. This initiative will fund construction, books, uniforms, and teaching facilities.",
    goalAmount: 500000,
    collectedAmount: 320000,
    endDate: "2025-12-30",
    thumbnail:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
    url: "https://hopefoundation.org/donate/school",
  };

  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState("");
  const [donated, setDonated] = useState(false);

  const handleDonate = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setErrors("Please enter a valid donation amount.");
      return;
    }
    if (Number(amount) < 10) {
      setErrors("Minimum donation amount is ₹10.");
      return;
    }
    setErrors("");
    setDonated(true);
  };

  const calculateProgress = (collected, goal) =>
    Math.min((collected / goal) * 100, 100).toFixed(1);

  const daysRemaining = (endDate) => {
    const diff =
      (new Date(endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.ceil(diff) : 0;
  };

  const progress = calculateProgress(
    donation.collectedAmount,
    donation.goalAmount
  );

  return (
    <main className="flex-1 max-w-2xl mx-auto mt-6 h-[calc(100vh-4rem)] overflow-y-auto pb-10 scrollbar-hidden">
      <div className="max-w-5xl mx-auto px-5">
        {donated ? (
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-2xl shadow p-10 text-center">
            <FaCheckCircle className="text-green-500 text-5xl mb-3" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Thank You for Your Donation! 💖
            </h2>
            <p className="text-gray-500 max-w-lg">
              Your support helps us bring positive change and hope to many
              lives. We truly appreciate your generosity.
            </p>
            <button
              onClick={() => setDonated(false)}
              className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Back to Campaign
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden">
            {/* Header Image */}
            <img
              src={donation.thumbnail}
              alt={donation.title}
              className="w-full h-72 object-cover"
            />

            {/* Content */}
            <div className="p-6 space-y-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {donation.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaBuilding className="text-gray-400" />
                <span>{donation.organization}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {donation.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>
                    ₹{donation.collectedAmount.toLocaleString()} raised
                  </span>
                  <span>Goal ₹{donation.goalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Remaining Days + Reactions + Share */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
               
                  <div className="flex items-center gap-6  flex-shrink-0 "> <Reactions /> </div>    
                

                {/* Wrap reaction and share properly */}
                <div className="flex items-center gap-6 w-full sm:w-auto flex-shrink-0 ">
               <div className="text-gray-500 text-sm"> {daysRemaining(donation.endDate)} days remaining</div> 

                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
                    onClick={() => setOpen(true)}
                  >
                    <FaShareAlt />
                    <span className="font-semibold">Share</span>
                  </button>
                </div>
              </div>

              {/* Donation Form */}
              <form
                onSubmit={handleDonate}
                className="mt-6 bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-inner space-y-4"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enter Donation Amount (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors && <p className="text-red-500 text-sm">{errors}</p>}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <FaDonate />
                  Donate Now
                </button>
              </form>

              <div className="text-center text-gray-500 text-sm mt-6">
                Every rupee counts 💖 — Together we can make a difference.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inline Share Options */}
      <div className="relative z-50">
        <ShareOptions postUrl={donation.url} open={open} setOpen={setOpen} />
      </div>
    </main>
  );
}
