import { useState } from "react";
import { ShoppingCart, User, MapPin, ChevronDown } from "lucide-react";
import Cart from "../Components/Cart";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For demo purposes - toggle this to see different states
  const user = isLoggedIn
    ? { name: "John Doe", avatar: "/api/placeholder/40/40" }
    : null;
  const location = "San Francisco, CA";

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between relative max-w-[1520px] w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-full ">
        {/* Logo on the left */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-orange-500 logoFont">
            foodies
          </h1>
        </div>

        {/* Location in the middle */}
        <div className="flex-1 flex justify-center">
          <button className="flex items-center text-gray-700 hover:text-orange-500 transition">
            <MapPin size={18} className="mr-1" />
            <span className="mr-1">{location}</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Cart and Account on the right */}
        <div className="flex-1 flex items-center justify-end gap-4">
          {/* Cart with popover */}
          <Cart />

          {/* Account/Sign up button */}
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-700">{user.name}</span>
            </div>
          ) : (
            <button className="flex items-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition">
              <User size={18} />
              <span>Sign Up</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
