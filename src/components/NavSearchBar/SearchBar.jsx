import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const ref = useRef(null);

  const allSuggestions = [
    { id: 1, type: "user", name: "Aditi Sharma", avatar: "https://i.pravatar.cc/40?img=47" },
    { id: 2, type: "user", name: "Ravi Kumar", avatar: "https://i.pravatar.cc/40?img=33" },
    { id: 3, type: "topic", name: "React Development" },
    { id: 4, type: "topic", name: "AI in 2025" },
    { id: 5, type: "news", name: "Tech layoffs slowing down" },
  ];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter data as user types
  useEffect(() => {
    if (query.trim().length > 0) {
      const results = allSuggestions.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSelect = (item) => {
    setShowSuggestions(false);
    setQuery("");
    if (item.type === "user") navigate(`/profile/${item.id}`);
    else if (item.type === "news") navigate(`/news/${item.id}`);
    else navigate(`/search?q=${item.name}`);
  };

  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search people, news, topics..."
        className="bg-gray-100 text-sm rounded-md pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[200px] md:w-[250px]"
      />
      <FaSearch className="absolute left-2 top-2.5 text-gray-500 w-4 h-4" />

      {/* Suggestion Modal */}
      {showSuggestions && (
        <div className="absolute mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 cursor-pointer transition"
              >
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-sm text-blue-600 font-semibold">
                    #{item.type}
                  </span>
                )}
                <p className="text-gray-800 text-sm">{item.name}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm py-3">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
