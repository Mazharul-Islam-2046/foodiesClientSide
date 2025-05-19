import { useState, useEffect, useRef } from "react";
import { Trash2, Plus, Minus, ShoppingBag, X, ChevronUp } from "lucide-react";
import { useCart } from "../../providers/CartProvider/CartProvider";

export default function CartBadge() {
  const [height, setHeight] = useState("auto");
  const contentRef = useRef(null);

  // getting cart functions and datas from useCart
  const {
    cartItems,
    itemCount,
    subtotal,
    deliveryFee,
    tax,
    total,
    // clearCart,
    removeItem,
    updateQuantity,
    isExpanded,
    setIsExpanded
  } = useCart();

  // Calculate and update content height when content changes or expansion state changes
  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        const contentHeight = contentRef.current.scrollHeight;
        setHeight(`${contentHeight}px`);
      } else {
        setHeight("0px");
      }
    }
  }, [isExpanded, cartItems]);

  // Toggle cart expansion
  const toggleCart = () => {
    setIsExpanded(!isExpanded);
  };

  //

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transform transition-all duration-500 ease-in-out w-full sm:w-96 max-w-full sm:max-w-lg`}
      style={{
        maxWidth: "500px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
        borderRadius: isExpanded ? "16px" : "24px",
        transformOrigin: "bottom right",
        transform: `scale(${isExpanded ? 1 : 0.98}) translateY(${
          isExpanded ? 0 : "4px"
        })`,
        opacity: 1,
        willChange: "transform, width, max-width",
      }}
    >
      {/* Badge/Header that's always visible */}
      <div
        className="bg-orange-500 text-white p-4 flex items-center justify-between cursor-pointer rounded-lg transition-all duration-500 ease-in-out"
        onClick={toggleCart}
        style={{
          borderRadius: isExpanded ? "16px 16px 0 0" : "24px",
          transform: isExpanded ? "translateY(0)" : "translateY(0)",
        }}
      >
        <div className="flex items-center">
          <ShoppingBag className="mr-2" size={20} />
          <span className="font-semibold">Your Cart • {itemCount} items</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold mr-3">${total.toFixed(2)}</span>
          <ChevronUp
            className={`transform transition-transform duration-500 ease-in-out ${
              isExpanded ? "" : "rotate-180"
            }`}
            size={20}
          />
        </div>
      </div>

      {/* Expandable content with dynamic height */}
      <div
        ref={contentRef}
        className="bg-white overflow-hidden transition-all duration-500 ease-in-out rounded-b-lg"
        style={{
          maxHeight: height,
          opacity: isExpanded ? 1 : 0,
          transition: "max-height 500ms ease-in-out, opacity 400ms ease-in-out",
        }}
      >
        {/* Items list */}
        <div className="max-h-64 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className={`flex items-center py-3 border-b transition-all duration-300 ease-in-out `}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover"
                />

                <div className="ml-3 flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="text-orange-500 font-semibold">
                    ${item?.price?.toFixed(2)}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center border rounded mb-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item._id, 1, "remove");
                      }}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item._id, 1, "add");
                      }}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item._id);
                    }}
                    className="text-red-500 hover:text-red-700 flex items-center text-xs transition-colors duration-200"
                  >
                    <Trash2 size={14} className="mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order summary */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-gray-50 border-t">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={(e) => e.stopPropagation()}
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg w-full mt-4 font-medium transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Proceed to Checkout
            </button>

            <div className="text-center mt-3 text-sm text-gray-600 pb-4">
              or{" "}
              <button
                onClick={toggleCart}
                className="text-orange-500 hover:underline transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
