import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export const CartDrawer = () => {
  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    freeShippingProgress,
    amountNeededForFreeShipping,
    coupon,
    setCoupon,
    couponError,
    couponSuccess,
    applyCoupon
  } = useCart();

  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon) {
      applyCoupon(coupon);
    }
  };

  const handleProceedCheckout = () => {
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-cream-50 border-l-2 border-charcoal-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b-2 border-charcoal-800 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏺</span>
                <div>
                  <h2 className="font-serif font-black text-xl text-charcoal-900">Your Craft Bag</h2>
                  <p className="text-xs text-charcoal-500 font-bold">{cart.length} unique batch item{cart.length === 1 ? '' : 's'}</p>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-9 h-9 rounded-xl border-2 border-charcoal-800 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center text-charcoal-800 bg-cream-100"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping banner */}
            <div className="p-4 bg-clay-50 border-b border-charcoal-300">
              <div className="flex items-center justify-between text-xs font-bold text-charcoal-800 mb-1.5">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-clay-600" />
                  {amountNeededForFreeShipping > 0
                    ? `Add ₹${amountNeededForFreeShipping.toLocaleString()} for Free Plastic-Free Shipping`
                    : '🎉 You unlocked Free Zero-Plastic Shipping!'}
                </span>
                <span className="font-mono">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-cream-200 h-2 rounded-full overflow-hidden border border-charcoal-800">
                <div
                  className="bg-clay-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-3xl bg-cream-200 border-2 border-charcoal-800 shadow-brutal flex items-center justify-center text-4xl">
                    🧺
                  </div>
                  <h3 className="font-serif font-black text-xl text-charcoal-900">Your craft bag is empty</h3>
                  <p className="text-xs text-charcoal-600 max-w-xs font-medium">
                    Every piece in our marketplace is fired and hand-carved in micro-batches by certified master artisans.
                  </p>
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      navigate('/products');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-clay-500 text-cream-50 font-black text-sm border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg transition-all"
                  >
                    Discover Living Crafts
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3.5 rounded-2xl bg-white border-2 border-charcoal-800 shadow-brutal-sm flex gap-3 relative"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover border border-charcoal-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-charcoal-900 line-clamp-1 leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-clay-700 font-bold mt-0.5">
                          By {item.artisanName || 'Master Maker'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-charcoal-200">
                        <span className="font-black text-sm text-charcoal-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center border-2 border-charcoal-800 rounded-lg bg-cream-50 overflow-hidden shadow-brutal-sm">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-cream-200 text-charcoal-800 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold text-charcoal-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-cream-200 text-charcoal-800 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 text-charcoal-400 hover:text-clay-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t-2 border-charcoal-800 bg-white space-y-3">
                {/* Coupon input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-3 text-charcoal-400" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon (e.g. SLOWCRAFT10)"
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono uppercase bg-cream-50 border-2 border-charcoal-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-mustard-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-mustard-400 text-charcoal-900 font-black text-xs border-2 border-charcoal-800 shadow-brutal-sm hover:shadow-none transition-all"
                  >
                    Apply
                  </button>
                </form>

                {couponSuccess && <p className="text-[11px] font-bold text-forest-700">{couponSuccess}</p>}
                {couponError && <p className="text-[11px] font-bold text-clay-700">{couponError}</p>}

                {/* Pricing table */}
                <div className="space-y-1.5 text-xs font-semibold text-charcoal-600 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-charcoal-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-forest-700 font-bold">
                      <span>Artisan Discount</span>
                      <span className="font-mono">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Zero-Plastic Packaging & Shipping</span>
                    <span className="font-mono font-bold">
                      {shippingFee === 0 ? <span className="text-forest-700">FREE</span> : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-charcoal-900 pt-2 border-t border-charcoal-200">
                    <span>Final Amount</span>
                    <span className="font-mono text-clay-700">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleProceedCheckout}
                    className="w-full py-3.5 rounded-2xl bg-clay-500 text-cream-50 font-black text-sm border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Direct Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal-500 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
                  <span>82% directly credited to artisan bank accounts</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
