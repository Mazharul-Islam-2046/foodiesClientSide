import { useState } from "react";
import Banner from "./Sections/Banner/Banner";
import ItemSearchResult from "./Sections/ItemsSearchResult/ItemSearchResult";
import SideFilterBar from "./Sections/SideFilterBar/SideFilterBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { menuApi } from "../../api/menuApi";

const Menu = () => {

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});


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
        isFetchNextPage
    } = useInfiniteQuery({
        queryKey: ['fillteredMenuItems', filters, search],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                    const response = await menuApi.filterMenuItems(pageParam, 7, filters);
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
    })





    return (
        <>
            <Banner />
            <div className="flex relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <SideFilterBar onFilterChange={onFilterChange} />
                <ItemSearchResult filteredMenuItems={filteredMenuItems.pages} isLoading={isLoading} isError={isError} error={error} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchNextPage={isFetchNextPage} setSearch={setSearch} />
            </div>

        </>
    );
};

export default Menu;