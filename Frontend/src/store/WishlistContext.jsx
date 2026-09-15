import React, { createContext, useContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kaarigar_wishlist');
      return saved ? JSON.parse(saved) : ['khurja-speckled-kulhad-set', 'dhokra-brass-tribal-dancer'];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('kaarigar_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const toggleWishlist = (productId, productName = 'Craft item') => {
    setWishlist(prev => {
      const isAlready = prev.includes(productId);
      if (isAlready) {
        showToast(`Removed "${productName}" from your craft wishlist`);
        return prev.filter(id => id !== productId);
      } else {
        showToast(`❤️ Added "${productName}" to your craft wishlist!`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
        toastMessage
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal-800 text-cream-50 px-5 py-3 rounded-full border-2 border-clay-500 shadow-brutal text-sm font-medium animate-bounce flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}
    </WishlistContext.Provider>
  );
};
