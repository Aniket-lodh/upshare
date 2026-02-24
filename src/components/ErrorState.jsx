import { RiErrorWarningLine } from "react-icons/ri";

const ErrorState = ({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  actionText = "Try Again",
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[50vh] px-4">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <RiErrorWarningLine className="text-3xl text-red-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      {description && (
        <p className="text-gray-500 text-sm max-w-sm mb-1">{description}</p>
      )}
      {onAction && (
        <button
          onClick={onAction}
          className="mt-5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg px-5 py-2.5 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
