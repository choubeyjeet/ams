import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Lazy from "./lazyComponents";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 import this
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Public routes (no Navbar) */}
      <Route path="/login" element={<Lazy.Login />} />
      <Route path="/signup" element={<Lazy.Signup />} />
      <Route path="/forgot-password" element={<Lazy.ForgotPassword />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Lazy.Home />}>
            <Route path="feed" element={<Lazy.UserFeed />} />
            <Route path="notifications" element={<Lazy.NotificationsAll />} />
            <Route path="messages" element={<Lazy.Messages />} />
            <Route path="friends" element={<Lazy.FriendsList />} />
            <Route path="user/:id" element={<Lazy.UserProfilePage />} />
            <Route path="news" element={<Lazy.NewsMain />} />
            <Route path="news/create" element={<Lazy.CreateNews />} />
            <Route path="news/:id" element={<Lazy.News />} />
            <Route path="events" element={<Lazy.Events />} />
            <Route path="events/:id" element={<Lazy.EventPreview />} />
            <Route path="events/create" element={<Lazy.CreateEventForm />} />
            <Route path="donate" element={<Lazy.DonationListPage />} />
            <Route path="donate/:id" element={<Lazy.DonationView />} />
            <Route path="donate/create" element={<Lazy.CreateDonation />} />
            <Route path="trending" element={<Lazy.TrendingMain />} />
            <Route path="wall-of-fame" element={<Lazy.WallOfFame />} />
          </Route>

          <Route path="/profile" element={<Lazy.UserProfile />} />
          <Route path="/dashboard" element={<Lazy.Dashboard />} />
          <Route path="/setting" element={<Lazy.UserSettingPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
