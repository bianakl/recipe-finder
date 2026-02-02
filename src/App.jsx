import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeDrawer } from './components/RecipeDrawer';
import { SavedRecipes } from './components/SavedRecipes';
import { MealPlanner } from './components/MealPlanner';
import { ShoppingList } from './components/ShoppingList';
import { NutritionDashboard } from './components/NutritionDashboard';
import { CookingHistory } from './components/CookingHistory';
import { MealSuggestions } from './components/MealSuggestions';
import { IngredientSearch } from './components/IngredientSearch';
import { IngredientsExplorer } from './components/IngredientsExplorer';
import { FilterBar } from './components/FilterBar';
import { EmptyState } from './components/EmptyState';
import { SkeletonGrid } from './components/SkeletonCard';
import { Walkthrough, ExploreButton } from './components/Walkthrough';
import { useRecipeSearch } from './hooks/useRecipeSearch';
import { filterRecipes } from './services/api';

const tabs = [
  { id: 'search', label: 'Discover', icon: '✨' },
  { id: 'saved', label: 'Saved', icon: '💜' },
  { id: 'planner', label: 'Meal Plan', icon: '📅' },
  { id: 'shopping', label: 'Shopping', icon: '🛒' },
  { id: 'nutrition', label: 'Nutrition', icon: '📊' },
  { id: 'history', label: 'History', icon: '📜' },
  { id: 'suggestions', label: 'Ideas', icon: '💡' },
  { id: 'ingredients', label: 'Ingredients', icon: '🧪' },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState('search');
  const [showIngredientSearch, setShowIngredientSearch] = useState(false);
  const [ingredientResults, setIngredientResults] = useState(null);
  const [filters, setFilters] = useState({ dietary: [], cookTime: null, cuisine: null });
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  // Check if first-time user
  useEffect(() => {
    const hasCompletedWalkthrough = localStorage.getItem('recipe-finder-walkthrough-completed');
    if (!hasCompletedWalkthrough) {
      setShowWalkthrough(true);
    }
  }, []);

  const handleWalkthroughComplete = () => {
    localStorage.setItem('recipe-finder-walkthrough-completed', 'true');
    setShowWalkthrough(false);
  };

  const { results, isLoading, error, hasSearched } = useRecipeSearch(searchQuery);

  // Apply filters to search results
  const filteredResults = filterRecipes(results, filters);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDrawer = () => {
    setSelectedRecipe(null);
  };

  const handleTagClick = (type, value) => {
    setSelectedRecipe(null);
    setIngredientResults(null);
    setSearchQuery(value);
    setActiveTab('search');
  };

  const handleIngredientResults = (recipes, ingredients) => {
    setIngredientResults({ recipes, ingredients });
    setShowIngredientSearch(false);
  };

  const clearFilters = () => {
    setFilters({ dietary: [], cookTime: null, cuisine: null });
  };

  const hasActiveFilters = filters.dietary?.length > 0 || filters.cookTime || filters.cuisine;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoading={isLoading}
        onIngredientSearch={() => setShowIngredientSearch(true)}
      />

      <nav className="sticky top-20 sm:top-20 z-30 glass" data-tour="tabs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-tour={`${tab.id}-tab`}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl shadow-lg shadow-brand-500/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{tab.icon}</span>
                <span className="relative hidden sm:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Ingredient search results banner */}
              {ingredientResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">
                      Showing recipes with: {ingredientResults.ingredients.join(', ')}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {ingredientResults.recipes.length} recipes found
                    </p>
                  </div>
                  <button
                    onClick={() => setIngredientResults(null)}
                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium"
                  >
                    Clear
                  </button>
                </motion.div>
              )}

              {/* Filters */}
              {(hasSearched || ingredientResults) && (
                <FilterBar
                  filters={filters}
                  onFilterChange={setFilters}
                  onClear={clearFilters}
                />
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 font-medium"
                >
                  {error}
                </motion.div>
              )}

              {isLoading && <SkeletonGrid count={6} />}

              {!isLoading && !hasSearched && !ingredientResults && (
                <EmptyState type="search" />
              )}

              {!isLoading && hasSearched && filteredResults.length === 0 && !ingredientResults && (
                <EmptyState type="noResults" />
              )}

              {!isLoading && ingredientResults && (
                <RecipeGrid
                  recipes={filterRecipes(ingredientResults.recipes, filters)}
                  onRecipeClick={handleRecipeClick}
                />
              )}

              {!isLoading && filteredResults.length > 0 && !ingredientResults && (
                <RecipeGrid recipes={filteredResults} onRecipeClick={handleRecipeClick} />
              )}
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SavedRecipes onRecipeClick={handleRecipeClick} />
            </motion.div>
          )}

          {activeTab === 'planner' && (
            <motion.div
              key="planner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MealPlanner onRecipeClick={handleRecipeClick} />
            </motion.div>
          )}

          {activeTab === 'shopping' && (
            <motion.div
              key="shopping"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingList />
            </motion.div>
          )}

          {activeTab === 'nutrition' && (
            <motion.div
              key="nutrition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <NutritionDashboard />
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CookingHistory onRecipeClick={handleRecipeClick} />
            </motion.div>
          )}

          {activeTab === 'suggestions' && (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MealSuggestions onRecipeClick={handleRecipeClick} />
            </motion.div>
          )}

          {activeTab === 'ingredients' && (
            <motion.div
              key="ingredients"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <IngredientsExplorer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="glass mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made with <span className="text-red-500">♥</span> • Recipe data from TheMealDB
          </p>
        </div>
      </footer>

      {/* Floating Explore/Help Button */}
      {!showWalkthrough && (
        <ExploreButton onClick={() => setShowWalkthrough(true)} />
      )}

      <RecipeDrawer
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={handleCloseDrawer}
        onTagClick={handleTagClick}
      />

      <AnimatePresence>
        {showIngredientSearch && (
          <IngredientSearch
            onResults={handleIngredientResults}
            onClose={() => setShowIngredientSearch(false)}
          />
        )}
      </AnimatePresence>

      {/* First-time user walkthrough */}
      <AnimatePresence>
        {showWalkthrough && (
          <Walkthrough onComplete={handleWalkthroughComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
