import React, { useEffect, useState } from "react";
import Select from "react-select";
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
    // institution_code: "",
    institution: "",
    // institution_type: "",
    batch_year: "",
    email: "",
    course: "",
    phone: "",
  });

const countryCodes = [
  { value: "+91", label: "🇮🇳 +91" },
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+44", label: "🇬🇧 +44" },
  { value: "+61", label: "🇦🇺 +61" },
  { value: "+81", label: "🇯🇵 +81" },
  { value: "+971", label: "🇦🇪 +971" },
];

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [institutionList, setInstitutionList] = useState([]);
  const [courseList, setCourseList] = useState([]);
const [countryCode, setCountryCode] = useState("+91");
  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email.";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";

    if (!formData.institution.trim())
      newErrors.institution_name = "Institution name is required.";

    if (!formData.batch_year.trim()) newErrors.batch_year = "Batch year is required.";
    if (!formData.course.trim()) newErrors.course = "Course is required.";

    return newErrors;
  };
  const mapServerErrorToField = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("email")) return "email";
    if (msg.includes("phone")) return "phone";
    if (msg.includes("institution")) return "institution_name";
    if (msg.includes("batch")) return "batch_year";
    if (msg.includes("course")) return "course";

    return "general";
  };

  // ---------------- FORM SUBMIT ----------------
 const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await api.post("/method/ams.api.register_alumni", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic NWFiM2VmMzc5YmRkNTc5OjAxYjFmN2FhOWNhMGFiNg==",
        },
      });

      const serverMessage = response?.data?.message?.message;

      if (serverMessage === "Alumni registered successfully! Check your email for login credentials.") {
        toast.success(serverMessage);

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
      } else if (serverMessage) {
        const field = mapServerErrorToField(serverMessage);
        setErrors({ [field]: serverMessage });
      } else {
        setErrors({ general: "Unexpected error. Try again later." });
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "Something went wrong while creating the user." });
    }
  };
  // ---------------- REMOVE ERROR ON FOCUS ----------------
  const handleFocus = (field) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  // ---------------- FETCH INSTITUTION LIST ----------------
  const getInstitutionList = async () => {
    try {
      const response = await api.get(
        '/resource/Institution?fields=["name"]',
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "token 5ab3ef379bdd579:01b1f7aa9ca0ab6",
          },
        }
      );

      const options = response?.data?.data?.map((item) => ({
        value: item.name,
        label: item.name,
        
      }));

      setInstitutionList(options);
    } catch (error) {
      console.log(error);
    }
  };


   const getCourseList = async () => {
    try {
      const response = await api.get(
        '/resource/Course?fields=["*"]',
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "token 5ab3ef379bdd579:01b1f7aa9ca0ab6",
          },
        }
      );

      const options = response?.data?.data?.map((item) => ({
        value: item.name,
        label: item.name,
        
      }));

      setCourseList(options);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseList()
    getInstitutionList();
  }, []);

  const inputClass =
    "w-full pl-10 pr-4 py-2 rounded-md bg-[#ffffff10] border border-gray-400/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all";

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ToastContainer />

      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white p-8">
        <div className="w-full max-w-md bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-white/10">
          <h2 className="text-3xl font-bold text-center mb-6">Create Account ✨</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* FIRST NAME */}
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
  <p
    className="text-red-400 italic text-sm mt-1"
    dangerouslySetInnerHTML={{ __html: errors.first_name }}
  />
)}
            </div>

            {/* LAST NAME */}
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
                <p className="text-red-400 italic text-sm mt-1"  dangerouslySetInnerHTML={{ __html: errors.last_name }}/>
              )}
            </div>

            {/* EMAIL */}
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
                 <p className="text-red-400 italic text-sm mt-1"  dangerouslySetInnerHTML={{ __html: errors.email }}/>
              )}
            </div>

            {/* PHONE */}
         <div>
  <label className="block text-sm mb-1">Phone</label>

  <div className="relative flex gap-2">

    {/* Country Code Select */}
    <div className="w-[110px]">
      <Select
        options={countryCodes}
        value={countryCodes.find((opt) => opt.value === countryCode)}
        onChange={(selected) => setCountryCode(selected.value)}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "transparent",
            borderColor: "#555",
            color: "white",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#1E1E1E",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#333" : "#1E1E1E",
            color: "white",
          }),
          singleValue: (base) => ({
            ...base,
            color: "white",
          }),
        }}
      />
    </div>

    {/* Phone Input */}
    <div className="relative w-full">
      <FaPhone className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        value={formData.phone.replace(`${countryCode}-`, "")}
        onFocus={() => handleFocus("phone")}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "");
          setFormData({
            ...formData,
            phone: `${countryCode}-${raw}`,
          });
        }}
        className={inputClass}
        placeholder="9876543210"
      />
    </div>
  </div>

  {errors.phone && (
     <p className="text-red-400 italic text-sm mt-1"  dangerouslySetInnerHTML={{ __html: errors.phone }}/>
  )}
</div>


            {/* INSTITUTION */}
            <div>
              <label className="block text-sm mb-1">Institution</label>
              <div className="relative w-full">
               

                <Select
                  options={institutionList}
                  placeholder="Enter institution name"
                  value={
                    institutionList.find(
                      (opt) => opt.value === formData.institution
                    ) || null
                  }
                  onFocus={() => handleFocus("institution_name")}
                  onChange={(selected) => {
                    const inst = selected.value
                    
                    setFormData({
                      ...formData,
                      institution: inst,
                      // institution_code: inst.institution_code,
                      // institution_type: inst.institution_type,
                    });
                  }}
                  className="mt-2"
                  styles={{
                    width:"100%",
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#1E1E1E",
                      color: "white",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#333" : "#1E1E1E",
                      color: "white",
                      cursor: "pointer",
                    }),
                    control: (base) => ({
                      ...base,
                      backgroundColor: "transparent",
                      borderColor: "#555",
                      color: "white",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#ffffff",
                    }),
                  }}
                />

                {errors.institution_name && (
                   <p className="text-red-400 italic text-sm mt-1"  dangerouslySetInnerHTML={{ __html: errors.institution_name }}/>
                )}
              </div>
            </div>

            {/* BATCH YEAR */}
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
                  <p className="text-red-400 italic text-sm mt-1"  dangerouslySetInnerHTML={{ __html: errors.batch_year }}/>
              )}
            </div>

            {/* COURSE */}
           <div>
              <label className="block text-sm mb-1">Institution</label>
              <div className="relative w-full">
               

                <Select
                  options={courseList}
                  placeholder="Enter course name"
                  value={
                    courseList.find(
                      (opt) => opt.value === formData.course
                    ) || null
                  }
                  onFocus={() => handleFocus("course")}
                  onChange={(selected) => {
                    const inst = selected.value
                    
                    setFormData({
                      ...formData,
                      course: inst,
                      // institution_code: inst.institution_code,
                      // institution_type: inst.institution_type,
                    });
                  }}
                  className="mt-2"
                  styles={{
                    width:"100%",
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#1E1E1E",
                      color: "white",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#333" : "#1E1E1E",
                      color: "white",
                      cursor: "pointer",
                    }),
                    control: (base) => ({
                      ...base,
                      backgroundColor: "transparent",
                      borderColor: "#555",
                      color: "white",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#ffffff",
                    }),
                  }}
                />

                {errors.course && (
                  <p className="text-red-400 italic text-sm mt-1"  dangerouslySetInnerHTML={{ __html: errors.course }}/>
                )}
              </div>
            </div>

            {/* SUCCESS MESSAGE */}
            {success && (
              <p className="text-green-400 italic text-sm text-center">{success}</p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold transition bg-light-primaryButton dark:bg-dark-primaryButton hover:bg-light-primaryButtonHover focus:ring-2 focus:ring-pink-400"
            >
              Sign Up
            </button>
          </form>

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

      {/* RIGHT IMAGE */}
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
