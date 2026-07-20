import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../services/api';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from Local Storage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('shopping_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Error parsing cart from Local Storage:', e);
    }
  }, []);

  // Save cart to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  // Clear all items in cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Derive cart totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Tax is simulated at 8% of subtotal
  const tax = subtotal * 0.08;
  
  // Shipping is simulated: flat $10, free for orders above $100
  const shipping = subtotal > 0 && subtotal < 100 ? 10 : 0;
  
  const cartTotal = subtotal + tax + shipping;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        tax,
        shipping,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
