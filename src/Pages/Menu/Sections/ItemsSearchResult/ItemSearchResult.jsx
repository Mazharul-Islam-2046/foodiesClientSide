import React, { useEffect, useState } from 'react';
import FoodCard from '../../../../SharedComponents/Card/FoodCard';

const ItemSearchResult = ({ filteredMenuItems, isLoading, isError, error, hasNextPage, isFetchNextPage, setSearch }) => {
    const [items, setItems] = useState([])
    console.log(isLoading, isError, error, hasNextPage, isFetchNextPage, filteredMenuItems);
    useEffect(() => {
        if (filteredMenuItems) {
            setItems(filteredMenuItems[0])
        }
    }, [setItems, filteredMenuItems])


    return (
        <>
            <input
                type="text"
                placeholder="Search for items..."
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setSearch(e.target.value)}
            />
            
            <div className='basis-2/3 grid grid-cols-3 gap-4'>
                {
                    items?.map((item) => (
                        <FoodCard key={item?._id} item={item} />
                    ))
                }
            </div>
        </>
    );
};

export default ItemSearchResult;