import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function CreateEventModal({   onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    venue: "",
    address: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
    thumbnail: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  if (!open) return null;

  const validFormats = ["image/jpeg", "image/png", "image/jpg"];
  const maxSizeInMB = 5;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!validFormats.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        thumbnail: "Only JPG and PNG formats allowed.",
      }));
      return;
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        thumbnail: "File size should not exceed 5MB.",
      }));
      return;
    }

    setForm({ ...form, thumbnail: file });
    setErrors((prev) => ({ ...prev, thumbnail: null }));

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeThumbnail = () => {
    setForm({ ...form, thumbnail: null });
    setPreview(null);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.venue.trim()) newErrors.venue = "Venue name is required.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.startDate) newErrors.startDate = "Start date is required.";
    if (!form.endDate) newErrors.endDate = "End date is required.";
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      newErrors.endDate = "End date cannot be before start date.";
    if (!form.startTime) newErrors.startTime = "Start time is required.";
    if (!form.endTime) newErrors.endTime = "End time is required.";
 
    if (!form.thumbnail) newErrors.thumbnail = "Thumbnail is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null })); // remove error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    onSubmit?.(formData);
    onClose();
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  return (
      <main className="flex-1 max-w-6xl mx-auto px-6 mt-6 h-[calc(100vh-4rem)] overflow-y-auto pb-10 scrollbar-hidden">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-4  animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3"><IoIosArrowBack className="cursor-pointer" onClick={()=>{
            navigate("/events")
          }}/> Create Event</h2>
          
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 h-full"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              onFocus={() =>
                setErrors((prev) => ({ ...prev, title: null }))
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your event title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Thumbnail <span className="text-red-500">*</span>
            </label>

            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  onFocus={() =>
                    setErrors((prev) => ({ ...prev, thumbnail: null }))
                  }
                  className="hidden"
                />
                <span className="text-gray-500 text-sm">
                  Click to upload an image (JPG/PNG up to 5MB)
                </span>
              </label>
            ) : (
              <div className="relative w-full max-h-56 overflow-hidden rounded-lg group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black transition"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}

            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
            )}
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Venue Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.venue}
              onChange={(e) => handleFieldChange("venue", e.target.value)}
              onFocus={() =>
                setErrors((prev) => ({ ...prev, venue: null }))
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., Marina Bay Sands, Singapore"
            />
            {errors.venue && (
              <p className="text-red-500 text-sm">{errors.venue}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.address}
              onChange={(e) => handleFieldChange("address", e.target.value)}
              onFocus={() =>
                setErrors((prev) => ({ ...prev, address: null }))
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24"
              placeholder="Enter full event address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* Dates & Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date & Time */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Start Date & Time <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    handleFieldChange("startDate", e.target.value)
                  }
                  onFocus={() =>
                    setErrors((prev) => ({ ...prev, startDate: null }))
                  }
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) =>
                    handleFieldChange("startTime", e.target.value)
                  }
                  onFocus={() =>
                    setErrors((prev) => ({ ...prev, startTime: null }))
                  }
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              {(errors.startDate || errors.startTime) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate || errors.startTime}
                </p>
              )}
            </div>

            {/* End Date & Time */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                End Date & Time <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    handleFieldChange("endDate", e.target.value)
                  }
                  onFocus={() =>
                    setErrors((prev) => ({ ...prev, endDate: null }))
                  }
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) =>
                    handleFieldChange("endTime", e.target.value)
                  }
                  onFocus={() =>
                    setErrors((prev) => ({ ...prev, endTime: null }))
                  }
                  className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              {(errors.endDate || errors.endTime) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endDate || errors.endTime}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Description 
            </label>
            <div>
              <ReactQuill
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
                value={form.description}
                onChange={(value) => handleFieldChange("description", value)}
                className="bg-white rounded-lg h-[130px]"
              />
            </div>

          </div>

          {/* Submit */}
          <div className="pt-10">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
      </main>
    
  );
}
