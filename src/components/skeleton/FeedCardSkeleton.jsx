import Skeleton from "./Skeleton.jsx";

const FeedCardSkeleton = () => {
  return (
    <div className="w-full rounded-xl bg-white shadow-sm overflow-hidden">
      <Skeleton className="w-full aspect-[4/5]" />
      <div className="p-4 flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-3/4 h-3 rounded" />
          <Skeleton className="w-1/2 h-3 rounded" />
        </div>
      </div>
    </div>
  );
};

export default FeedCardSkeleton;
