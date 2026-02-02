import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  INGREDIENTS_DATABASE,
  getUserCountry,
  getIngredientSourcing,
  getExoticIngredients,
  getCommonIngredients,
  getIngredientCategories,
} from '../services/api';

const RARITY_CONFIG = {
  exotic: {
    label: 'Exotic',
    icon: '🌟',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    textColor: 'text-amber-700 dark:text-amber-300',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  common: {
    label: 'Common',
    icon: '🛒',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-700 dark:text-green-300',
    borderColor: 'border-green-200 dark:border-green-800',
  },
};

const CATEGORY_ICONS = {
  Protein: '🥩',
  Seafood: '🦐',
  Spice: '🌶️',
  Condiment: '🫙',
  Herb: '🌿',
  Fat: '🧈',
  Bread: '🍞',
  Fermented: '🫜',
  Vegetable: '🥬',
  Fruit: '🍋',
  Grain: '🌾',
  Dairy: '🧀',
  Sweetener: '🍯',
  Seasoning: '🧂',
};

function IngredientCard({ name, data, userCountry }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const sourcing = getIngredientSourcing(name, userCountry);
  const config = RARITY_CONFIG[data.rarity];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`border rounded-2xl overflow-hidden ${config.borderColor} ${config.bgColor}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{CATEGORY_ICONS[data.category] || '🍴'}</span>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">{name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{data.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${config.bgColor} ${config.textColor}`}>
              {config.icon} {config.label}
            </span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="text-gray-400"
            >
              ▼
            </motion.span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {data.description}
              </p>

              {sourcing && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📍</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      Where to find in {userCountry === 'default' ? 'your area' : userCountry}:
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {sourcing.store}
                  </p>
                  {sourcing.link && (
                    <a
                      href={sourcing.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      <span>Buy Online</span>
                      <span>→</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function IngredientsExplorer() {
  const [filter, setFilter] = useState('all'); // all, exotic, common
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userCountry, setUserCountry] = useState('default');

  useEffect(() => {
    setUserCountry(getUserCountry());
  }, []);

  const categories = getIngredientCategories();

  const allIngredients = Object.entries(INGREDIENTS_DATABASE).map(([name, data]) => ({
    name,
    ...data,
  }));

  const filteredIngredients = allIngredients.filter(ing => {
    // Rarity filter
    if (filter === 'exotic' && ing.rarity !== 'exotic') return false;
    if (filter === 'common' && ing.rarity !== 'common') return false;

    // Category filter
    if (categoryFilter && ing.category !== categoryFilter) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        ing.name.toLowerCase().includes(query) ||
        ing.description.toLowerCase().includes(query) ||
        ing.category.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const exoticCount = allIngredients.filter(i => i.rarity === 'exotic').length;
  const commonCount = allIngredients.filter(i => i.rarity === 'common').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-pink-500 text-white text-3xl mb-4 shadow-lg"
        >
          🧪
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Ingredient Explorer
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Discover exotic ingredients and learn where to find them locally
          {userCountry !== 'default' && ` in ${userCountry}`}.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-800"
        >
          <div className="text-3xl font-bold text-amber-700 dark:text-amber-300">
            {exoticCount}
          </div>
          <div className="text-sm text-amber-600 dark:text-amber-400">
            Exotic Ingredients
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800"
        >
          <div className="text-3xl font-bold text-green-700 dark:text-green-300">
            {commonCount}
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            Common Staples
          </div>
        </motion.div>
      </div>

      {/* Location Badge */}
      <div className="flex items-center justify-center gap-2 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-200 dark:border-brand-800">
        <span className="text-lg">🌍</span>
        <span className="text-sm text-brand-700 dark:text-brand-300">
          Showing sourcing info for: <strong>{userCountry === 'default' ? 'General' : userCountry}</strong>
        </span>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search ingredients..."
          className="w-full px-4 py-3 pl-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* Rarity Filter */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'All', icon: '🍴' },
          { id: 'exotic', label: 'Exotic', icon: '🌟' },
          { id: 'common', label: 'Common', icon: '🛒' },
        ].map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(option.id)}
            className={`flex-1 px-4 py-2 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              filter === option.id
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setCategoryFilter(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            categoryFilter === null
              ? 'bg-brand-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          All Categories
        </motion.button>
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 transition-all ${
              categoryFilter === cat
                ? 'bg-brand-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <span>{CATEGORY_ICONS[cat] || '🍴'}</span>
            <span>{cat}</span>
          </motion.button>
        ))}
      </div>

      {/* Ingredient List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredIngredients.length > 0 ? (
            filteredIngredients.map((ing) => (
              <IngredientCard
                key={ing.name}
                name={ing.name}
                data={ing}
                userCountry={userCountry}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-gray-500 dark:text-gray-400">
                No ingredients found matching your criteria
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Understanding Ingredient Rarity
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              🌟 Exotic
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Specialty items that may require a trip to ethnic markets or online ordering
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              🛒 Common
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Standard ingredients available at most grocery stores
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
