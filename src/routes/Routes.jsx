import React from "react";
import { createBrowserRouter, useRouteError } from "react-router-dom";

import PinDetails from "../pages/PinDetails.jsx";
const Home = React.lazy(() => import("../pages/Home"));
const Feed = React.lazy(() => import("../pages/Feed"));
const SearchUsers = React.lazy(() => import("../pages/search/Users.jsx"));
const SearchAll = React.lazy(() => import("../pages/search/All.jsx"));

const UserProfile = React.lazy(() => import("../pages/User/Userprofile"));
const UserPost = React.lazy(() => import("../pages/User/Post"));
const Search = React.lazy(() => import("../pages/Search"));

const Wishlist = React.lazy(() => import("../pages/Wishlist"));
const Categories = React.lazy(() => import("../pages/Categories"));
const Login = React.lazy(() => import("../pages/User/Login"));
const Signup = React.lazy(() => import("../pages/User/Signup"));

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
        children: [
          {
            path: "",
            element: <SearchAll />,
          },
          {
            path: "users",
            element: <SearchUsers />,
          },
        ],
      },
      {
        path: "/user",
        children: [
          {
            path: "profile/:userId/*",
            element: <UserProfile />,
            errorElement: <ErrorBoundary />,
            children: [
              {
                path: "",
                element: <UserPost />,
                errorElement: <ErrorBoundary />,
              },
              {
                path: "wishlists",
                element: <div>User all wishlisted posts</div>,
                errorElement: <ErrorBoundary />,
              },
            ],
          },
          {
            path: "pin/:pinId",
            element: <div>Pin Id</div>,
          },
        ],
      },
      {
        path: "/wishlist/user/:userId",
        element: <Wishlist />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/categories",
        element: <Categories />,
        errorElement: <ErrorBoundary />,
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
]);

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

export default router;
