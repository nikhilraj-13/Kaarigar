import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Leaf, Flame, Star, Check } from 'lucide-react';
import { HeroSection } from '../components/hero/HeroSection';
import { Marquee } from '../components/common/Marquee';
import { ProductCard } from '../components/products/ProductCard';
import { FeaturedArtisans } from '../components/artisans/FeaturedArtisans';
import { ArtisanStoryReels } from '../components/artisans/ArtisanStoryReels';
import { api } from '../api/client';

export const HomePage = ({ onOpenSellerModal }) => {
  const [products, setProducts] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stories, setStories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodData, artData, catData, storyData, testData] = await Promise.all([
          api.getProducts(),
          api.getArtisans(),
          api.getCategories(),
          api.getStories(),
          api.getTestimonials()
        ]);

        setProducts(prodData || []);
        setArtisans(artData || []);
        setCategories(catData || []);
        setStories(storyData || []);
        setTestimonials(testData || []);
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-0">
      {/* 3D Hero */}
      <HeroSection onOpenSellerModal={onOpenSellerModal} />

      {/* Infinite Ticker */}
      <Marquee />

      {/* Category Pills & Featured Grid */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clay-100 text-clay-800 border-2 border-charcoal-800 shadow-brutal-sm text-xs font-black uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-clay-600" />
                <span>Small Batch Releases</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-serif text-charcoal-900 tracking-tight">
                Slow-Fired Craft Releases
              </h2>
              <p className="text-sm sm:text-base text-charcoal-600 font-medium max-w-xl mt-1">
                Every piece is shaped by generational hand tools and wood kilns. No two objects are identical.
              </p>
            </div>

            <Link
              to="/products"
              className="self-start md:self-auto px-5 py-2.5 rounded-2xl bg-white text-charcoal-900 font-black text-sm border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg transition-all flex items-center gap-2"
            >
              <span>Explore All {products.length} Works</span>
              <ArrowRight className="w-4 h-4 text-clay-600" />
            </Link>
          </div>

          {/* Category Filter Badges */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold border-2 border-charcoal-800 transition-all shrink-0 flex items-center gap-2 ${
                    isActive
                      ? 'bg-clay-500 text-cream-50 shadow-brutal translate-x-[1px] translate-y-[1px]'
                      : 'bg-white text-charcoal-800 shadow-brutal-sm hover:bg-cream-100'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-16 bg-white rounded-3xl border-2 border-charcoal-800 shadow-brutal">
              <p className="font-serif font-bold text-lg text-charcoal-800">No items available in this category currently.</p>
              <p className="text-xs text-charcoal-500 mt-1">New batches are fired weekly by our master potters and weavers.</p>
            </div>
          )}
        </div>
      </section>

      {/* Craft Process Stories Reel */}
      <ArtisanStoryReels stories={stories} />

      {/* Featured Master Artisans */}
      <FeaturedArtisans artisans={artisans} />

      {/* The Slow Manifesto Section */}
      <section id="manifesto" className="py-16 md:py-24 bg-forest-600 text-cream-50 border-b-2 border-charcoal-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-mustard-400 text-charcoal-900 border-2 border-charcoal-800 shadow-brutal text-xs font-black uppercase tracking-wider">
              ✦ The Kaarigar Slow Living Manifesto ✦
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight leading-tight">
              We reject industrial monotony in favor of human soul.
            </h2>

            <p className="text-forest-100 text-base sm:text-lg font-medium leading-relaxed">
              When an object is made by human hands over days of patient labor, it carries a vibration no injection mold or assembly robot can ever replicate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
            <div className="p-6 rounded-3xl bg-forest-700/80 border-2 border-charcoal-900 shadow-brutal space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-mustard-400 text-charcoal-900 border-2 border-charcoal-900 flex items-center justify-center font-black text-xl">
                82%
              </div>
              <h3 className="font-serif font-black text-xl text-white">Direct Maker Share</h3>
              <p className="text-xs text-forest-100 font-medium leading-relaxed">
                Middlemen routinely take 70-80% of artisan profits in traditional retail. We flip the formula: over 82% of every rupee reaches the artisan household bank account directly.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-forest-700/80 border-2 border-charcoal-900 shadow-brutal space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-clay-500 text-white border-2 border-charcoal-900 flex items-center justify-center font-black text-xl">
                0%
              </div>
              <h3 className="font-serif font-black text-xl text-white">Zero Single-Use Plastic</h3>
              <p className="text-xs text-forest-100 font-medium leading-relaxed">
                Every fragile ceramic and brass piece is protected by interlocking recycled honeycomb kraft paper, dried banana stem twine, and unbleached cotton pouches.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-forest-700/80 border-2 border-charcoal-900 shadow-brutal space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cream-100 text-charcoal-900 border-2 border-charcoal-900 flex items-center justify-center font-black text-xl">
                GI
              </div>
              <h3 className="font-serif font-black text-xl text-white">Geographical Authenticity</h3>
              <p className="text-xs text-forest-100 font-medium leading-relaxed">
                We strictly partner with certified generational masters practicing registered Geographical Indication (GI) techniques — Khurja clay, Bastar Dhokra, Bagru Dabu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews / Testimonials */}
      <section className="py-16 md:py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-charcoal-900">
              Honest Words from Conscious Collectors
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 font-medium mt-1">
              Architects, curators, and slow-living homes across India and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-3xl bg-white border-2 border-charcoal-800 shadow-brutal flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-mustard-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-mustard-400" />
                    ))}
                  </div>
                  <p className="text-xs text-charcoal-700 font-medium leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-charcoal-200 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full border-2 border-charcoal-800 object-cover"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-xs text-charcoal-900">{t.author}</h4>
                    <p className="text-[10px] text-charcoal-500 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
