import { useState } from "react";
import Banner from "./Sections/Banner/Banner";
import ItemSearchResult from "./Sections/ItemsSearchResult/ItemSearchResult";
import SideFilterBar from "./Sections/SideFilterBar/SideFilterBar";
import { useInfiniteQuery } from "@tanstack/react-query";

const Menu = () => {

    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState('');

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
            const response = await fetch(`/api/menu-items?page=${pageParam}&limit=12&filters=${JSON.stringify(filters)}&search=${search}`);
            const data = await response.json();
            return data;
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
                <SideFilterBar setFilters={setFilters} />
                <ItemSearchResult filteredMenuItems={filteredMenuItems} isLoading={isLoading} isError={isError} error={error} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchNextPage={isFetchNextPage} setSearch={setSearch} />
            </div>

        </>
    );
};

export default Menu;