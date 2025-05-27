import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const CuisineCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  const cuisines = [
    {
      id: 193,
      name: 'Biryani',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/193.png?height=192',
    },
    {
      id: 73,
      name: 'Pizza',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/73.png?height=192',
    },
    {
      id: 77,
      name: 'Cakes',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/77.png?height=192',
    },
    {
      id: 85,
      name: 'Burgers',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/85.png?height=192',
    },
    {
      id: 90,
      name: 'Cafe',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/90.png?height=192',
    },
    {
      id: 100,
      name: 'Chicken',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/100.png?height=192',
    },
    {
      id: 122,
      name: 'Snacks',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/122.png?height=192',
    },
    {
      id: 132,
      name: 'Kebab',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/132.png?height=192',
    },
    {
      id: 74,
      name: 'Chinese',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/74.png?height=192',
    },
    {
      id: 123,
      name: 'Rice Dishes',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/123.png?height=192',
    },
    {
      id: 86,
      name: 'Fast Food',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/86.png?height=192',
    },
    {
      id: 195,
      name: 'Bangladeshi',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/195.png?height=192',
    },
    {
      id: 241,
      name: 'Fried Chicken',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/241.png?height=192',
    },
    {
      id: 240,
      name: 'Dumpling',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/240.png?height=192',
    },
    {
      id: 196,
      name: 'Bakery',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/196.png?height=192',
    },
    {
      id: 243,
      name: 'Curry',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/243.png?height=192',
    },
    {
      id: 80,
      name: 'Indian',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/80.png?height=192',
    },
    {
      id: 69,
      name: 'Italian',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/69.png?height=192',
    },
    {
      id: 99,
      name: 'Turkish',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/99.png?height=192',
    },
    {
      id: 105,
      name: 'Mediterranean',
      image: 'https://images.deliveryhero.io/image/foodpanda/cuisine-images/BD/105.png?height=192',
    },
  ];

  const itemsPerView = 6; // Number of items visible at once
  const itemWidth = 180; // Width of each item including margin

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
    const maxIndex = Math.max(0, cuisines.length - itemsPerView);
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons(); // Initial check

      return () => {
        carousel.removeEventListener('scroll', updateScrollButtons);
      };
    }
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Your favourite cuisines</h2>

      <div className="relative">
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
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' },
          }}
        >
          {cuisines.map((cuisine) => (
            <div key={cuisine.id} className="min-w-[140px] flex-shrink-0 cursor-pointer group">
              <div className="bg-white rounded-xl  transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative mb-3 overflow-hidden rounded-lg  border">
                  <div className="pt-6">
                    <img
                      src={cuisine.image}
                      alt={cuisine.name}
                      className="w-full h-24  object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik05NiA2NEMxMDQuODM3IDY0IDExMiA3MS4xNjMgMTEyIDgwVjExMkMxMTIgMTIwLjgzNyAxMDQuODM3IDEyOCA5NiAxMjhDODcuMTYzIDEyOCA4MCA4LjgzNyA4MCAxMTJWODBDODAgNzEuMTYzIDg3LjE2MyA2NCA5NiA2NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-center font-medium text-gray-800 text-sm group-hover:text-pink-600 transition-colors duration-200">
                  {cuisine.name}
                </h3>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default CuisineCarousel;
