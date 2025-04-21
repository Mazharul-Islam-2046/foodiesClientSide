const RestaurantCardSkeleton = () => {
    return (
      <div className="h-96 rounded-2xl overflow-hidden bg-white shadow-md">
        {/* Image skeleton */}
        <div className="h-40 bg-gray-200 animate-pulse"></div>
        
        {/* Content skeleton */}
        <div className="p-4 space-y-3">
          {/* Title and rating */}
          <div className="flex justify-between">
            <div className="h-7 w-36 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-7 w-16 rounded bg-gray-200 animate-pulse"></div>
          </div>
          
          {/* Categories */}
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-14 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Address and phone */}
          <div className="space-y-2">
            <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Description lines */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 pt-3">
            <div className="h-10 flex-1 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RestaurantCardSkeleton;