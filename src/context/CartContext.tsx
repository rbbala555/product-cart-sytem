// File: src/context/CartContext.tsx
import React, { createContext, useContext, useReducer } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
};

export type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "INCREMENT"; productId: number }
  | { type: "DECREMENT"; productId: number }
  | { type: "REMOVE_FROM_CART"; productId: number };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ state: { items: [] }, dispatch: () => {} });

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.items.find((item) => item.id === action.product.id);
      if (exists || action.product.stock <= 0) return state;
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "INCREMENT": {
      return {
        items: state.items.map((item) =>
          item.id === action.productId && item.stock > item.quantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case "DECREMENT": {
      return {
        items: state.items
          .map((item) =>
            item.id === action.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        items: state.items.filter((item) => item.id !== action.productId),
      };
    }
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
