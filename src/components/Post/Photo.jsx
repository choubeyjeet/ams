import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

export default function Photo({ open, onClose }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const validFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newValidFiles = [];
    const newPreviews = [];

    for (let file of selectedFiles) {
      if (!validFormats.includes(file.type)) {
        setError("❌ Only JPG, PNG, and WEBP image files are allowed.");
        return;
      }
      if (file.size > maxSize) {
        setError("⚠️ Each image must be smaller than 10MB.");
        return;
      }

      newValidFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    setError("");
    setFiles((prev) => [...prev, ...newValidFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleUpload = () => {
    if (!title.trim()) {
      setError("⚠️ Please enter a title.");
      return;
    }
    if (files.length === 0) {
      setError("⚠️ Please upload at least one image.");
      return;
    }

    alert(`✅ Uploaded ${files.length} image(s): ${title}`);
    setFiles([]);
    setPreviews([]);
    setTitle("");
    setDescription("");
    setError("");
    onClose();
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[60%] h-[80vh] mx-4 relative flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">Upload Photos</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Error */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-600 text-sm rounded-md">
              {error}
            </div>
          )}

          {/* File Upload + Preview */}
          {previews.length === 0 ? (
            <label
              htmlFor="photoUpload"
              className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 hover:border-blue-400 cursor-pointer transition"
            >
              <p>📸 Click or drag images here to upload</p>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {previews.map((src, index) => (
                <div key={index} className="relative group">
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    className="w-full h-28 object-cover rounded-md"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-white rounded-full shadow-md p-1 text-red-600 hover:bg-red-100"
                  >
                    <FaTimesCircle size={18} />
                  </button>
                </div>
              ))}

              {/* Add More Images */}
              <label
                htmlFor="addMore"
                className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-28 text-gray-400 hover:border-blue-400 cursor-pointer transition"
              >
                <FaPlus size={20} />
                <span className="text-xs mt-1">Add More</span>
                <input
                  id="addMore"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Title */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter photo title"
            />
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              placeholder="Write a short description (optional)"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 sticky bottom-0 bg-white">
          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition"
          >
            Upload Photos
          </button>
        </div>
      </div>
    </div>
  );
}
