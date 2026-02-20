import { useState } from 'react';
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
import { IngredientsExplorer } from './components/IngredientsExplorer';
import { MyPantry } from './components/MyPantry';
import { DataManager } from './components/DataManager';
import { Settings } from './components/Settings';
import { FilterBar } from './components/FilterBar';
import { EmptyState } from './components/EmptyState';
import { SkeletonGrid } from './components/SkeletonCard';
import { Walkthrough, ExploreButton } from './components/Walkthrough';
import { AuthModal } from './components/AuthModal';
import { ConsentBanner } from './components/ConsentBanner';
import { PremiumGate } from './components/PremiumGate';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { useAuth } from './context/AuthContext';
import { useRecipes } from './context/RecipeContext';
import { usePremium } from './hooks/usePremium';
import { useSettings } from './hooks/useSettings';
import { useRecipeSearch } from './hooks/useRecipeSearch';
import { useTabHistory, useBackButton } from './hooks/useBackButton';
import { filterRecipes } from './services/api';

const tabs = [
  { id: 'search', label: 'Discover', icon: '✨' },
  { id: 'pantry', label: 'My Pantry', icon: '🫙' },
  { id: 'saved', label: 'Saved', icon: '💜' },
  { id: 'planner', label: 'Meal Plan', icon: '📅' },
  { id: 'shopping', label: 'Shopping', icon: '🛒' },
  { id: 'nutrition', label: 'Nutrition', icon: '📊' },
  { id: 'history', label: 'History', icon: '📜' },
  { id: 'suggestions', label: 'Ideas', icon: '💡' },
  { id: 'ingredients', label: 'Ingredients', icon: '🧪' },
  { id: 'data', label: 'Data', icon: '💾' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState('search');
  const [filters, setFilters] = useState({ dietary: [], cookTime: null, cuisine: null });
  const [showWalkthrough, setShowWalkthrough] = useState(
    () => !localStorage.getItem('recipe-finder-walkthrough-completed')
  );
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const { showAuthModal, setShowAuthModal } = useAuth();
  const { syncStatus } = useRecipes();
  const { isPremium } = usePremium();
  const { settings } = useSettings();

  // Dietary preferences saved in Settings act as a persistent base layer
  const profileDietary = settings.dietaryPreferences || [];

  const PREMIUM_TABS = new Set(['pantry', 'planner', 'shopping', 'nutrition']);

  const handleWalkthroughComplete = () => {
    localStorage.setItem('recipe-finder-walkthrough-completed', 'true');
    setShowWalkthrough(false);
  };

  const { results, isLoading, error, hasSearched } = useRecipeSearch(searchQuery);

  const handleCloseDrawer = () => {
    setSelectedRecipe(null);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Browser history integration for tabs
  useTabHistory(activeTab, setActiveTab, 'search');

  // Back button support for recipe drawer
  useBackButton(!!selectedRecipe, handleCloseDrawer, 'recipeDrawer');

  // Merge profile-level dietary preferences with session filter overrides
  const effectiveFilters = {
    ...filters,
    dietary: [...new Set([...profileDietary, ...(filters.dietary || [])])],
  };

  // Apply filters to search results
  const filteredResults = filterRecipes(results, effectiveFilters);

  const handleTagClick = (type, value) => {
    setSelectedRecipe(null);
    setSearchQuery(value);
    setActiveTab('search');
  };

  const clearFilters = () => {
    setFilters({ dietary: [], cookTime: null, cuisine: null });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoading={isLoading}
        onPantryClick={() => setActiveTab('pantry')}
        syncStatus={syncStatus}
      />

      <nav className="sticky top-20 sm:top-20 z-30 glass" data-tour="tabs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setShowPrivacyPolicy(false); }}
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
                {!isPremium && PREMIUM_TABS.has(tab.id) && (
                  <span className="relative text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                    PRO
                  </span>
                )}
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
              {/* Filters */}
              {hasSearched && (
                <FilterBar
                  filters={filters}
                  onFilterChange={setFilters}
                  onClear={clearFilters}
                  profileDietary={profileDietary}
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

              {!isLoading && !hasSearched && (
                <EmptyState type="search" />
              )}

              {!isLoading && hasSearched && filteredResults.length === 0 && (
                <EmptyState type="noResults" />
              )}

              {!isLoading && filteredResults.length > 0 && (
                <RecipeGrid recipes={filteredResults} onRecipeClick={handleRecipeClick} />
              )}
            </motion.div>
          )}

          {activeTab === 'pantry' && (
            <motion.div
              key="pantry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PremiumGate featureId="pantry">
                <MyPantry onRecipeClick={handleRecipeClick} />
              </PremiumGate>
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
              <PremiumGate featureId="planner">
                <MealPlanner onRecipeClick={handleRecipeClick} />
              </PremiumGate>
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
              <PremiumGate featureId="shopping">
                <ShoppingList />
              </PremiumGate>
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
              <PremiumGate featureId="nutrition">
                <NutritionDashboard />
              </PremiumGate>
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

          {activeTab === 'data' && (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DataManager />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {showPrivacyPolicy ? (
                <PrivacyPolicy onBack={() => setShowPrivacyPolicy(false)} />
              ) : (
                <Settings onShowPrivacyPolicy={() => setShowPrivacyPolicy(true)} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="glass mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made with <span className="text-red-500">♥</span> by Biana • Recipe data from TheMealDB
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

      {/* First-time user walkthrough */}
      <AnimatePresence>
        {showWalkthrough && (
          <Walkthrough onComplete={handleWalkthroughComplete} />
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Consent Banner */}
      <ConsentBanner />
    </div>
  );
}

export default App;
