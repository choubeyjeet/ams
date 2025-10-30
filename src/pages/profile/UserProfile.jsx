import React from "react";
import { FaEdit, FaPlus, FaGraduationCap, FaBriefcase, FaAward } from "react-icons/fa";

export default function UserProfile() {
  return (
    <div className="bg-gray-100 min-h-screen mt-6">
      {/* Outer Container */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* --- Banner + Profile Section --- */}
        <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-40 md:h-56 bg-gradient-to-r from-blue-500 to-blue-700"></div>

          {/* Profile Picture */}
          <div className="absolute top-24 left-4 md:top-36 md:left-8">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Profile"
              className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white"
            />
          </div>

          {/* Edit button */}
          <div className="absolute top-2 right-2 text-white cursor-pointer bg-black/30 p-2 rounded-full hover:bg-black/50 transition">
            <FaEdit />
          </div>

          {/* Basic Info */}
          <div className="mt-20 md:mt-28 px-4 md:px-8 pb-4">
            <h2 className="text-2xl font-semibold">Jitender Singh</h2>
            <p className="text-gray-600 text-sm md:text-base">Full Stack Developer | React | Node.js | Cloud Security Enthusiast</p>
            <p className="text-gray-500 text-sm mt-1">Singapore · <span className="text-blue-600 cursor-pointer hover:underline">Contact Info</span></p>
            <button className="mt-3 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
              Open to work
            </button>
          </div>
        </div>

        {/* --- About --- */}
        <Section title="About">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Passionate about building scalable, secure, and visually engaging web applications.
            Experienced in React, Node.js, and cloud platforms like Azure and AWS.
            Constantly learning new tools and exploring cybersecurity integrations.
          </p>
        </Section>

        {/* --- Experience --- */}
        <Section title="Experience" icon={<FaBriefcase />}>
          <div className="space-y-4">
            <ExperienceItem
              role="Full Stack Developer"
              company="TechNova Solutions"
              duration="Jan 2023 - Present · 1 yr 10 mos"
              description="Developing secure cloud-based applications using React, Node.js, and Azure services. Leading UI refactor efforts and CI/CD pipeline integration."
            />
            <ExperienceItem
              role="Frontend Engineer"
              company="DigitalX Labs"
              duration="Jun 2021 - Dec 2022 · 1 yr 6 mos"
              description="Worked on large-scale React applications, optimized performance, and collaborated on component-driven design systems."
            />
          </div>
        </Section>

        {/* --- Education --- */}
        <Section title="Education" icon={<FaGraduationCap />}>
          <div className="space-y-4">
            <EducationItem
              school="National University of Singapore"
              degree="Master’s in Computer Science"
              duration="2020 - 2022"
            />
            <EducationItem
              school="Delhi Technological University"
              degree="B.Tech in Information Technology"
              duration="2016 - 2020"
            />
          </div>
        </Section>

        {/* --- Skills --- */}
        <Section title="Skills" icon={<FaAward />}>
          <div className="flex flex-wrap gap-2">
            {[
              "React.js",
              "Node.js",
              "Azure",
              "AWS",
              "Tailwind CSS",
              "MongoDB",
              "Express.js",
              "Security Operations",
              "Zero Trust",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        {/* --- Add Section Button --- */}
        <div className="flex justify-center mt-6">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
            <FaPlus /> Add section
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Components ---

function Section({ title, icon, children }) {
  return (
    <div className="bg-white mt-4 rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex items-center gap-2 mb-3">
        {icon && <div className="text-blue-600">{icon}</div>}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ExperienceItem({ role, company, duration, description }) {
  return (
    <div className="border-b border-gray-100 pb-3">
      <h4 className="font-medium text-gray-800">{role}</h4>
      <p className="text-sm text-gray-600">{company}</p>
      <p className="text-xs text-gray-500 mb-2">{duration}</p>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}

function EducationItem({ school, degree, duration }) {
  return (
    <div className="border-b border-gray-100 pb-3">
      <h4 className="font-medium text-gray-800">{school}</h4>
      <p className="text-sm text-gray-600">{degree}</p>
      <p className="text-xs text-gray-500">{duration}</p>
    </div>
  );
}
