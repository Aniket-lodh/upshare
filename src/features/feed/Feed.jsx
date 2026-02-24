import { useEffect, useRef, useState } from "react";
import { Outlet, useMatch, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getFeed } from "../../api/post.js";
import Pins from "../../components/Pins";
import SkeletonCard from "../../components/SkeletonCard.jsx";
import { Spinner } from "../../helpers/Loader.jsx";
import ErrorState from "../../components/ErrorState.jsx";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [renderChildren, setRenderChildren] = useState(false);
  const checkHomeRoute = useMatch("/");
  const location = useLocation();
  const abortRef = useRef(null);

  useEffect(() => {
    if (checkHomeRoute) {
      setRenderChildren(false);
    }
  }, [checkHomeRoute]);

  // Fetch feed from API with AbortController
  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchFeed = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFeed(1, controller.signal);
        if (controller.signal.aborted) return;
        const items = Array.isArray(data) ? data : [];
        setPosts(items);
        setHasMore(items.length >= 10);
        setPage(1);
      } catch (err) {
        if (err.name === "CanceledError" || controller.signal.aborted) return;
        setError(err?.message || "Failed to load feed.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    fetchFeed();

    return () => controller.abort();
  }, []);

  // Load more pages
  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await getFeed(nextPage);
      const items = Array.isArray(data) ? data : [];
      setPosts((prev) => [...prev, ...items]);
      setPage(nextPage);
      setHasMore(items.length >= 10);
    } catch (err) {
      setError(err?.message || "Failed to load more.");
    } finally {
      setLoadingMore(false);
    }
  };

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
          <div className="grid gap-6 py-2 grid-cols-2 auto-cols-min auto-rows-min sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
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
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <RiImageAddLine
                fontSize={28}
                className="text-color-primary-blue"
              />
            </div>
            <h2 className="text-lg font-semibold text-color-font-primary">
              No posts yet
            </h2>
            <p className="text-center text-color-font-tertiary text-sm max-w-xs">
              Be the first to share something with the community!
            </p>
            <Link
              to="/create"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 py-2 grid-cols-2 auto-cols-min auto-rows-min sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:overflow-y-auto">
              {posts.map((item) => (
                <Pins
                  key={item._id}
                  pin={item}
                  setRenderChildren={setRenderChildren}
                />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center py-4">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {loadingMore ? <Spinner /> : "Load More"}
                </button>
              </div>
            )}
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
