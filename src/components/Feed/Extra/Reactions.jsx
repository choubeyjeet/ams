import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function Reactions({ onReact }) {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setShowEmoji(false);
    onReact(emojiData.emoji);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowEmoji(!showEmoji)}
        className="hover:text-blue-600 transition"
      >
        😀 
      </button>
      {showEmoji && (
        <div className="absolute bottom-10 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}
