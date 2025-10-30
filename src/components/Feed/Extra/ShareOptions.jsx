import React, { useState } from "react";
import {
  FaCopy,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaTimes,
} from "react-icons/fa";

export default function ShareOptions({open, setOpen, postUrl }) {
  

  const handleShare = (type) => {
    switch (type) {
      case "copy":
        navigator.clipboard.writeText(postUrl);
        alert("🔗 Link copied!");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/share?url=${postUrl}`, "_blank");
        break;
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${postUrl}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`, "_blank");
        break;
      default:
        break;
    }
    setOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
    

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-80 sm:w-96 p-6 animate-fadeIn relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <FaTimes size={18} />
            </button>

            {/* Header */}
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Share 
            </h2>
            <p className="text-sm text-gray-500 mb-6 break-all">
              {postUrl}
            </p>

            {/* Share Options */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleShare("copy")}
                className="flex flex-col items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <FaCopy className="text-gray-600 mb-1" size={20} />
                <span className="text-xs text-gray-700">Copy Link</span>
              </button>

              <button
                onClick={() => handleShare("facebook")}
                className="flex flex-col items-center justify-center p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
              >
                <FaFacebook className="text-blue-600 mb-1" size={20} />
                <span className="text-xs text-gray-700">Facebook</span>
              </button>

              <button
                onClick={() => handleShare("twitter")}
                className="flex flex-col items-center justify-center p-3 bg-sky-100 rounded-lg hover:bg-sky-200 transition"
              >
                <FaTwitter className="text-sky-500 mb-1" size={20} />
                <span className="text-xs text-gray-700">Twitter</span>
              </button>

              <button
                onClick={() => handleShare("whatsapp")}
                className="flex flex-col items-center justify-center p-3 bg-green-100 rounded-lg hover:bg-green-200 transition"
              >
                <FaWhatsapp className="text-green-500 mb-1" size={20} />
                <span className="text-xs text-gray-700">WhatsApp</span>
              </button>

              <button
                onClick={() => handleShare("linkedin")}
                className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
              >
                <FaLinkedin className="text-blue-700 mb-1" size={20} />
                <span className="text-xs text-gray-700">LinkedIn</span>
              </button>
            </div>

            {/* Footer */}
          
          </div>
        </div>
      )}
    </>
  );
}
