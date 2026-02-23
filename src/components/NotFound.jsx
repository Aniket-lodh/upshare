import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Page not found. The page you're looking for doesn't exist or has been
        moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-lg bg-color-primary-blue text-white font-medium hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
