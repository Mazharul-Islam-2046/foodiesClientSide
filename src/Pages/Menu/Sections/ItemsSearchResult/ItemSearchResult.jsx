import React, { useEffect, useState } from 'react';
import FoodCard from '../../../../SharedComponents/Card/FoodCard';

const ItemSearchResult = ({ 
    filteredMenuItems, 
    isLoading, 
    isError, 
    error, 
    hasNextPage, 
    isFetchingNextPage, 
    hasData, 
    renderLoadingSkeleton, 
    renderError 
}) => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        if (filteredMenuItems && filteredMenuItems.length > 0) {
            // Flatten all pages into a single array of items
            const allItems = filteredMenuItems.flatMap(page => page || []);
            setItems(allItems);
        }
    }, [filteredMenuItems]);

    return (
        <>
            {/* Show skeleton while initially loading */}
            {isLoading && !hasData && renderLoadingSkeleton()}

            {/* Show error message if query fails initially */}
            {isError && !items.length && renderError()}

            <div className='basis-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {items.length > 0 && (
                    items.map((item) => (
                        <FoodCard key={item?._id} item={item} />
                    ))
                )}
            </div>
        </>
    );
};

export default ItemSearchResult;