import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';

export function ShoppingList() {
  const { shoppingList, generateShoppingList, toggleShoppingItem, clearShoppingList, mealPlan, removeFromShoppingList } = useRecipes();
  const [filterCategory, setFilterCategory] = useState('all');

  const hasMealsPlanned = useMemo(() => {
    return Object.values(mealPlan).some(day =>
      Object.values(day).some(meal => meal !== null)
    );
  }, [mealPlan]);

  const categories = useMemo(() => {
    const cats = new Set(shoppingList.map(item => item.category));
    return ['all', ...Array.from(cats).sort()];
  }, [shoppingList]);

  const filteredList = useMemo(() => {
    if (filterCategory === 'all') return shoppingList;
    return shoppingList.filter(item => item.category === filterCategory);
  }, [shoppingList, filterCategory]);

  const groupedList = useMemo(() => {
    const groups = {};
    filteredList.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredList]);

  const progress = useMemo(() => {
    if (shoppingList.length === 0) return 0;
    const checked = shoppingList.filter(item => item.checked).length;
    return Math.round((checked / shoppingList.length) * 100);
  }, [shoppingList]);

  const recipeProgress = useMemo(() => {
    const recipeMap = {};
    shoppingList.forEach(item => {
      if (item.recipes && item.recipes.length > 0) {
        item.recipes.forEach(recipe => {
          if (!recipeMap[recipe.id]) {
            recipeMap[recipe.id] = { id: recipe.id, name: recipe.name, total: 0, checked: 0 };
          }
          recipeMap[recipe.id].total += 1;
          if (item.checked) recipeMap[recipe.id].checked += 1;
        });
      }
    });
    return Object.values(recipeMap);
  }, [shoppingList]);

  const categoryIcons = {
    'Meat & Seafood': '🥩',
    'Dairy & Eggs': '🥛',
    'Grains & Bread': '🍞',
    'Produce': '🥬',
    'Fruits': '🍎',
    'Spices': '🌶️',
    'Pantry': '🫙',
    'Other': '📦'
  };

  if (shoppingList.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30 flex items-center justify-center">
          <svg className="w-12 h-12 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          No Shopping List Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
          {hasMealsPlanned
            ? "Generate a shopping list from your planned meals"
            : "Add some recipes to your meal plan first, then generate a shopping list"
          }
        </p>
        {hasMealsPlanned && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateShoppingList}
            className="btn-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Generate Shopping List
          </motion.button>
        )}
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Shopping List
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {shoppingList.length} items
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateShoppingList}
            className="btn-secondary text-sm"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearShoppingList}
            className="btn-ghost text-sm text-red-600 dark:text-red-400"
          >
            Clear All
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
            {progress}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"
          />
        </div>
      </div>

      {/* Recipe Progress */}
      {recipeProgress.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Recipe Progress
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {recipeProgress.map(rp => {
              const isComplete = rp.checked === rp.total;
              const pct = rp.total > 0 ? Math.round((rp.checked / rp.total) * 100) : 0;
              return (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-xl border ${
                    isComplete
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-sm font-semibold truncate mr-2 ${
                      isComplete ? 'text-green-700 dark:text-green-300' : 'text-gray-900 dark:text-white'
                    }`}>
                      {isComplete && (
                        <svg className="w-4 h-4 inline mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {rp.name}
                    </span>
                    <span className={`text-xs font-medium whitespace-nowrap ${
                      isComplete ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {rp.checked}/{rp.total}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        isComplete
                          ? 'bg-green-500'
                          : 'bg-brand-500'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/25'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat === 'all' ? 'All Items' : `${categoryIcons[cat] || '📦'} ${cat}`}
          </motion.button>
        ))}
      </div>

      {/* Shopping Items */}
      <div className="space-y-6">
        {Object.entries(groupedList).map(([category, items]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span>{categoryIcons[category] || '📦'}</span>
              {category}
              <span className="text-xs font-normal">({items.length})</span>
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onClick={() => toggleShoppingItem(item.id)}
                    className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                      item.checked
                        ? 'bg-gray-50 dark:bg-gray-800/50'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        item.checked
                          ? 'bg-brand-600 border-brand-600'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {item.checked && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium transition-all ${
                        item.checked
                          ? 'text-gray-400 dark:text-gray-500 line-through'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {item.name}
                      </p>
                      {item.recipes && item.recipes.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.recipes.map(r => (
                            <span
                              key={r.id}
                              className="inline-block px-1.5 py-0.5 text-[10px] font-medium rounded bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                            >
                              {r.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className={`text-sm transition-colors ${
                      item.checked
                        ? 'text-gray-400 dark:text-gray-600'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {item.quantity}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
