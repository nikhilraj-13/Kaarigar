import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Award, Sparkles, ShieldCheck, ArrowLeft, Star } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import { api } from '../api/client';

export const ArtisanProfilePage = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtisan() {
      setLoading(true);
      try {
        const artData = await api.getArtisan(id);
        const allProducts = await api.getProducts();

        setArtisan(artData);
        setProducts(allProducts.filter((p) => p.artisanId === id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadArtisan();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="w-12 h-12 rounded-full bg-clay-500 animate-spin flex items-center justify-center text-white">
          🏺
        </div>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50 p-4 text-center">
        <h2 className="font-serif font-black text-2xl text-charcoal-900 mb-2">Master Artisan Not Found</h2>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-xl bg-clay-500 text-cream-50 font-black text-xs border-2 border-charcoal-800 shadow-brutal"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-charcoal-700 hover:text-clay-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        {/* Master Artisan Banner */}
        <div className="bg-white rounded-3xl border-2 border-charcoal-800 shadow-brutal-lg overflow-hidden">
          <div className="relative h-64 sm:h-80 bg-charcoal-900 overflow-hidden">
            <img
              src={artisan.coverImage}
              alt={artisan.name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-transparent" />

            <div className="absolute top-4 right-4 bg-mustard-400 text-charcoal-900 border-2 border-charcoal-800 px-3.5 py-1.5 rounded-xl shadow-brutal text-xs font-black uppercase tracking-wider">
              {artisan.generation}
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div className="flex items-center gap-4">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-4 border-white object-cover shadow-2xl shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif font-black text-2xl sm:text-4xl text-white">
                      {artisan.name}
                    </h1>
                    <span className="text-xs bg-forest-600 text-cream-50 px-2 py-0.5 rounded font-mono font-bold">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-mustard-300 font-bold flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{artisan.location}</span>
                    <span>•</span>
                    <span>{artisan.experience}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                <Star className="w-5 h-5 fill-mustard-400 text-mustard-400" />
                <div>
                  <span className="font-mono font-black text-white text-base">{artisan.rating}</span>
                  <span className="text-[11px] text-cream-200 block">({artisan.reviewsCount} verified reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clay-100 text-clay-800 border border-charcoal-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-clay-600" />
                <span>{artisan.craft}</span>
              </div>

              <p className="text-sm sm:text-base text-charcoal-700 font-medium leading-relaxed">
                {artisan.bio}
              </p>

              <blockquote className="p-4 rounded-2xl bg-cream-100 border-l-4 border-clay-500 italic text-sm font-semibold text-charcoal-800">
                "{artisan.quote}"
              </blockquote>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-2xl bg-forest-50 border-2 border-charcoal-800 shadow-brutal-sm space-y-2">
                <h4 className="font-serif font-black text-sm text-forest-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-forest-600" />
                  Recognitions & Guild Honors
                </h4>
                {artisan.awards?.map((award, i) => (
                  <p key={i} className="text-xs font-bold text-forest-800 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                    <span>{award}</span>
                  </p>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-charcoal-300 text-xs text-charcoal-600 space-y-1">
                <span className="font-bold text-charcoal-800 block">Workshop Specialty:</span>
                <p>{artisan.specialty}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Artisan Product Works */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-charcoal-900">
              Active Batch Works by {artisan.name} ({products.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
