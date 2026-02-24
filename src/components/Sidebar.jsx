import { HiOutlineHome } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiHeart2Line, RiChat1Line, RiEyeCloseLine } from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../store/userContext.jsx";

const Sidebar = ({ toggleSidebar, setToggleSidebar }) => {
  //Hooks
  const closeSidebarOnOutsideClick = useRef(null);
  const [ActiveUser, setActiveUser] = useState(null);

  const { user } = useUser();

  //Variables
  const ActiveNavStyle =
    "flex items-center gap-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg px-3 min-h-[44px] transition-colors duration-150 capitalize active:bg-blue-100";
  const notActiveNavStyle =
    "flex items-center gap-3 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg px-3 min-h-[44px] transition-colors duration-150 capitalize active:bg-gray-200";

  //Setting user data
  useEffect(() => {
    setActiveUser(user);
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
          <button
            type="button"
            onClick={() => setToggleSidebar(false)}
            className={`opacity-0 absolute right-2 top-2 cursor-pointer transition ease-in-out p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg active:bg-gray-200 ${
              toggleSidebar && "opacity-100"
            }`}
          >
            <IoIosCloseCircleOutline fontSize={24} />
          </button>
          {/*user cover picture*/}
          <div className="w-full h-full overflow-hidden">
            {user?.cover_photo && (
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
              {ActiveUser && ActiveUser.profilephoto ? (
                <img
                  src={ActiveUser.profilephoto}
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
                    ? "text-blue-600"
                    : "text-color-font-primary hover:text-blue-600 transition-colors duration-150"
                }
                onClick={() => setToggleSidebar(false)}
              >
                <span className="font-medium ml-1 font-fira capitalize">
                  {ActiveUser?.name}
                </span>
              </NavLink>
            ) : (
              <div className="font-fira transition-all capitalize text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-800">
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
        <div className="w-10/12 border-t border-color-border-secondary px-2 py-3 mt-16 flex flex-col gap-1">
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
            to={ActiveUser?._id ? `/wishlist/user/${ActiveUser._id}` : "/login"}
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
