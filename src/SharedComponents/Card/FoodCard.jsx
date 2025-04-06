import { useState, memo } from "react";
import { Heart } from "lucide-react";

const FoodCard = memo(({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!item) return null;

  const formatPrice = (price) =>
    price ? `${parseInt(price).toFixed(2)}tk` : "Price unavailable";

  const truncateDescription = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : text.slice(0, maxLength).trim() + "... Details";
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-white shadow-md h-80 flex flex-col transform transition-shadow duration-300 hover:shadow-lg cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fixed size image container */}
      <div className="w-full h-32 flex-none overflow-hidden">
        <img
          src={item.imageUrl}
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
          <div className="absolute top-0 left-0 right-0 h-32 bg-black/25 px-3 pt-3 flex justify-between items-start">
            <p className="rounded-full bg-orange-500 px-4 py-1 text-sm font-semibold text-white">
              Price {formatPrice(item.price)}
            </p>
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors">
              <Heart
                color="#f97316"
                size={20}
                className="transform transition-transform hover:scale-110"
              />
            </button>
          </div>
        )}

        {/* shimmer while loading */}
        {!imageLoaded && (
          <div className="absolute top-0 left-0 right-0 h-32 bg-gray-100 animate-pulse" />
        )}
      </div>

      {/* Content area with explicit heights */}
      <div className="p-3 flex flex-col h-48">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {item.category || "Uncategorized"}
          </span>
          {item.healthy && (
            <span className="text-sm text-green-500 bg-green-100 px-2 py-1 rounded">
              Healthy
            </span>
          )}
        </div>
        
        {/* Title and rating */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-semibold">{item.name || "Unnamed Item"}</p>
          <span className="text-sm text-gray-500">⭐ {item.popularity || 0}%</span>
        </div>
        
        {/* Description - explicit height with overflow */}
        <div className="flex-1 overflow-hidden mb-2">
          <p className="text-sm">{truncateDescription(item.description)}</p>
        </div>
        
        {/* Button - absolutely positioned at bottom */}
        <div className="mt-auto">
          <button className="w-full py-2 rounded-xl bg-orange-500 text-white hover:bg-black transition-colors duration-300">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
});


export default FoodCard;