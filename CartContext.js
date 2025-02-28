import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'สินค้า A', price: 5, status: 'available', image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'สินค้า B', price: 4, status: 'available', image: 'https://via.placeholder.com/100' },
  ]);
  
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const confirmPurchase = () => {
    setProducts(products.map(product => 
      cart.find(item => item.id === product.id) 
        ? { ...product, status: 'sold' } 
        : product
    ));
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ products, cart, addToCart, removeFromCart, confirmPurchase }}>
      {children}
    </CartContext.Provider>
  );
};
