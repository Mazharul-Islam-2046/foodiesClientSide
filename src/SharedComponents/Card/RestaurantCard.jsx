import { useState, memo } from "react";
import { Star, MapPin } from "lucide-react";

const RestaurantCard = memo(({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  if (!item) return null;
  console.log(item?.address)
  console.log("restaurant", item);

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    // Placeholder calculation
    return 4.5;
  };

  const truncateText = (text, maxLength = 70) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : text.slice(0, maxLength).trim() + "...";
  };

  const rating = getAverageRating(item.reviews);

  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-md flex flex-col h-80">
      {/* Image section */}
      <div className="w-full h-36 relative">
        <img
          src={item.imageUrl || "/api/placeholder/400/320"}
          alt={item.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />
        
        {/* Cuisine badge */}
        {imageLoaded && item.cuisineType && (
          <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            {item.cuisineType}
          </span>
        )}
        
        {/* Favorite button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setFavorite(!favorite);
          }}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
        >
          {favorite ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#f97316" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>
      
      {/* Content section */}
      <div className="p-3 flex flex-col flex-1">
        {/* Restaurant name and rating */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">{item.name}</h3>
          {rating && (
            <div className="flex items-center">
              <Star size={14} fill="#10b981" color="#10b981" />
              <span className="text-sm ml-1 text-green-700">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        {/* Address */}
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{truncateText(item.address, 40)}</span>
        </div>
        
        {/* Categories */}
        {item.categories?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500">
              {item.categories.slice(0, 3).join(" • ")}
              {item.categories.length > 3 ? " • ..." : ""}
            </p>
          </div>
        )}
        
        {/* Description */}
        {item.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {truncateText(item.description)}
          </p>
        )}
        
        {/* Action button */}
        <div className="mt-auto">
          <button className="w-full py-2 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600 transition-colors">
            View Restaurant
          </button>
        </div>
      </div>
    </div>
  );
});

export default RestaurantCard;