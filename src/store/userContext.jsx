import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserContextProvider");
  return ctx;
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("curUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setAuthLoading(false);
  }, []);

  function addUser(userData) {
    setUser(userData);
    localStorage.setItem("curUser", JSON.stringify(userData));
  }

  function removeUser() {
    setUser(null);
    localStorage.removeItem("curUser");
  }

  const value = {
    user,
    authLoading,
    isAuthenticated: !!user,
    addUser,
    removeUser,
    setAuthLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
