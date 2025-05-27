import CartIcon from '../../components/shared/CartIcon';
import { useCart } from '../../providers/CartProvider/CartProvider';

const Cart = () => {
  const { isExpanded, setIsExpanded, itemCount } = useCart();

  return (
    <>
      <div className="relative">
        <button
          className="p-2 text-gray-700 hover:text-orange-500 transition relative"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CartIcon />
          {itemCount > 0 ? (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {itemCount}
            </span>
          ) : (
            <span className="absolute top-0.5 -right-0 hidden bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              0
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default Cart;
