import {HiOutlineHome} from "react-icons/hi";
import {IoIosCloseCircleOutline} from "react-icons/io";
import {RiHeart2Line, RiChat1Line} from "react-icons/ri";
import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";


import fetchUser from "../Hooks/fetchUser.js";

const Sidebar = ({user, toggleSidebar, setToggleSidebar}) => {

    //Variables
    const ActiveNavStyle = "flex items-start gap-2 text-sm font-bold text-color-primary-blue hover:text-color-primary-blue-accent transition-colors ease-in-out capitalize";
    const notActiveNavStyle = "flex items-start gap-2 text-sm font-bold text-color-font-tertiary hover:text-color-font-secondary transition-all ease-in-out capitalize";

    //Hooks
    const [userObj, setUserObj] = useState(undefined);
    const closeSidebarOnOutsideClick = useRef(null);

    //Setting user data
    useEffect(() => {
        setUserObj(fetchUser(user));
    }, [])

    useEffect(() => {
        const HandleOutsideClickListener = (e) => {
            if (closeSidebarOnOutsideClick.current && !closeSidebarOnOutsideClick.current.contains(e.target)) {
                setToggleSidebar(false);
            }
        };
        document.addEventListener("mousedown", HandleOutsideClickListener);
        return () => {
            document.removeEventListener("mousedown", HandleOutsideClickListener);
        };
    }, [toggleSidebar])

    return (
        <aside
            className={`z-20 transition-all ease-in-out h-screen w-screen fixed top-0 -left-full bg-transparent flex  ${toggleSidebar && "!left-0"}`}>
            {/*Left Sidebar*/}
            <section ref={closeSidebarOnOutsideClick} className="w-56 bg-white flex flex-col items-center">
                <div className="relative w-full bg-color-bg-accent h-44">
                    <IoIosCloseCircleOutline
                        className={`block opacity-0  absolute right-3 top-2 cursor-pointer transition ease-in-out delay-75 ${toggleSidebar && "opacity-100"}`}
                        fontSize={24}
                        onClick={() => setToggleSidebar(false)}/>
                    {/*user cover picture*/}
                    <div className="w-full h-full overflow-hidden">
                        <img src={userObj?.cover_image} className="w-full h-full object-cover" alt={`${userObj?.username}-cover-picture`}/>
                    </div>
                    {/*user profile avatar*/}
                    <div className="absolute -bottom-12 left-3 flex flex-col items-start justify-start gap-1">
                        <div className="w-20 h-20 border-4 border-white rounded-full bg-red-500 drop-shadow-lg overflow-hidden">
                            <img src={userObj?.image} alt={`${userObj?.username}-profile`}
                                 className="w-full h-full object-cover"/>
                        </div>
                        <NavLink to={`/user/profile/${userObj?._id}`}
                                 className={({isActive}) => (
                                     isActive
                                         ? "text-color-primary-blue-accent"
                                         : "text-color-font-primary hover:text-color-primary-blue-accent"
                                 )}
                                 onClick={() => setToggleSidebar(false)}>

                            <span className="font-medium ml-1 font-fira transition-all capitalize">{userObj?.name}</span>
                        </NavLink>
                    </div>
                </div>

                {/*Navigation Links*/}
                <div className="w-10/12 border-t border-color-border-secondary px-2 py-3 mt-16 flex flex-col gap-3">
                    <NavLink to={"/"}
                             className={({isActive}) => (
                                 isActive
                                     ? ActiveNavStyle
                                     : notActiveNavStyle
                             )
                             }
                             onClick={() => setToggleSidebar(false)}
                    >
                        <HiOutlineHome fontSize={18}/> <span>Home</span>
                    </NavLink>
                    <NavLink to={"/wishlist/user/:user-id"}
                             className={({isActive}) => (
                                 isActive
                                     ? ActiveNavStyle
                                     : notActiveNavStyle
                             )
                             }
                             onClick={() => setToggleSidebar(false)}
                    >
                        <RiHeart2Line fontSize={18}/> <span>Wishlists</span>
                    </NavLink>
                    <NavLink to={"/categories"}
                             className={({isActive}) => (
                                 isActive
                                     ? ActiveNavStyle
                                     : notActiveNavStyle
                             )
                             }
                             onClick={() => setToggleSidebar(false)}
                    >
                        <RiChat1Line fontSize={18}/> <span>Categories</span>
                    </NavLink>
                </div>
            </section>
            {/*Right Background shadow*/}
            <div
                className={`h-screen opacity-0 transition-opacity ease-in-out delay-200 flex-1 bg-color-shades-secondary overscroll-none ${toggleSidebar && "opacity-40"}`}>
                &nbsp;
            </div>


        </aside>

    )
}
export default Sidebar;