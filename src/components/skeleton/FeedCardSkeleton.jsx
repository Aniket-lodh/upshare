import Skeleton from "./Skeleton.jsx";

const FeedCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>

      <Skeleton className="w-full h-64 rounded-lg" />

      <div className="space-y-2">
        <Skeleton className="w-3/4 h-3" />
        <Skeleton className="w-1/2 h-3" />
      </div>
    </div>
  );
};

export default FeedCardSkeleton;
