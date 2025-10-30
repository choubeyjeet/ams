import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaApple, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("✅ Login successful (mock)!");
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white p-8">
        <div className="w-full max-w-md bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-300 text-white focus:outline-none focus:border-pink-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-300 text-white focus:outline-none focus:border-pink-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-gray-300 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm text-gray-300">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-pink-500" /> Remember me
              </label>
              <a onClick={()=>{navigate('/forgot-password')}} className="cursor-pointer hover:text-pink-400">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold transition bg-light-primaryButton dark:bg-dark-primaryButton hover:bg-light-primaryButtonHover"
            >
              Login
            </button>

            {/* OR Divider */}
            <div className="flex items-center justify-center my-4">
              <div className="h-px bg-gray-500 w-1/4" />
              <span className="mx-2 text-gray-400 text-sm">or login with</span>
              <div className="h-px bg-gray-500 w-1/4" />
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition"
              >
                <FaGoogle className="text-red-400" /> Google
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition"
              >
                <FaApple className="text-gray-200" /> Apple
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition"
              >
                <FaLinkedin className="text-blue-400" /> LinkedIn
              </button>
            </div>
          </form>
         <div className="text-[14px] mt-4 p-2"> Don't have an account? <span onClick={()=>{navigate('/signup')}} className="cursor-pointer">Sign Up</span></div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" 
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/silhouette-party-crowd-grunge-background_1048-2542.jpg')",
        }}
      ></div>
    </div>
  );
}
