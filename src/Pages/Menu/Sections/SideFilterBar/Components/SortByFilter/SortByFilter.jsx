

const SortByFilter = ({sortBy, onSortChange}) => {
    return (
        <>
            <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">Sort By</h3>
                <select
                    value={sortBy}
                    onChange={onSortChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="recommended">Recommended</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="highestRated">Highest Rated</option>
                    <option value="popularity">Most Popular</option>
                    <option value="newest">Newest Items</option>
                </select>
            </div>
        </>
    );
};

export default SortByFilter;