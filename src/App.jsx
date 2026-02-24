import { RouterProvider } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import routes from "./routes/Routes";
import "./global.css";
import { Loader } from "./helpers/Loader.jsx";
import { UserContextProvider, useUser } from "./store/userContext";
import { ToastProvider, useToast } from "./components/Toast.jsx";
import { getMe } from "./api/userProfile";

function AuthValidator({ children }) {
  const { addUser, removeUser, setAuthLoading } = useUser();
  const showToast = useToast();

  // Deterministic boot validation
  useEffect(() => {
    let isMounted = true;

    const validateSession = async () => {
      try {
        const stored = localStorage.getItem("curUser");

        if (!stored) {
          if (isMounted) setAuthLoading(false);
          return;
        }

        const user = await getMe();

        if (isMounted) addUser(user);
      } catch {
        if (isMounted) removeUser();
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    };

    validateSession();

    return () => {
      isMounted = false;
    };
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
