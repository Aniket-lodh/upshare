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
      <Navbar />
      <main className="flex-auto w-full pb-2">
        <Outlet />
      </main>
    </userContext.Provider>
  );
};
export default Home;
