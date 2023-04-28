import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import { userContext } from "../Hooks/userContext.jsx";

const Home = () => {
  // hooks
  const user = localStorage.getItem("user");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <userContext.Provider value={user}>
      <main className="w-screen max-w-screen h-screen relative pb-2 bg-red-500 flex flex-col items-start justify-start overflow-x-hidden overflow-y-auto">
        <Navbar />
        <section className="flex-auto w-full">
          <Outlet />
        </section>
      </main>

     
    </userContext.Provider>
  );
};
export default Home;
