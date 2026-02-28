import React, { useEffect, useState } from "react";
import { HiOutlineMapPin, HiUserCircle } from "react-icons/hi2";
import { MdOutlineCancel } from "react-icons/md";
import {
  RiCalendarTodoFill,
  RiHeart2Line,
  RiGridFill,
  RiEdit2Line,
  RiImageAddLine,
  RiLinksLine,
} from "react-icons/ri";
import { Link, Outlet, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LazyImage from "../../components/LazyImage.jsx";
import { followUser, unFollowUser, getProfile } from "../../api/userProfile.js";
import { useUser } from "../../store/userContext.jsx";
import { Spinner } from "../../helpers/Loader.jsx";
import ProfileSkeleton from "../../components/skeleton/ProfileSkeleton.jsx";

const UserProfile = () => {
  // Variable
  const ActiveTabStyles =
    "h-1 bg-color-primary-blue opacity-1 w-14 rounded-t-lg transition-all";
  const NotActiveTabStyles =
    "h-0 bg-white opacity-0 w-14 rounded-t-lg transition-all";

  // Hooks
  const { userId } = useParams();
  const { user } = useUser();
  const [activeTabText, setActiveTavText] = useState("all-pins");
  const [EditModalState, setEditModalState] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // only for follow buttons
  const [isPageLoading, setIsPageLoading] = useState(true);

  async function fetchUser() {
    try {
      setIsPageLoading(true);
      const profile = await getProfile(userId);
      if (profile) {
        setUserObj(profile);
      }
    } catch {
      // handled by ErrorState or toast
    } finally {
      setIsPageLoading(false);
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
        isPageLoading ? (
          <div className="max-w-6xl mx-auto px-4 w-full mt-4">
            <ProfileSkeleton />
          </div>
        ) : (
          <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-12 pt-4 sm:pt-8 w-full">
            <Helmet>
              <title>
                {userObj?.name || userObj?.username || "Profile"} — UpShare
              </title>
            </Helmet>

            <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-col flex animate-fadeInUp w-full">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full">
                {/* Left Column (Profile Identity 2/3) */}
                <div className="xl:col-span-2 flex flex-col gap-6 w-full">
                  {/* Profile Header Card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative flex flex-col w-full">
                    {/* Cover Image */}
                    <div className="h-48 sm:h-64 w-full overflow-hidden bg-gradient-to-b from-gray-100 via-gray-50 to-white shadow-inner flex-shrink-0 relative">
                      {userObj && userObj.coverphoto ? (
                        <LazyImage
                          src={userObj?.coverphoto}
                          className="w-full h-full object-cover"
                          alt={`${userObj?.username}-cover-picture`}
                        />
                      ) : (
                        <div className="w-full h-full bg-color-shades-accent"></div>
                      )}
                    </div>

                    <div className="px-4 sm:px-8 pb-4 relative bg-white w-full">
                      {/* Header Row (Avatar + Buttons) */}
                      <div className="flex justify-between items-end -mt-12 sm:-mt-16 w-full mb-4 relative z-10">
                        {/* Avatar */}
                        <div className="relative w-28 h-28 sm:w-36 sm:h-36 border-4 border-white rounded-full bg-white flex-shrink-0 ring-2 ring-blue-100 ring-offset-2 shadow-sm">
                          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                            {userObj && userObj.profilephoto ? (
                              <LazyImage
                                src={userObj?.profilephoto}
                                className="w-full h-full object-cover"
                                alt={`${userObj?.username}-profile-picture`}
                              />
                            ) : (
                              <HiUserCircle className="text-gray-300 w-full h-full" />
                            )}
                          </div>
                          {userObj && userObj._id === user?._id && (
                            <button
                              className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500/40"
                              onClick={() => setEditModalState(true)}
                              title="Change profile picture"
                            >
                              <RiEdit2Line
                                fontSize={16}
                                className="text-gray-700"
                              />
                            </button>
                          )}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-3 font-fira pb-2 sm:pb-4">
                          {userObj?._id === user?._id && (
                            <Link
                              to={"edit"}
                              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-lg px-4 py-2 transition-colors focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 text-sm shadow-sm"
                            >
                              Edit Profile
                            </Link>
                          )}
                          {userObj &&
                            userObj._id !== user?._id &&
                            userObj.followers.indexOf(user?._id) < 0 && (
                              <button
                                onClick={HandleFollowClick}
                                className="bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg px-5 py-2 transition-colors active:scale-[0.98] focus:ring-2 focus:ring-gray-900/40 focus:ring-offset-2 text-sm shadow-sm"
                              >
                                {isLoading ? <Spinner /> : "Follow"}
                              </button>
                            )}
                          {userObj &&
                            userObj._id !== user?._id &&
                            userObj.followers.indexOf(user?._id) >= 0 && (
                              <button
                                onClick={HandleUnFollowClick}
                                className="bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-900 font-medium rounded-lg px-5 py-2 transition-colors active:scale-[0.98] focus:ring-2 focus:ring-gray-500/40 focus:ring-offset-2 text-sm shadow-sm"
                              >
                                {isLoading ? <Spinner /> : "Following"}
                              </button>
                            )}
                        </div>
                      </div>

                      {/* Identity Metadata */}
                      <div className="flex flex-col items-start w-full">
                        <div className="flex flex-col gap-0 w-full">
                          <h2 className="capitalize font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight leading-none">
                            {userObj?.name}
                          </h2>
                          <p className="text-gray-500 font-medium mt-1 text-base leading-snug">
                            @{userObj?.username}
                          </p>
                        </div>

                        {/* Metadata Identity Row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mt-3 font-fira">
                          {userObj?.profession && (
                            <span className="capitalize font-medium text-gray-900">
                              {userObj.profession}
                            </span>
                          )}
                          {userObj?.country && userObj?.state && (
                            <span className="flex items-center gap-1 capitalize">
                              <HiOutlineMapPin
                                size={16}
                                className="text-gray-400"
                              />
                              {userObj.country}, {userObj.state}
                            </span>
                          )}
                          {userObj?.website && (
                            <a
                              href={
                                userObj.website.startsWith("http")
                                  ? userObj.website
                                  : `https://${userObj.website}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
                            >
                              <RiLinksLine
                                size={15}
                                className="text-blue-500"
                              />
                              {userObj.website
                                .replace(/^https?:\/\//, "")
                                .replace(/\/$/, "")}
                            </a>
                          )}
                          {userObj?._createdAt && (
                            <span className="flex items-center gap-1 text-gray-400">
                              <RiCalendarTodoFill size={15} />
                              Joined {userObj._createdAt}
                            </span>
                          )}
                        </div>

                        {/* Bio */}
                        {userObj?.bio && (
                          <p className="mt-4 break-words tracking-tight font-normal text-base text-gray-700 max-w-2xl leading-relaxed">
                            {userObj.bio}
                          </p>
                        )}

                        {/* Interactive Stats Card */}
                        <div className="w-full max-w-md mt-6 font-fira bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 flex items-center justify-between py-1 divide-x hover:shadow-md transition-shadow duration-200">
                          <button className="flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors rounded-l-xl py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500/40">
                            <span className="text-lg font-semibold text-gray-900">
                              {userObj?.followers?.length || 0}
                            </span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-0.5">
                              Followers
                            </span>
                          </button>
                          <button className="flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500/40">
                            <span className="text-lg font-semibold text-gray-900">
                              {userObj?.following?.length || 0}
                            </span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-0.5">
                              Following
                            </span>
                          </button>
                          <button className="flex-1 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors rounded-r-xl py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500/40">
                            <span className="text-lg font-semibold text-gray-900">
                              {userObj?.likes?.length || 0}
                            </span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-0.5">
                              Likes
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Structural Divider */}
                      <div className="border-t border-gray-200 mt-8 pt-2"></div>

                      {/*user action-tab-slider*/}
                      <div className="select-none w-full h-10 pt-2 border-b flex items-end justify-start gap-8 mt-4">
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
                            <RiGridFill
                              fontSize={20}
                              className={"pointer-events-none"}
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
                  </div>

                  {/* Empty state placeholder */}
                  <div className="flex flex-col items-center justify-center text-center py-12 px-4 shadow-sm bg-white rounded-2xl border border-gray-100 w-full mb-4 mt-2">
                    <div className="w-14 h-14 rounded-full bg-gray-100 shadow-inner flex items-center justify-center mb-4 ring-1 ring-gray-200">
                      <RiGridFill className="text-2xl text-gray-400" />
                    </div>
                    {user?._id === userId ? (
                      <>
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          No posts yet
                        </h3>
                        <p className="text-gray-500 text-sm max-w-sm mb-5">
                          Share your first post and start building your profile.
                        </p>
                        <Link
                          to="/create"
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg px-5 py-2 transition-colors active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-sm"
                        >
                          Create a Post
                        </Link>
                      </>
                    ) : (
                      <>
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          Nothing here yet
                        </h3>
                        <p className="text-gray-500 text-sm max-w-xs">
                          {userObj?.name || "This user"} hasn't shared any posts
                          yet.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Rendering the outlet */}
                  <Outlet context={[userId]} />
                </div>

                {/* Right Column (Placeholder 1/3) */}
                <div className="hidden xl:block xl:col-span-1">
                  {/* Future sidebar content / Activity highlights */}
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
                <div className="fixed inset-0 bg-black/40 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <span
                        onClick={() => setEditModalState(false)}
                        className="absolute right-4 top-4 hover:text-red-500 transition-all cursor-pointer"
                      >
                        <MdOutlineCancel fontSize={18} />
                      </span>
                      <div className="bg-white px-4 pb-4 pt-6 sm:p-6 sm:pb-4">
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
                          <div className="mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
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
                      <div className="bg-gray-50 px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6">
                        <label
                          role="button"
                          htmlFor="changeprofileviadevice"
                          className="inline-flex w-full justify-center rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-all duration-150 active:scale-[0.98] sm:ml-3 sm:w-auto"
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
                          className="mt-4 inline-flex w-full justify-center rounded-lg bg-gray-100 hover:bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-all duration-150 active:scale-[0.98] sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )
      ) : (
        // Show redirect to log in and Signup if user not exist
        <>
          <div className="absolute w-4/5  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col flex-wrap">
            <div className={"font-semibold text-2xl lg:text-3xl text-gray-900"}>
              <span className="font-medium">Welcome Back</span>
              <span className="text-color-primary-blue">,</span>
              <br />
              You are not{" "}
              <span className="text-color-primary-blue font-fira font-bold">
                logged
              </span>{" "}
              in<span className="text-color-primary-blue font-bold">?</span>
              <Link
                to={"/login"}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 mt-4 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Login
              </Link>
            </div>
            <p className="mt-4 font-bold text-lg text-gray-400">or</p>
            <div className={"font-semibold text-2xl lg:text-3xl text-gray-900"}>
              <span className="font-medium text-xl lg:text-2xl">
                Don't have an{" "}
              </span>
              <span className="text-blue-600">Account</span>
              ?
              <br />
              <Link
                to={"/signup"}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 mt-4 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
