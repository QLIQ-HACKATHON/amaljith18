import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../types/Product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  getCartCount: () => number;
  removeFromCart: (id: number) => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, getCartCount, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartContext must be used within CartProvider");
  return ctx;
};
