import { useState, memo } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { createPortal } from "react-dom";
import MenuItemPopup from "./MenuItemPopup";
import { useCart } from "../../providers/CartContext/CartContext.jsx"

const FoodCard = memo(({ item }) => {
  const [favourite, setFavourite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { addItem } = useCart();

  if (!item) return null;

  const formatPrice = (price) =>
    price ? `${parseInt(price).toFixed(2)}tk` : "Price unavailable";

  const truncateDescription = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : text.slice(0, maxLength).trim() + "... Details";
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(item);
  };

  return (
    <>
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
                {
                  favourite ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#f97316" d="M11.566 21.112L12 20.5za.75.75 0 0 0 .867 0L12 20.5l.434.612l.008-.006l.021-.015l.08-.058q.104-.075.295-.219a38.5 38.5 0 0 0 4.197-3.674c1.148-1.168 2.315-2.533 3.199-3.981c.88-1.44 1.516-3.024 1.516-4.612c0-1.885-.585-3.358-1.62-4.358c-1.03-.994-2.42-1.439-3.88-1.439c-1.725 0-3.248.833-4.25 2.117C10.998 3.583 9.474 2.75 7.75 2.75c-3.08 0-5.5 2.639-5.5 5.797c0 1.588.637 3.171 1.516 4.612c.884 1.448 2.051 2.813 3.199 3.982a38.5 38.5 0 0 0 4.492 3.892l.08.058l.021.015z"/></svg>
                  ) : (
                    <Heart
                      color="#f97316"
                      size={20}
                      className="transform transition-transform hover:scale-110"
                      onClick={() => setFavourite(true)}
                    />
                  )
                }
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
          <div className="mt-auto flex gap-2">
            <button 
              className="flex-1 py-2 rounded-xl bg-orange-500 text-white hover:bg-black transition-colors duration-300"
              onClick={() => setIsPopupOpen(true)}
            >
              View Details
            </button>
            <button 
              className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-300"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Use React Portal to render the popup outside of the slider constraints */}
      {isPopupOpen && createPortal(
        <MenuItemPopup 
          item={item} 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)} 
        />,
        document.body
      )}
    </>
  );
});

export default FoodCard;