import { FcMenu } from "react-icons/fc";
import {
  RiSearchLine,
  RiArrowLeftLine,
  RiSearch2Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useContext } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import UserContext from "../store/userContext.jsx";

const Navbar = ({ toggleSidebar, setToggleSidebar }) => {
  //Hooks
  const searchMatch = useMatch("/search/*");
  const navigate = useNavigate();
  const { user, removeUser } = useContext(UserContext);

  const handleLogout = () => {
    removeUser();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="w-full bg-white sticky lg:fixed h-60 z-10 top-0">
        <nav className="flex items-center justify-between px-5 py-4 ">
          {!searchMatch ? (
            <>
              <div className="flex gap-2 items-center">
                {/*Menu Icon*/}
                <FcMenu
                  fontSize={24}
                  className="lg:hidden text-color-font-tertiary cursor-pointer"
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
                <Link to="/search">
                  <RiSearchLine
                    fontSize={22}
                    className="text-color-font-tertiary cursor-pointer"
                  />
                </Link>
                {/* Create button */}
                {user && (
                  <Link
                    to="/create"
                    title="Create Post"
                    className="text-color-font-tertiary hover:text-color-primary-blue transition-colors"
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
                    className="text-color-font-tertiary hover:text-color-danger transition-colors cursor-pointer"
                  >
                    <RiLogoutBoxRLine fontSize={22} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <RiArrowLeftLine
                fontSize={24}
                onClick={() => navigate("/")}
                className="text-color-font-tertiary cursor-pointer"
              />
              <div className="ml-2 flex items-center justify-start flex-1 px-2 py-1 bg-color-bg-tertiary rounded-md">
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
                  className="ml-2 text-color-font-tertiary hover:text-color-danger transition-colors cursor-pointer"
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
