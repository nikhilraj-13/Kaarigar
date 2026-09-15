import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, SlidersHorizontal, ArrowUpDown, X, Filter } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import { api } from '../api/client';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(6000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodData, catData] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        setProducts(prodData || []);
        setCategories(catData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    const loc = searchParams.get('location');
    const q = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (loc) setSelectedLocation(loc);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Extract unique locations
  const locations = ['all', ...new Set(products.map((p) => p.location?.split(',')[0]).filter(Boolean))];

  // Filtering
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (selectedLocation !== 'all' && !product.location?.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
    if (product.price > priceRange) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.tagline?.toLowerCase().includes(q);
      const matchArtisan = product.artisanName?.toLowerCase().includes(q);
      const matchLoc = product.location?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchArtisan && !matchLoc) return false;
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSearchQuery('');
    setPriceRange(6000);
    setSearchParams({});
  };

  return (
    <div className="py-10 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b-2 border-charcoal-800 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mustard-300 text-charcoal-900 border-2 border-charcoal-800 shadow-brutal-sm text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Micro-Batch Craft Catalogue</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-serif text-charcoal-900">
                Explore All Living Crafts
              </h1>
              <p className="text-sm text-charcoal-600 font-medium mt-1">
                Showing {sortedProducts.length} authentic slow-crafted piece{sortedProducts.length === 1 ? '' : 's'}
              </p>
            </div>

            {/* Sort and mobile filter button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden px-4 py-2.5 rounded-xl bg-white border-2 border-charcoal-800 shadow-brutal text-xs font-black flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-clay-600" />
                <span>Filters</span>
              </button>

              <div className="relative flex items-center">
                <ArrowUpDown className="w-4 h-4 absolute left-3.5 text-charcoal-500 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-9 pr-8 py-2.5 rounded-xl bg-white border-2 border-charcoal-800 shadow-brutal text-xs font-bold text-charcoal-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Sort by: Curated Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Artisan Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:col-span-3 space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="p-5 rounded-3xl bg-white border-2 border-charcoal-800 shadow-brutal space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
                <span className="font-serif font-black text-base text-charcoal-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-clay-600" />
                  Filter Crafts
                </span>
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-clay-600 hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Search query in filter */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Search Keywords
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Kulhad, Indigo, Walnut"
                  className="w-full px-3 py-2 text-xs font-medium bg-cream-50 border-2 border-charcoal-800 rounded-xl focus:outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
                  Craft Category
                </label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-clay-500 text-cream-50 border-2 border-charcoal-800 shadow-brutal-sm'
                          : 'text-charcoal-700 hover:bg-cream-100'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
                  <span>Max Price</span>
                  <span className="font-mono text-clay-700">₹{priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="6000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-clay-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-charcoal-400 font-mono mt-1">
                  <span>₹800</span>
                  <span>₹6,000</span>
                </div>
              </div>

              {/* Artisan Location */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
                  Craft Cluster Region
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                        selectedLocation === loc
                          ? 'bg-forest-600 text-cream-50 border-charcoal-800 shadow-brutal-sm'
                          : 'bg-cream-100 text-charcoal-700 border-charcoal-300 hover:bg-white'
                      }`}
                    >
                      {loc === 'all' ? 'All Clusters' : loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border-2 border-charcoal-800 shadow-brutal space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-200 border-2 border-charcoal-800 shadow-brutal-sm flex items-center justify-center text-3xl mx-auto">
                  🔍
                </div>
                <h3 className="font-serif font-black text-xl text-charcoal-900">
                  No crafts match your filter criteria
                </h3>
                <p className="text-xs text-charcoal-600 max-w-sm mx-auto font-medium">
                  Try adjusting the price range, resetting the category, or searching for other traditional Indian techniques.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 rounded-xl bg-clay-500 text-cream-50 font-black text-xs border-2 border-charcoal-800 shadow-brutal"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
