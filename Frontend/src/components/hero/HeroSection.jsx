import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Flame } from 'lucide-react';
import { Hero3D } from './Hero3D';

export const HeroSection = ({ onOpenSellerModal }) => {
  const [activeColor, setActiveColor] = useState('#D95D39');

  const colorOptions = [
    { label: 'Terracotta Clay', hex: '#D95D39' },
    { label: 'Indigo Glaze', hex: '#1F375D' },
    { label: 'Forest Ochre', hex: '#225541' },
    { label: 'Saffron Mud', hex: '#C24925' },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 md:pt-10 md:pb-20 border-b-2 border-charcoal-800 bg-cream-50">
      <div className="absolute inset-0 bg-[radial-gradient(#DFC8A8_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mustard-300 border-2 border-charcoal-800 shadow-brutal-sm text-xs font-black uppercase tracking-wider text-charcoal-900"
            >
              <Flame className="w-4 h-4 text-clay-700 animate-bounce" />
              <span>Slow Craft Revolution • No Plastic. No Factories.</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-charcoal-900 leading-[1.05] tracking-tight text-balance"
            >
              Treasures shaped by <span className="text-clay-500 underline decoration-mustard-400 decoration-wavy decoration-2">human hands</span>, not assembly lines.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl font-medium text-charcoal-600 max-w-xl leading-relaxed"
            >
              Discover authentic, limited-batch pottery, handloom silks, and chiseled woodcraft directly from master Indian artisans. Honest origin, direct profit share.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
            >
              <Link
                to="/products"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-clay-500 text-cream-50 font-black text-base sm:text-lg border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2 group"
              >
                <span>Explore Slow Crafts</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <button
                onClick={onOpenSellerModal}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white text-charcoal-900 font-black text-base sm:text-lg border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2"
              >
                <span>Join as a Maker</span>
                <span className="text-xs bg-mustard-300 text-charcoal-900 px-2 py-0.5 rounded-full border border-charcoal-800 font-mono">0% Fee</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-charcoal-700"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-forest-600"></span>
                <span>450+ Certified Artisans</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-clay-500"></span>
                <span>100% Plastic-Free Box</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-mustard-500"></span>
                <span>82% Direct Maker Share</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative p-3 sm:p-4 rounded-3xl bg-cream-100 border-2 border-charcoal-800 shadow-brutal-lg"
            >
              <div className="flex items-center justify-between pb-2 border-b border-charcoal-300 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-clay-500 border border-charcoal-800"></span>
                  <span className="w-3 h-3 rounded-full bg-mustard-400 border border-charcoal-800"></span>
                  <span className="w-3 h-3 rounded-full bg-forest-600 border border-charcoal-800"></span>
                  <span className="text-xs font-mono font-bold text-charcoal-700 ml-1">interactive_craft_view.3d</span>
                </div>
                <span className="text-[11px] font-bold text-clay-700 uppercase tracking-wider">
                  Live Clay Kiln
                </span>
              </div>

              <Hero3D vaseColor={activeColor} />

              <div className="mt-3 p-2.5 rounded-2xl bg-white border-2 border-charcoal-800 shadow-brutal-sm flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-charcoal-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-mustard-500" />
                  <span>Glaze Finish:</span>
                </span>

                <div className="flex items-center gap-2">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.hex}
                      onClick={() => setActiveColor(opt.hex)}
                      title={opt.label}
                      className={`w-7 h-7 rounded-full border-2 border-charcoal-800 transition-all ${
                        activeColor === opt.hex ? 'scale-115 ring-2 ring-clay-500 shadow-brutal-sm' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: opt.hex }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="absolute -bottom-4 -left-4 bg-mustard-400 text-charcoal-900 border-2 border-charcoal-800 px-3.5 py-1.5 rounded-xl shadow-brutal text-xs font-black uppercase tracking-wider -rotate-3 hidden sm:block">
              ✦ Made by Slow Hands ✦
            </div>

            <div className="absolute -top-4 -right-4 bg-forest-600 text-cream-50 border-2 border-charcoal-800 px-3.5 py-1.5 rounded-xl shadow-brutal text-xs font-black uppercase tracking-wider rotate-3 hidden sm:block">
              🌿 GI Tag Authenticity
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
