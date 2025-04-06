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
      className="relative max-w-80 rounded-2xl overflow-hidden bg-white shadow-md pb-3 h-full flex flex-col transform transition-shadow duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative h-32 w-full overflow-hidden">
        {/* actual <img> */}
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
          <div className="absolute inset-0 bg-black/25 px-3 pt-3 flex justify-between items-start">
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
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>

      {/* Text/content */}
      <div className="flex-grow px-3 space-y-5 flex flex-col">
        <div className="pt-3 flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {item.category || "Uncategorized"}
          </span>
          {item.healthy && (
            <span className="text-sm text-green-500 bg-green-100 px-2 py-1 rounded">
              Healthy
            </span>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl font-semibold">{item.name || "Unnamed Item"}</p>
            <span className="text-sm text-gray-500">⭐ {item.popularity || 0}%</span>
          </div>
          <p className="text-sm mb-3">{truncateDescription(item.description)}</p>
        </div>
        <button className="mt-auto w-full py-2 rounded-xl bg-orange-500 text-white hover:bg-black transition-colors duration-300">
          Order Now
        </button>
      </div>
    </div>
  );
});

FoodCard.displayName = "FoodCard";
export default FoodCard;
