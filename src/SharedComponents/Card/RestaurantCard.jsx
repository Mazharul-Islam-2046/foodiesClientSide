'use client';

import { Clock, Heart, MapPin, Truck } from 'lucide-react';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = memo(({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  if (!item) return null;

  const handleCardClick = () => {
    // Navigate to restaurant page
    if (item?._id) {
      navigate(`/restaurant/${item._id}`);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    setFavorite(!favorite);
  };

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    // Placeholder calculation
    return 4.5;
  };

  const truncateText = (text, maxLength = 70) => {
    if (!text) return '';
    return text.length <= maxLength ? text : text.slice(0, maxLength).trim() + '... Details';
  };

  const rating = getAverageRating(item.reviews);

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Large Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={item.imageUrl || '/api/placeholder/400/320'}
          alt={item.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`
      w-full h-full object-cover object-center transition-opacity duration-300
      ${imageLoaded ? 'opacity-100' : 'opacity-0'}
    `}
        />

        {/* Hover overlay effect instead of scaling */}
        <div
          className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Cuisine Type Badge - Top Left */}
        <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {item.cuisineType || 'Restaurant'}
        </div>

        {/* Ad Label - Bottom Right */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          Ad
        </div>

        {/* Favorite Button - Top Right */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          onClick={handleFavoriteClick}
        >
          {favorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#f97316"
                d="M11.566 21.112L12 20.5za.75.75 0 0 0 .867 0L12 20.5l.434.612l.008-.006l.021-.015l.08-.058q.104-.075.295-.219a38.5 38.5 0 0 0 4.197-3.674c1.148-1.168 2.315-2.533 3.199-3.981c.88-1.44 1.516-3.024 1.516-4.612c0-1.885-.585-3.358-1.62-4.358c-1.03-.994-2.42-1.439-3.88-1.439c-1.725 0-3.248.833-4.25 2.117C10.998 3.583 9.474 2.75 7.75 2.75c-3.08 0-5.5 2.639-5.5 5.797c0 1.588.637 3.171 1.516 4.612c.884 1.448 2.051 2.813 3.199 3.982a38.5 38.5 0 0 0 4.492 3.892l.08.058l.021.015z"
              />
            </svg>
          ) : (
            <Heart
              color="#666"
              size={18}
              className="transform transition-transform hover:scale-110"
            />
          )}
        </button>

        {/* Loading shimmer */}
        {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Restaurant Name and Categories */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1 line-clamp-1">
            {item.name || 'Unnamed Restaurant'}
          </h3>
          <div className="flex flex-wrap gap-1 ml-2">
            {item.categories?.length > 0 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {item.categories[0] || 'Uncategorized'}
              </span>
            )}
            {rating && (
              <span className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded">
                ⭐ {rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{item.address || 'Unknown Address'}</span>
        </div>

        {/* Description */}
        <div className="mb-3">
          <p className="text-sm text-gray-700 line-clamp-2">{truncateText(item.description)}</p>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>20-35 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck size={14} />
            <span>Tk18</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RestaurantCard;
