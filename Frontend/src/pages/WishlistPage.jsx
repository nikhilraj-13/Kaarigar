import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { ProductCard } from '../components/products/ProductCard';
import { api } from '../api/client';

export const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts().then((res) => {
      setAllProducts(res || []);
      setLoading(false);
    });
  }, []);

  const savedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    savedProducts.forEach((p) => addToCart(p, 1));
  };

  return (
    <div className="py-10 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b-2 border-charcoal-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clay-100 text-clay-800 border-2 border-charcoal-800 shadow-brutal-sm text-xs font-black uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 fill-clay-500 text-clay-500" />
              <span>Curated Wishlist</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif text-charcoal-900">
              Saved Living Crafts ({savedProducts.length})
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="px-4 py-2.5 rounded-xl bg-white border-2 border-charcoal-800 shadow-brutal text-xs font-bold text-charcoal-700 hover:text-clay-600 transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>

              <button
                onClick={handleAddAllToCart}
                className="px-5 py-2.5 rounded-xl bg-clay-500 text-cream-50 border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg transition-all text-xs font-black flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-mustard-400" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="p-12 sm:p-16 text-center bg-white rounded-3xl border-2 border-charcoal-800 shadow-brutal max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-clay-100 border-2 border-charcoal-800 shadow-brutal flex items-center justify-center text-3xl mx-auto">
              🏺
            </div>
            <h3 className="font-serif font-black text-2xl text-charcoal-900">
              No saved crafts yet
            </h3>
            <p className="text-xs text-charcoal-600 font-medium">
              Click the heart icon on any slow-made pottery, handloom drape, or brass sculpture to keep track of your favorite artisan creations.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="px-6 py-3 rounded-2xl bg-clay-500 text-cream-50 font-black text-sm border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg inline-flex items-center gap-2 transition-all"
              >
                <span>Discover Crafts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
