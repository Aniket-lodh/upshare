import React from "react";
import { createBrowserRouter, useRouteError } from "react-router-dom";

import PinDetails from "../pages/PinDetails.jsx";
import EditProfile from "../pages/User/Profile/EditProfile.jsx";

// import SearchAll from "../pages/search/All.jsx";
// import SearchUsers from "../pages/search/Users.jsx";
// TODO: //FIX searchAll and searchUser import

const Home = React.lazy(() => import("../pages/Home"));
const Feed = React.lazy(() => import("../pages/Feed"));

const UserProfile = React.lazy(() =>
  import("../pages/User/Profile/Userprofile.jsx")
);
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
        // children: [
        //   {
        //     path: "",
        //     element: <SearchAll />,
        //   },
        //   {
        //     path: "users",
        //     element: <SearchUsers />,
        //   },
        // ],
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
            element: <EditProfile />,
            errorElement: <ErrorBoundary />,
          },
          // TODO:FIX  Routing of proper user
          // {
          //   path: "profile",
          //   errorElement: <ErrorBoundary />,
          //   children: [
          //     {
          //       path: "me",
          //       errorElement: <ErrorBoundary />,

          //       element: <div>Logged In Profile</div>,
          //     },
          //     {
          //       path: ":userId",
          //       errorElement: <ErrorBoundary />,

          //       element: <div>User Id profile</div>,
          //     },
          //   ],
          // },
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
