import { useState } from 'react';
import { motion } from 'framer-motion';
import { PricingModal } from './PricingModal';

const FEATURE_INFO = {
  pantry: {
    icon: '🫙',
    title: 'My Pantry',
    description: 'Track your ingredients and find recipes you can make right now.',
  },
  planner: {
    icon: '📅',
    title: 'Meal Planner',
    description: 'Plan your week with a 7-day, 5-meal-per-day planner.',
  },
  shopping: {
    icon: '🛒',
    title: 'Shopping List',
    description: 'Auto-generate smart shopping lists from your meal plan.',
  },
  nutrition: {
    icon: '📊',
    title: 'Nutrition Dashboard',
    description: 'Track calories, protein, carbs, and fat for your meals.',
  },
  saves: {
    icon: '💜',
    title: 'Unlimited Saves',
    description: "You've reached 5 free saves. Upgrade for unlimited.",
  },
};

export function LockedFeaturePrompt({ featureId }) {
  const [showPricing, setShowPricing] = useState(false);
  const info = FEATURE_INFO[featureId] || { icon: '🔒', title: 'Premium Feature', description: 'Upgrade to access this feature.' };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
          className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-amber-500/20"
        >
          {info.icon}
        </motion.div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {info.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
          {info.description}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPricing(true)}
          className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/25 flex items-center gap-2"
        >
          <span>👑</span> Upgrade to Premium
        </motion.button>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
          Starting at $4.99/month. Cancel anytime.
        </p>
      </motion.div>

      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </>
  );
}
