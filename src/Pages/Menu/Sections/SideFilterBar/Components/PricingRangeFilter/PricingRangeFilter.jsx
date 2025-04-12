

const PricingRangeFilter = ({priceRange, onPriceChange}) => {
    return (
        <>
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
                                onChange={onPriceChange}
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
                                onChange={onPriceChange}
                                className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PricingRangeFilter;