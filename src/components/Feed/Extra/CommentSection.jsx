import React, { useState } from "react";


export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");


  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setComments((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <div className="mt-3 border-t pt-3">
      {comments.length > 0 && (
        <div className="space-y-2 mb-3">
          {comments.map((c, i) => (
            <div
              key={i}
              className="bg-gray-100 p-2 rounded-lg text-gray-700 text-sm"
            >
              {c}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          />
        

        
        </div>
        <button
          type="submit"
          className="px-3 py-1.5 bg-blue-500 text-white rounded-full text-sm"
        >
          Post
        </button>
      </form>
    </div>
  );
}
