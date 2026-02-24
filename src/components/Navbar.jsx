import { FcMenu } from "react-icons/fc";
import {
  RiSearchLine,
  RiArrowLeftLine,
  RiSearch2Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Link, useMatch, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../store/userContext.jsx";
import { logoutUser } from "../api/client.js";

const Navbar = ({ toggleSidebar, setToggleSidebar }) => {
  //Hooks
  const searchMatch = useMatch("/search/*");
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
    <>
      <header
        className={`w-full sticky lg:fixed h-60 z-10 top-0 transition-all duration-150 ${
          scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur"
        }`}
      >
        <nav className="flex items-center justify-between px-5 py-4">
          {!searchMatch ? (
            <>
              <div className="flex gap-2 items-center">
                {/*Menu Icon*/}
                <FcMenu
                  fontSize={24}
                  className="lg:hidden text-color-font-tertiary cursor-pointer transition-colors duration-150 hover:text-gray-700 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center active:bg-gray-200 rounded-lg"
                  onClick={() => setToggleSidebar(!toggleSidebar)}
                />
                {/*App logo*/}
                <Link
                  to={"/"}
                  className="text-xl font-bold text-color-font-primary cursor-pointer"
                >
                  Up<span className="text-color-primary-blue">Share</span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/search"
                  className={`p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors duration-150 ${
                    isSearchActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-color-font-tertiary hover:text-blue-600 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <RiSearchLine fontSize={22} />
                </Link>
                {/* Create button */}
                {user && (
                  <Link
                    to="/create"
                    title="Create Post"
                    className={`p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors duration-150 ${
                      isCreateActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-color-font-tertiary hover:text-blue-600 hover:bg-gray-100 active:bg-gray-200"
                    }`}
                  >
                    <AiOutlinePlus fontSize={22} />
                  </Link>
                )}
                {/*logout button*/}
                {user && (
                  <button
                    type="button"
                    title="Logout"
                    onClick={handleLogout}
                    className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-color-font-tertiary hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors duration-150 cursor-pointer"
                  >
                    <RiLogoutBoxRLine fontSize={22} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-color-font-tertiary cursor-pointer transition-colors duration-150 hover:text-blue-600 active:bg-gray-200"
              >
                <RiArrowLeftLine fontSize={24} />
              </button>
              <div className="ml-2 flex items-center justify-start flex-1 px-2 py-1 bg-color-bg-tertiary rounded-md border border-transparent focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20 transition-all">
                <RiSearch2Line
                  fontSize={20}
                  className="text-color-font-tertiary"
                />
                <input
                  type="search"
                  className="px-2 py-0.5 w-full bg-transparent focus:outline-none"
                  placeholder="Search..."
                />
              </div>
              {/*logout button on search view*/}
              {user && (
                <button
                  type="button"
                  title="Logout"
                  onClick={handleLogout}
                  className="ml-2 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-color-font-tertiary hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors duration-150 cursor-pointer"
                >
                  <RiLogoutBoxRLine fontSize={22} />
                </button>
              )}
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
