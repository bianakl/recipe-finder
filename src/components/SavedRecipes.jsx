import { motion } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';
import { usePremium } from '../hooks/usePremium';
import { EmptyState } from './EmptyState';

export function SavedRecipes({ onRecipeClick }) {
  const { savedRecipes, unsaveRecipe } = useRecipes();
  const { isPremium, FREE_SAVE_LIMIT, savedCount } = usePremium();

  if (savedRecipes.length === 0) {
    return <EmptyState type="savedEmpty" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Saved Recipes
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Your favorite recipes in one place
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isPremium && (
            <span className="px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-bold text-xs">
              {savedCount}/{FREE_SAVE_LIMIT} free
            </span>
          )}
          <span className="px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 font-bold text-sm">
            {savedRecipes.length} saved
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {savedRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.idMeal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="group cursor-pointer"
            onClick={() => onRecipeClick(recipe)}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <motion.img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold line-clamp-2 drop-shadow-lg">
                  {recipe.strMeal}
                </p>
                <div className="flex gap-2 mt-2">
                  {recipe.strCategory && (
                    <span className="text-xs font-semibold text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      {recipe.strCategory}
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  unsaveRecipe(recipe.idMeal);
                }}
                initial={{ opacity: 0 }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgb(239 68 68)' }}
                className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label="Remove from saved"
              >
                <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
