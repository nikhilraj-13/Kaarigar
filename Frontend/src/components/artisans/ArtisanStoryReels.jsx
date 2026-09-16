import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, X, MapPin } from 'lucide-react';

export const ArtisanStoryReels = ({ stories = [] }) => {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <section id="stories" className="py-16 bg-cream-50 border-b-2 border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mustard-300 text-charcoal-900 border-2 border-charcoal-800 shadow-brutal-sm text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-clay-700" />
            <span>Behind the Fire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-charcoal-900">
            Craft Process In Motion
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 font-medium mt-1">
            Tap a reel to step inside rural Indian workshops and watch how living raw elements transform into heirloom objects.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setActiveStory(story)}
              className="group relative aspect-[9/16] rounded-3xl overflow-hidden border-2 border-charcoal-800 shadow-brutal cursor-pointer bg-charcoal-900"
            >
              <img
                src={story.poster}
                alt={story.craft}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />

              <div className="absolute top-3 left-3 bg-mustard-400 text-charcoal-900 text-[10px] font-mono font-black px-2 py-0.5 rounded border border-charcoal-800 shadow-brutal-sm">
                {story.tag}
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-charcoal-800 shadow-brutal flex items-center justify-center text-clay-600 group-hover:scale-120 transition-transform">
                <Play className="w-5 h-5 fill-clay-500 text-clay-500 translate-x-0.5" />
              </div>

              <div className="absolute bottom-3 inset-x-3 text-white space-y-1">
                <h3 className="font-serif font-black text-sm leading-tight line-clamp-1">
                  {story.craft}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-cream-200 font-medium">
                  <span>{story.artisan}</span>
                  <span className="flex items-center gap-0.5 font-bold text-mustard-400">
                    <MapPin className="w-2.5 h-2.5" />
                    {story.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-sm w-full bg-charcoal-900 rounded-3xl border-2 border-charcoal-800 overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-charcoal-800/80 text-white border border-white/20 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <video
                src={activeStory.videoUrl}
                poster={activeStory.poster}
                controls
                autoPlay
                playsInline
                className="w-full aspect-[9/16] object-cover"
              />

              <div className="p-4 bg-charcoal-900 text-cream-50 border-t border-charcoal-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-white">{activeStory.craft}</h4>
                  <span className="text-xs text-mustard-400 font-mono font-bold">{activeStory.location}</span>
                </div>
                <p className="text-xs text-cream-200 italic">"{activeStory.quote}"</p>
                <p className="text-[11px] text-charcoal-400 font-bold">— {activeStory.artisan}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
