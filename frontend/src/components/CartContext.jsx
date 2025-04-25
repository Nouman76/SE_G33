import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
useEffect(() => {
  const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  };

  
  checkLoginStatus();

  window.addEventListener('storage', checkLoginStatus);
  return () => window.removeEventListener('storage', checkLoginStatus);
}, []);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        localStorage.removeItem("cart");
      }
    }
    setIsInitialized(true);
  }, []);
  const resetCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart"); 
  };
  
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product) => {
    if (loading) return;
    setLoading(true);

    setCartItems((prev) => {
      const productId = product._id || product.id;
      const existingProduct = prev.find((item) => 
        (item._id === productId) || (item.id === productId)
      );

      if (existingProduct) {
        return prev.map((item) =>
          (item._id === productId || item.id === productId)
            ? { ...item, qty: (item.qty || 0) + 1 }
            : item
        );
      } else {
        return [...prev, { 
          ...product, 
          id: productId,
          _id: productId,
          qty: 1 
        }];
      }
    });

    setLoading(false);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => 
      prev.filter((item) => item._id !== id && item.id !== id)
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        loading,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};