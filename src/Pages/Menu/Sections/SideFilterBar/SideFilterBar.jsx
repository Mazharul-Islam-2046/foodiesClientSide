// SideFilterBar.jsx
import { useState, useEffect } from 'react';

const SideFilterBar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' });
  const [isHealthy, setIsHealthy] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // New filter states
  const [rating, setRating] = useState(0);
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
  });
  const [spiceLevel, setSpiceLevel] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Fetch categories from the menu items
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // In a real application, you would fetch categories from your API
        // This is a placeholder that should be replaced with your actual API call
        const response = await fetch('/api/menu-categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback with some common food categories
        setCategories([
          'Pizza', 'Burger', 'Pasta', 'Sushi', 'Salad', 
          'Dessert', 'Drinks', 'Breakfast', 'Lunch', 'Dinner'
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle price range changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange({
      ...priceRange,
      [name]: value !== '' ? Number(value) : '',
    });
  };

  // Handle healthy toggle
  const handleHealthyChange = () => {
    setIsHealthy(!isHealthy);
  };

  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Handle dietary preferences
  const handleDietaryChange = (e) => {
    const { name, checked } = e.target;
    setDietaryPreferences({
      ...dietaryPreferences,
      [name]: checked,
    });
  };

  // Handle spice level change
  const handleSpiceLevelChange = (e) => {
    setSpiceLevel(e.target.value);
  };

  // Handle preparation time change
  const handlePrepTimeChange = (e) => {
    setPreparationTime(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Apply filters
  const applyFilters = () => {
    const filters = {
      category: selectedCategory || undefined,
      minPrice: priceRange.minPrice || undefined,
      maxPrice: priceRange.maxPrice || undefined,
      isHealthy: isHealthy || undefined,
      rating: rating > 0 ? rating : undefined,
      dietaryPreferences: Object.entries(dietaryPreferences)
        .filter(([_, value]) => value)
        .map(([key]) => key),
      spiceLevel: spiceLevel || undefined,
      preparationTime: preparationTime || undefined,
      sortBy: sortBy !== 'recommended' ? sortBy : undefined,
    };

    // Remove undefined values and empty arrays
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) {
        delete filters[key];
      } else if (Array.isArray(filters[key]) && filters[key].length === 0) {
        delete filters[key];
      }
    });

    onFilterChange(filters);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange({ minPrice: '', maxPrice: '' });
    setIsHealthy(false);
    setRating(0);
    setDietaryPreferences({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
    });
    setSpiceLevel('');
    setPreparationTime('');
    setSortBy('recommended');
    onFilterChange({});
  };

  // Star rating component
  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <svg
              className={`w-6 h-6 ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        {rating > 0 && (
          <button
            onClick={() => onRatingChange(0)}
            className="ml-2 text-xs text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="sticky top-0 h-screen overflow-y-auto bg-white rounded-lg p-4 pb-20 basis-1/3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button 
          onClick={resetFilters}
          className="text-sm text-orange-500 hover:text-orange-700"
        >
          Reset All
        </button>
      </div>

      {/* Sort By - New filter */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">Sort By</h3>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="recommended">Recommended</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="popular">Most Popular</option>
          <option value="newest">Newest Items</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">Category</h3>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">Price Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="minPrice" className="block text-xs text-gray-500 mb-1">Min Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                min="0"
                value={priceRange.minPrice}
                onChange={handlePriceChange}
                className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-xs text-gray-500 mb-1">Max Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                min="0"
                value={priceRange.maxPrice}
                onChange={handlePriceChange}
                className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Star Rating Filter - New filter */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">Minimum Rating</h3>
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
      </div>

      {/* Dietary Preferences - New filter */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">Dietary Preferences</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vegetarian"
              name="vegetarian"
              checked={dietaryPreferences.vegetarian}
              onChange={handleDietaryChange}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="vegetarian" className="ml-2 text-gray-700">
              Vegetarian
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vegan"
              name="vegan"
              checked={dietaryPreferences.vegan}
              onChange={handleDietaryChange}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="vegan" className="ml-2 text-gray-700">
              Vegan
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="glutenFree"
              name="glutenFree"
              checked={dietaryPreferences.glutenFree}
              onChange={handleDietaryChange}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="glutenFree" className="ml-2 text-gray-700">
              Gluten Free
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="dairyFree"
              name="dairyFree"
              checked={dietaryPreferences.dairyFree}
              onChange={handleDietaryChange}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="dairyFree" className="ml-2 text-gray-700">
              Dairy Free
            </label>
          </div>
        </div>
      </div>

      {/* Spice Level - New filter */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">Spice Level</h3>
        <select
          value={spiceLevel}
          onChange={handleSpiceLevelChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Any Spice Level</option>
          <option value="not_spicy">Not Spicy</option>
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="spicy">Spicy</option>
          <option value="very_spicy">Very Spicy</option>
        </select>
      </div>

      {/* Preparation Time - New filter */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">Preparation Time</h3>
        <select
          value={preparationTime}
          onChange={handlePrepTimeChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Any Time</option>
          <option value="quick">Quick (under 10 min)</option>
          <option value="medium">Medium (10-20 min)</option>
          <option value="long">Long (over 20 min)</option>
        </select>
      </div>

      {/* Healthy Option Filter */}
      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="healthy"
            checked={isHealthy}
            onChange={handleHealthyChange}
            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <label htmlFor="healthy" className="ml-2 text-gray-700">
            Healthy Options Only
          </label>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        Apply Filters
      </button>

      {/* Quick Filters Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-md font-medium text-gray-700 mb-2">Quick Filters</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              onFilterChange({ popularity: 85 });
            }}
            className="w-full text-left text-gray-700 hover:text-orange-500 py-2 transition duration-200"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              Popular Items
            </span>
          </button>
          <button
            onClick={() => {
              onFilterChange({ new: true });
            }}
            className="w-full text-left text-gray-700 hover:text-orange-500 py-2 transition duration-200"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              New Items
            </span>
          </button>
          <button
            onClick={() => {
              setDietaryPreferences({...dietaryPreferences, vegetarian: true});
              onFilterChange({ dietaryPreferences: ['vegetarian'] });
            }}
            className="w-full text-left text-gray-700 hover:text-orange-500 py-2 transition duration-200"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Vegetarian
            </span>
          </button>
          <button
            onClick={() => {
              onFilterChange({ discount: true });
            }}
            className="w-full text-left text-gray-700 hover:text-orange-500 py-2 transition duration-200"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              Discounted Items
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideFilterBar;