import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col bg-white rounded-3xl border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1.5 transition-all duration-200 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] sm:aspect-square bg-cream-100 overflow-hidden border-b-2 border-charcoal-800">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.primaryImage}
            alt={product.name}
            className={`w-full h-full object-cover object-center transition-all duration-500 ${
              isHovered && product.hoverImage ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
            }`}
            loading="lazy"
          />

          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={`${product.name} lifestyle`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ${
                isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0 pointer-events-none'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-mustard-400 text-charcoal-900 border-2 border-charcoal-800 shadow-brutal-sm text-[11px] font-black uppercase tracking-wider">
              <span>✦</span>
              <span>{product.badges[0]}</span>
            </span>
          </div>
        )}

        <motion.button
          onClick={handleWishlist}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.15 }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm border-2 border-charcoal-800 shadow-brutal-sm flex items-center justify-center transition-all"
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <motion.div
            animate={isFavorite ? { scale: [1, 1.35, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-clay-500 text-clay-500' : 'text-charcoal-800 hover:text-clay-500'
              }`}
            />
          </motion.div>
        </motion.button>

        <div
          className={`absolute bottom-3 inset-x-3 z-10 transition-all duration-300 transform ${
            isHovered
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0 pointer-events-none sm:translate-y-4'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-2xl font-black text-xs sm:text-sm border-2 border-charcoal-800 shadow-brutal transition-all flex items-center justify-center gap-2 ${
              isAdding
                ? 'bg-forest-600 text-cream-50'
                : 'bg-clay-500 hover:bg-clay-600 text-cream-50 active:translate-y-0.5'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-mustard-400" />
                <span>Quick Add to Bag • ₹{product.price.toLocaleString()}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-charcoal-500 font-bold mb-1">
            <span className="text-clay-600 uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1 text-charcoal-800">
              <Star className="w-3.5 h-3.5 fill-mustard-400 text-mustard-500" />
              <span>{product.rating}</span>
              <span className="text-charcoal-400">({product.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`} className="block group-hover:text-clay-600 transition-colors">
            <h3 className="font-serif font-black text-base sm:text-lg text-charcoal-900 leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-charcoal-600 line-clamp-2 mt-1 font-medium">
            {product.tagline}
          </p>
        </div>

        <div className="pt-2 border-t border-charcoal-200 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-black text-lg sm:text-xl text-charcoal-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs font-bold text-charcoal-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-forest-700 bg-forest-50 px-1.5 py-0.5 rounded">
              Direct Maker Payout
            </span>
          </div>

          <Link
            to={`/artisan/${product.artisanId}`}
            className="flex items-center gap-2 group/artisan pl-2"
            title={`Crafted by ${product.artisanName}`}
          >
            <img
              src={product.artisanAvatar}
              alt={product.artisanName}
              className="w-8 h-8 rounded-full border-2 border-charcoal-800 object-cover group-hover/artisan:scale-110 transition-transform"
            />
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-bold text-charcoal-900 leading-tight group-hover/artisan:text-clay-600">
                {product.artisanName?.split(' ')[0]}
              </p>
              <p className="text-[9px] text-charcoal-500 font-medium leading-tight">
                {product.location?.split(',')[0]}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
