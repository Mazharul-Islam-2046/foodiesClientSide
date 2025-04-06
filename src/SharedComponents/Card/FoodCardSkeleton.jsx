const FoodCardSkeleton = () => {
  return (
    <>
      <div
        className="max-w-80 rounded-2xl overflow-hidden bg-white shadow-md pb-3"
      >
        <div className="h-32 bg-gray-200 animate-pulse"></div>
        <div className="p-3 space-y-3">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default FoodCardSkeleton;
