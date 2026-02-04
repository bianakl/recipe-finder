import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';

export function Header({ searchQuery, onSearchChange, isLoading, onIngredientSearch }) {
  return (
    <header className="sticky top-0 z-40 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <span className="text-xl">🍽️</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Recipe Finder
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">
                Plan your perfect week
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl hidden sm:flex items-center gap-2">
            <div data-tour="search" className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={onSearchChange}
                isLoading={isLoading}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onIngredientSearch}
              data-tour="fridge"
              className="shrink-0 px-4 py-3 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium flex items-center gap-2 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors group relative"
              title="Find recipes by what's in your fridge"
            >
              <span>🧊</span>
              <span className="hidden lg:inline">What's in my fridge?</span>
              <span className="lg:hidden">Fridge</span>
              {/* Tooltip for clarity */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                Find recipes with ingredients you have
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
              </div>
            </motion.button>
          </div>

          <ThemeToggle />
        </div>

        <div className="sm:hidden pb-4 flex gap-2">
          <div data-tour="search-mobile" className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              isLoading={isLoading}
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onIngredientSearch}
            data-tour="fridge-mobile"
            className="shrink-0 w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 flex items-center justify-center"
            title="Find recipes by ingredients"
          >
            <span className="text-xl">🧊</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
