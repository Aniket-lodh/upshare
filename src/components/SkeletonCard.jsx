const SkeletonCard = () => {
  return (
    <div className="grid self-center justify-self-center flex-auto min-w-150 max-w-160 h-fit rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="w-full flex flex-col items-start justify-start">
        {/* Image placeholder — matches aspect-[4/5] */}
        <div className="w-full aspect-[4/5] bg-gray-200 rounded-t-xl" />
        {/* Profile row — matches author row gap-3, w-8 h-8 */}
        <div className="w-full px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-200" />
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-3 w-24 rounded bg-gray-200" />
            <div className="h-2.5 w-16 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonPostDetail = () => {
  return (
    <div className="px-2 py-3.5 animate-pulse">
      <div className="border border-color-border-primary rounded-xl pb-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-color-bg-tertiary">
          <div className="w-9 h-9 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-1">
            <div className="h-3.5 w-28 rounded bg-gray-200" />
            <div className="h-2.5 w-20 rounded bg-gray-200" />
          </div>
        </div>
        {/* Body */}
        <div className="px-4 mt-3 space-y-3">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-3/4 rounded bg-gray-200" />
          <div className="w-full h-48 rounded-xl bg-gray-200" />
          <div className="h-3 w-1/3 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
