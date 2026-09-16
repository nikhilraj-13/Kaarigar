import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Sparkles, UserCheck } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

export const Navbar = ({ onOpenSearch, onOpenSellerModal }) => {
  const { totalItems, setIsDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b-2 border-charcoal-800 transition-all">
      <div className="bg-clay-500 text-cream-50 text-xs font-bold py-1.5 px-4 text-center border-b border-charcoal-800 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-mustard-400 animate-spin-slow" />
        <span>Slow Crafted Spring Batch #4 Freshly Fired • 100% Direct Master Artisan Payout</span>
        <Sparkles className="w-3.5 h-3.5 text-mustard-400 animate-spin-slow hidden sm:inline" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-clay-500 border-2 border-charcoal-800 shadow-brutal flex items-center justify-center text-xl sm:text-2xl group-hover:-rotate-6 transition-transform">
            🏺
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black text-2xl sm:text-3xl text-charcoal-900 tracking-tight">
                Kaarigar
              </span>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-mustard-400 border border-charcoal-800 px-1.5 py-0.5 rounded shadow-brutal-sm text-charcoal-900">
                कारीगर
              </span>
            </div>
            <p className="text-[10px] font-bold text-clay-700 uppercase tracking-widest -mt-1 hidden sm:block">
              Slow Artisan Marketplace
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/products"
            className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
              location.pathname === '/products'
                ? 'bg-clay-100 text-clay-700 border-2 border-charcoal-800 shadow-brutal-sm'
                : 'text-charcoal-800 hover:bg-cream-100'
            }`}
          >
            Explore Crafts
          </Link>
          <a
            href="/#artisans"
            className="px-3.5 py-2 rounded-xl text-sm font-bold text-charcoal-800 hover:bg-cream-100 transition-colors"
          >
            Master Artisans
          </a>
          <a
            href="/#stories"
            className="px-3.5 py-2 rounded-xl text-sm font-bold text-charcoal-800 hover:bg-cream-100 transition-colors"
          >
            Craft Stories
          </a>
          <a
            href="/#manifesto"
            className="px-3.5 py-2 rounded-xl text-sm font-bold text-charcoal-800 hover:bg-cream-100 transition-colors"
          >
            Our Slow Manifesto
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2.5 sm:px-3.5 sm:py-2 rounded-xl bg-white border-2 border-charcoal-800 shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm font-bold text-charcoal-800"
            aria-label="Search handmade products"
          >
            <Search className="w-4 h-4 text-clay-600" />
            <span className="hidden md:inline text-xs text-charcoal-600">Search craft or maker...</span>
            <kbd className="hidden md:inline text-[10px] bg-cream-100 px-1.5 py-0.5 rounded border border-charcoal-300 font-mono">⌘K</kbd>
          </button>

          <button
            onClick={onOpenSellerModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-forest-600 text-cream-50 border-2 border-charcoal-800 shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all text-xs font-bold"
          >
            <UserCheck className="w-3.5 h-3.5 text-mustard-400" />
            <span>Join as Maker</span>
          </button>

          <Link
            to="/wishlist"
            className="relative p-2.5 sm:p-2.5 rounded-xl bg-white border-2 border-charcoal-800 shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all text-charcoal-800"
            aria-label="View Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-clay-500 text-clay-500' : 'text-charcoal-800'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-clay-500 text-white text-[10px] font-black w-5 h-5 rounded-full border border-charcoal-800 flex items-center justify-center shadow-brutal-sm animate-pulse">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-clay-500 text-cream-50 border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 font-bold text-sm"
            aria-label="Open Cart Drawer"
          >
            <ShoppingBag className="w-5 h-5 text-mustard-400" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-mustard-400 text-charcoal-900 text-xs font-black px-2 py-0.5 rounded-full border border-charcoal-800 shadow-brutal-sm">
              {totalItems}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
