import { ShoppingCart } from "lucide-react";
import { useCart } from "../../providers/CartProvider/CartProvider";

const Cart = () => {
  const {isExpanded, setIsExpanded, itemCount} = useCart()

  return (
    <>
      <div className="relative">
        <button
          className="p-2 text-gray-700 hover:text-orange-500 transition relative"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ShoppingCart size={24} />
          {itemCount > 0 ? (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          ) : 
          
          (<span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              0
            </span>)}
        </button>
      </div>
    </>
  );
};

export default Cart;
