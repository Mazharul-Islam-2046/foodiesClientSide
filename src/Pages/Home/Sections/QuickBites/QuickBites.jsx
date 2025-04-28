import { useInfiniteQuery } from '@tanstack/react-query';
import { menuApi } from '../../../../api/menuApi';
import FoodCardSkeleton from '../../../../SharedComponents/Card/FoodCardSkeleton';
import CardSlider from '../../../../SharedComponents/CardSlider/CardSlider';

const QuickBites = () => {

    // Fetching menu items using React Query
    const {
        data: foodItems,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["popularItems"],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                const response = await menuApi.getPopularMenuItems(pageParam, 7);
                console.log(response);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(4)
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



    // Check if we have valid data
    const hasData = foodItems && foodItems.pages && foodItems.pages.length > 0;




    return (
        <div className="relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-full pt-16 pb-16">
          <h2 className="text-4xl font-bold mb-10">Most Popular Food</h2>
    
          {/* Show skeleton while initially loading */}
          {isLoading && !hasData && renderLoadingSkeleton()}
    
          {/* Show error message if query fails initially */}
          {isError && !foodItems && renderError()}
    
    
          {/* Show slider once data is available */}
          {hasData && (
            <CardSlider
              options={{
                cardType: "category",
                menuItems: foodItems.pages,
                hasNextPage,
                isFetchingNextPage,
                fetchNextPage,
              }}
            />
          )}
    
    
    
          {/* Show error message if query fails to load more data */}
          {isError && foodItems && (
            <div className="text-sm text-red-500 mt-4">
              Failed to load rest of the items. Please try again later.
            </div>
          )}
    
    
    
          {/* Show message when no more items are available */}
          {!isLoading && !isError && !hasData && (
              console.log("No more items available. Thanks you")
          )}
    
        </div>
      );
    };
    
    export default QuickBites;