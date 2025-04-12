import React from 'react';

const CategoryFilter = ({ selectedCategory, onCategoryChange, categories, loading }) => {
    return (
        <>
            <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">Category</h3>
                <select
                    value={selectedCategory}
                    onChange={onCategoryChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">All Categories</option>

                    {
                        loading ?
                            categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))
                            :
                            <option>Loading...</option>
                    }
                </select>
            </div>
        </>
    );
};

export default CategoryFilter;