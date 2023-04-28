import {FcMenu} from "react-icons/fc";
import {RiSearchLine, RiArrowLeftLine,RiSearch2Line} from "react-icons/ri";
import React, {useContext, useState} from "react";
import {Link, useMatch, useNavigate} from "react-router-dom";
import {userContext} from "../Hooks/userContext.jsx";


const Sidebar = React.lazy(() => import("./Sidebar.jsx"));


const Navbar = ({toggleSidebar, setToggleSidebar}) => {
    //Hooks
    const searchMatch = useMatch("/search/*");
    const navigate = useNavigate();


    return (
        <>
            <header className="w-screen bg-white sticky h-fit z-10 top-0 left-0 ">
                <nav className="w-full flex items-center justify-between p-5 py-4 ">
                    {!searchMatch ? (
                            <>
                                <div className="flex gap-2 items-center">
                                    {/*Menu Icon*/}
                                    <FcMenu fontSize={24} className="lg:hidden text-color-font-tertiary cursor-pointer"
                                            onClick={() => setToggleSidebar(!toggleSidebar)}/>
                                    {/*App logo*/}
                                    <Link to={"/"} className="text-xl font-bold text-color-font-primary cursor-pointer">Up<span
                                        className="text-color-primary-blue">Share</span></Link>
                                </div>
                                {/*search icon*/}
                                <Link to={"/search"} onClick={() => {
                                }}>
                                    <RiSearchLine fontSize={22} className="text-color-font-tertiary cursor-pointer"/>
                                </Link>
                            </>
                        )
                        : (
                            <>
                                <RiArrowLeftLine fontSize={24} onClick={() => navigate("/")} className="text-color-font-tertiary cursor-pointer"/>
                                <div className="ml-2 flex items-center justify-start flex-1 px-2 py-1 bg-color-bg-tertiary rounded-md">
                                    <RiSearch2Line fontSize={20} className="text-color-font-tertiary"/>
                                    <input type="search" className="px-2 py-0.5 w-full bg-transparent focus:outline-none" placeholder="Search..."/>
                                </div>
                            </>
                        )}
                </nav>
            </header>

        </>
    )
}

export default Navbar