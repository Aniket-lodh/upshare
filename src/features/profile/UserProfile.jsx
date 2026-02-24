import React, { useEffect, useState } from "react";
import { HiOutlineMapPin, HiUserCircle } from "react-icons/hi2";
import { MdOutlineCancel } from "react-icons/md";
import {
  RiCalendarTodoFill,
  RiHeart2Line,
  RiGridFill,
  RiEdit2Line,
} from "react-icons/ri";
import { Link, Outlet, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LazyImage from "../../components/LazyImage.jsx";
import { followUser, unFollowUser, getProfile } from "../../api/userProfile.js";
import { useUser } from "../../store/userContext.jsx";
import { Spinner } from "../../helpers/Loader.jsx";

const UserProfile = () => {
  // Variable
  const ActiveTabStyles =
    "h-1 bg-color-primary-blue opacity-1 w-14 rounded-tl-lg rounded-tr-lg transition-all";
  const NotActiveTabStyles =
    "h-0 bg-white opacity-0 w-14 rounded-tl-lg rounded-tr-lg transition-all";

  // Hooks
  const { userId } = useParams();
  const { user } = useUser();
  const [activeTabText, setActiveTavText] = useState("all-pins");
  const [EditModalState, setEditModalState] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUser() {
    try {
      const profile = await getProfile(userId);
      if (profile) {
        setUserObj(profile);
      }
    } catch {
      // handled by ErrorState or toast
    }
  }

  useEffect(() => {
    //storing user data
    fetchUser();
  }, [userId]);

  const HandleFollowClick = async () => {
    setIsLoading(true);
    await followUser(userObj._id);
    await fetchUser();
    setIsLoading(false);
  };
  const HandleUnFollowClick = async () => {
    setIsLoading(true);
    await unFollowUser(userObj._id);
    await fetchUser();
    setIsLoading(false);
  };
  return (
    <>
      {user ? (
        // Show appropriate user information
        <section className="h-full">
          <Helmet>
            <title>
              {userObj?.name || userObj?.username || "Profile"} — UpShare
            </title>
          </Helmet>
          <div className="relative w-full">
            {/* cover-image*/}
            <div className="min-h-fit h-230 max-h-240 w-full overflow-hidden background-cover-clip bg-color-shades-accent">
              <div className="object-cover w-full h-full max-h-240">
                {userObj && userObj.coverphoto ? (
                  <LazyImage
                    src={userObj?.coverphoto}
                    alt={`${userObj?.username}-cover-picture`}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="absolute left-0 bottom-0 w-full px-4 translate-y-1/2 flex flex-col items-start ">
              {/*profile-image*/}
              <div className="relative w-28 h-28 border-4 border-white rounded-full drop-shadow-lg bg-color-shades-accent">
                <div className="w-full h-full flex items-center justify-center object-cover drop-shadow-sm overflow-hidden rounded-full ">
                  {userObj && userObj.profilephoto ? (
                    <LazyImage
                      src={userObj?.profilephoto}
                      alt={`${userObj?.username}-profile-picture`}
                    />
                  ) : (
                    <HiUserCircle fontSize={120} className="text-gray-300" />
                  )}
                </div>
                {userObj && userObj._id === user?._id && (
                  <span className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full">
                    <RiEdit2Line
                      fontSize={14}
                      className="text-color-primary-blue"
                      onClick={() => setEditModalState(true)}
                    />
                  </span>
                )}
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
                  {userObj?._id === user?._id && (
                    <Link
                      to={"edit"}
                      role="button"
                      title="edit profile"
                      className="capitalize bg-color-primary-blue px-3 py-2 rounded text-white text-sm transition hover:bg-color-primary-blue-accent"
                    >
                      Edit Profile
                    </Link>
                  )}
                  {userObj &&
                    userObj._id !== user?._id &&
                    userObj.followers.indexOf(user?._id) < 0 && (
                      <button
                        role="button"
                        title="edit profile"
                        onClick={() => HandleFollowClick()}
                        className="capitalize bg-color-primary-blue px-3 py-2 rounded text-white text-sm transition hover:bg-color-primary-blue-accent"
                      >
                        {isLoading ? <Spinner /> : "Follow"}
                      </button>
                    )}
                  {userObj &&
                    userObj._id !== user?._id &&
                    userObj.followers.indexOf(user?._id) >= 0 && (
                      <button
                        role="button"
                        title="edit profile"
                        onClick={() => HandleUnFollowClick()}
                        className="capitalize bg-color-primary-blue px-3 py-2 rounded text-white text-sm transition hover:bg-color-primary-blue-accent"
                      >
                        {isLoading ? <Spinner /> : "Following"}
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
              <p className="break-words text-left tracking-tight overflow-hidden font-normal text-sm text-color-font-secondary">
                {userObj?.bio}
              </p>
              {/*User Followers and other details*/}
              <div className="font-fira font-semibold  text-color-font-primary bg-color-bg-accent flex items-center justify-center w-full py-5 rounded-md divide-x">
                {/*user-likes*/}
                <div className="max-w-110 flex flex-col items-center justify-center cursor-pointer px-4 capitalize">
                  <h2 className="text-xl">{userObj?.likes?.length}</h2>
                  <p className="text-sm font-normal">likes</p>
                </div>
                {/*user-followers*/}
                <div className="max-w-110  flex flex-col items-center justify-center cursor-pointer px-4 capitalize">
                  <h2 className="text-xl">{userObj?.followers?.length}</h2>
                  <p className="text-sm font-normal">Followers</p>
                </div>
                {/*user-following*/}
                <div className="max-w-110 flex flex-col items-center justify-center cursor-pointer px-4 capitalize">
                  <h2 className="text-xl">{userObj?.following?.length}</h2>
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
          {/* Change Profile Pic modal */}
          {EditModalState && (
            <div
              className="relative z-10"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <span
                      onClick={() => setEditModalState(false)}
                      className="absolute right-4 top-4 hover:text-red-500 transition-all cursor-pointer"
                    >
                      <MdOutlineCancel fontSize={18} />
                    </span>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full overflow-hidden bg-color-bg-primary sm:mx-0">
                          {userObj && userObj.profilephoto ? (
                            <LazyImage
                              src={userObj.profilephoto}
                              alt={`${userObj.username}-profile-picture`}
                            />
                          ) : (
                            <HiUserCircle
                              fontSize={120}
                              className="text-gray-300"
                            />
                          )}
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3
                            className="text-base font-semibold leading-6 text-gray-900"
                            id="modal-title"
                          >
                            Change profile picture
                          </h3>

                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Once you change your profile picture, it will be
                              visible to everyone across our platform.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <label
                        role="button"
                        htmlFor="changeprofileviadevice"
                        className="inline-flex w-full justify-center rounded-md bg-color-primary-blue px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                      >
                        Choose from device
                      </label>
                      <input
                        id="changeprofileviadevice"
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        capture="user"
                        className="hidden"
                      />
                      <button
                        role="button"
                        type="button"
                        onClick={() => setEditModalState(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
