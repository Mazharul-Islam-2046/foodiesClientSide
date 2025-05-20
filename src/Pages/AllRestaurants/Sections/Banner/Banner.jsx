

const Banner = () => {
    return (
        <div className='relative h-[45vh] w-11/12 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 mt-4'>
            {/* Banner Image with Overlay */}
            <div className='relative w-full h-full rounded-md overflow-hidden shadow-lg'>
                <img 
                    className='w-full h-full object-cover' 
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=600" 
                    alt="Delicious food being prepared" 
                />
                
                {/* Dark Overlay */}
                <div className='absolute inset-0 bg-black bg-opacity-50'></div>
                
                {/* Banner Content */}
                <div className='absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-16'>
                    <div className='max-w-lg'>
                        <h1 className='text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2'>
                            Delicious Food, Delivered Fast
                        </h1>
                        <p className='text-gray-200 text-sm sm:text-base md:text-lg mb-4'>
                            Enjoy your favorite meals from the best local restaurants delivered right to your door.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-3'>
                            <button className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 sm:px-6 rounded-md font-medium transition duration-200'>
                                Order Now
                            </button>
                            <button className='bg-transparent hover:bg-white hover:bg-opacity-20 text-white border border-white py-2 px-4 sm:px-6 rounded-md font-medium transition duration-200'>
                                View Menu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Optional: Banner Highlights */}
            {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                <div className='bg-white p-3 rounded-md shadow-md flex items-center'>
                    <div className='bg-orange-100 p-2 rounded-full mr-3'>
                        <svg className='w-5 h-5 text-orange-500' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                        </svg>
                    </div>
                    <div>
                        <p className='font-medium text-gray-800'>Fast Delivery</p>
                        <p className='text-xs text-gray-500'>30 minutes or less</p>
                    </div>
                </div>
                <div className='bg-white p-3 rounded-md shadow-md flex items-center'>
                    <div className='bg-orange-100 p-2 rounded-full mr-3'>
                        <svg className='w-5 h-5 text-orange-500' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
                        </svg>
                    </div>
                    <div>
                        <p className='font-medium text-gray-800'>No Minimum Order</p>
                        <p className='text-xs text-gray-500'>Order as little or as much as you want</p>
                    </div>
                </div>
                <div className='bg-white p-3 rounded-md shadow-md flex items-center'>
                    <div className='bg-orange-100 p-2 rounded-full mr-3'>
                        <svg className='w-5 h-5 text-orange-500' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                        </svg>
                    </div>
                    <div>
                        <p className='font-medium text-gray-800'>Special Discounts</p>
                        <p className='text-xs text-gray-500'>Save on your first order</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Banner;