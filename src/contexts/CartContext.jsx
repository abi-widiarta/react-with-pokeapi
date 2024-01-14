import { createContext, useReducer, useState } from "react";

const CartContext = createContext();
const CartContextDispatch = createContext();

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, JSON.parse(localStorage.getItem("cart")) || []);

  return (
    <CartContext.Provider value={{ cart }}>
      <CartContextDispatch.Provider value={{ dispatch }}>{children}</CartContextDispatch.Provider>
    </CartContext.Provider>
  );
};

const cartReducer = (state, action) => {
  let itemInCart;
  switch (action.type) {
    case "ADD":
      itemInCart = state.find((item) => item.id == action.payload.id);
      if (itemInCart) {
        return state.map((item) => {
          if (item.id == action.payload.id) {
            return { ...item, qty: item.qty + action.payload.qty };
          } else {
            return item;
          }
        });
      } else {
        return [...state, action.payload];
      }
    case "ADD_QUANTITY":
      return state.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
    case "DECREASE_QUANTITY":
      itemInCart = state.find((item) => item.id == action.payload.id);

      if (itemInCart.qty == 1) {
        return state.filter((item) => item.id != action.payload.id);
      } else {
        return state.map((item) => {
          if (item.id == action.payload.id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }

    case "CLEAR_CART":
      return [];
  }
};

export { CartProvider, CartContext, CartContextDispatch };
