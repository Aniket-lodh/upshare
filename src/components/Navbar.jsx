import { FcMenu } from "react-icons/fc";
import { RiSearchLine, RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../store/userContext.jsx";
import { logoutUser } from "../api/client.js";

const Navbar = ({ toggleSidebar, setToggleSidebar }) => {
  //Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { user, removeUser } = useUser();
  const [scrolled, setScrolled] = useState(false);

  // Step 1 — Scroll elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    removeUser();
    navigate("/login", { replace: true });
  };

  // Step 2 — Active route helpers
  const isSearchActive = location.pathname.startsWith("/search");
  const isCreateActive = location.pathname === "/create";

  return (
    <header
      className={`w-full sticky lg:fixed h-16 z-10 top-0 transition-all duration-150 ${
        scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {/*Menu Icon*/}
          <button
            type="button"
            className="lg:hidden text-gray-500 cursor-pointer transition-colors duration-150 hover:text-gray-700 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center active:bg-gray-200 rounded-lg"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <FcMenu fontSize={24} />
          </button>
          {/*App logo*/}
          <Link
            to={"/"}
            className="text-xl font-bold text-gray-900 cursor-pointer flex items-center"
          >
            Up<span className="text-blue-600">Share</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/search"
            title="Search"
            className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors duration-150 ${
              isSearchActive
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-blue-600 hover:bg-gray-100 active:bg-gray-200"
            }`}
          >
            <RiSearchLine fontSize={22} />
          </Link>

          {/* Create button */}
          {user && (
            <Link
              to="/create"
              title="Create Post"
              className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors duration-150 ${
                isCreateActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-100 active:bg-gray-200"
              }`}
            >
              <AiOutlinePlus fontSize={22} />
            </Link>
          )}

          {/* Logout button */}
          {user && (
            <button
              type="button"
              title="Logout"
              onClick={handleLogout}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors duration-150 cursor-pointer"
            >
              <RiLogoutBoxRLine fontSize={22} />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
