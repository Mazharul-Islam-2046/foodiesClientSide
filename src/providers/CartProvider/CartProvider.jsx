// CartProvider.js
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  // const [animateItem, setAnimateItem] = useState(null);



  const taxRate = 0.05;
  const deliveryFeeRate = 0.05;

  // All the calculations

  // calculate subtotal function
  const calculateSubtotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setSubtotal(subtotal);
  };

  // calculate delivery fee function
  const calculateDeliveryFee = () => {
    const deliveryFee = cartItems.reduce((total, item) => {
      // return total + item?.deliveryFee * item.quantity;
      return total + deliveryFeeRate * item.quantity;
    }, 0);
    setDeliveryFee(deliveryFee);
  };

  // calculate tax function
  const calculateTax = () => {
    const tax = cartItems.reduce((total, item) => {
      // return total + item?.tax * item.quantity;
      return total + taxRate * item.quantity;
    }, 0);
    setTax(tax);
  };

  // calculate total function
  const calculateTotal = () => {
    const total = subtotal + deliveryFee + tax;
    setTotal(total);
  };


  // item count function
  const calculateItemCount = () => {
    const itemCount = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setItemCount(itemCount);
  };






  // useEffect for calculations
  useEffect(() => {
    calculateSubtotal();
    calculateDeliveryFee();
    calculateTax();
    calculateItemCount()
  }, [cartItems]);


  // useEffect for calculations for total
  useEffect(() => {
    calculateTotal();
  }, [subtotal, deliveryFee, tax]);







  // remove item function
  const removeItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCartItems);
  };




  // update quantity function
  const updateQuantity = (id, quantity, action) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item._id === id) {
          if (action === "add") {
            item.quantity += quantity;
          } else if (action === "remove") {
            if (item.quantity > 1) {
              item.quantity -= quantity;
            } else if (item.quantity === 1) {
              return null;
            }
          }
        }
        return item;
      })
      .filter((item) => item !== null);
    setCartItems(updatedCartItems);
  };




  // add item function
  const addItem = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    console.log("item: ", item, "existingItem: ", existingItem);

    if (existingItem) {
      updateQuantity(existingItem._id, 1, "add");
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };




  // clear cart function
  const clearCart = () => {
    setCartItems([]);
    setItemCount(0);
    setSubtotal(0);
    setDeliveryFee(0);
    setTax(0);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        subtotal,
        deliveryFee,
        tax,
        total,
        // animateItem,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
