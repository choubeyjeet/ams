import React, { useState } from "react";
import { FaImage, FaVideo, FaRegSmile } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function StartPost({ open, onClose }) {
  const [postText, setPostText] = useState("");
  const [media, setMedia] = useState(null); // Store image or video file
  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null); // "image" | "video" | null

  if (!open) return null; // don't render when modal is closed

  const handleMediaUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaType(type);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    console.log("Posted:", { postText, media });
    setPostText("");
    setMedia(null);
    setPreview(null);
    setMediaType(null);
    onClose();
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    setPreview(null);
    setMediaType(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[60%] mx-4 relative flex flex-col p-5">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={22} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://i.pravatar.cc/40?img=5"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800">John Doe</p>
            <p className="text-sm text-gray-500">Post to: Connections</p>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What do you want to talk about?"
          className="w-full border border-gray-200 focus:ring-0 p-2 text-gray-800 placeholder-gray-500 text-base resize-none min-h-[120px] rounded-lg"
        />

        {/* Media Preview */}
        {preview && (
          <div className="relative mt-3">
            {mediaType === "image" ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <video
                src={preview}
                controls
                className="w-full h-64 rounded-lg bg-black"
              />
            )}
            <button
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
              onClick={handleRemoveMedia}
            >
              <IoClose size={18} />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4 text-gray-600">
            {/* Image Upload */}
            <label className="cursor-pointer hover:text-blue-600">
              <FaImage size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleMediaUpload(e, "image")}
                className="hidden"
              />
            </label>

            {/* Video Upload */}
            <label className="cursor-pointer hover:text-blue-600">
              <FaVideo size={20} />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleMediaUpload(e, "video")}
                className="hidden"
              />
            </label>

            <FaRegSmile
              size={20}
              className="cursor-pointer hover:text-blue-600"
            />
          </div>

          <button
            onClick={handlePost}
            disabled={!postText && !media}
            className={`px-4 py-1.5 rounded-full font-semibold text-white transition ${
              postText || media
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
