import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";
import { RiCalendarTodoFill, RiHeart2Line, RiGridFill } from "react-icons/ri";
import { Link, Outlet, useParams } from "react-router-dom";
import LazyImage from "../../components/LazyImage.jsx";

import { user_profile_data } from "../../data/mock.js";
import { userContext } from "../../Hooks/userContext.jsx";

const UserProfile = () => {
  // Variable
  const ActiveTabStyles =
    "h-1 bg-color-primary-blue opacity-1 w-14 rounded-tl-lg rounded-tr-lg transition-all";
  const NotActiveTabStyles =
    "h-0 bg-white opacity-0 w-14 rounded-tl-lg rounded-tr-lg transition-all";

  // Hooks
  const { userId } = useParams();
  const user = useContext(userContext);
  const [activeTabText, setActiveTavText] = useState("all-pins");
  const [userObj, setUserObj] = useState(null);

  // Load User Data
  useEffect(() => {
    //storing user data
    setUserObj(user_profile_data.find((value) => value._id === userId));
  }, [userId]);

  return (
    <>
      {user ? (
        // Show appropriate user information
        <section className="h-full">
          {/*user cover image and profile section*/}
          <div className="relative w-full">
            {/* cover-image*/}
            <div className="min-h-fit h-230 max-h-240 w-full overflow-hidden background-cover-clip bg-color-shades-accent">
              <div className="object-cover w-full h-full max-h-240">
                <LazyImage
                  src={userObj?.cover_image}
                  alt={`${userObj?.username}-cover-picture`}
                />
              </div>
            </div>
            <div className="absolute left-0 bottom-0 w-full px-4 translate-y-1/2 flex flex-col items-start ">
              {/*profile-image*/}
              <div className="w-28 h-28 border-4 border-white rounded-full drop-shadow-lg overflow-hidden bg-color-shades-accent">
                <div className="w-full h-full object-cover drop-shadow-sm overflow-hidden">
                  <LazyImage
                    src={userObj?.image}
                    alt={`${userObj?.username}-profile-picture`}
                  />
                </div>
                <img />
              </div>
              {/*user-headings*/}
              <div className="flex items-center justify-between w-full">
                <div className="font-fira ml-2 ">
                  <h2 className="capitalize font-semibold text-xl text-color-font-primary tracking-tight">
                    {userObj?.name}
                  </h2>
                  <p className="text-color-font-primary font-light text-xs">
                    @{userObj?.username}
                  </p>
                  <p className="capitalize font-normal text-sm text-color-font-primary mt-0.5 border-b border-color-border-primary inline">
                    {userObj?.profession}
                  </p>
                  <p className="font-normal text-xs text-color-font-tertiary mt-2 flex items-start gap-1">
                    <RiCalendarTodoFill className="inline" fontSize={15} />
                    Joined on {userObj?._createdAt}
                  </p>
                </div>
                {/*CTA buttons*/}
                <div className="max-w-125 font-fira font-normal flex flex-col items-end justify-end gap-2">
                  {userObj?._id === user && (
                    <button
                      role="button"
                      title="edit profile"
                      className="capitalize bg-color-primary-blue px-3 py-2 rounded text-white text-sm transition hover:bg-color-primary-blue-accent"
                    >
                      Edit Profile
                    </button>
                  )}
                  {userObj?._id !== user &&
                    userObj?.followers.length >= 0 &&
                    user ===
                      userObj?.followers.find((value) => value?._id === user)
                        ?._id && (
                      <button
                        role="button"
                        title="edit profile"
                        className="capitalize bg-color-primary-blue px-3 py-2 rounded text-white text-sm transition hover:bg-color-primary-blue-accent"
                      >
                        Following
                      </button>
                    )}
                  {userObj?._id !== user &&
                    userObj?.followers.length >= 0 &&
                    user !==
                      userObj?.followers.find((value) => value?._id === user)
                        ?._id && (
                      <button
                        role="button"
                        title="edit profile"
                        className="capitalize bg-color-primary-blue px-3 py-2 rounded text-white text-sm transition hover:bg-color-primary-blue-accent"
                      >
                        Follow
                      </button>
                    )}
                  <div className="w-full capitalize text-xs text-color-font-tertiary font-medium flex items-start justify-end gap-1">
                    <HiOutlineMapPin className="inline" fontSize={15} />
                    <p className=" truncate ">{userObj?.location}</p>
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
                {userObj?.bio}
              </p>
              {/*User Followers and other details*/}
              <div className="font-fira font-semibold  text-color-font-primary bg-color-bg-accent flex items-center justify-center w-full py-5 rounded-md divide-x">
                {/*user-likes*/}
                <div className="max-w-110 flex flex-col items-center justify-center cursor-pointer px-4 capitalize">
                  <h2 className="text-xl">{userObj?.likes.length}</h2>
                  <p className="text-sm font-normal">likes</p>
                </div>
                {/*user-followers*/}
                <div className="max-w-110  flex flex-col items-center justify-center cursor-pointer px-4 capitalize">
                  <h2 className="text-xl">{userObj?.followers.length}</h2>
                  <p className="text-sm font-normal">Followers</p>
                </div>
                {/*user-following*/}
                <div className="max-w-110 flex flex-col items-center justify-center cursor-pointer px-4 capitalize">
                  <h2 className="text-xl">{userObj?.following.length}</h2>
                  <p className="text-sm font-normal">Following</p>
                </div>
              </div>
            </div>

            {/*user action-tab-slider*/}
            <div className="select-none w-full h-10 pt-2 border-b flex items-end justify-center gap-8">
              <div className="flex flex-col items-center justify-center gap-0.5 transition-all">
                <Link
                  to={`/user/profile/${userId}`}
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
                  <RiHeart2Line
                    fontSize={20}
                    className={"pointer-events-none"}
                  />
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
          {/* Rendering the outlet */}
          <Outlet context={[userId]} />
        </section>
      ) : (
        // Show redirect to log in and Signup if user not exist
        <>
          <div className="absolute w-4/5  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col flex-wrap">
            <div className={" font-semibold text-2xl"}>
              <span className="font-medium text-xl">Welcome Back</span>
              <span className="text-color-primary-blue">,</span>
              <br />
              You are not{" "}
              <span className="text-color-primary-blue font-fira font-bold">
                logged
              </span>{" "}
              in<span className="text-color-primary-blue font-bold">?</span>
              <Link
                to={"/login"}
                className="bg-color-primary-blue hover:bg-color-primary-blue-accent px-5 py-2 mt-3 text-white font-semibold text-xl rounded-md"
              >
                Login
              </Link>
            </div>
            <p className="mt-3 font-bold text-lg text-color-font-tertiary">
              or
            </p>
            <div className={"font-semibold text-2xl"}>
              <span className="font-medium text-lg">Don't have an </span>
              <span className="text-color-primary-blue text-xl font-semibold">
                Account
              </span>
              ?
              <br />
              <Link
                to={"/signup"}
                className="bg-color-primary-blue hover:bg-color-primary-blue-accent px-5 py-2 mt-3 text-white font-semibold text-xl rounded-md"
              >
                Signup
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UserProfile;
