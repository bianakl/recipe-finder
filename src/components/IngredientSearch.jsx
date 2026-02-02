import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchByIngredients } from '../services/api';

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
];

export function IngredientSearch({ onResults, onClose }) {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [customIngredient, setCustomIngredient] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const addCustomIngredient = () => {
    const trimmed = customIngredient.trim();
    if (trimmed && !selectedIngredients.includes(trimmed)) {
      setSelectedIngredients(prev => [...prev, trimmed]);
      setCustomIngredient('');
    }
  };

  const handleSearch = async () => {
    if (selectedIngredients.length === 0) return;

    setIsSearching(true);
    try {
      const results = await searchByIngredients(selectedIngredients);
      onResults(results, selectedIngredients);
    } catch (error) {
      console.error('Error searching by ingredients:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-2xl">🧊</span>
                What's in Your Fridge?
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Select ingredients you have and find matching recipes
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
          {/* Selected Ingredients */}
          {selectedIngredients.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Selected ({selectedIngredients.length})
              </label>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {selectedIngredients.map(ingredient => (
                    <motion.button
                      key={ingredient}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => toggleIngredient(ingredient)}
                      className="px-3 py-1.5 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 rounded-full text-sm font-medium flex items-center gap-1.5"
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

          {/* Custom Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add ingredient
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customIngredient}
                onChange={(e) => setCustomIngredient(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomIngredient()}
                placeholder="Type an ingredient..."
                className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addCustomIngredient}
                disabled={!customIngredient.trim()}
                className="px-4 py-2.5 bg-brand-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </motion.button>
            </div>
          </div>

          {/* Common Ingredients */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Common ingredients
            </label>
            <div className="grid grid-cols-4 gap-2">
              {COMMON_INGREDIENTS.map(({ name, icon }) => (
                <motion.button
                  key={name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleIngredient(name)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedIngredients.includes(name)
                      ? 'bg-brand-100 dark:bg-brand-900/40 border-2 border-brand-500'
                      : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                  }`}
                >
                  <span className="text-2xl block mb-1">{icon}</span>
                  <span className={`text-xs font-medium ${
                    selectedIngredients.includes(name)
                      ? 'text-brand-700 dark:text-brand-300'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={selectedIngredients.length === 0 || isSearching}
            className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Searching...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Recipes ({selectedIngredients.length} ingredient{selectedIngredients.length !== 1 ? 's' : ''})
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
