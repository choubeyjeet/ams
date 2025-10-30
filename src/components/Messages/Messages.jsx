import React, { useState } from "react";

export default function Messages() {
  const chats = [
    {
      id: 1,
      name: "Aditi Sharma",
      message: "Hey! How are you doing?",
      time: "2 min ago",
      avatar: "https://i.pravatar.cc/40?img=1",
      unread: true,
      conversation: [
        { from: "Aditi", text: "Hey! How are you doing?", time: "2 min ago" },
        { from: "You", text: "I'm great! What about you?", time: "1 min ago" },
      ],
    },
    {
      id: 2,
      name: "Ravi Kumar",
      message: "Let’s catch up tomorrow.",
      time: "10 min ago",
      avatar: "https://i.pravatar.cc/40?img=2",
      unread: false,
      conversation: [
        { from: "You", text: "Hey Ravi! You free this week?", time: "15 min ago" },
        { from: "Ravi", text: "Let’s catch up tomorrow.", time: "10 min ago" },
      ],
    },
    {
      id: 3,
      name: "Ananya Gupta",
      message: "Check out the new design I shared!",
      time: "1 hr ago",
      avatar: "https://i.pravatar.cc/40?img=3",
      unread: true,
      conversation: [
        { from: "Ananya", text: "Check out the new design I shared!", time: "1 hr ago" },
        { from: "You", text: "Looks amazing 🔥", time: "55 min ago" },
      ],
    },
    {
      id: 4,
      name: "Kiran Patel",
      message: "Okay cool 👍",
      time: "2 hrs ago",
      avatar: "https://i.pravatar.cc/40?img=4",
      unread: false,
      conversation: [
        { from: "You", text: "Can you send the files?", time: "2 hrs ago" },
        { from: "Kiran", text: "Okay cool 👍", time: "2 hrs ago" },
      ],
    },
    {
      id: 5,
      name: "Devraj",
      message: "That project idea sounds awesome!",
      time: "5 hrs ago",
      avatar: "https://i.pravatar.cc/40?img=5",
      unread: false,
      conversation: [
        { from: "Devraj", text: "That project idea sounds awesome!", time: "5 hrs ago" },
        { from: "You", text: "Thanks bro 😄", time: "4 hrs ago" },
      ],
    },
  ];

  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const updatedChats = chats.map((chat) =>
      chat.id === selectedChat.id
        ? {
            ...chat,
            conversation: [
              ...chat.conversation,
              { from: "You", text: newMessage, time: "Just now" },
            ],
          }
        : chat
    );
    setSelectedChat(updatedChats.find((c) => c.id === selectedChat.id));
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50 mt-6 w-[60%]">
      {/* Left Sidebar (Chat List) */}
      <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">💬 Messages</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition ${
                selectedChat?.id === chat.id ? "bg-blue-50" : ""
              }`}
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{chat.name}</p>
                <p className="text-sm text-gray-600 truncate w-[110px]">
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </p>
              </div>
            
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Panel */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-800">{selectedChat.name}</p>
                <p className="text-sm text-gray-500">Active {selectedChat.time}</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {selectedChat.conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.from === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                      msg.from === "You"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] text-gray-300 mt-1 text-right">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-gray-200 flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Select a chat to start messaging 💬
          </div>
        )}
      </div>
    </div>
  );
}
