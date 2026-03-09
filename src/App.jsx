import { useState, lazy, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeDrawer } from './components/RecipeDrawer';
import { FilterBar } from './components/FilterBar';
import { EmptyState } from './components/EmptyState';
import { BrowseRecipes } from './components/BrowseRecipes';
import { SkeletonGrid } from './components/SkeletonCard';
import { Walkthrough, ExploreButton } from './components/Walkthrough';
import { AuthModal } from './components/AuthModal';
import { ConsentBanner } from './components/ConsentBanner';
import { PremiumGate } from './components/PremiumGate';

// Heavy tabs — lazy loaded so they don't bloat the initial bundle
const SavedRecipes      = lazy(() => import('./components/SavedRecipes').then(m => ({ default: m.SavedRecipes })));
const MealPlanner       = lazy(() => import('./components/MealPlanner').then(m => ({ default: m.MealPlanner })));
const ShoppingList      = lazy(() => import('./components/ShoppingList').then(m => ({ default: m.ShoppingList })));
const NutritionDashboard = lazy(() => import('./components/NutritionDashboard').then(m => ({ default: m.NutritionDashboard })));
const CookingHistory    = lazy(() => import('./components/CookingHistory').then(m => ({ default: m.CookingHistory })));
const MealSuggestions   = lazy(() => import('./components/MealSuggestions').then(m => ({ default: m.MealSuggestions })));
const IngredientsExplorer = lazy(() => import('./components/IngredientsExplorer').then(m => ({ default: m.IngredientsExplorer })));
const MyPantry          = lazy(() => import('./components/MyPantry').then(m => ({ default: m.MyPantry })));
const DataManager       = lazy(() => import('./components/DataManager').then(m => ({ default: m.DataManager })));
const Settings          = lazy(() => import('./components/Settings').then(m => ({ default: m.Settings })));
const PrivacyPolicy     = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));

function TabFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
import { useAuth } from './context/AuthContext';
import { useRecipes } from './context/RecipeContext';
import { usePremium } from './hooks/usePremium';
import { useSettings } from './hooks/useSettings';
import { useRecipeSearch } from './hooks/useRecipeSearch';
import { useTabHistory, useBackButton } from './hooks/useBackButton';
import { filterRecipes, getRecipeById } from './services/api';

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

  // True while we're fetching a recipe from a deep-link URL on first load.
  // Prevents the URL sync effect from reverting #recipe/... back to #search
  // before the fetch completes.
  const [deepLinkPending, setDeepLinkPending] = useState(
    () => window.location.hash.slice(1).startsWith('recipe/')
  );

  const handleCloseDrawer = () => {
    setSelectedRecipe(null);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Deep link: on first load open recipe if URL is #recipe/{id}
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('recipe/')) {
      const id = hash.split('/')[1];
      getRecipeById(id)
        .then(recipe => { if (recipe) setSelectedRecipe(recipe); })
        .catch(() => {})
        .finally(() => setDeepLinkPending(false));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep URL in sync with open recipe
  useEffect(() => {
    if (deepLinkPending) return; // Don't touch the URL while the deep-link recipe is loading
    if (selectedRecipe) {
      const target = `#recipe/${selectedRecipe.idMeal}`;
      if (window.location.hash !== target) {
        window.history.replaceState(window.history.state, '', target);
      }
    } else if (window.location.hash.startsWith('#recipe/')) {
      window.history.replaceState(window.history.state, '', `#${activeTab}`);
    }
  }, [selectedRecipe, activeTab, deepLinkPending]);

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
                <BrowseRecipes onRecipeClick={handleRecipeClick} />
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
            <motion.div key="pantry" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Suspense fallback={<TabFallback />}>
                <PremiumGate featureId="pantry">
                  <MyPantry onRecipeClick={handleRecipeClick} />
                </PremiumGate>
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div key="saved" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Suspense fallback={<TabFallback />}>
                <SavedRecipes onRecipeClick={handleRecipeClick} />
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'planner' && (
            <motion.div key="planner" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Suspense fallback={<TabFallback />}>
                <PremiumGate featureId="planner">
                  <MealPlanner onRecipeClick={handleRecipeClick} />
                </PremiumGate>
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'shopping' && (
            <motion.div key="shopping" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Suspense fallback={<TabFallback />}>
                <PremiumGate featureId="shopping">
                  <ShoppingList />
                </PremiumGate>
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'nutrition' && (
            <motion.div key="nutrition" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Suspense fallback={<TabFallback />}>
                <PremiumGate featureId="nutrition">
                  <NutritionDashboard />
                </PremiumGate>
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div key="history" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Suspense fallback={<TabFallback />}>
                <CookingHistory onRecipeClick={handleRecipeClick} />
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'suggestions' && (
            <motion.div key="suggestions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Suspense fallback={<TabFallback />}>
                <MealSuggestions onRecipeClick={handleRecipeClick} />
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'ingredients' && (
            <motion.div key="ingredients" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Suspense fallback={<TabFallback />}>
                <IngredientsExplorer />
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div key="data" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Suspense fallback={<TabFallback />}>
                <DataManager />
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Suspense fallback={<TabFallback />}>
                {showPrivacyPolicy ? (
                  <PrivacyPolicy onBack={() => setShowPrivacyPolicy(false)} />
                ) : (
                  <Settings onShowPrivacyPolicy={() => setShowPrivacyPolicy(true)} />
                )}
              </Suspense>
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
        onRecipeSelect={handleRecipeClick}
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
