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

  // Deterministic boot validation — cookie is the source of truth
  useEffect(() => {
    let isMounted = true;

    const validateSession = async () => {
      try {
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

  // Listener removed since AuthListener handles it globally

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
