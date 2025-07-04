import React, { useEffect, useState } from 'react';
import RestaurantCard from '../../../../SharedComponents/Card/RestaurantCard';

const ItemSearchResult = ({ 
    data, 
    isLoading, 
    isError, 
    hasNextPage, 
    hasData, 
    renderLoadingSkeleton, 
    renderError,
    fetchNextPage,
    inView
}) => {
    const [items, setItems] = useState([]); 
    useEffect(() => {
        if (data && data.pages.length > 0) {
            // Flatten all pages into a single array of items
            // console.log("dataNew:- ", data);
            const allItems = data.pages.map(page => page.restaurants).flat();
            setItems(allItems);
        }
        if (data && data.pages.length === 0) {
            setItems([]);
            console.log('data is empty');
        }
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [data, fetchNextPage, hasNextPage, inView]);

    return (
        <>
            {/* Show skeleton while initially loading */}
            {isLoading && !hasData && renderLoadingSkeleton()}

            {/* Show error message if query fails initially */}
            {isError && !items.length && renderError()}

            <div className='basis-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {items.length > 0 && (
                    items.map((item) => (
                        <RestaurantCard key={item?._id} item={item} />
                    ))
                )}
            </div>
        </>
    );
};

export default ItemSearchResult;