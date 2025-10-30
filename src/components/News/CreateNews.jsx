// src/components/CreateNews.jsx
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { WithContext as ReactTags } from "react-tag-input";

import { FaTimes } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function CreateNews({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    source: "",
    publishDate: "",
    tags: [],
    thumbnail: null,
  });
const navigate = useNavigate() 
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const validFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  const maxSizeInMB = 5;

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

  const handleFieldChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validFormats.includes(file.type)) {
      setErrors((p) => ({ ...p, thumbnail: "Only JPG/PNG/WEBP allowed." }));
      return;
    }
    if (file.size > maxSizeInMB * 1024 * 1024) {
      setErrors((p) => ({ ...p, thumbnail: `Max size ${maxSizeInMB}MB.` }));
      return;
    }

    setForm((p) => ({ ...p, thumbnail: file }));
    setErrors((p) => ({ ...p, thumbnail: null }));

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeThumbnail = () => {
    setForm((p) => ({ ...p, thumbnail: null }));
    setPreview(null);
    setErrors((p) => ({ ...p, thumbnail: null }));
  };

  const validate = () => {
    const newErr = {};
    if (!form.title.trim()) newErr.title = "Title is required.";
    if (!form.summary.trim()) newErr.summary = "Short summary is required.";
    if (!form.content.trim() || form.content === "<p><br></p>")
      newErr.content = "Content is required.";
    if (!form.source.trim()) newErr.source = "Source is required.";
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("summary", form.summary);
    fd.append("content", form.content);
    fd.append("source", form.source);
    if (form.publishDate) fd.append("publish_date", form.publishDate);
    if (form.tags.length)
      fd.append("tags", form.tags.map((t) => t.text).join(","));
    if (form.thumbnail) fd.append("thumbnail", form.thumbnail);

    onSubmit?.(fd);
  };

  // ReactTagInput config
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setForm((p) => ({
      ...p,
      tags: p.tags.filter((_, index) => index !== i),
    }));
  };

  const handleAddition = (tag) => {
    setForm((p) => ({
      ...p,
      tags: [...p.tags, tag],
    }));
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = form.tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setForm((p) => ({ ...p, tags: newTags }));
  };

  return (
   <main className="flex-1 max-w-6xl mx-auto px-6 mt-6 pb-10">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
          <IoIosArrowBack
            className="cursor-pointer"
            onClick={()=>{
              navigate("/news")
            }}
          />{" "}
          Create News
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Headline e.g. OpenAI Launches GPT-5"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Short Summary *
            </label>
            <input
              type="text"
              value={form.summary}
              onChange={(e) => handleFieldChange("summary", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short one-line summary"
            />
            {errors.summary && (
              <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Thumbnail (optional)
            </label>
            {!preview ? (
              <label className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition">
                <div className="w-20 h-12 flex items-center justify-center bg-gray-100 rounded">
                  PNG/JPG
                </div>
                <div className="flex-1 text-sm text-gray-600">
                  Click to upload image (max {maxSizeInMB}MB)
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={preview}
                  alt="thumb"
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}
            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Source */}
            <div>
              <label className="block text-sm font-medium mb-1">Source *</label>
              <input
                type="text"
                value={form.source}
                onChange={(e) => handleFieldChange("source", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. TechDaily"
              />
              {errors.source && (
                <p className="text-red-500 text-sm mt-1">{errors.source}</p>
              )}
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Publish Date (optional)
              </label>
              <input
                type="date"
                value={form.publishDate}
                onChange={(e) =>
                  handleFieldChange("publishDate", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <ReactTags
              tags={form.tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              delimiters={delimiters}
              placeholder="Add new tag"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1">Content *</label>
            <div className="border border-gray-200 rounded-lg">
              <ReactQuill
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
                value={form.content}
                onChange={(value) => handleFieldChange("content", value)}
                className="h-[200px] rounded"
              />
            </div>
            {errors.content && (
              <p className="text-red-500 text-sm mt-2">{errors.content}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-10">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Publish News
            </button>
          </div>
        </form>
      </div></main>

  );
}
