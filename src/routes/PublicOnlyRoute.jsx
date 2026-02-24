import { Navigate } from "react-router-dom";
import { useUser } from "../store/userContext.jsx";
import { Loader } from "../helpers/Loader.jsx";

const PublicOnlyRoute = ({ children }) => {
  const { user, authLoading } = useUser();

  if (authLoading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
