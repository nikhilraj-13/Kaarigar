import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, PackageCheck, Sparkles, MapPin, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const order = location.state?.order || {
    orderId: orderId || 'KG-883921',
    status: 'CONFIRMED',
    pricing: {
      finalAmount: 1450
    },
    timeline: [
      { stage: 'Order Placed & Artisan Notified', timestamp: 'Just now', done: true },
      { stage: 'Hand-Wedged Clay Kiln Curing', timestamp: 'Tomorrow', done: false },
      { stage: 'Zero-Plastic Packaging (Banana Twine)', timestamp: 'In 2 days', done: false },
      { stage: 'Carbon-Neutral Dispatch', timestamp: 'In 3-4 days', done: false }
    ],
    artisanImpact: {
      directArtisanPayout: 1189,
      message: '82% of this purchase goes directly to rural artisan families.'
    }
  };

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-cream-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        {/* Success Card */}
        <div className="p-8 sm:p-12 bg-white rounded-3xl border-2 border-charcoal-800 shadow-brutal-lg space-y-6">
          <div className="w-20 h-20 rounded-full bg-forest-100 border-2 border-charcoal-800 shadow-brutal flex items-center justify-center text-forest-700 mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mustard-300 text-charcoal-900 border-2 border-charcoal-800 shadow-brutal-sm text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-clay-700" />
              <span>Living Craft Batch Confirmed</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black font-serif text-charcoal-900">
              Shukriya! Your Order is Placed.
            </h1>

            <p className="text-xs sm:text-sm text-charcoal-600 font-bold font-mono mt-2">
              Order ID: <span className="text-clay-600 bg-clay-50 px-2 py-0.5 rounded border border-charcoal-300">{order.orderId || orderId}</span>
            </p>
          </div>

          {/* Direct Impact Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-forest-50 border-2 border-charcoal-800 shadow-brutal-sm text-left space-y-2">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-forest-700 shrink-0" />
              <h4 className="font-serif font-black text-sm text-forest-900">
                Direct Artisan Impact
              </h4>
            </div>
            <p className="text-xs text-forest-800 font-medium">
              {order.artisanImpact?.message || '82% of your purchase directly supports generational craft knowledge.'}
            </p>
          </div>

          {/* Timeline */}
          <div className="text-left space-y-4 pt-4 border-t border-charcoal-200">
            <h3 className="font-serif font-bold text-sm text-charcoal-900 uppercase tracking-wider">
              Handcrafting & Dispatch Timeline
            </h3>

            <div className="space-y-3">
              {(order.timeline || []).map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 border-charcoal-800 flex items-center justify-center shrink-0 mt-0.5 ${
                    step.done ? 'bg-forest-600 text-white' : 'bg-cream-200 text-charcoal-400'
                  }`}>
                    {step.done ? <span className="text-[10px] font-black">✓</span> : <span className="text-[9px] font-mono">{idx + 1}</span>}
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${step.done ? 'text-charcoal-900' : 'text-charcoal-500'}`}>
                      {step.stage}
                    </p>
                    <p className="text-[10px] text-charcoal-400 font-medium">{step.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/products"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-clay-500 text-cream-50 font-black text-xs sm:text-sm border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Explore More Living Crafts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-charcoal-900 font-black text-xs sm:text-sm border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg transition-all"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
