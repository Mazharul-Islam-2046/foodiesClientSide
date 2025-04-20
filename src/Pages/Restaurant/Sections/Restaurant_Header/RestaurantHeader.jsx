
import { Bike, Heart } from 'lucide-react';
import React from 'react';

const RestaurantHeader = () => {

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]



    return (
        <div className='flex justify-between items-baseline mb-6 mt-4 border-b-2 border-gray-200'>
            <div className='flex items-center gap-4'>
                <img
                    src="https://images.pexels.com/photos/1639566/pexels-photo-1639566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=600" // Replace with actual image URL
                    alt="Restaurant"
                    className="ratio-1/1 w-44 h-44 rounded-lg object-cover"
                />
                <div>
                    <div className='flex gap-3 items-center mb-4'>
                        {
                            items.map((item, index) => 
                                (<span className='py-1 px-3 bg-orange-500 rounded-full' key={index}>{item}</span>)
                            )
                            
                        }
                        
                    </div>
                    <h1 className='text-3xl font-semibold text-black pb-4'>Restaurant Name</h1>
                    <p className='flex items-center gap-2 pb-4'><Bike className='inline text-gray-600'/> <span>TK 69 delivery</span></p>
                    
                    <p className='text-gray-500'>Location</p>
                </div>

            </div>

            <button className="flex items-center gap-3 border-2 rounded-xl py-2 px-4 border-gray-600 hover:scale-105 transition mb-4"><Heart className='text-gray-600 inline' size={24} />
               Add to Favourite</button>
        </div>
    );
};

export default RestaurantHeader;