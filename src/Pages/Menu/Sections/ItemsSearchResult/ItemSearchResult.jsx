import React from 'react';
import FoodCard from '../../../../SharedComponents/Card/FoodCard';

const ItemSearchResult = ({filteredMenuItems, isLoading, isError, error, hasNextPage, isFetchNextPage, setSearch}) => {

    console.log(filteredMenuItems, isLoading, isError, error, hasNextPage, isFetchNextPage, setSearch);
    return (
        <div className='basis-2/3 grid grid-cols-4 gap-4'>
            {
                filteredMenuItems?.map((item) => <FoodCard item={item} key={item._id}/>)
            }
        </div>
    );
};

export default ItemSearchResult;