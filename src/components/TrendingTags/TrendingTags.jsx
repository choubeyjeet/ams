import React from "react";
import { FaHashtag, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TrendingTags() {
  const navigate = useNavigate()
  const tags = [
    { tag: "WebDevelopment", posts: "2.4k posts" },
    { tag: "AI", posts: "1.9k posts" },
    { tag: "CyberSecurity", posts: "1.2k posts" },
    { tag: "CloudComputing", posts: "980 posts" },
    { tag: "ReactJS", posts: "3.1k posts" },
  ];

  return (
    <aside className="hidden lg:block mt-10 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaHashtag className="text-blue-600" /> Trending Topics
        </h3>

        <ul className="space-y-3">
          {tags.map((t, index) => (
            <li
              key={index}
              className="flex justify-between items-center group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                  #{t.tag}
                </p>
                <p className="text-xs text-gray-500">{t.posts}</p>
              </div>
              <FaArrowRight className="opacity-0 group-hover:opacity-100 text-gray-400 transition" />
            </li>
          ))}
        </ul>

        <button className="mt-4 w-full text-sm text-blue-600 font-medium hover:underline" onClick={()=>{
          navigate("/trending")
        }}>
          Show more
        </button>
      </div>
    </aside>
  );
}
