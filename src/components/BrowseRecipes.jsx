import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCategories, fetchByCategory, fetchByCuisine, fetchDailyRecipe } from '../services/api';
import { CUISINE_OPTIONS } from '../services/api';

function FeaturedCard({ recipe, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">
        ✨ Recipe of the Day
      </p>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className="w-full text-left relative rounded-3xl overflow-hidden shadow-xl group"
        style={{ aspectRatio: '16/7' }}
      >
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex gap-2 mb-2">
            {recipe.strCategory && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
                {recipe.strCategory}
              </span>
            )}
            {recipe.strArea && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
                {recipe.strArea}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
            {recipe.strMeal}
          </h2>
          <p className="text-white/70 text-sm mt-1">Tap to view full recipe →</p>
        </div>
      </motion.button>
    </motion.div>
  );
}

function RecipeSummaryCard({ recipe, onClick, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="text-left group"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-2">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">
        {recipe.strMeal}
      </p>
    </motion.button>
  );
}

export function BrowseRecipes({ onRecipeClick }) {
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [selected, setSelected] = useState(null); // { type: 'category'|'cuisine', name, label }
  const [browseResults, setBrowseResults] = useState([]);
  const [isLoadingBrowse, setIsLoadingBrowse] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchDailyRecipe()]).then(([cats, daily]) => {
      setCategories(cats);
      setFeaturedRecipe(daily);
      setIsLoadingInit(false); // eslint-disable-line react-hooks/set-state-in-effect
    });
  }, []);

  const handleCategoryClick = async (cat) => {
    setSelected({ type: 'category', name: cat.strCategory, thumb: cat.strCategoryThumb });
    setIsLoadingBrowse(true);
    const results = await fetchByCategory(cat.strCategory);
    setBrowseResults(results);
    setIsLoadingBrowse(false);
  };

  const handleCuisineClick = async (cuisine) => {
    setSelected({ type: 'cuisine', name: cuisine.id, label: cuisine.label });
    setIsLoadingBrowse(true);
    const results = await fetchByCuisine(cuisine.label);
    setBrowseResults(results);
    setIsLoadingBrowse(false);
  };

  const handleBack = () => {
    setSelected(null);
    setBrowseResults([]);
  };

  if (isLoadingInit) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Browse results view
  if (selected) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="browse-results"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Browse
            </motion.button>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {selected.name || selected.label}
            </h2>
            {!isLoadingBrowse && (
              <span className="text-sm text-gray-400 dark:text-gray-500">
                ({browseResults.length})
              </span>
            )}
          </div>

          {isLoadingBrowse ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] rounded-2xl bg-gray-200 dark:bg-gray-800 mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {browseResults.map((recipe, i) => (
                <RecipeSummaryCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  index={i}
                  onClick={() => onRecipeClick(recipe)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Main browse view
  return (
    <motion.div
      key="browse-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Featured recipe */}
      {featuredRecipe && (
        <FeaturedCard recipe={featuredRecipe} onClick={() => onRecipeClick(featuredRecipe)} />
      )}

      {/* Browse by Category */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Browse by Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.idCategory}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCategoryClick(cat)}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all group"
            >
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight">
                {cat.strCategory}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Browse by Cuisine */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Browse by Cuisine
        </h2>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map((cuisine, i) => (
            <motion.button
              key={cuisine.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCuisineClick(cuisine)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-600 hover:shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span>{cuisine.icon}</span>
              <span>{cuisine.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
