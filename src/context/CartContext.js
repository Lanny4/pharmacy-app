import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('pharmacy_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Зберігаємо кошик у localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem('pharmacy_cart', JSON.stringify(cart));
  }, [cart]);

  // Додати товар до кошика
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        // Якщо товар вже є — збільшуємо кількість
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Якщо товару немає — додаємо з quantity: 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Видалити товар з кошика
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Змінити кількість товару
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Очистити весь кошик
  const clearCart = () => {
    setCart([]);
  };

  // Підрахунок загальної суми
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    cartCount: cart.length
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);