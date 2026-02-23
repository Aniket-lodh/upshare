import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../store/userContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
