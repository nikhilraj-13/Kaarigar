import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const FREE_SHIPPING_THRESHOLD = 2500;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('kaarigar_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'khurja-speckled-kulhad-set',
          name: 'Speckled Terracotta Chai Kulhad Set (Pack of 4)',
          price: 1450,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=300&q=80',
          artisanName: 'Pandit Ramesh Sharma',
          location: 'Khurja, UP'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('kaarigar_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.primaryImage || product.image,
            artisanName: product.artisanName,
            location: product.location
          }
        ];
      }
    });
    setIsDrawerOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SLOWCRAFT10' || cleanCode === 'ARTISAN10') {
      setDiscountPercent(10);
      setCouponSuccess('✨ 10% Slow Craft Discount Applied!');
      setCouponError('');
      return true;
    } else if (cleanCode === 'KAARIGAR15') {
      setDiscountPercent(15);
      setCouponSuccess('🏺 15% First Batch Collector Discount Applied!');
      setCouponError('');
      return true;
    } else {
      setCouponError('Invalid code. Try "SLOWCRAFT10" or "KAARIGAR15"');
      setCouponSuccess('');
      return false;
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 150;
  const total = subtotal - discountAmount + shippingFee;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        isDrawerOpen,
        setIsDrawerOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discountPercent,
        discountAmount,
        shippingFee,
        total,
        totalItems,
        freeShippingProgress,
        amountNeededForFreeShipping,
        FREE_SHIPPING_THRESHOLD,
        coupon,
        setCoupon,
        couponError,
        couponSuccess,
        applyCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
