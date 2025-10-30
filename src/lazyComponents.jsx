import React from "react";

export const Login = React.lazy(() => import("./pages/Login/Login"));
export const ForgotPassword = React.lazy(() => import("./pages/Login/ForgotPassword"));
export const Signup = React.lazy(() => import("./pages/Login/SignUp"));

export const Home = React.lazy(() => import("./pages/Home/Home"));
export const UserFeed = React.lazy(() => import("./components/Feed/UserFeed"));
export const UserProfile = React.lazy(() => import("./pages/profile/UserProfile"));
export const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
export const UserSettingPage = React.lazy(() => import("./pages/setting/UserSettingPage"));
export const NotificationsAll = React.lazy(() => import("./components/Notification/NotificationsAll"));
export const Messages = React.lazy(() => import("./components/Messages/Messages"));
export const FriendsList = React.lazy(() => import("./components/Friends/FriendsList"));
export const News = React.lazy(() => import("./components/News/News"));
export const WallOfFame = React.lazy(() => import("./components/WallOfFame/WallOfFame"));
export const Events = React.lazy(() => import("./components/Events/Events"));
export const EventPreview = React.lazy(() => import("./components/Events/EventPreview"));
export const CreateEventForm = React.lazy(() => import("./components/Events/CreateEventForm"));
export const DonationListPage = React.lazy(() => import("./components/Donation/DonationListPage"));
export const CreateDonation = React.lazy(() => import("./components/Donation/CreateDonation"));
export const DonationView = React.lazy(() => import("./components/Donation/DonationView"));
export const NewsMain = React.lazy(() => import("./components/News/NewsMain"));
export const CreateNews = React.lazy(() => import("./components/News/CreateNews"));
export const TrendingMain = React.lazy(() => import("./components/TrendingTags/TrendingMain"));
export const UserProfilePage = React.lazy(() => import("./components/ViewUser/UserProfilePage"));