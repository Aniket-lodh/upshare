import { RouterProvider } from "react-router-dom";
import React, { Suspense, useContext, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import routes from "./routes/Routes";
import "./global.css";
import { Loader } from "./helpers/Loader.jsx";
import { UserContextProvider } from "./store/userContext";
import { ToastProvider, useToast } from "./components/Toast.jsx";
import UserContext from "./store/userContext";
import { getMe } from "./api/userProfile";

function AuthValidator({ children }) {
  const { user, addUser, removeUser } = useContext(UserContext);
  const showToast = useToast();

  // Validate stored session on mount
  useEffect(() => {
    if (!user) return;
    getMe()
      .then((data) => {
        if (data) addUser(data);
      })
      .catch(() => {
        removeUser();
      });
  }, []);

  // Listen for 401 unauthorized events from axios interceptor
  useEffect(() => {
    const handler = (e) => {
      removeUser();
      showToast(e.detail?.message || "Session expired", "error");
    };
    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, []);

  return children;
}

function App() {
  return (
    <HelmetProvider>
      <UserContextProvider>
        <ToastProvider>
          <AuthValidator>
            <Suspense fallback={<Loader />}>
              <RouterProvider router={routes} />
            </Suspense>
          </AuthValidator>
        </ToastProvider>
      </UserContextProvider>
    </HelmetProvider>
  );
}

export default App;
