import { motion } from 'framer-motion';

export function EmptyState({ type = 'search', title, description }) {
  const configs = {
    search: {
      icon: '🔍',
      gradient: 'from-brand-500 to-pink-500',
      defaultTitle: 'Discover delicious recipes',
      defaultDescription: 'Search for your favorite dishes, cuisines, or ingredients to get started',
    },
    noResults: {
      icon: '🍳',
      gradient: 'from-amber-500 to-orange-500',
      defaultTitle: 'No recipes found',
      defaultDescription: 'Try a different search term like "pasta", "chicken", or "mexican"',
    },
    savedEmpty: {
      icon: '💜',
      gradient: 'from-brand-500 to-indigo-500',
      defaultTitle: 'No saved recipes yet',
      defaultDescription: 'Search for recipes and tap the heart to save your favorites here',
    },
    mealPlanEmpty: {
      icon: '📅',
      gradient: 'from-emerald-500 to-teal-500',
      defaultTitle: 'Plan your week',
      defaultDescription: 'Save some recipes first, then add them to your weekly meal plan',
    },
  };

  const config = configs[type] || configs.search;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-8 shadow-2xl animate-float`}
      >
        <span className="text-5xl">{config.icon}</span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
      >
        {title || config.defaultTitle}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 dark:text-gray-400 max-w-md text-lg"
      >
        {description || config.defaultDescription}
      </motion.p>
    </motion.div>
  );
}
