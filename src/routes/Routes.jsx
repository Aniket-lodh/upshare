import React from "react";
import { createBrowserRouter, useRouteError, Link } from "react-router-dom";

import PinDetails from "../features/feed/PinDetails.jsx";
import CreatePost from "../features/feed/CreatePost.jsx";
import EditProfile from "../features/profile/EditProfile.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicOnlyRoute from "./PublicOnlyRoute.jsx";
import NotFound from "../components/NotFound.jsx";

const Home = React.lazy(() => import("../pages/Home"));
const Feed = React.lazy(() => import("../features/feed/Feed"));
const UserProfile = React.lazy(() =>
  import("../features/profile/UserProfile.jsx")
);
const Search = React.lazy(() => import("../pages/Search"));
const Login = React.lazy(() => import("../features/auth/Login"));
const Signup = React.lazy(() => import("../features/auth/Signup"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Feed />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "pins/:pinId",
            element: <PinDetails />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
      {
        path: "/search",
        element: <Search />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/create",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/user",
        children: [
          {
            path: "profile/:userId",
            element: <UserProfile />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "profile/:userId/edit",
            element: (
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            ),
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: (
      <PublicOnlyRoute>
        <Signup />
      </PublicOnlyRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-white px-4">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <span className="text-3xl">⚠️</span>
      </div>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h1>
      <p className="text-gray-500 text-sm mb-6 max-w-sm">
        {error?.statusText ||
          error?.message ||
          "An unexpected error occurred. Please try again."}
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Go Home
      </Link>
    </div>
  );
}

export default router;
