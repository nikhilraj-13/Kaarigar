import React from 'react';

export const Marquee = ({ items, reverse = false, className = '' }) => {
  const marqueeItems = items || [
    '🏺 Khurja Terracotta Kilns',
    '🧵 Bagru Natural Indigo Weaves',
    '🪵 Saharanpur Sheesham Carvings',
    '🪔 Bastar 4000-Yr Dhokra Brass',
    '🌿 Wayanad Wild Forest Botanicals',
    '🌸 Jaipur Cobalt Blue Pottery',
    '✨ 100% Plastic-Free Banana Packaging',
    '❤️ Direct Fair-Price Maker Profit Share'
  ];

  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none py-3 border-y-2 border-charcoal-800 bg-mustard-400 text-charcoal-900 font-bold uppercase tracking-wider text-xs md:text-sm ${className}`}>
      <div className={`flex shrink-0 items-center gap-8 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {marqueeItems.map((item, idx) => (
          <span key={`m1-${idx}`} className="flex items-center gap-3">
            <span>{item}</span>
            <span className="text-clay-700 font-black text-lg">✦</span>
          </span>
        ))}
      </div>
      <div className={`flex shrink-0 items-center gap-8 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} aria-hidden="true">
        {marqueeItems.map((item, idx) => (
          <span key={`m2-${idx}`} className="flex items-center gap-3">
            <span>{item}</span>
            <span className="text-clay-700 font-black text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
