import {
  Link,
  useOutletContext,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  RiCloseCircleLine,
  RiHeart2Line,
  RiThumbUpLine,
  RiChat3Line,
  RiShareLine,
  RiHeartFill,
  RiDeleteBin6Line,
} from "react-icons/ri";

import {
  getPostById,
  likePost,
  unlikePost,
  deletePost,
} from "../../api/post.js";
import { useUser } from "../../store/userContext.jsx";
import { SkeletonPostDetail } from "../../components/SkeletonCard.jsx";
import { useToast } from "../../components/Toast.jsx";
import ErrorState from "../../components/ErrorState.jsx";

const PinDetails = () => {
  const [renderPostDetails, setRenderPostDetails] = useOutletContext();
  const [pin, setPin] = useState(null);
  const [pinSaved, setSavedPin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const { pinId } = useParams();
  const showToast = useToast();
  const abortRef = useRef(null);

  // Fetch post data from API with AbortController
  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        setRenderPostDetails(true);
        const data = await getPostById(pinId, controller.signal);
        const postData = data?.data || data;
        setPin(postData);
        if (postData && user?._id) {
          const liked = (postData.likes || []).some(
            (item) => (item._id || item) === user._id
          );
          setSavedPin(liked);
        }
      } catch (err) {
        if (err.name === "CanceledError" || controller.signal.aborted) return;
        setError(err?.message || "Failed to load post.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    fetchPost();

    return () => controller.abort();
  }, [pinId]);

  // Native relative-time formatter
  const timeAgo = (unixSeconds) => {
    const seconds = Math.floor(Date.now() / 1000 - Number(unixSeconds));
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const intervals = [
      ["year", 31536000],
      ["month", 2592000],
      ["week", 604800],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
      ["second", 1],
    ];
    for (const [unit, value] of intervals) {
      const count = Math.floor(seconds / value);
      if (count >= 1) return rtf.format(-count, unit);
    }
    return rtf.format(0, "second");
  };

  // Toggle like/unlike with auth guard + loading guard + optimistic update
  const toggleWishlist = async () => {
    if (likeLoading) return;
    if (!user?._id) {
      navigate("/login");
      return;
    }
    if (!pin) return;

    const wasSaved = pinSaved;
    setSavedPin(!wasSaved);
    setLikeLoading(true);
    try {
      if (wasSaved) {
        await unlikePost(pinId);
      } else {
        await likePost(pinId);
      }
    } catch (err) {
      setSavedPin(wasSaved);
      showToast("Like action failed.", "error");
    } finally {
      setLikeLoading(false);
    }
  };

  // Delete post (owner only)
  const handleDelete = async () => {
    if (deleting) return;
    try {
      setDeleting(true);
      await deletePost(pinId);
      showToast("Post deleted.");
      setRenderPostDetails(false);
      navigate("/", { replace: true });
    } catch (err) {
      showToast("Failed to delete post.", "error");
    } finally {
      setDeleting(false);
    }
  };

  // Share post
  async function sharePost() {
    try {
      await navigator.share({
        title: pin?.author?.name,
        text: pin?.caption,
        url: window.location.href,
      });
    } catch {
      // User cancelled or share not supported
    }
  }

  const isOwner = user?._id && pin?.author?._id && user._id === pin.author._id;

  if (loading) {
    return <SkeletonPostDetail />;
  }

  if (error) {
    return (
      <ErrorState
        title="Post not found"
        description={error}
        actionText="Go Back"
        onAction={() => {
          navigate("/");
          setRenderPostDetails(false);
        }}
      />
    );
  }

  if (!pin) return null;

  return (
    <>
      <div className="px-2 py-3.5 bg-white">
        <div className="border border-color-border-primary rounded-lg pb-4 overflow-hidden">
          {/* Post creator headings */}
          <div className="relative w-full flex items-center justify-between px-4 py-2 bg-color-bg-tertiary">
            <Link
              to={`/user/profile/${pin?.author?._id}`}
              className="flex gap-1.5 items-end justify-center"
            >
              <img
                src={`${pin?.author?.profilephoto}`}
                className="w-9 h-9 rounded-full object-contain"
                alt={`${pin?.author?.username || "user"}-profile-picture`}
              />
              <div className="flex flex-col items-start justify-start">
                <h2 className="capitalize text-color-font-primary">
                  {pin?.author?.name}
                </h2>
                <small className="font-fira font-light text-color-font-tertiary tracking-wide text-xs">
                  @{pin?.author?.username}
                </small>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              {/* Delete button (owner only) */}
              {isOwner && (
                <button
                  title="Delete post"
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="p-1 rounded-full bg-white text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <RiDeleteBin6Line fontSize={17} />
                </button>
              )}
              {/* Close button */}
              <button
                title="close-pin-details"
                type="button"
                onClick={() => {
                  navigate("/");
                  setRenderPostDetails(false);
                }}
                className="p-1 rounded-full bg-white"
              >
                <RiCloseCircleLine
                  className="select-none pointer-events-none"
                  fontSize={17}
                />
              </button>
            </div>
          </div>

          {/* Post content */}
          <div className="px-4 h-full">
            <p className="mt-3 break-words text-color-font-secondary font-normal text-base">
              {pin?.caption}
            </p>
            {pin?.image && (
              <div className="w-full h-fit mt-3 overflow-hidden">
                <img
                  src={pin.image}
                  className="w-full h-fit object-contain rounded-lg"
                  alt={`${pin?.author?.username || "user"}-uploaded-picture`}
                />
              </div>
            )}
            {/* Post metadata */}
            <div className="mt-3 font-normal flex flex-col w-full gap-2 items-start justify-start text-color-font-secondary font-fira text-sm">
              <p>
                {pin?.createdAt && (
                  <>
                    {`${timeAgo(pin.createdAt)} •`}
                    <span className="font-semibold"> {pin?.views || 0} </span>
                    views
                  </>
                )}
              </p>
              <p>
                <span className="font-semibold">
                  {" "}
                  {pin?.likes?.length || 0}{" "}
                </span>
                likes •
                <span className="font-semibold">
                  {" "}
                  {pin?.comments?.length || 0}{" "}
                </span>
                comments
              </p>
            </div>
            {/* Post interactions */}
            <div className="pt-2 mt-3 flex items-center justify-between text-color-font-secondary border-t">
              <div className="flex items-center justify-start gap-4 pl-3">
                <RiThumbUpLine fontSize={24} />
                <RiChat3Line fontSize={24} />
              </div>
              <div className="flex items-center justify-start gap-4 pl-3">
                {pinSaved ? (
                  <RiHeartFill
                    fontSize={24}
                    color="#ef4444"
                    onClick={toggleWishlist}
                    className={`cursor-pointer ${
                      likeLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  />
                ) : (
                  <RiHeart2Line
                    fontSize={24}
                    onClick={toggleWishlist}
                    className={`cursor-pointer ${
                      likeLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  />
                )}
                <RiShareLine
                  fontSize={24}
                  onClick={sharePost}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Comments placeholder */}
        <div className="w-full mt-4 flex flex-col items-center justify-center">
          <h2 className="font-bold text-base text-color-font-primary">
            No comments
          </h2>
          <p className="text-color-font-tertiary tracking-wide text-sm">
            Add one to start the conversation
          </p>
        </div>
      </div>
    </>
  );
};

export default PinDetails;
