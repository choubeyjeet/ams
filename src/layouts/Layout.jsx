// src/layouts/Layout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import ChatWidget from "../components/ChatWidget/ChatWidget";


export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-14"> {/* add padding to avoid navbar overlap */}
        <Outlet />
         <ChatWidget />
      </main>
    </div>
  );
}
