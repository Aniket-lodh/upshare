import React, { useState } from "react";
import { RiCalendarTodoFill, RiHeart2Line, RiGridFill } from "react-icons/ri";
import { HiOutlineMapPin } from "react-icons/hi2";

import { Link, Outlet, useParams } from "react-router-dom";
import LazyImage from "./LazyImage.jsx";

const Profile = ({ curUser }) => {
  // Variable
  const ActiveTabStyles =
    "h-1 bg-color-primary-blue opacity-1 w-14 rounded-tl-lg rounded-tr-lg transition-all";
  const NotActiveTabStyles =
    "h-0 bg-white opacity-0 w-14 rounded-tl-lg rounded-tr-lg transition-all";
  const [activeTabText, setActiveTavText] = useState("all-pins");

  return (
    <section className="h-full">
      {/*user cover image and profile section*/}
      <div className="relative w-full">
        {/* cover-image*/}
        <div className="min-h-fit h-230 max-h-240 w-full overflow-hidden background-cover-clip bg-color-shades-accent">
          <div className="object-cover w-full h-full max-h-240">
            <LazyImage
              src={curUser?.cover_image}
              alt={`${curUser?.username}-cover-picture`}
            />
          </div>
        </div>
        <div className="absolute left-0 bottom-0 w-full px-4 translate-y-1/2 flex flex-col items-start ">
          {/*profile-image*/}
          <div className="w-28 h-28 border-4 border-white rounded-full drop-shadow-lg overflow-hidden bg-color-shades-accent">
            <div className="w-full h-full object-cover drop-shadow-sm overflow-hidden">
              <LazyImage
                src={curUser?.image}
                alt={`${curUser?.username}-profile-picture`}
              />
            </div>
            <img />
          </div>
          {/*user-headings*/}
          <div className="flex items-center justify-between w-full">
            <div className="font-fira ml-2 ">
              <h2 className="capitalize font-semibold text-xl text-color-font-primary tracking-tight">
                {curUser?.name}
              </h2>
              <p className="text-color-font-primary font-light text-xs">
                @{curUser?.username}
              </p>
              <p className="capitalize font-normal text-sm text-color-font-primary mt-0.5 border-b border-color-border-primary inline">
                {curUser?.profession}
              </p>
              <p className="font-normal text-xs text-color-font-tertiary mt-2 flex items-start gap-1">
                <RiCalendarTodoFill className="inline" fontSize={15} />
                Joined on {curUser?._createdAt}
              </p>
            </div>
            {/*CTA buttons*/}
            <div className="max-w-125 font-fira font-normal flex flex-col items-end justify-end gap-2">
              {curUser?._id === curUser && (
                <button
                  role="button"
                  title="edit profile"
                  className="capitalize bg-color-primary-blue px-3 py-2 rounded text-white text-sm transition hover:bg-color-primary-blue-accent"
                >
                  Edit Profile
                </button>
              )}
              <Link
                to={"edit"}
                role="button"
                title="edit profile"
                className="capitalize bg-color-primary-blue px-3 py-2 rounded text-white text-sm transition hover:bg-color-primary-blue-accent"
              >
                Edit Profile
              </Link>
              {/* {curUser?._id !== curUser &&
                curUser?.followers.length >= 0 &&
                curUser ===
                  curUser?.followers.find((value) => value?._id === curUser)
                    ?._id && (
                  <button
                    role="button"
                    title="edit profile"
                    className="capitalize bg-color-primary-blue px-3 py-2 rounded text-white text-sm transition hover:bg-color-primary-blue-accent"
                  >
                    Following
                  </button>
                )} */}
              {/* {curUser?._id !== curUser &&
                curUser?.followers.length >= 0 &&
                curUser !==
                  curUser?.followers.find((value) => value?._id === curUser)
                    ?._id && (
                  <button
                    role="button"
                    title="edit profile"
                    className="capitalize bg-color-primary-blue px-3 py-2 rounded text-white text-sm transition hover:bg-color-primary-blue-accent"
                  >
                    Follow
                  </button>
                )} */}
              <div className="w-full capitalize text-xs text-color-font-tertiary font-medium flex items-start justify-end gap-1">
                <HiOutlineMapPin className="inline" fontSize={15} />
                <p className=" truncate ">{curUser?.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*user bio and other details*/}
      <div className="mt-28 flex items-center justify-center flex-col gap-4">
        {/*User bio*/}
        <div className="pl-5 pr-4 flex items-center justify-center flex-col gap-4">
          <p className="break-words tracking-tight overflow-hidden font-normal text-sm text-color-font-secondary">
            {curUser?.bio}
          </p>
          {/*User Followers and other details*/}
          <div className="font-fira font-semibold  text-color-font-primary bg-color-bg-accent flex items-center justify-center w-full py-5 rounded-md divide-x">
            {/*user-likes*/}
            <div className="max-w-110 flex flex-col items-center justify-center cursor-pointer px-4 capitalize">
              <h2 className="text-xl">{curUser?.likes?.length}</h2>
              <p className="text-sm font-normal">likes</p>
            </div>
            {/*user-followers*/}
            <div className="max-w-110  flex flex-col items-center justify-center cursor-pointer px-4 capitalize">
              <h2 className="text-xl">{curUser?.followers?.length}</h2>
              <p className="text-sm font-normal">Followers</p>
            </div>
            {/*user-following*/}
            <div className="max-w-110 flex flex-col items-center justify-center cursor-pointer px-4 capitalize">
              <h2 className="text-xl">{curUser?.following?.length}</h2>
              <p className="text-sm font-normal">Following</p>
            </div>
          </div>
        </div>

        {/*user action-tab-slider*/}
        <div className="select-none w-full h-10 pt-2 border-b flex items-end justify-center gap-8">
          <div className="flex flex-col items-center justify-center gap-0.5 transition-all">
            <Link
              to={`/user/profile/userID`}
              type="button"
              title="all-pins"
              className="block"
              onClick={(e) => {
                setActiveTavText(e.target.title);
              }}
            >
              <RiGridFill fontSize={20} className={"pointer-events-none"} />
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
              to={"wishlists"}
              type="button"
              title="wishlisted"
              className="block"
              onClick={(e) => {
                setActiveTavText(e.target.title);
              }}
            >
              <RiHeart2Line fontSize={20} className={"pointer-events-none"} />
            </Link>
            <div
              className={`${
                activeTabText === "wishlisted"
                  ? ActiveTabStyles
                  : NotActiveTabStyles
              }`}
            ></div>
          </div>
        </div>
      </div>
      {/* Rendering the outlet
      <Outlet context={[userId]} /> */}
    </section>
  );
};

export default Profile;
