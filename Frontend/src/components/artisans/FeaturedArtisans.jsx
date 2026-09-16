import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedArtisans = ({ artisans = [] }) => {
  return (
    <section id="artisans" className="py-16 md:py-24 bg-cream-100 border-b-2 border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 border-2 border-charcoal-800 shadow-brutal-sm text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-forest-600" />
              <span>Living Heritage Guild</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-charcoal-900 tracking-tight">
              Meet the Master Artisans
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 font-medium max-w-xl mt-2">
              Every creation is signed with honor. Learn about the lineages preserving 4,000-year-old Indian craft techniques.
            </p>
          </div>

          <Link
            to="/products"
            className="self-start md:self-auto px-5 py-2.5 rounded-2xl bg-white text-charcoal-900 font-black text-sm border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg transition-all flex items-center gap-2"
          >
            <span>Browse All Guild Works</span>
            <ArrowRight className="w-4 h-4 text-clay-600" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {artisans.map((artisan, index) => (
            <motion.div
              key={artisan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 sm:h-56 overflow-hidden border-b-2 border-charcoal-800 bg-cream-200">
                  <img
                    src={artisan.coverImage}
                    alt={artisan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />

                  <div className="absolute top-3 right-3 bg-mustard-400 text-charcoal-900 border-2 border-charcoal-800 px-2.5 py-1 rounded-full shadow-brutal-sm text-[11px] font-black uppercase">
                    {artisan.generation}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end gap-3">
                    <img
                      src={artisan.avatar}
                      alt={artisan.name}
                      className="w-14 h-14 rounded-2xl border-2 border-white object-cover shadow-lg shrink-0"
                    />
                    <div className="text-white">
                      <h3 className="font-serif font-black text-lg leading-tight drop-shadow-sm">
                        {artisan.name}
                      </h3>
                      <p className="text-xs text-mustard-300 font-bold flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{artisan.location}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-clay-700 uppercase tracking-wider block mb-1">
                      {artisan.craft}
                    </span>
                    <p className="text-xs text-charcoal-600 font-medium leading-relaxed line-clamp-3 italic">
                      "{artisan.quote}"
                    </p>
                  </div>

                  {artisan.awards && artisan.awards.length > 0 && (
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 text-[11px] font-bold">
                      <Award className="w-4 h-4 text-forest-600 shrink-0" />
                      <span className="truncate">{artisan.awards[0]}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/artisan/${artisan.id}`}
                  className="w-full py-2.5 rounded-xl bg-cream-100 hover:bg-clay-500 hover:text-white text-charcoal-900 font-black text-xs border-2 border-charcoal-800 shadow-brutal-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>View Artisan Workshop & Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
