import Skeleton from "./Skeleton.jsx";

const ProfileSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="w-full h-40 rounded-xl" />

      <div className="flex items-center gap-4">
        <Skeleton className="w-24 h-24 rounded-full -mt-12 border-4 border-white" />
        <div className="space-y-2">
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-24 h-3" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-32 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
