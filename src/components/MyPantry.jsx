import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';
import { searchByPantry } from '../services/api';

const COMMON_INGREDIENTS = [
  { name: 'Chicken', icon: '🍗' },
  { name: 'Beef', icon: '🥩' },
  { name: 'Eggs', icon: '🥚' },
  { name: 'Rice', icon: '🍚' },
  { name: 'Pasta', icon: '🍝' },
  { name: 'Tomato', icon: '🍅' },
  { name: 'Onion', icon: '🧅' },
  { name: 'Garlic', icon: '🧄' },
  { name: 'Cheese', icon: '🧀' },
  { name: 'Milk', icon: '🥛' },
  { name: 'Butter', icon: '🧈' },
  { name: 'Potato', icon: '🥔' },
  { name: 'Carrot', icon: '🥕' },
  { name: 'Pepper', icon: '🫑' },
  { name: 'Lemon', icon: '🍋' },
  { name: 'Salmon', icon: '🐟' },
];

export function MyPantry({ onRecipeClick }) {
  const { pantry, addToPantry, removeFromPantry, clearPantry, isInPantry } = useRecipes();
  const [customIngredient, setCustomIngredient] = useState('');

  // Calculate matching recipes whenever pantry changes
  const matchingRecipes = useMemo(() => {
    if (pantry.length === 0) return [];
    return searchByPantry(pantry);
  }, [pantry]);

  const addCustomIngredient = () => {
    const trimmed = customIngredient.trim();
    if (trimmed && !isInPantry(trimmed)) {
      addToPantry(trimmed);
      setCustomIngredient('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addCustomIngredient();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="text-3xl">🧊</span>
            My Pantry
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Add ingredients you have and discover what you can make
          </p>
        </div>
        {pantry.length > 0 && (
          <motion.button
            onClick={clearPantry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
          >
            Clear All
          </motion.button>
        )}
      </div>

      {/* Add Ingredient Input */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Add ingredient
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customIngredient}
            onChange={(e) => setCustomIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type an ingredient..."
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addCustomIngredient}
            disabled={!customIngredient.trim()}
            className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </motion.button>
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
          Quick add
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {COMMON_INGREDIENTS.map(({ name, icon }) => (
            <motion.button
              key={name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isInPantry(name) ? removeFromPantry(name) : addToPantry(name)}
              className={`p-2 sm:p-3 rounded-xl text-center transition-all ${
                isInPantry(name)
                  ? 'bg-brand-100 dark:bg-brand-900/40 border-2 border-brand-500'
                  : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
              }`}
            >
              <span className="text-xl sm:text-2xl block">{icon}</span>
              <span className={`text-[10px] sm:text-xs font-medium ${
                isInPantry(name)
                  ? 'text-brand-700 dark:text-brand-300'
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Current Pantry */}
      {pantry.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
            Your pantry ({pantry.length} items)
          </label>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {pantry.map(ingredient => (
                <motion.button
                  key={ingredient}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => removeFromPantry(ingredient)}
                  className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium flex items-center gap-1.5 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                >
                  {ingredient}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Recipe Results */}
      {pantry.length > 0 ? (
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>🍳</span>
            Recipes You Can Make
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({matchingRecipes.length} found)
            </span>
          </h3>

          {matchingRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchingRecipes.map((recipe, index) => (
                <motion.article
                  key={recipe.idMeal}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onRecipeClick(recipe)}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="relative aspect-[16/10]">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Match Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full">
                      <span className={`text-sm font-bold ${
                        recipe.matchScore >= 0.8 ? 'text-green-600 dark:text-green-400' :
                        recipe.matchScore >= 0.5 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-orange-600 dark:text-orange-400'
                      }`}>
                        {Math.round(recipe.matchScore * 100)}%
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="font-bold text-white text-base line-clamp-2 drop-shadow-lg">
                        {recipe.strMeal}
                      </h4>
                    </div>
                  </div>

                  <div className="p-3">
                    {/* Match Progress Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          {recipe.matchedCount}/{recipe.totalIngredients} ingredients
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${recipe.matchScore * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className={`h-full rounded-full ${
                            recipe.matchScore >= 0.8 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                            recipe.matchScore >= 0.5 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                            'bg-gradient-to-r from-orange-400 to-orange-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Missing Ingredients */}
                    {recipe.missingIngredients.length > 0 && recipe.missingIngredients.length <= 3 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Missing: {recipe.missingIngredients.slice(0, 3).join(', ')}
                        {recipe.missingIngredients.length > 3 && ` +${recipe.missingIngredients.length - 3} more`}
                      </p>
                    )}
                    {recipe.missingIngredients.length > 3 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Missing {recipe.missingIngredients.length} ingredients
                      </p>
                    )}
                    {recipe.missingIngredients.length === 0 && (
                      <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                        You have everything!
                      </p>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
              <span className="text-4xl mb-4 block">🤔</span>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                No matching recipes found
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Try adding more ingredients to your pantry
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-100 dark:border-green-800/30">
          <span className="text-6xl mb-4 block">🥗</span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            What's in your fridge?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
            Add the ingredients you have at home and we'll show you recipes you can make right now.
          </p>
        </div>
      )}
    </motion.div>
  );
}
