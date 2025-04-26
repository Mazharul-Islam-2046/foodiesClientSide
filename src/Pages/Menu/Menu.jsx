import { useState } from "react";
import Banner from "./Sections/Banner/Banner";
import ItemSearchResult from "./Sections/ItemsSearchResult/ItemSearchResult";
import SideFilterBar from "./Sections/SideFilterBar/SideFilterBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { menuApi } from "../../api/menuApi";
import SearchBar from "./Sections/SearchBar/SearchBar";
import Error from "../../SharedComponents/Error/Error";
import { useInView } from "react-intersection-observer";
import RestaurantCardSkeleton from "../../SharedComponents/Card/RestaurantCardSkeleton";

const Menu = () => {

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);

    const onFilterChange = (newFilters) => {
        setFilters(search ? { search, ...newFilters } : newFilters);
    };

    // const sortBy = filters.sortBy || "popularity";
    const {sortBy, ...restFilters} = filters

    const {
        data,
        isLoading,
        isError,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['fillteredMenuItems', filters, search],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                const response = await menuApi.filterMenuItems(pageParam, 20, restFilters, sortBy);
                setFilteredMenuItems(response.data.data.menuItems);
                // Return the exact format your API provides
                return response.data.data;
            } catch (error) {
                console.error("Error fetching menu items:", error);
                throw error;
            }
        },
        getNextPageParam: (lastPage, allPages) => {
            console.log(allPages)
            // More robust nextPage detection
            if (!lastPage) return undefined
            if (lastPage.menuItems.length === 0) return undefined;
            if (lastPage.currentPage < lastPage.totalPages) return lastPage.currentPage + 1;
            return undefined;
        },
        staleTime: 60 * 60 * 200,
        refetchOnWindowFocus: false,
        retry: 2,
    });


    // Render loading skeletons that match your food card design
    const renderLoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {Array(10)
                .fill(0)
                .map((_, index) => (
                    <RestaurantCardSkeleton
                        key={`skeleton-${index}`} />
                ))}
        </div>
    );


    // Handle error cases with a user-friendly message
    const renderError = () => (
        <Error error={error} />
    );

    const hasData = filteredMenuItems?.pages && filteredMenuItems?.pages[0].length > 0;


    const { ref, inView } = useInView({
        threshold: 0
    })





    return (
        <>
            <Banner />
            <div className="flex relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-full gap-8">
                <SideFilterBar onFilterChange={onFilterChange} />
                <div className="flex flex-col flex-grow gap-6">
                    <SearchBar setSearch={setSearch} />


                    {/* Item search result */}
                    <ItemSearchResult
                        data={data}
                        isLoading={isLoading}
                        isError={isError}
                        error={error}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        hasData={hasData}
                        renderLoadingSkeleton={renderLoadingSkeleton}
                        renderError={renderError}
                        inView={inView}
                    />



                    {/* Loading indicator */}
                    {hasNextPage && (
                        <div
                            ref={ref}
                            className="h-10 w-full flex items-center justify-center"
                        >
                            {isFetchingNextPage && (<div className="flex items-center justify-center">
                                <div className="loader w-8 h-8 border-4 border-t-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto my-auto" />
                            </div>)}
                        </div>
                    )}



                    {/* No more items to show */}

                    {!hasNextPage && (
                        <div className="text-center mt-4">
                            <p className="text-gray-600">No more items to show</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Menu;