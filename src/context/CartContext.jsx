import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/Notifications";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((element) => element.id === item.id);

      if (existingItem) {
        return currentCart.map((element) => (element.id === item.id ? { ...element, quantity: (element.quantity ?? 1) + 1 } : element));
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((element) => element.id === id);
      if (existingItem) {
        return currentCart.map((element) => (element.id === id ? { ...element, quantity: Math.max(0, (element.quantity ?? 1) - 1) } : element));
      }
      return currentCart;
    });
  };

  const deleteItem = (id) => {
    setCart((currentCart) => currentCart.filter((element) => element.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, element) => total + (element.quantity ?? 1), 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, element) => total + element.price * (element.quantity ?? 1), 0);
  };

  const checkout = () => {
    notify.success("Su compra ha sido realizada con éxito");
    clearCart();
    navigate("/");
  };

  const values = {
    cart,
    addItem,
    deleteItem,
    clearCart,
    removeItem,
    getCartTotal,
    getTotalItems,
    checkout,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
