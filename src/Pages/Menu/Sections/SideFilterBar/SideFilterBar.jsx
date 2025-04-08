import React, { useState } from 'react';

const SideFilterBar = ({ onFilter }) => {
  // State for each filter field
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [isHealthy, setIsHealthy] = useState(false);

  // Handler for applying filters
  const handleApplyFilters = () => {
    // Build filters object based on input values
    const filters = {};
    if (category.trim()) filters.category = category.trim();
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);
    if (freeDelivery) filters.freeDelivery = true;
    if (isHealthy) filters.isHealthy = true;

    // Call the onFilter callback with the filters if provided,
    // otherwise log it to the console.
    if (onFilter && typeof onFilter === 'function') {
      onFilter(filters);
    } else {
      console.log('Applied Filters:', filters);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow max-w-xs">
      <h2 className="text-xl font-bold mb-4">Filter Menu Items</h2>
      
      {/* Category Filter */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Category</label>
        <input
          type="text"
          id="category"
          placeholder="e.g. Italian, Burgers"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Price Range</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Free Delivery Checkbox */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={freeDelivery}
            onChange={() => setFreeDelivery(!freeDelivery)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Free Delivery</span>
        </label>
      </div>
      
      {/* Healthy Options Checkbox */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isHealthy}
            onChange={() => setIsHealthy(!isHealthy)}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          <span className="ml-2 text-gray-700">Healthy Options</span>
        </label>
      </div>
      
      {/* Apply Filters Button */}
      <button
        type="button"
        onClick={handleApplyFilters}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-150"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default SideFilterBar;
