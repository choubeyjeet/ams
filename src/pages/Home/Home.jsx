// src/pages/UserFeedPage.jsx
import React from "react";
import RightSide from "../../components/User/RightSide";
import Center from "../../components/User/Center";
import LeftSide from "../../components/User/LeftSide";
import { Outlet } from "react-router-dom";

export default function UserFeedPage() {
  return (
    <div className="flex bg-gray-100 min-h-screen ">
      {/* LEFT SIDEBAR */}
     <LeftSide />

      {/* CENTER FEED (scrollable only here) */}
   <Outlet />

      {/* RIGHT SIDEBAR */}
    <RightSide />
    </div>
  );
}
