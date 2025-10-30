import React, { useState } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { FaPhotoVideo } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import Video from "../Post/Video";
import Photo from "../Post/Photo";
import Article from "../Post/Article";
import StartPost from "../Post/StartPost";
import { useNavigate } from "react-router-dom";
import Reactions from "./Extra/Reactions";
import CommentSection from "./Extra/CommentSection";
import ShareOptions from "./Extra/ShareOptions";

export default function UserFeed() {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const [sharePostUrl, setSharePostUrl] = useState(null);
  const navigate = useNavigate();

  const closeModal = () => {
    setActive(null);
    setSharePostUrl(null);
  };

  const handleShareClick = (postUrl) => {
    setSharePostUrl(postUrl);
    setActive("share");
  };

  return (
    <>
      <main className="flex-1 max-w-2xl mx-auto px-3 mt-6 lg:px-0 h-[calc(100vh-4rem)] overflow-y-auto pb-10 scrollbar-hidden">
        {/* Create Post */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Me"
              className="w-10 h-10 rounded-full"
            />
            <input
              onClick={() => setActive("start")}
              type="text"
              placeholder="Start a post"
              className="w-full bg-gray-100 px-4 py-2 rounded-full outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="w-full flex justify-between items-center mt-4 p-4 border-t border-gray-100">
            <button
              className="flex gap-2 items-center text-gray-600 hover:text-blue-600 transition"
              onClick={() => setActive("video")}
            >
              <MdOndemandVideo size={20} /> Video
            </button>

            <button
              className="flex gap-2 items-center text-gray-600 hover:text-blue-600 transition"
              onClick={() => setActive("photo")}
            >
              <FaPhotoVideo size={20} /> Photo
            </button>

            <button
              className="flex gap-2 items-center text-gray-600 hover:text-blue-600 transition"
              onClick={() => setActive("article")}
            >
              <RiArticleFill size={20} /> Write article
            </button>
          </div>
        </div>

        {/* Posts */}
        {[1, 2, 3, 4].map((post) => (
          <div
            key={post}
            className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={`https://i.pravatar.cc/40?img=${post}`}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3
                  className="font-semibold text-gray-800 cursor-pointer"
                  onClick={() => navigate("/user/1260")}
                >
                  User {post}
                </h3>
                <p className="text-sm text-gray-500">Software Engineer</p>
              </div>
            </div>

            <p className="text-gray-700 mb-2">
              🚀 Just launched my new React project! Feeling proud of the team.
            </p>
            <img
              src={`https://picsum.photos/600/300?random=${post}`}
              alt="Post"
              className="rounded-lg mb-3"
            />

            {/* Interaction Buttons */}
            <div className="flex justify-between text-gray-500 text-sm border-t border-gray-100 pt-3">
              <Reactions onReact={(emoji) => alert(`You reacted with ${emoji}`)} />
              <span className="hover:text-blue-600 cursor-pointer">💬 Comment</span>
              <span
                onClick={() =>
                  setOpen(true)
                }
                className="hover:text-blue-600 cursor-pointer"
              >
                🔁 Share
              </span>
            </div>

            {/* Comment Section */}
            <CommentSection />
          </div>
        ))}
      </main>

      {/* Post Creation Modals */}
      {active === "video" && <Video open={true} onClose={closeModal} />}
      {active === "photo" && <Photo open={true} onClose={closeModal} />}
      {active === "article" && <Article open={true} onClose={closeModal} />}
      {active === "start" && <StartPost open={true} onClose={closeModal} />}

      {/* Share Modal */}
     
        <ShareOptions postUrl={sharePostUrl} setOpen={setOpen} open={open} />
      
    </>
  );
}
