import { Link } from "react-router-dom";
import { RiHome4Line } from "react-icons/ri";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-white px-4">
      <h1 className="text-8xl font-bold text-gray-200 mb-2 select-none">404</h1>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Page not found
      </h2>
      <p className="text-gray-500 text-sm max-w-sm mb-6">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        <RiHome4Line fontSize={18} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
