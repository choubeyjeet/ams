import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


export default function Article({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handlePublish = () => {
    if (!title.trim()) {
      setError("⚠️ Please enter a title.");
      return;
    }
    if (!content.trim() || content === "<p><br></p>") {
      setError("⚠️ Please write something in the article.");
      return;
    }

    alert("✅ Article published successfully!");
    setTitle("");
    setContent("");
    setError("");
    onClose();
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[70%] h-[85vh] mx-4 relative flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">Write an Article</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-600 text-sm rounded-md">
              {error}
            </div>
          )}

          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter article title"
            />
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Article Content *
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="bg-white rounded-md border border-gray-300 h-[200px]"
              placeholder="Start writing your story..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 sticky bottom-0 bg-white">
          <button
            onClick={handlePublish}
            className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition"
          >
            Publish Article
          </button>
        </div>
      </div>
    </div>
  );
}
