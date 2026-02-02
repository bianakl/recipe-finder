import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';
import { StarRating } from './StarRating';

export function CookingHistory({ onRecipeClick }) {
  const { cookingHistory, getRecipeById, getRecipeRating, setRecipeRating } = useRecipes();

  const historyWithRecipes = useMemo(() => {
    return cookingHistory
      .map(entry => ({
        ...entry,
        recipe: getRecipeById(entry.recipeId)
      }))
      .filter(entry => entry.recipe);
  }, [cookingHistory, getRecipeById]);

  const groupedHistory = useMemo(() => {
    const groups = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    historyWithRecipes.forEach(entry => {
      const date = new Date(entry.cookedAt);
      date.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));

      let label;
      if (diffDays === 0) label = 'Today';
      else if (diffDays === 1) label = 'Yesterday';
      else if (diffDays < 7) label = 'This Week';
      else if (diffDays < 30) label = 'This Month';
      else label = 'Earlier';

      if (!groups[label]) groups[label] = [];
      groups[label].push(entry);
    });

    return groups;
  }, [historyWithRecipes]);

  const stats = useMemo(() => {
    const recipeCount = new Set(cookingHistory.map(h => h.recipeId)).size;
    const thisMonth = cookingHistory.filter(h => {
      const date = new Date(h.cookedAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    return { total: cookingHistory.length, unique: recipeCount, thisMonth };
  }, [cookingHistory]);

  if (cookingHistory.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 flex items-center justify-center">
          <svg className="w-12 h-12 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          No Cooking History
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          Start cooking recipes to track your culinary journey
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cooking History
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Your culinary journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 text-center"
        >
          <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
            {stats.total}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Cooked
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 text-center"
        >
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.unique}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Unique Recipes
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 text-center"
        >
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {stats.thisMonth}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            This Month
          </div>
        </motion.div>
      </div>

      {/* History List */}
      <div className="space-y-6">
        {Object.entries(groupedHistory).map(([label, entries]) => (
          <div key={label}>
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {label}
            </h3>
            <div className="space-y-2">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 4 }}
                  onClick={() => onRecipeClick(entry.recipe)}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4 cursor-pointer hover:border-brand-200 dark:hover:border-brand-800 transition-colors"
                >
                  <img
                    src={entry.recipe.strMealThumb}
                    alt={entry.recipe.strMeal}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white truncate">
                      {entry.recipe.strMeal}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(entry.cookedAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </p>
                    <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                      <StarRating
                        rating={getRecipeRating(entry.recipeId)}
                        onRate={(rating) => setRecipeRating(entry.recipeId, rating)}
                        size="sm"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
