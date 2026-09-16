import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { api } from '../../api/client';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      api.getProducts().then((res) => {
        setAllProducts(res || []);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts(allProducts.slice(0, 4));
    } else {
      const q = query.toLowerCase();
      const matches = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.artisanName?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q)
      );
      setFilteredProducts(matches);
    }
  }, [query, allProducts]);

  const handleSelect = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSearchAll = (e) => {
    e.preventDefault();
    onClose();
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-cream-50 rounded-3xl border-2 border-charcoal-800 shadow-2xl overflow-hidden z-10"
        >
          <form onSubmit={handleSearchAll} className="relative p-4 sm:p-5 border-b-2 border-charcoal-800 bg-white flex items-center gap-3">
            <Search className="w-5 h-5 text-clay-600 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by craft, pottery, terracotta, weaver name, or village..."
              className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-cream-100 text-charcoal-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </form>

          <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-charcoal-500 uppercase tracking-wider">
              <span>{query ? `Results (${filteredProducts.length})` : 'Popular Handcrafted Searches'}</span>
              <span className="flex items-center gap-1 text-clay-600">
                <Sparkles className="w-3 h-3" />
                Slow Verified
              </span>
            </div>

            <div className="space-y-2.5">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className="p-3 rounded-2xl bg-white border-2 border-charcoal-800 shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.primaryImage}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover border border-charcoal-800 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-sm text-charcoal-900 group-hover:text-clay-600 transition-colors truncate">
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-charcoal-500 font-medium mt-0.5">
                        <span className="text-clay-700 font-bold">{p.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5" />
                          {p.location?.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono font-black text-sm text-charcoal-900">
                      ₹{p.price.toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:text-clay-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="p-8 text-center space-y-2">
                  <p className="text-sm font-bold text-charcoal-800">No handcrafted items match "{query}"</p>
                  <p className="text-xs text-charcoal-500">Try searching for "terracotta", "indigo", "walnut", or "khurja".</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-cream-100 border-t border-charcoal-300 flex items-center justify-between text-xs font-bold text-charcoal-600 px-5">
            <span>Press <kbd className="bg-white border border-charcoal-400 rounded px-1.5 py-0.5 font-mono text-[10px]">ESC</kbd> to close</span>
            <button
              onClick={handleSearchAll}
              className="text-clay-700 hover:underline flex items-center gap-1 font-black"
            >
              <span>View all matching craft listings</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
