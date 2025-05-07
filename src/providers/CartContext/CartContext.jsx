// CartContext.js
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  
  const addItem = (item) => {

    // Check if item already exists
    const existingItem = cartItems.find(i => i._id === item._id);
    if (existingItem) {
      // Update quantity
      updateQuantity(item.id, existingItem.quantity + 1);
      console.log("existing item: ", item, "id: ", item.id, "quantity: ", existingItem.quantity);
    } else {
      // Add new item
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Calculate totals
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  
  return (
    <CartContext.Provider value={{
      cartItems,
      itemCount,
      subtotal,
      deliveryFee,
      tax,
      total,
      addItem,
      updateQuantity,
      removeItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}