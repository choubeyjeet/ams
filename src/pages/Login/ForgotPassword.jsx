import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Mock success
    setTimeout(() => {
      setSuccess("✅ Password reset link has been sent to your email!");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white p-8">
        <div className="w-full max-w-md bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center mb-3">Forgot Password 🔑</h2>
          <p className="text-center text-gray-300 mb-6 text-sm">
            Enter your registered email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-transparent">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
              {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
              {success && <p className="text-green-400 text-sm mt-1">{success}</p>}
            </div>

            {/* Submit Button */}
              <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold transition bg-light-primaryButton dark:bg-dark-primaryButton hover:bg-light-primaryButtonHover"
            >
              Send Reset Link
            </button>
            {/* Back to Login */}
            <div className="text-center mt-4 text-sm text-gray-300">
              Remember your password?{" "}
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer text-pink-400 hover:text-pink-500"
              >
                Login here
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/silhouette-party-crowd-grunge-background_1048-2542.jpg')",
        }}
      ></div>
    </div>
  );
}
