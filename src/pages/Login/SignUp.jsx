import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaCalendarAlt,
  FaBook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosPrivate";
import { toast, ToastContainer } from "react-toastify";


export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    institution: "",
    batch_year: "",
    email: "",
    course: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.institution.trim()) newErrors.institution = "Institution name is required.";
    if (!formData.batch_year.trim()) newErrors.batch_year = "Batch year is required.";
    if (!formData.course.trim()) newErrors.course = "Course is required.";
    return newErrors;
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess("");
      return;
    }

    try {
      const response = await api.post("ams.api.register_alumni", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "token 5ab3ef379bdd579:0673d2b6240a69f",
        },
      });

      if (response?.data?.message.message === "Alumni registered successfully! Check your email for login credentials.") {
        toast.success(response.data?.message.message);
        setFormData({
          first_name: "",
          last_name: "",
          institution: "",
          batch_year: "",
          email: "",
          course: "",
          phone: "",
        });
        setErrors({});
        
        
      } else if (response?.data?.message.message === "Alumni already registered") {
        setErrors({ email: "User already exists with this email." });
      } else {
        setErrors({ email: "Unexpected error. Try again later." });
      }
    } catch (error) {
      console.error(error);
      setErrors({ email: "Something went wrong while creating the user." });
    }
  };

  const handleFocus = (field) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2 rounded-md bg-[#ffffff10] border border-gray-400/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all";

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ToastContainer />
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white p-8">
        <div className="w-full max-w-md bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-white/10">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account ✨
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.first_name}
                  onFocus={() => handleFocus("first_name")}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter your first name"
                />
              </div>
              {errors.first_name && (
                <p className="text-red-400 italic text-sm mt-1">
                  {errors.first_name}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.last_name}
                  onFocus={() => handleFocus("last_name")}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter your last name"
                />
              </div>
              {errors.last_name && (
                <p className="text-red-400 italic text-sm mt-1">
                  {errors.last_name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onFocus={() => handleFocus("email")}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 italic text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.phone}
                  onFocus={() => handleFocus("phone")}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 italic text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm mb-1">Institution</label>
              <div className="relative">
                <FaUniversity className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.institution}
                  onFocus={() => handleFocus("institution")}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter institution name"
                />
              </div>
              {errors.institution && (
                <p className="text-red-400 italic text-sm mt-1">
                  {errors.institution}
                </p>
              )}
            </div>

            {/* Batch Year */}
            <div>
              <label className="block text-sm mb-1">Batch Year</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.batch_year}
                  onFocus={() => handleFocus("batch_year")}
                  onChange={(e) =>
                    setFormData({ ...formData, batch_year: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter your batch year"
                />
              </div>
              {errors.batch_year && (
                <p className="text-red-400 italic text-sm mt-1">
                  {errors.batch_year}
                </p>
              )}
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm mb-1">Course</label>
              <div className="relative">
                <FaBook className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.course}
                  onFocus={() => handleFocus("course")}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter your course name"
                />
              </div>
              {errors.course && (
                <p className="text-red-400 italic text-sm mt-1">
                  {errors.course}
                </p>
              )}
            </div>

            {success && (
              <p className="text-green-400 italic text-sm text-center">
                {success}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold transition bg-light-primaryButton dark:bg-dark-primaryButton hover:bg-light-primaryButtonHover focus:ring-2 focus:ring-pink-400"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="text-[14px] mt-4 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer text-pink-400 hover:underline"
            >
              Login
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4685.jpg')",
        }}
      ></div>
    </div>
  );
}
