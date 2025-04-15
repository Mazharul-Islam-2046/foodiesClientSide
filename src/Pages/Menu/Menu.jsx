import { useCallback, useEffect, useRef, useState } from "react";
import Banner from "./Sections/Banner/Banner";
import ItemSearchResult from "./Sections/ItemsSearchResult/ItemSearchResult";
import SideFilterBar from "./Sections/SideFilterBar/SideFilterBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { menuApi } from "../../api/menuApi";
import SearchBar from "./Sections/SearchBar/SearchBar";
import Error from "../../SharedComponents/Error/Error";
import FoodCardSkeleton from "../../SharedComponents/Card/FoodCardSkeleton";
import {useInView} from "react-intersection-observer";

const Menu = () => {

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});
    const loadMoreRef = useRef(null);

    const onFilterChange = (newFilters) => {
        setFilters(search ? { search, ...newFilters } : newFilters);
    };

    const {
        data: filteredMenuItems,
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
                const response = await menuApi.filterMenuItems(pageParam, 20, filters);
                // Return the exact format your API provides
                return response.data.data.menuItems;
            } catch (error) {
                console.error("Error fetching menu items:", error);
                throw error;
            }
        },
        getNextPageParam: (lastPage, allPages) => {
            // More robust nextPage detection
            if (!lastPage) return undefined;
            if (lastPage.nextPage) return lastPage.nextPage;
            if (lastPage.length === 0) return undefined;
            return allPages.length + 1;
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
                    <FoodCardSkeleton
                        key={`skeleton-${index}`} />
                ))}
        </div>
    );


    // Handle error cases with a user-friendly message
    const renderError = () => (
        <Error error={error} />
    );

    const hasData = filteredMenuItems?.pages && filteredMenuItems?.pages[0].length > 0;


    const {ref, inView} = useInView({
        threshold: 1
    })





    return (
        <>
            <Banner />
            <div className="flex relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-full gap-8">
                <SideFilterBar onFilterChange={onFilterChange} />
                <div className="flex flex-col flex-grow gap-6">
                    <SearchBar setSearch={setSearch} />
                    <ItemSearchResult
                        filteredMenuItems={filteredMenuItems?.pages}
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
                    {hasNextPage && (
                        <div
                            ref={ref}
                            className="h-10 w-full flex items-center justify-center"
                        >
                            {isFetchingNextPage && <p>Loading more items...</p>}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Menu;