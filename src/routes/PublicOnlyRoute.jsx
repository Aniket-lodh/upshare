import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../store/userContext.jsx";
import { Loader } from "../helpers/Loader.jsx";

const PublicOnlyRoute = () => {
  const { user, authLoading } = useUser();

  if (authLoading) {
    return (
      <div className="flex justify-center items-center fixed inset-0 z-50 bg-white/50 backdrop-blur-sm">
        <Loader />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
