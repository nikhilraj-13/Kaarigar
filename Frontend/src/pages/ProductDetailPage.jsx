import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  Star,
  Sparkles,
  ShieldCheck,
  Leaf,
  Check,
  MapPin,
  Clock,
  Box,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { ProductCard } from '../components/products/ProductCard';
import { api } from '../api/client';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState('process');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const data = await api.getProduct(id);
        if (data) {
          setProduct(data);
          setSelectedImage(data.primaryImage);

          const all = await api.getProducts();
          const related = all.filter((p) => p.id !== data.id && p.category === data.category).slice(0, 3);
          setRelatedProducts(related.length ? related : all.filter((p) => p.id !== data.id).slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-clay-500 border-2 border-charcoal-800 shadow-brutal flex items-center justify-center text-3xl animate-bounce mx-auto">
            🏺
          </div>
          <p className="font-serif font-black text-charcoal-900 text-lg">Fetching Craft Heritage Notes...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50 p-4 text-center">
        <h2 className="font-serif font-black text-2xl text-charcoal-900 mb-2">Living Craft Not Found</h2>
        <p className="text-xs text-charcoal-600 mb-4">This piece may have completed its kiln batch release.</p>
        <Link
          to="/products"
          className="px-6 py-2.5 rounded-xl bg-clay-500 text-cream-50 font-black text-xs border-2 border-charcoal-800 shadow-brutal"
        >
          Explore Other Crafts
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 800);
  };

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.primaryImage, product.hoverImage].filter(Boolean);

  return (
    <div className="py-8 sm:py-12 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-charcoal-700 hover:text-clay-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-square bg-cream-100 rounded-3xl border-2 border-charcoal-800 shadow-brutal-lg overflow-hidden">
              <img
                src={selectedImage || product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {product.badges && product.badges.length > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mustard-400 text-charcoal-900 border-2 border-charcoal-800 shadow-brutal-sm text-xs font-black uppercase tracking-wider">
                    <span>✦</span>
                    <span>{product.badges[0]}</span>
                  </span>
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product.id, product.name)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm border-2 border-charcoal-800 shadow-brutal-sm flex items-center justify-center transition-all hover:scale-110"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? 'fill-clay-500 text-clay-500' : 'text-charcoal-800'
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail carousel */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-clay-500 ring-2 ring-clay-500 shadow-brutal-sm'
                        : 'border-charcoal-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Direct Artisan Connection Box */}
            <div className="p-6 rounded-3xl bg-white border-2 border-charcoal-800 shadow-brutal space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={product.artisanAvatar}
                    alt={product.artisanName}
                    className="w-14 h-14 rounded-2xl border-2 border-charcoal-800 object-cover"
                  />
                  <div>
                    <h4 className="font-serif font-black text-lg text-charcoal-900">
                      {product.artisanName}
                    </h4>
                    <p className="text-xs text-charcoal-600 font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-clay-600" />
                      <span>{product.location}</span>
                    </p>
                  </div>
                </div>

                <Link
                  to={`/artisan/${product.artisanId}`}
                  className="px-4 py-2 rounded-xl bg-cream-100 text-charcoal-900 font-black text-xs border-2 border-charcoal-800 shadow-brutal-sm hover:shadow-none transition-all"
                >
                  Maker Story & Bio
                </Link>
              </div>

              <div className="p-3.5 rounded-2xl bg-forest-50 border border-forest-200 text-xs font-bold text-forest-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-forest-600 shrink-0" />
                <span>82% Direct Maker Share: ₹{Math.round(product.price * 0.82).toLocaleString()} is credited directly to {product.artisanName}.</span>
              </div>
            </div>
          </div>

          {/* Details & Purchase Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-charcoal-500 font-bold mb-2">
                <span className="text-clay-600 uppercase tracking-wider">{product.category}</span>
                <div className="flex items-center gap-1.5 text-charcoal-800">
                  <Star className="w-4 h-4 fill-mustard-400 text-mustard-500" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-charcoal-400">({product.reviewsCount} collector reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black font-serif text-charcoal-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-sm font-medium text-charcoal-600 mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-cream-100 border-2 border-charcoal-800 shadow-brutal-sm flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif font-black text-3xl text-charcoal-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-bold text-charcoal-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-charcoal-500 font-bold mt-0.5">
                  Inclusive of all handcrafted artisan taxes & zero-plastic shipping box
                </p>
              </div>

              {product.stock && product.stock <= 5 && (
                <span className="bg-clay-500 text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-charcoal-800 animate-pulse">
                  Only {product.stock} Left in Batch
                </span>
              )}
            </div>

            {/* Quantity and Add to Bag */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex items-center border-2 border-charcoal-800 rounded-2xl bg-white shadow-brutal-sm px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-charcoal-800 hover:text-clay-600 font-black text-lg"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono font-black text-sm text-charcoal-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-charcoal-800 hover:text-clay-600 font-black text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-6 rounded-2xl font-black text-base border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg active:translate-y-0.5 transition-all flex items-center justify-center gap-2 ${
                    isAdding
                      ? 'bg-forest-600 text-cream-50'
                      : 'bg-clay-500 hover:bg-clay-600 text-cream-50'
                  }`}
                >
                  {isAdding ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-mustard-400" />
                      <span>Add to Bag • ₹{(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-charcoal-700 pt-2">
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-charcoal-300">
                  <Clock className="w-4 h-4 text-clay-600 shrink-0" />
                  <span>{product.leadTime || 'Ships in 48h'}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-charcoal-300">
                  <Leaf className="w-4 h-4 text-forest-600 shrink-0" />
                  <span>Plastic-Free Box</span>
                </div>
              </div>
            </div>

            {/* Craft Tabs */}
            <div className="space-y-3 pt-4 border-t-2 border-charcoal-800">
              <div className="flex gap-2 border-b border-charcoal-300 pb-2">
                <button
                  onClick={() => setActiveTab('process')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'process'
                      ? 'bg-charcoal-900 text-cream-50 shadow-brutal-sm'
                      : 'text-charcoal-600 hover:bg-cream-100'
                  }`}
                >
                  Crafting Process
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'specs'
                      ? 'bg-charcoal-900 text-cream-50 shadow-brutal-sm'
                      : 'text-charcoal-600 hover:bg-cream-100'
                  }`}
                >
                  Materials & Dimensions
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'care'
                      ? 'bg-charcoal-900 text-cream-50 shadow-brutal-sm'
                      : 'text-charcoal-600 hover:bg-cream-100'
                  }`}
                >
                  Slow Care
                </button>
              </div>

              <div className="text-xs sm:text-sm text-charcoal-700 font-medium leading-relaxed p-4 bg-white rounded-2xl border-2 border-charcoal-800 shadow-brutal-sm">
                {activeTab === 'process' && (
                  <div className="space-y-2">
                    <p>{product.description}</p>
                    {product.craftingProcess && (
                      <p className="pt-2 border-t border-charcoal-200 text-charcoal-600 italic">
                        <strong>Technique:</strong> {product.craftingProcess}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    <p><strong>Primary Material:</strong> {product.material}</p>
                    <p><strong>Dimensions & Scale:</strong> {product.dimensions}</p>
                    <p><strong>Kiln Batch:</strong> {product.batchNo}</p>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="space-y-2">
                    <p>{product.careInstructions}</p>
                    <p className="text-clay-700 font-bold">Guaranteed Safe Arrival: Any transport breakage is replaced instantly with no return shipping fee.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Crafts Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t-2 border-charcoal-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-charcoal-900">
                More Living Crafts in {product.category}
              </h3>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-black text-clay-700 hover:underline"
              >
                View Category
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
