import React, { useEffect, useRef, useState } from "react";
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaUserCircle,
} from "react-icons/fa";

const SAMPLE_FRIENDS = [
  { id: 1, name: "Riya Sharma", status: "online" },
  { id: 2, name: "Aarav Singh", status: "online" },
  { id: 3, name: "Meera Kapoor", status: "away" },
  { id: 4, name: "Dev Patel", status: "offline" },
  { id: 5, name: "Karan Joshi", status: "online" },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [friends] = useState(SAMPLE_FRIENDS);
  const [activeFriend, setActiveFriend] = useState(null);
  const [messages, setMessages] = useState({});
  const [draft, setDraft] = useState("");
  const panelRef = useRef(null);
  const scrollRef = useRef(null);

  // Close on click outside or ESC
  useEffect(() => {
    function onDocClick(e) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target) && open) setOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeFriend]);

  const toggleOpen = () => {
    setOpen((s) => !s);
    if (!open && !activeFriend && friends.length) {
      setActiveFriend(
        friends.find((f) => f.status !== "offline") || friends[0]
      );
    }
  };

  const selectFriend = (friend) => {
    setActiveFriend(friend);
    setMessages((prev) =>
      prev[friend.id] ? prev : { ...prev, [friend.id]: [] }
    );
  };

  const send = () => {
    if (!activeFriend || !draft.trim()) return;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user's message
    setMessages((prev) => {
      const list = prev[activeFriend.id] || [];
      return {
        ...prev,
        [activeFriend.id]: [...list, { sender: "you", text: draft.trim(), time }],
      };
    });
    setDraft("");

    // Simulated reply
    setTimeout(() => {
      const rtime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => {
        const list = prev[activeFriend.id] || [];
        return {
          ...prev,
          [activeFriend.id]: [
            ...list,
            { sender: "friend", text: "Nice — got your message!", time: rtime },
          ],
        };
      });
    }, 900);
  };

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleOpen}
          aria-label={open ? "Close chat panel" : "Open chat panel"}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-105"
        >
          {open ? <FaTimes size={20} /> : <FaComments size={20} />}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-5 right-[20px] z-50 w-full max-w-lg md:max-w-3xl h-[70vh] md:h-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col"
          role="dialog"
          aria-modal="false"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
            <div className="flex items-center gap-3">
              <FaComments className="text-blue-600" />
              <div>
                <div className="text-sm font-semibold text-gray-800">
                  Messages
                </div>
                <div className="text-xs text-gray-500">
                  Chat with your connections
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 p-1 rounded"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body (Friends + Chat) */}
          <div className="flex flex-1 min-h-0">
            {/* Left: friends list */}
            <div className="w-1/3 border-r min-h-0 flex flex-col bg-gray-50">
              <div className="p-3 border-b">
                <input
                  type="search"
                  placeholder="Search friends..."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none"
                />
              </div>

              <div className="flex-1 overflow-y-auto">
                {friends.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => selectFriend(f)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-3 hover:bg-white/60 transition ${
                      activeFriend?.id === f.id ? "bg-white" : "bg-transparent"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                        {f.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          f.status === "online"
                            ? "bg-green-500"
                            : f.status === "away"
                            ? "bg-yellow-400"
                            : "bg-gray-400"
                        }`}
                        title={f.status}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">
                        {f.name}
                      </div>
                      <div className="text-xs text-gray-500">{f.status}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: chat window */}
            <div className="flex-1 flex flex-col min-h-0">
              {activeFriend ? (
                <>
                  {/* Chat header */}
                  <div className="px-4 py-3 border-b bg-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                      {activeFriend.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {activeFriend.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {activeFriend.status}
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {(messages[activeFriend.id] || []).map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          m.sender === "you"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[78%] px-3 py-2 rounded-lg text-sm ${
                            m.sender === "you"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                          }`}
                        >
                          <div>{m.text}</div>
                          <div className="text-[11px] text-gray-300 mt-1 text-right">
                            {m.time}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={scrollRef} />
                  </div>

                  {/* Input */}
                  <div className="px-4 py-3 border-t bg-white flex items-center gap-3">
                    <input
                      type="text"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && send()}
                      placeholder={`Message ${activeFriend.name}...`}
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      onClick={send}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      aria-label="Send message"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <FaUserCircle
                      size={40}
                      className="mx-auto mb-3 text-gray-400"
                    />
                    <div>Select a friend to start chatting</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
