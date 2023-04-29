import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { userContext } from "../Hooks/userContext.jsx";

const Home = () => {
  // hooks
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const user = localStorage.getItem("user");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <userContext.Provider value={user}>
      <Navbar
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />
      <div className="lg:mt-[calc(60px)]">
        <Sidebar
          user={user}
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
        <main className="flex-auto w-full lg:w-auto pb-2  lg:pl-[calc(100%-75%)]">
          <Outlet />
        </main>
      </div>
    </userContext.Provider>
  );
};
export default Home;
