import React from "react";
import { useLocation } from "react-router-dom";
import UserFeed from "../Feed/UserFeed";
import Notifications from "../UserSetting/Notifications";

export default function Center() {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes("feed") && <UserFeed />}
      {location.pathname.includes("notifications") && <Notifications />}
    </>
  );
}
