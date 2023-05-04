import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import UserContext from "../store/userContext.jsx";

const Home = () => {
  // hooks
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />
      <div className="flex lg:mt-[calc(60px)]">
        <Sidebar
          user={user}
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
        <main className="flex-auto w-full h-full lg:w-auto pb-2  lg:pl-[calc(100%-75%)]">
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default Home;
