import React, { useState } from "react";
import { FaRegClock, FaShareAlt } from "react-icons/fa";
import Reactions from "../Feed/Extra/Reactions";
import CommentSection from "../Feed/Extra/CommentSection";
import ShareOptions from "../Feed/Extra/ShareOptions";

export default function News() {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const news = {
    id: 1,
    title: "OpenAI Launches GPT-5: The Future of AI Assistance",
    summary:
      "OpenAI has officially released GPT-5, its most advanced AI model yet. The model introduces enhanced reasoning, multimodal understanding, and improved context retention across sessions. Early users report smoother conversations and better factual accuracy.",
    image:
      "https://m.economictimes.com/thumb/msid-123172945,width-1200,height-900,resizemode-4,imgsize-8362/openai-drops-gpt5-the-most-powerful-human-like-ai-yetare-phd-level-minds-now-just-a-tap-away.jpg",
    source: "TechDaily",
    published: "2 hours ago",
    url: "https://techdaily.com/openai-gpt5-launch",
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden my-6">
      {/* News Image */}
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-60 object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer transition">
          {news.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{news.summary}</p>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
          <div className="flex items-center gap-2">
            <FaRegClock className="text-gray-400" />
            <span>{news.published}</span>
          </div>
          <span className="font-medium text-gray-700">{news.source}</span>
        </div>

        {/* Reaction and Share Section */}
        <div className="flex justify-between items-center mt-4 border-t pt-3">
          <Reactions onReact={(emoji) => alert(`You reacted with ${emoji}`)} />

          <button
            onClick={() => setIsShareOpen(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <FaShareAlt /> Share
          </button>
        </div>

        {/* Comment Section */}
        <CommentSection />
      </div>

      {/* Share Modal */}
      {isShareOpen && (
       <ShareOptions open={isShareOpen} setOpen={setIsShareOpen}/>
      )}
    </div>
  );
}
