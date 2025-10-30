
import React, { useState, useRef, useEffect } from "react";
import {
  FaHome,
  FaBell,
  FaCommentDots,
  FaBars,
  FaTimes,
  FaSearch,
  FaUserFriends,
  FaTrophy,
} from "react-icons/fa";
import { TbSocial } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationPanel from "./Notification/NotificationPanel";
import { MdEventAvailable } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { IoNewspaperOutline } from "react-icons/io5";
import SearchBar from "./NavSearchBar/SearchBar";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Close dropdowns when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target)
      )
        setDropdownOpen(false);
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      )
        setMobileDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotifOpen(false);
    };

    const onEsc = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileDropdownOpen(false);
        setMenuOpen(false);
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // ✅ Keep track of active route
  const [active, setActive] = useState("feed");
  

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-14">
        {/* Logo + Search */}
        <div className="flex items-center gap-3">
          <TbSocial size={30} className="text-blue-600" />
          <SearchBar />
          
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="md:hidden w-full m-[35%] text-gray-700 text-2xl"
          onClick={() => {
            setMenuOpen((s) => !s);
            setMobileDropdownOpen(false);
          }}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavItem icon={<FaHome />} label="Home" url="feed" active={active} />
          <NavItem
            icon={<FaCommentDots />}
            label="Messages"
            url="messages"
            active={active}
          />

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setNotifOpen((s) => !s);
              }}
            >
              <NavItem
                icon={<FaBell />}
                label="Notifications"
                active={active === "notifications"}
                url="notifications"         
    
              />
            </div>
          
            
            <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
          </div>
<NavItem
            icon={<IoNewspaperOutline />}
            label="News Feed"
            url="news"
            active={active}
          />
          <NavItem
            icon={<FaUserFriends />}
            label="Friends"
            url="friends"
            active={active}
          />

 <NavItem
            icon={<FaTrophy />}
            label="Fame"
            url="wall-of-fame"
            active={active}
          />
 <NavItem
            icon={<MdEventAvailable />}
            label="Event"
            url="events"
            active={active}
          />
 <NavItem
            icon={<BiSolidDonateHeart />}
            label="Donate"
            url="donate"
            active={active}
          />
          {/* Profile Dropdown */}
          <div className="relative" ref={desktopDropdownRef}>
            <button
              onClick={() => setDropdownOpen((s) => !s)}
              className="focus:outline-none"
            >
              <img
                src="https://i.pravatar.cc/40?img=3"
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-50">
                <DropdownItem onClick={() => navigate("/profile")} label="View Profile" />
                <DropdownItem onClick={() => navigate("/dashboard")} label="View Dashboard" />
                <DropdownItem onClick={() => navigate("/setting")} label="Settings" />
                <DropdownItem label="Help" />
                <hr className="my-1" />
                <DropdownItem label="Logout" danger />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="flex flex-col items-center space-y-4 py-4 text-gray-600">
            <NavItem icon={<FaHome />} label="Home" url="feed" active={active} />
            <NavItem icon={<FaCommentDots />} label="Messages" url="messages" active={active} />
            <NavItem icon={<FaBell />} label="Notifications" active="notifications"  url="notifications"      />
        <NavItem
            icon={<IoNewspaperOutline />}
            label="News Feed"
            url="news"
            active={active}
          />
            <NavItem icon={<FaUserFriends />} label="Friends" url="friends" active={active} />
             <NavItem
            icon={<FaTrophy />}
            label="Fame"
            url="wall-of-fame"
            active={active}
          />
 <NavItem
            icon={<MdEventAvailable />}
            label="Event"
            url="events"
            active={active}
          />
           <NavItem
            icon={<BiSolidDonateHeart />}
            label="Donate"
            url="donate"
            active={active}
          />
          
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---------- Subcomponents ---------- */

function NavItem({ icon, label, url, active }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.includes(url);

  return (
    <div
      onClick={() => (url && label !== "Notifications") && navigate(`/${url}`)}
      className={`flex flex-col items-center text-sm ${
        isActive ? "text-blue-600" : "text-gray-500"
      } cursor-pointer hover:text-blue-600 transition`}
    >
      <div className="text-lg">{icon}</div>
      <span className="text-[11px] font-medium">{label}</span>
    </div>
  );
}

function DropdownItem({ label, danger = false, onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-4 py-2 text-sm ${
        danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}
