import { useState, memo } from "react";
import { Star, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const RestaurantCard = memo(({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!item) return null;

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    // Placeholder calculation
    return 4.5;
  };

  const truncateText = (text, maxLength = 70) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : text.slice(0, maxLength).trim() + "... Details";
  };

  const rating = getAverageRating(item.reviews);

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-white shadow-md h-96 flex flex-col transform transition-shadow duration-300 hover:shadow-lg cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fixed size image container */}
      <div className="w-full h-40 flex-none overflow-hidden">
        <img
          src={item.imageUrl || "/api/placeholder/400/320"}
          alt={item.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`
            w-full h-full object-cover transition-transform duration-500 ease-out
            ${imageLoaded ? "opacity-100" : "opacity-0"}
            ${isHovered ? "scale-105" : "scale-100"}
          `}
        />

        {/* dark overlay + price/heart */}
        {imageLoaded && (
          <div className="absolute top-0 left-0 right-0 h-40 bg-black/25 px-3 pt-3 flex justify-between items-start">
            <p className="rounded-full bg-orange-500 px-4 py-1 text-sm font-semibold text-white">
              {item.cuisineType || "Restaurant"}
            </p>
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors">
              {favorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#f97316"
                    d="M11.566 21.112L12 20.5za.75.75 0 0 0 .867 0L12 20.5l.434.612l.008-.006l.021-.015l.08-.058q.104-.075.295-.219a38.5 38.5 0 0 0 4.197-3.674c1.148-1.168 2.315-2.533 3.199-3.981c.88-1.44 1.516-3.024 1.516-4.612c0-1.885-.585-3.358-1.62-4.358c-1.03-.994-2.42-1.439-3.88-1.439c-1.725 0-3.248.833-4.25 2.117C10.998 3.583 9.474 2.75 7.75 2.75c-3.08 0-5.5 2.639-5.5 5.797c0 1.588.637 3.171 1.516 4.612c.884 1.448 2.051 2.813 3.199 3.982a38.5 38.5 0 0 0 4.492 3.892l.08.058l.021.015z"
                  />
                </svg>
              ) : (
                <Heart
                  color="#f97316"
                  size={20}
                  className="transform transition-transform hover:scale-110"
                  onClick={() => setFavorite(true)}
                />
              )}
            </button>
          </div>
        )}

        {/* shimmer while loading */}
        {!imageLoaded && (
          <div className="absolute top-0 left-0 right-0 h-32 bg-gray-100 animate-pulse" />
        )}
      </div>

      {/* Content area with explicit heights */}
      <div className="p-3 flex flex-col h-56">
        {/* Restaurant name and Tags */}
        <div className="flex justify-between items-left mb-2">
          <p className="text-lg font-semibold">
            {item.name || "Unnamed Restaurant"}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {item.categories?.length > 0 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hidden sm:block">
                {item.categories[0] || "Uncategorized"}
              </span>
            )}
            {rating && (
              <span className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded">
                ⭐ {rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>

        {/* Title and rating */}

        <span className="text-sm text-gray-500 mb-3">
          <MapPin size={14} className="inline mr-1" />
          {item.address || "Unknown Address"}
        </span>

        {/* Description - explicit height with overflow */}
        <div className="flex-1 overflow-hidden mb-2">
          <p className="text-sm">{truncateText(item.description)}</p>
        </div>

        {/* Button - matching the FoodCard style */}
        <div className="mt-auto flex gap-2">
          <Link to={`/restaurant/${item._id}`} className="text-center flex-1 py-3 rounded-xl bg-orange-500 text-white hover:bg-black transition-colors duration-300">
            View Restaurant
          </Link>
        </div>
      </div>
    </div>
  );
});

export default RestaurantCard;
