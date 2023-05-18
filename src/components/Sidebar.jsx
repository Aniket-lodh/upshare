import { useContext } from "react";

import { HiOutlineHome } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiHeart2Line, RiChat1Line, RiEyeCloseLine } from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../store/userContext.jsx";


const Sidebar = ({ toggleSidebar, setToggleSidebar }) => {
  //Hooks
  const closeSidebarOnOutsideClick = useRef(null);
  const [ActiveUser, setActiveUser] = useState(null);

  const { user } = useContext(UserContext);

  //Variables
  const ActiveNavStyle =
    "flex items-start gap-2 text-sm font-bold text-color-primary-blue hover:text-color-primary-blue-accent transition-colors ease-in-out capitalize";
  const notActiveNavStyle =
    "flex items-start gap-2 text-sm font-bold text-color-font-tertiary hover:text-color-font-secondary transition-all ease-in-out capitalize";

  //Setting user data
  useEffect(() => {
    setActiveUser(user?.data);
  }, [user]);

  useEffect(() => {
    const HandleOutsideClickListener = (e) => {
      if (
        closeSidebarOnOutsideClick.current &&
        !closeSidebarOnOutsideClick.current.contains(e.target)
      ) {
        setToggleSidebar(false);
      }
    };
    document.addEventListener("mousedown", HandleOutsideClickListener);
    return () => {
      document.removeEventListener("mousedown", HandleOutsideClickListener);
    };
  }, [toggleSidebar]);

  return (
    <aside
      className={`flex lg:inline-block h-screen lg:mt-[calc(60px)] w-screen lg:w-[calc(100%-75%)] fixed top-0 -left-full lg:left-0 ${
        toggleSidebar && "!left-0"
      } z-20 lg:z-0 transition-all ease-in-out bg-transparent lg:border-r`}
    >
      {/*Left Sidebar*/}
      <section
        ref={closeSidebarOnOutsideClick}
        className="w-56 lg:w-full h-full bg-white flex flex-col items-center"
      >
        {/* TODO://Maybe try moving the user profile details from the sidebar to top right side of navbar for larger devices */}
        <div className="relative w-full bg-color-bg-accent h-44">
          <IoIosCloseCircleOutline
            className={`block opacity-0  absolute right-3 top-2 cursor-pointer transition ease-in-out delay-75 ${
              toggleSidebar && "opacity-100"
            }`}
            fontSize={24}
            onClick={() => setToggleSidebar(false)}
          />
          {/*user cover picture*/}
          <div className="w-full h-full overflow-hidden">
            {user.cover_photo && (
              <img
                src={ActiveUser?.cover_photo}
                className="w-full h-full object-cover"
                alt={`${ActiveUser?.username}-cover-picture`}
              />
            )}
          </div>
          {/*user profile avatar*/}
          <div className="absolute -bottom-12 left-3 flex flex-col items-start justify-start gap-1">
            <div className="w-20 h-20 border-4 border-white rounded-full bg-blue-100 flex items-center justify-center  drop-shadow-lg overflow-hidden">
              {user ? (
                <img
                  src={ActiveUser?.profilephoto}
                  alt={`${ActiveUser?.username}-profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <RiEyeCloseLine fontSize={24} />
              )}
            </div>
            {user ? (
              <NavLink
                to={`/user/profile/${ActiveUser?._id}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-color-primary-blue-accent"
                    : "text-color-font-primary hover:text-color-primary-blue-accent"
                }
                onClick={() => setToggleSidebar(false)}
              >
                <span className="font-medium ml-1 font-fira transition-all capitalize">
                  {ActiveUser?.name}
                </span>
              </NavLink>
            ) : (
              <div className="font-fira transition-all capitalize text-transparent bg-clip-text bg-gradient-to-br from-color-primary-blue to-indigo-700">
                <NavLink to={"/login"}>
                  <span>log in</span>
                </NavLink>
                <span> / </span>
                <NavLink to={"/signup"}>
                  <span>sign up</span>
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/*Navigation Links*/}
        <div className="w-10/12 border-t border-color-border-secondary px-2 py-3 mt-16 flex flex-col gap-3">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? ActiveNavStyle : notActiveNavStyle
            }
            onClick={() => setToggleSidebar(false)}
          >
            <HiOutlineHome fontSize={18} /> <span>Home</span>
          </NavLink>
          <NavLink
            to={"/wishlist/user/:user-id"}
            className={({ isActive }) =>
              isActive ? ActiveNavStyle : notActiveNavStyle
            }
            onClick={() => setToggleSidebar(false)}
          >
            <RiHeart2Line fontSize={18} /> <span>Wishlists</span>
          </NavLink>
          <NavLink
            to={"/categories"}
            className={({ isActive }) =>
              isActive ? ActiveNavStyle : notActiveNavStyle
            }
            onClick={() => setToggleSidebar(false)}
          >
            <RiChat1Line fontSize={18} /> <span>Categories</span>
          </NavLink>
        </div>
      </section>
      {/*Right Background shadow*/}
      <div
        className={`h-screen lg:hidden opacity-0 transition-opacity ease-in-out delay-200 flex-1 bg-color-shades-secondary overscroll-none ${
          toggleSidebar && "opacity-40"
        }`}
      >
        &nbsp;
      </div>
    </aside>
  );
};
export default Sidebar;
