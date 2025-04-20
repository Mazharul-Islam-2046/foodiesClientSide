import { useEffect, useRef, useState } from "react";
import FoodCard from "../../SharedComponents/Card/FoodCard";
import RestaurantHeader from "./Sections/Restaurant_Header/RestaurantHeader";
import { NavLink } from "react-router-dom";

const Restaurant = () => {

    const [isOpen, setIsOpen] = useState(false);
    const asideRef = useRef(null);


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



  return (
    <div className=" w-11/12 max-w-[1520px] mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-14">
      <RestaurantHeader />

      {/* Category Slider */}
      <div className="flex items-center gap-3 py-2 sticky top-0 bg-white z-10 overflow-x-auto scrollbar-hide">
        {[
          "category",
          "category",
          "category",
          "category",
          "category",
          "category",
          "category",
          "category",
          "category",
          "category",
        ].map((item, index) => (
          <NavLink
            to={"/restaurant"}
            key={index}
            className={({ isActive }) =>
              isActive
                ? "text-primary text-gray-800 font-semibold bg-orange-500 px-3 py-1 rounded-full"
                : "text-gray-500 hover:text-primary font-semibold text-lg"
            }
          >
            {item}
          </NavLink>
        ))}
      </div>

      {/* Category Section */}
      <div>
        <div>
          <h2>Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <FoodCard key={index} item={item} />
            ))}
          </div>
        </div>


        {/* sidebar cart */}
        <aside ref={asideRef} onClick={() => setIsOpen(true)} className={`fixed bottom-0 overflow-hidden right-0 w-full max-w-[460px] bg-white shadow-lg rounded-lg p-4 m-4 z-20 transition-all duration-500 ease-in-out ${isOpen ? 'h-[80vh] overflow-y-scroll scroll-smooth' : 'h-[60px]'}`}>
            <h2>Cart</h2>
            
        </aside>
      </div>
    </div>
  );
};

export default Restaurant;
