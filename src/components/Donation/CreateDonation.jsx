import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function CreateDonation() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    amount: "",
    description: "",
    startDate: "",
    endDate: "",
    organization: "",
    thumbnail: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (!file) return;

    if (!validFormats.includes(file.type)) {
      setErrors({ thumbnail: "Only JPG, PNG, or WEBP formats allowed." });
      setForm((prev) => ({ ...prev, thumbnail: null }));
      setPreview(null);
      return;
    }

    if (file.size > maxSizeInBytes) {
      setErrors({ thumbnail: "File size should not exceed 5MB." });
      setForm((prev) => ({ ...prev, thumbnail: null }));
      setPreview(null);
      return;
    }

    setErrors((prev) => ({ ...prev, thumbnail: "" }));
    setForm((prev) => ({ ...prev, thumbnail: file }));
    setPreview(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    setForm((prev) => ({ ...prev, thumbnail: null }));
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.amount || isNaN(form.amount) || form.amount <= 0)
      newErrors.amount = "Please enter a valid donation amount.";
    if (!form.organization.trim())
      newErrors.organization = "Organization name is required.";
    if (!form.startDate) newErrors.startDate = "Start date is required.";
    if (!form.endDate) newErrors.endDate = "End date is required.";
    if (!form.description.trim())
      newErrors.description = "Description is required.";
    if (!form.thumbnail) newErrors.thumbnail = "Thumbnail is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("✅ Form Submitted Successfully", form);
      alert("Donation Created Successfully!");
      // handle API call here
    }
  };

  return (
   <main className="flex-1 max-w-6xl mx-auto px-6 mt-6 h-[calc(100vh-4rem)] overflow-y-auto pb-10 scrollbar-hidden">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-4  animate-fadeIn p-10 pt-6">  
         <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-5 flex items-center gap-3">
       <IoIosArrowBack className="cursor-pointer" onClick={()=>{
        navigate("/donate")
       }}/> Create Donation Campaign
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter donation title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Organization */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Organization<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter organization name"
          />
          {errors.organization && (
            <p className="text-red-500 text-sm mt-1">{errors.organization}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Target Amount (₹)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter donation goal amount"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Start & End Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description<span className="text-red-500">*</span>
          </label>
          <ReactQuill
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            value={form.description}
            onChange={(value) => setForm({ ...form, description: value })}
            className="bg-white rounded-lg"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Thumbnail<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
          )}

          {preview && (
            <div className="relative mt-3 w-40">
              <img
                src={preview}
                alt="Thumbnail Preview"
                className="rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium w-full"
        >
          Create Donation
        </button>
      </form>
    </div></main>
  );
}
