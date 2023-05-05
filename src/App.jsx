import { RouterProvider } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import routes from "./routes/Routes";
import "./global.css";
import { Loader } from "./helpers/Loader.jsx";
import { UserContextProvider } from "./store/userContext";

function App() {

  return (
    <UserContextProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={routes} />
      </Suspense>
    </UserContextProvider>
  );
}

export default App;
