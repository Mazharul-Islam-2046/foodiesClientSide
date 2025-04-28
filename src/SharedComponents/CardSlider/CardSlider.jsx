import { useRef, useEffect, useMemo, memo } from "react";
import { A11y, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SquareCard from "../Card/SquareCard";
import FoodCard from "../Card/FoodCard";

// only core + module CSS
import "swiper/css";
import "swiper/css/navigation";

const CardSlider = memo(({ options }) => {
  const {
    cardType,
    menuItems = [],
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = options;

  const swiperRef = useRef(null);
  
  // Flatten paginated data synchronously
  const processedItems = useMemo(() => {
    if (!menuItems || menuItems.length === 0) return [];
    
    if (cardType === "food") {
      // Ensure we properly flatten the nested pages structure
      return menuItems.flatMap(page => (Array.isArray(page) ? page : []));
    } else {
      return menuItems.flat();
    }
  }, [menuItems, cardType]);

  // Handle reaching the end
  const handleReachEnd = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage().catch(err => console.error("Failed to fetch next page:", err));
    }
  };

  // Force update when new pages arrive
  useEffect(() => {
    if (swiperRef.current?.swiper) {
      // Short delay to ensure DOM has updated
      setTimeout(() => {
        swiperRef.current.swiper.update();
      }, 100);
    }
  }, [processedItems.length]);

  // When no items are available
  if (!processedItems || processedItems.length === 0) {
    return <div className="text-gray-500">No items to display</div>;
  }

  return (
    <div className="slider-container relative">
      <Swiper
        ref={swiperRef}
        modules={[A11y, FreeMode, Navigation]}
        spaceBetween={10}
        slidesPerView="auto"
        breakpoints={{
          320: { slidesPerView: 1.4, spaceBetween: 6 },
          768: { slidesPerView: 2.8, spaceBetween: 8 },
          1024: { slidesPerView: 3.5, spaceBetween: 8 },
          1440: { slidesPerView: 4.4, spaceBetween: 12 },
          1920: { slidesPerView: 4.8, spaceBetween: 16 },
          // 1920: { slidesPerView: 5.2, spaceBetween: 16 },
        }}
        freeMode={{
          enabled: true,
          momentumBounce: false,
          minimumVelocity: 0.1,
          momentumRatio: 0.4,
        }}
        watchSlidesProgress
        onReachEnd={handleReachEnd}
        onSwiper={swiper => {
          if (swiperRef.current) swiperRef.current.swiper = swiper;
        }}
      >
        {processedItems.map((item, idx) => {
          const key = `${item?.id ?? idx}-${cardType}`;
          const Card = cardType === "food" ? FoodCard : SquareCard;
          
          return (
            <SwiperSlide
              key={key}
              className="py-2"
              style={{ height: 'auto' }}
            >
              <Card item={item} />
            </SwiperSlide>
          );
        })}

        {isFetchingNextPage && (
          <SwiperSlide className="flex items-center justify-center">
            <div className="loader w-8 h-8 border-4 border-t-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto my-auto" />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
});



export default CardSlider;