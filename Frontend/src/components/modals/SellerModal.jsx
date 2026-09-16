import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Send, ShieldCheck, HeartHandshake } from 'lucide-react';
import { api } from '../../api/client';

export const SellerModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    craftType: 'Pottery & Ceramics',
    location: '',
    experienceYears: '',
    story: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.applySeller(formData);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      craftType: 'Pottery & Ceramics',
      location: '',
      experienceYears: '',
      story: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-cream-50 rounded-3xl border-2 border-charcoal-800 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-forest-600 text-cream-50 border-b-2 border-charcoal-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl">
                🌿
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-white">Join Kaarigar Maker Collective</h3>
                <p className="text-xs text-forest-100 font-bold">0% Listing Fees • Direct 82%+ Payout Guarantee</p>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 sm:p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-forest-100 border-2 border-charcoal-800 shadow-brutal flex items-center justify-center text-forest-700 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="font-serif font-black text-2xl text-charcoal-900">
                Application Received with Honor!
              </h4>

              <p className="text-sm text-charcoal-600 max-w-md mx-auto font-medium">
                Our Artisan Guild Field Team will connect with you via WhatsApp within 48 hours to schedule a craft verification video session and photography setup.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-8 py-3 rounded-2xl bg-forest-600 text-cream-50 font-black text-sm border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg transition-all"
                >
                  Return to Marketplace
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                    Your Name / Guild Leader *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Pandit Ramesh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-charcoal-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-charcoal-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                    Craft Discipline *
                  </label>
                  <select
                    name="craftType"
                    value={formData.craftType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-charcoal-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="Pottery & Ceramics">Pottery & Ceramics</option>
                    <option value="Handloom Textiles">Handloom Textiles</option>
                    <option value="Woodwork & Carving">Woodwork & Carving</option>
                    <option value="Metalcraft & Brass">Metalcraft & Brass</option>
                    <option value="Botanicals & Oils">Botanicals & Oils</option>
                    <option value="Other Living Craft">Other Living Craft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                    Village / Workshop Region *
                  </label>
                  <input
                    type="text"
                    required
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Khurja, Uttar Pradesh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-charcoal-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Tell us about your craft lineage & materials *
                </label>
                <textarea
                  rows="3"
                  required
                  name="story"
                  value={formData.story}
                  onChange={handleChange}
                  placeholder="Tell us about the natural raw materials you harvest, kiln or loom setup, and years on the craft..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-charcoal-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-forest-600 text-cream-50 font-black text-sm border-2 border-charcoal-800 shadow-brutal hover:shadow-brutal-lg active:translate-y-0 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application (Free)'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-charcoal-500 font-bold pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest-600" />
                  Zero Upfront Costs
                </span>
                <span className="flex items-center gap-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-clay-600" />
                  Zero Commission Tier
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
