import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = 3;

  return (
    <>
      <div className="relative">
        <button
          className="p-2 text-gray-700 hover:text-orange-500 transition relative"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <ShoppingCart size={24} />
          {cartItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems}
            </span>
          )}
        </button>

        {/* Cart popover */}
        {isCartOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-4 z-10 border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-2">Your Cart</h3>
            {cartItems > 0 ? (
              <>
                <div className="text-sm text-gray-600 mb-3">
                  You have {cartItems} items in your cart
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
                  View Cart
                </button>
              </>
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
