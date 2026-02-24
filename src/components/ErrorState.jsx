import { RiErrorWarningLine } from "react-icons/ri";

const ErrorState = ({
  title = "Something went wrong",
  description = "",
  actionText = "Go Back",
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 gap-3">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
        <RiErrorWarningLine fontSize={28} className="text-red-500" />
      </div>
      <h2 className="text-lg font-semibold text-color-font-primary">{title}</h2>
      {description && (
        <p className="text-color-font-tertiary text-sm text-center max-w-xs">
          {description}
        </p>
      )}
      {onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2 rounded-lg bg-color-primary-blue text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
