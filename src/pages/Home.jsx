import React, {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";


import Navbar from "../components/Navbar.jsx";
import {userContext} from "../Hooks/userContext.jsx";


const Home = () => {
    // hooks
    const user = localStorage.getItem("user");
    const {pathname} = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return (
        <userContext.Provider value={user}>
            <Navbar/>

            <section className="w-full h-full flex flex-col items-start justify-start overflow-x-hidden overflow-y-auto">
                {/*An empty div to stop the overflow of feed contents*/}
                <div className="w-screen bg-red-500 pt-4 pb-5">
                    &nbsp;
                </div>

                {/*Rending the child routes content as a outlet here*/}
                <Outlet/>
            </section>

        </userContext.Provider>

    );
};
export default Home;
