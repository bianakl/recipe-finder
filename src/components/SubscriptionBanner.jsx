import { useState } from 'react';
import { motion } from 'framer-motion';
import { PricingModal } from './PricingModal';

export function SubscriptionBanner({ type = 'lapsed' }) {
  const [showPricing, setShowPricing] = useState(false);

  if (type === 'past_due') {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl flex items-center gap-3"
        >
          <span className="text-xl">⚠️</span>
          <div className="flex-1">
            <p className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm">
              Payment issue detected
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              Please update your payment method to keep your premium access.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPricing(true)}
            className="shrink-0 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-xl text-sm"
          >
            Update
          </motion.button>
        </motion.div>
        <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
      </>
    );
  }

  // Lapsed / canceled
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-2xl flex items-center gap-3"
      >
        <span className="text-xl">💜</span>
        <div className="flex-1">
          <p className="font-semibold text-brand-800 dark:text-brand-200 text-sm">
            Your premium has ended
          </p>
          <p className="text-xs text-brand-700 dark:text-brand-300">
            Your data is safe. Resubscribe to access all features.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowPricing(true)}
          className="shrink-0 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl text-sm shadow-md"
        >
          Resubscribe
        </motion.button>
      </motion.div>
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </>
  );
}
