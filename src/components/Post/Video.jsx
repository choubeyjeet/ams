import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";

export default function Video({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validFormats = ["video/mp4", "video/webm", "video/ogg", "video/mkv"];
    const maxSize = 1024 * 1024 * 1024; // 1GB

    if (!selectedFile) return;

    if (!validFormats.includes(selectedFile.type)) {
      setError("❌ Only MP4, WEBM, OGG, or MKV video files are allowed.");
      setFile(null);
      setPreview(null);
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("⚠️ File size should not exceed 1GB.");
      setFile(null);
      setPreview(null);
      return;
    }

    setError("");
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = () => {
    if (!title.trim()) {
      setError("⚠️ Please enter a video title.");
      return;
    }

    if (!file) {
      setError("⚠️ Please upload a video file.");
      return;
    }

    alert(`✅ Uploaded: ${title}`);
    setFile(null);
    setPreview(null);
    setTitle("");
    setDescription("");
    setError("");
    onClose();
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[60%] h-[80vh] mx-4 relative flex flex-col">
        {/* Header (Sticky) */}
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">Upload Video</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
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

          {/* File Upload */}
          {!preview ? (
            <label
              htmlFor="videoUpload"
              className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 hover:border-blue-400 cursor-pointer transition"
            >
              <p>📂 Click or drag video file here to upload</p>
              <input
                id="videoUpload"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <video
                controls
                src={preview}
                className="rounded-lg w-full max-h-72 object-cover"
              ></video>
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 bg-white rounded-full shadow-md p-1 text-red-600 hover:bg-red-100"
              >
                <FaTimesCircle size={20} />
              </button>
            </div>
          )}

          {/* Title */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Video Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter video title"
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

        {/* Footer (Sticky bottom) */}
        <div className="border-t p-4 sticky bottom-0 bg-white">
          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition"
          >
            Upload Video
          </button>
        </div>
      </div>
    </div>
  );
}
