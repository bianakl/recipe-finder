import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { redirectToCheckout } from '../lib/stripe';
import { useAuth } from '../context/AuthContext';
import { useBackButton } from '../hooks/useBackButton';

const PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$4.99',
    period: '/month',
    priceId: import.meta.env.VITE_STRIPE_PRICE_MONTHLY || 'price_monthly',
    popular: false,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$39.99',
    period: '/year',
    priceId: import.meta.env.VITE_STRIPE_PRICE_YEARLY || 'price_yearly',
    savings: 'Save 33%',
    popular: true,
  },
];

const FEATURES = [
  'Unlimited saved recipes',
  'My Pantry with ingredient matching',
  'Weekly Meal Planner',
  'Smart Shopping Lists',
  'Nutrition Dashboard',
  'Full Cooking History',
  'Cross-device sync',
];

export function PricingModal({ isOpen, onClose }) {
  const { user, setShowAuthModal } = useAuth();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');

  useBackButton(isOpen, onClose, 'pricingModal');

  const handleSubscribe = async (plan) => {
    if (!user) {
      onClose();
      setShowAuthModal(true);
      return;
    }

    setLoading(plan.id);
    setError('');
    try {
      await redirectToCheckout(plan.priceId);
    } catch (err) {
      setError(err.message);
      setLoading(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg p-8 border border-gray-200 dark:border-gray-800 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white text-2xl mb-3 shadow-lg">
                👑
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Upgrade to Premium
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Unlock the full recipe experience
              </p>
            </div>

            {/* Features */}
            <div className="mb-6 space-y-2">
              {FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {PLANS.map((plan) => (
                <motion.button
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscribe(plan)}
                  disabled={!!loading}
                  className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                    plan.popular
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-0.5 rounded-full bg-amber-400 text-amber-900">
                      Best Value
                    </span>
                  )}
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {plan.period}
                  </div>
                  {plan.savings && (
                    <div className="mt-1 text-xs font-bold text-green-600 dark:text-green-400">
                      {plan.savings}
                    </div>
                  )}
                  {loading === plan.id && (
                    <div className="mt-2 text-xs text-gray-500">Redirecting...</div>
                  )}
                </motion.button>
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center mb-4">{error}</p>
            )}

            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              Cancel anytime. No commitment required.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
