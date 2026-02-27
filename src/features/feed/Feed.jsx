import { useEffect, useRef, useState } from "react";
import { Outlet, useMatch, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getFeed } from "../../api/post.js";
import Pins from "../../components/Pins";
import FeedCardSkeleton from "../../components/skeleton/FeedCardSkeleton.jsx";
import { Spinner } from "../../helpers/Loader.jsx";
import ErrorState from "../../components/ErrorState.jsx";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [renderChildren, setRenderChildren] = useState(false);
  const checkHomeRoute = useMatch("/");
  const location = useLocation();
  const abortRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (checkHomeRoute) {
      setRenderChildren(false);
    }
  }, [checkHomeRoute]);

  const fetchFeed = async (pageNumber = 1, signal) => {
    try {
      if (pageNumber === 1) setLoading(true);
      setError(null);
      const res = await getFeed(pageNumber, signal);
      if (signal?.aborted) return;

      const { posts: newPosts, pagination } = res;
      const items = Array.isArray(newPosts) ? newPosts : [];

      if (pageNumber === 1) {
        setPosts(items);
      } else {
        setPosts((prev) => [...prev, ...items]);
      }

      setHasMore(pageNumber < pagination.pages);
    } catch (err) {
      if (err.name === "CanceledError" || signal?.aborted) return;
      setError(err?.message || "Failed to load feed.");
    } finally {
      if (pageNumber === 1 && !signal?.aborted) setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    fetchFeed(1, controller.signal);
    setPage(1);

    return () => controller.abort();
  }, []);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    if (!hasMore || isFetchingMore) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          setIsFetchingMore(true);
          const nextPage = page + 1;
          await fetchFeed(nextPage);
          setPage(nextPage);
          setIsFetchingMore(false);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [page, hasMore, isFetchingMore]);

  // Optimistic feed update — prepend new post passed via navigation state
  useEffect(() => {
    if (location.state?.newPost) {
      setPosts((prev) => [location.state.newPost, ...prev]);
      window.history.replaceState({}, "");
    }
  }, [location.state?.newPost]);

  return (
    <>
      <Helmet>
        <title>UpShare — Discover & Share Ideas</title>
        <meta
          name="description"
          content="Discover, create, and share visual ideas with a creative community on UpShare."
        />
      </Helmet>

      {/* Feed content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-4">
        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <FeedCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState
            title="Failed to load feed"
            description={error}
            actionText="Retry"
            onAction={() => window.location.reload()}
          />
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
            <div className="w-20 h-20 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <RiImageAddLine className="text-5xl text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No posts yet
            </h2>
            <p className="text-gray-500 text-sm max-w-sm">
              Be the first to share something inspiring with the community.
            </p>
            <Link
              to="/create"
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:overflow-y-auto">
              {posts.map((item) => (
                <Pins
                  key={item._id}
                  pin={item}
                  setRenderChildren={setRenderChildren}
                />
              ))}
            </div>

            {/* Observer sentinel and loading skeleton */}
            {isFetchingMore && (
              <div className="grid gap-6 py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FeedCardSkeleton key={`loading-${i}`} />
                ))}
              </div>
            )}

            {hasMore && <div ref={observerRef} className="h-10 w-full" />}
          </>
        )}
      </div>

      {/* PinDetails overlay */}
      <section
        className={`${
          renderChildren ? "left-0 lg:top-0" : "left-full lg:top-full"
        } flex justify-center top-0 lg:left-0 fixed bg-white w-screen h-screen z-30 transition-all overflow-y-auto lg:bg-gray-500/50`}
      >
        <div className="w-auto h-full bg-white lg:w-[calc(100%-50%)]">
          <Outlet context={[renderChildren, setRenderChildren]} />
        </div>
      </section>

      {/* Create post FAB */}
      <div className="fixed bottom-3 right-3">
        <Link
          to="/create"
          title="Create Post"
          className="flex items-center justify-center rounded-full bg-color-primary-blue text-white p-4 drop-shadow-2xl hover:opacity-90 transition-opacity"
        >
          <AiOutlinePlus fontSize={24} />
        </Link>
      </div>
    </>
  );
};

export default Feed;
