import React from "react";
import { createBrowserRouter, useRouteError } from "react-router-dom";

import Home from "../pages/Home";
import Feed from "../pages/Feed";
import { Loader } from "../helpers/Loader.jsx";
import PinDetails from "../pages/PinDetails.jsx";

const UserProfile = React.lazy(() => import("../pages/User/Userprofile"));
const UserPost = React.lazy(() => import("../pages/User/Post"));
const Search = React.lazy(() => import("../pages/Search"));
const Wishlist = React.lazy(() => import("../pages/Wishlist"));
const Categories = React.lazy(() => import("../pages/Categories"));
const SearchAll = React.lazy(() => import("../pages/search/all"));
const SearchUsers = React.lazy(() => import("../pages/search/users"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: Loader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Feed />,
        loader: Loader,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "pins/:pinId",
            element: <PinDetails />,
            loader: Loader,
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
            loader: Loader,
            element: <SearchAll />,
          },
          {
            path: "users",
            loader: Loader,
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
            loader: Loader,
            errorElement: <ErrorBoundary />,
            children: [
              {
                path: "",
                element: <UserPost />,
                loader: Loader,
                errorElement: <ErrorBoundary />,
              },
              {
                path: "wishlists",
                element: <div>User all wishlisted posts</div>,
                loader: Loader,
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
        path: "/login",
        element: <div>Login component</div>,
        loader: Loader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/wishlist/user/:userId",
        element: <Wishlist />,
        loader: Loader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/categories",
        element: <Categories />,
        loader: Loader,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

export default router;
