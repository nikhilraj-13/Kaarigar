import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/modals/SearchModal';
import { SellerModal } from './components/modals/SellerModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ArtisanProfilePage } from './pages/ArtisanProfilePage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-charcoal-800 antialiased selection:bg-clay-500 selection:text-white">
      {/* Navbar with callbacks for Search & Seller modal */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSellerModal={() => setIsSellerModalOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenSellerModal={() => setIsSellerModalOpen(true)} />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/artisan/:id" element={<ArtisanProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="*" element={<HomePage onOpenSellerModal={() => setIsSellerModalOpen(true)} />} />
        </Routes>
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Global Overlays & Modals */}
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <SellerModal isOpen={isSellerModalOpen} onClose={() => setIsSellerModalOpen(false)} />
    </div>
  );
}

export default App;
