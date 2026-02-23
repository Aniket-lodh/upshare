import React from "react";
import { createBrowserRouter, useRouteError, Link } from "react-router-dom";

import PinDetails from "../features/feed/PinDetails.jsx";
import CreatePost from "../features/feed/CreatePost.jsx";
import EditProfile from "../features/profile/EditProfile.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
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
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Something went wrong
      </h1>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-lg bg-color-primary-blue text-white font-medium hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}

export default router;
