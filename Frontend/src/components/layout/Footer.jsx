import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, HeartHandshake, Leaf, ShieldCheck, PackageCheck, Send } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="mt-20 border-t-2 border-charcoal-800 bg-cream-100 text-charcoal-800">
      <div className="bg-clay-500 text-cream-50 border-b-2 border-charcoal-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mustard-400 text-charcoal-900 border-2 border-charcoal-800 shadow-brutal text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            The Slow Craft Circle
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight leading-tight max-w-3xl mx-auto text-balance">
            Stories from the kiln, before they hit the shelves.
          </h2>

          <p className="mt-4 text-cream-100 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Get early access to limited batch firings, master artisan workshop tour videos, and zero-spam slow letters.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your personal email..."
              required
              className="flex-1 px-4 py-3.5 rounded-2xl bg-white text-charcoal-800 border-2 border-charcoal-800 shadow-brutal placeholder:text-charcoal-400 font-medium focus:outline-none focus:ring-2 focus:ring-mustard-400 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-mustard-400 text-charcoal-900 border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-0.5 active:translate-y-0 transition-all font-black text-sm flex items-center justify-center gap-2"
            >
              <span>{subscribed ? 'Subscribed! 🏺' : 'Join Circle'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {subscribed && (
            <p className="mt-3 text-xs font-bold text-mustard-200">
              Welcome to the family. Your slow welcome gift is on its way.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b-2 border-charcoal-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border-2 border-charcoal-800 shadow-brutal">
            <div className="w-10 h-10 rounded-xl bg-clay-100 border border-charcoal-800 flex items-center justify-center text-clay-600 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal-900">Direct Profit Share</h4>
              <p className="text-xs text-charcoal-600 mt-1">82% of every rupee directly empowers master artisan families.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border-2 border-charcoal-800 shadow-brutal">
            <div className="w-10 h-10 rounded-xl bg-forest-100 border border-charcoal-800 flex items-center justify-center text-forest-700 shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal-900">100% Plastic-Free</h4>
              <p className="text-xs text-charcoal-600 mt-1">Honeycomb kraft paper, banana fibre cords, and zero plastic.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border-2 border-charcoal-800 shadow-brutal">
            <div className="w-10 h-10 rounded-xl bg-mustard-100 border border-charcoal-800 flex items-center justify-center text-mustard-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal-900">Certified Authentic</h4>
              <p className="text-xs text-charcoal-600 mt-1">GI registered heritage techniques with artisan signature cards.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border-2 border-charcoal-800 shadow-brutal">
            <div className="w-10 h-10 rounded-xl bg-cream-200 border border-charcoal-800 flex items-center justify-center text-charcoal-800 shrink-0">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal-900">Safe Delivery Guarantee</h4>
              <p className="text-xs text-charcoal-600 mt-1">If your pottery breaks in transit, we replace it instantly.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-clay-500 border-2 border-charcoal-800 shadow-brutal-sm flex items-center justify-center text-xl">
                🏺
              </div>
              <span className="font-serif font-black text-2xl text-charcoal-900">Kaarigar</span>
            </Link>
            <p className="text-sm text-charcoal-600 max-w-sm font-medium leading-relaxed">
              Preserving Indian living crafts through hyper-local curation, honest pricing, and modern design appreciation. Made by hands, not machines.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-bold text-charcoal-700 bg-mustard-300 border border-charcoal-800 px-2.5 py-1 rounded-full shadow-brutal-sm">
                Crafted in India 🇮🇳
              </span>
              <span className="text-xs font-bold text-forest-700 bg-forest-100 border border-charcoal-800 px-2.5 py-1 rounded-full shadow-brutal-sm">
                450+ Active Artisans
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-charcoal-900 uppercase tracking-wider mb-3">Slow Crafts</h4>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li><Link to="/products?category=Pottery%20%26%20Ceramics" className="hover:text-clay-600 hover:underline">Khurja Terracotta</Link></li>
              <li><Link to="/products?category=Handloom%20Textiles" className="hover:text-clay-600 hover:underline">Bagru Indigo Textiles</Link></li>
              <li><Link to="/products?category=Woodwork%20%26%20Carving" className="hover:text-clay-600 hover:underline">Kashmir Walnut Wood</Link></li>
              <li><Link to="/products?category=Metalcraft%20%26%20Brass" className="hover:text-clay-600 hover:underline">Bastar Dhokra Brass</Link></li>
              <li><Link to="/products?category=Botanicals%20%26%20Oils" className="hover:text-clay-600 hover:underline">Wayanad Cold Soaps</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-charcoal-900 uppercase tracking-wider mb-3">Artisan Regions</h4>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li><Link to="/products?location=Khurja" className="hover:text-clay-600 hover:underline">Khurja, Uttar Pradesh</Link></li>
              <li><Link to="/products?location=Bagru" className="hover:text-clay-600 hover:underline">Bagru, Rajasthan</Link></li>
              <li><Link to="/products?location=Bastar" className="hover:text-clay-600 hover:underline">Bastar, Chhattisgarh</Link></li>
              <li><Link to="/products?location=Srinagar" className="hover:text-clay-600 hover:underline">Srinagar, Kashmir</Link></li>
              <li><Link to="/products?location=Wayanad" className="hover:text-clay-600 hover:underline">Wayanad, Kerala</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-charcoal-900 uppercase tracking-wider mb-3">Company & Impact</h4>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li><a href="/#manifesto" className="hover:text-clay-600 hover:underline">Slow Living Manifesto</a></li>
              <li><a href="/#artisans" className="hover:text-clay-600 hover:underline">Meet the Makers</a></li>
              <li><Link to="/checkout" className="hover:text-clay-600 hover:underline">Artisan Packaging</Link></li>
              <li><span className="text-xs text-clay-600 font-bold bg-white px-2 py-0.5 rounded border border-charcoal-800 inline-block mt-1">API Ready for iOS & Android</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-charcoal-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© 2026 Kaarigar Slow Marketplace Inc. Handcrafted with reverence for traditional knowledge.</p>
          <p className="font-mono text-[11px]">Empowering Slow Hands Since 2024</p>
        </div>
      </div>
    </footer>
  );
};
