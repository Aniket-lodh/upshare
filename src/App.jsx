import { RouterProvider } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import routes from "./routes/Routes";
import "./global.css";
import { Loader } from "./helpers/Loader.jsx";
import { UserContextProvider } from "./store/userContext";

function App() {
  localStorage.removeItem("user")
  // Set user Data
  localStorage.setItem(
    "user",
    JSON.stringify({
      status: "success",
      data: {
        _id: "109idx3a5j",
        name: "aniket lodh",
        email: "aniketlodh@gmail.co",
        photo: "user-avatar.jpg",
        location: "los angeles,ca",
      },
    })
  );

  return (
    <UserContextProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={routes} />
      </Suspense>
    </UserContextProvider>
  );
}

export default App;
