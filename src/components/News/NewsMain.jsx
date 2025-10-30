import React, { useState } from "react";
import { FaNewspaper } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateNews from "./CreateNews";

export default function NewsMain() {
  const navigate = useNavigate();
 const [openModal, setOpenModal] = useState(false);
  const articles = [
    {
      id: 1,
      title: "🔥 Tech Layoffs Slowing Down",
      desc: "Major tech firms are pausing layoffs as the market stabilizes and hiring slowly returns.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      id: 2,
      title: "💡 AI Reshaping Design Tools",
      desc: "AI-powered creativity is transforming how designers build user experiences.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      id: 3,
      title: "🌍 Remote Work Trends 2025",
      desc: "Hybrid models are here to stay as companies balance flexibility and productivity.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      id: 4,
      title: "📈 Startup Funding Rebounds",
      desc: "Global VC funding rebounds in 2025 as innovation surges in clean tech and AI.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
  ];

  return (
    <main className="flex-1 max-w-6xl mx-auto px-6 mt-10 pb-10">
      {/* Header */}
    
       
          <div className="flex items-top justify-between">
            <div className="flex mb-8">
             <h1 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
               <FaNewspaper className="text-blue-600" /> News Feed
             </h1>
     
           </div>
           <div><button className="hover:bg-light-primaryButtonHover hover:bg-dark-primaryButtonHover bg-light-primaryButton dark:bg-dark-primaryButton text-white h-[40px] w-[80px]" onClick={()=>{
             navigate("create");
           }}>Create</button></div>
          </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden group"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between h-[180px]">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-3">
                  {article.desc}
                </p>
              </div>

              <button
                onClick={() => navigate(`/news/${article.id}`)}
                className="mt-4 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Read Full Article
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
