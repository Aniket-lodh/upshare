import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Navbar = React.lazy(() => import("../components/Navbar.jsx"));
const Sidebar = React.lazy(() => import("../components/Sidebar.jsx"));
const Home = () => {
  // hooks
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <>
      <Navbar
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />
      <div className="flex lg:mt-[calc(60px)]">
        <Sidebar
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
