'use client';

import { createContext, useReducer, useContext, ReactNode } from 'react';
import type { Product } from '../services/productService';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartContextValue extends CartState {
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {}
});

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const index = state.items.findIndex(item => item.product.id === action.product.id);
      if (index >= 0) {
        const items = state.items.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { items };
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(item => item.product.id !== action.id) };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', product });
  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

