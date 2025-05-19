
import { useEffect, useRef, useState } from "react";
import FoodCard from "../../SharedComponents/Card/FoodCard";
import RestaurantHeader from "./Sections/Restaurant_Header/RestaurantHeader";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { menuApi } from "../../api/menuApi";

const Restaurant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const asideRef = useRef(null);
  const categoryRefs = useRef({});

  const data = useLoaderData();
  const restaurantData = data.data;
  
  const { data: menuItems } = useQuery({
    queryKey: ['menuItems', restaurantData?.id],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await menuApi.getMenuItemsByIds(pageParam, 20, restaurantData?.menu);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error;
      }
    },
  });

  // Extract unique categories from menuItems
  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      // Extract all unique categories from menuItems
      const uniqueCategories = [...new Set(menuItems.map(item => item.category).filter(Boolean))];
      setCategories(uniqueCategories);
      
      // Set first category as active if no active category yet
      if (uniqueCategories.length > 0 && !activeCategory) {
        setActiveCategory(uniqueCategories[0]);
      }
    }
  }, [menuItems, activeCategory]);

  // Group menu items by category
  const groupedMenuItems = {};
  
  if (menuItems && categories.length > 0) {
    // Initialize all categories with empty arrays
    categories.forEach(category => {
      groupedMenuItems[category] = [];
    });
    
    // Group menu items by their categories
    menuItems.forEach(item => {
      if (item.category && groupedMenuItems[item.category]) {
        groupedMenuItems[item.category].push(item);
      }
    });
  }

  // Handle clicking outside the cart sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (asideRef.current && !asideRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to category section when category is clicked
  const scrollToCategory = (category) => {
    setActiveCategory(category);
    if (categoryRefs.current[category]) {
      categoryRefs.current[category].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="w-11/12 max-w-[1520px] mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-14">
      <RestaurantHeader restaurantData={restaurantData} />

      {/* Category Navigation - Using dynamically extracted categories */}
      <div className="flex items-center gap-3 py-2 sticky top-0 bg-white z-10 overflow-x-auto scrollbar-hide">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => scrollToCategory(category)}
            className={`whitespace-nowrap px-3 py-1 rounded-full font-semibold text-lg ${
              activeCategory === category
                ? "bg-orange-500 text-white"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category Sections - Using dynamically extracted categories */}
      <div className="space-y-12 mt-6">
        {categories.map((category, index) => (
          <div 
            key={index} 
            ref={el => categoryRefs.current[category] = el}
            className="scroll-mt-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{category}</h2>
            {groupedMenuItems[category]?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                {groupedMenuItems[category].map((item, idx) => (
                  <FoodCard key={idx} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No items available in this category</p>
            )}
          </div>
        ))}
      </div>

      {/* Sidebar cart */}
      <aside 
        ref={asideRef} 
        onClick={() => !isOpen && setIsOpen(true)} 
        className={`fixed bottom-0 overflow-hidden right-0 w-full max-w-[460px] bg-white shadow-lg rounded-lg p-4 m-4 z-20 transition-all duration-500 ease-in-out ${
          isOpen ? 'h-[80vh] overflow-y-scroll scroll-smooth' : 'h-[60px]'
        }`}
      >
        <h2 className="text-xl font-bold">Cart</h2>
        {/* Cart content goes here */}
      </aside>
    </div>
  );
};

export default Restaurant;