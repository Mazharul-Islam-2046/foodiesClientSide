// MenuItemPopup.jsx
import { X, Clock, Flame, Star, Heart } from "lucide-react";

const MenuItemPopup = ({ item, isOpen, onClose }) => {
  if (!item || !isOpen) return null;
  
  const formatPrice = (price) =>
    price ? `${parseInt(price).toFixed(2)}tk` : "Price unavailable";

  const getDietryBadge = (pref) => {
    const badgeClasses = {
      vegetarian: "bg-green-100 text-green-800",
      nonveg: "bg-red-100 text-red-800",
      vegan: "bg-emerald-100 text-emerald-800",
      glutenfree: "bg-blue-100 text-blue-800",
      dairyfree: "bg-purple-100 text-purple-800"
    };
    
    return (
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeClasses[pref] || ""}`}>
        {pref === "nonveg" ? "Non-Vegetarian" : 
         pref === "glutenfree" ? "Gluten-Free" :
         pref === "dairyfree" ? "Dairy-Free" : 
         pref.charAt(0).toUpperCase() + pref.slice(1)}
      </span>
    );
  };

  const getSpiceLevelIndicator = (level) => {
    const spiceLevels = {
      low: 1,
      mild: 2,
      medium: 3,
      spicy: 4,
      hot: 5
    };
    
    const count = spiceLevels[level] || 0;
    
    return (
      <div className="flex items-center gap-1">
        {Array(5).fill(0).map((_, i) => (
          <Flame 
            key={i} 
            size={16} 
            className={i < count ? "text-red-500" : "text-gray-300"} 
          />
        ))}
        <span className="text-xs ml-1 text-gray-600">
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      </div>
    );
  };

  const getPrepTimeIcon = (time) => {
    const timeLabels = {
      quick: "10-15 min",
      medium: "20-30 min",
      long: "30+ min"
    };
    
    return (
      <div className="flex items-center gap-1 text-gray-600">
        <Clock size={16} />
        <span className="text-xs">{timeLabels[time]}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      {/* Larger Popup Card */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden relative animate-in fade-in duration-300">
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 z-10 shadow-md"
          onClick={onClose}
        >
          <X size={24} className="text-gray-700" />
        </button>
        
        {/* Image - Taller */}
        <div className="w-full h-64 bg-gray-200 relative">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {item.healthy && (
            <span className="absolute top-4 left-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center shadow-md">
              <Heart size={16} className="mr-1" />
              Healthy Choice
            </span>
          )}
        </div>
        
        {/* Content - More padding */}
        <div className="p-8">
          {/* Header - Larger text */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
            <div className="text-2xl font-bold text-orange-500">{formatPrice(item.price)}</div>
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              {item.category || "Uncategorized"}
            </span>
            {item.dietryPreference && getDietryBadge(item.dietryPreference)}
          </div>
          
          {/* Description - Larger text */}
          <p className="text-gray-600 text-base mb-6 leading-relaxed">{item.description}</p>
          
          {/* Details - More spacing */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {item.spiceLevel && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500 mb-2">Spice Level</span>
                {getSpiceLevelIndicator(item.spiceLevel)}
              </div>
            )}
            {item.prepearationTime && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500 mb-2">Prep Time</span>
                {getPrepTimeIcon(item.prepearationTime)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 mb-2">Popularity</span>
              <div className="flex items-center gap-1">
                <Star size={20} className="text-amber-400 fill-amber-400" />
                <span className="text-base font-medium">{item.popularity || 0}</span>
                <span className="text-sm text-gray-500">({item.reviews?.length || 0} reviews)</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons - Larger */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all text-lg shadow-md">
              Add to Order
            </button>
            <button 
              className="py-3 px-6 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          
          {/* Additional Section for Reviews */}
          {item.reviews?.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold mb-2">Customer Reviews</h4>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.round(item.popularity) ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">Based on {item.reviews.length} reviews</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemPopup;