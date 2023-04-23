import { search_result_data } from "../data/mock.js";
import { useState } from "react";

import { RiUser3Fill, RiGridFill } from "react-icons/ri";
import { Link, Outlet, useMatch } from "react-router-dom";

const Search = () => {
  // Variable
  const ActiveTabStyles =
    "h-1 bg-color-primary-blue opacity-1 w-14 rounded-tl-lg rounded-tr-lg transition-all";
  const NotActiveTabStyles =
    "h-0 bg-white opacity-0 w-14 rounded-tl-lg rounded-tr-lg transition-all";
  
    // Hooks
  const [activeTabText, setActiveTabText] = useState("all-pins");


  return (
    <section className="w-full h-fit">
      <div className="select-none w-full h-10 pt-2 border-b flex items-end justify-center gap-8 bg-white">
        <div className="flex flex-col items-center justify-center gap-0.5 transition-all">
          <Link
            to={"/search"}
            type="button"
            title="all-pins"
            className="block pb-0.5"
            onClick={(e) => {
              setActiveTabText(e.target.title);
            }}
          >
            <RiGridFill
              fontSize={20}
              className={`${
                activeTabText === "all-pins" && "!text-color-font-primary"
              } pointer-events-none text-color-font-secondary`}
            />
          </Link>
          <div
            className={`${
              activeTabText === "all-pins"
                ? ActiveTabStyles
                : NotActiveTabStyles
            }`}
          ></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5 transition-all">
          <Link
            to={"users"}
            type="button"
            title="users"
            className="block pb-0.5"
            onClick={(e) => {
              setActiveTabText(e.target.title);
            }}
          >
            <RiUser3Fill
              fontSize={20}
              className={`${
                activeTabText === "users" && "!text-color-font-primary"
              } pointer-events-none text-color-font-secondary`}
            />
          </Link>
          <div
            className={`${
              activeTabText === "users" ? ActiveTabStyles : NotActiveTabStyles
            }`}
          ></div>
        </div>
      </div>
      {/* Renders the Outlet */}
      <Outlet />
    </section>
  );
};
export default Search;
