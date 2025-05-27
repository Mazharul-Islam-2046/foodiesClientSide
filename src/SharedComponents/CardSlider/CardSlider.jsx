'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import RestaurantCard from '../Card/RestaurantCard';
import SquareCard from '../Card/SquareCard';

const CardSlider = memo(({ options }) => {
  const {
    cardType,
    menuItems = [],
    restaurants = [],
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  console.log('menuItems:--', menuItems);

  // Flatten paginated data synchronously
  const processedItems = useMemo(() => {
    // Handle based on which data we're using
    if (cardType === 'category' && menuItems.length > 0) {
      // Process menu items
      return menuItems.flatMap((page) => (Array.isArray(page) ? page : []));
    } else if (cardType === 'restaurant' && restaurants.length > 0) {
      // Process restaurants
      return restaurants.flatMap((page) => (Array.isArray(page) ? page : []));
    }

    // Default empty array if no matching data
    return [];
  }, [menuItems, restaurants, cardType]);

  const itemWidth = cardType === 'restaurant' ? 320 : 280; // Width of each item including margin
  const itemsPerView = cardType === 'restaurant' ? 3 : 4; // Number of items visible at once

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const scrollPosition = index * itemWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const maxIndex = Math.max(0, processedItems.length - itemsPerView);
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  // Handle reaching the end
  const handleReachEnd = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage().catch((err) => console.error('Failed to fetch next page:', err));
    }
  };

  // Check if we're near the end and need to load more
  useEffect(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 100;

      if (isNearEnd) {
        handleReachEnd();
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons(); // Initial check

      return () => {
        carousel.removeEventListener('scroll', updateScrollButtons);
      };
    }
  }, [processedItems.length]);

  // When no items are available
  if (processedItems.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-50 transition-colors duration-200"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto py-3 scrollbar-hide scroll-smooth pe-12"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' },
        }}
      >
        {processedItems.map((item, idx) => {
          const key = `${item?.id ?? idx}-${cardType}`;
          const Card = cardType === 'restaurant' ? RestaurantCard : SquareCard;

          return (
            <div
              key={key}
              className={`flex-shrink-0 ${
                cardType === 'restaurant' ? 'min-w-[300px]' : 'min-w-[260px]'
              }`}
            >
              <Card item={item} />
            </div>
          );
        })}

        {isFetchingNextPage && (
          <div className="flex-shrink-0 min-w-[260px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-50 transition-colors duration-200"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-gray-600" />
        </button>
      )}
    </div>
  );
});

export default CardSlider;
