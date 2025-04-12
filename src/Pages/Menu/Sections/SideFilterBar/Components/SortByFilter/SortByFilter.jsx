

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
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest Items</option>
                </select>
            </div>
        </>
    );
};

export default SortByFilter;