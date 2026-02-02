import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';
import { MOCK_RECIPES } from '../services/api';

export function MealSuggestions({ onRecipeClick }) {
  const { savedRecipes, mealPlan, cookingHistory, recipeRatings } = useRecipes();

  const suggestions = useMemo(() => {
    const result = [];

    // Get used recipe IDs this week
    const usedThisWeek = new Set();
    Object.values(mealPlan).forEach(day => {
      Object.values(day).forEach(recipeId => {
        if (recipeId) usedThisWeek.add(recipeId);
      });
    });

    // Get recently cooked recipes
    const recentlyCookedIds = new Set(
      cookingHistory.slice(0, 10).map(h => h.recipeId)
    );

    // Get top rated recipes
    const topRated = Object.entries(recipeRatings)
      .filter(([, rating]) => rating >= 4)
      .map(([id]) => id);

    // Combine saved recipes and mock recipes
    const allRecipes = [
      ...savedRecipes,
      ...MOCK_RECIPES.filter(r => !savedRecipes.some(s => s.idMeal === r.idMeal))
    ];

    // Suggestion 1: Top rated recipes not used this week
    const topRatedSuggestions = allRecipes.filter(r =>
      topRated.includes(r.idMeal) && !usedThisWeek.has(r.idMeal)
    );
    if (topRatedSuggestions.length > 0) {
      result.push({
        title: 'Your Favorites',
        subtitle: 'Highly rated recipes you might want to cook again',
        icon: '⭐',
        recipes: topRatedSuggestions.slice(0, 4)
      });
    }

    // Suggestion 2: Quick meals (under 30 min)
    const quickMeals = MOCK_RECIPES.filter(r =>
      r.cookTime && r.cookTime <= 30 && !usedThisWeek.has(r.idMeal)
    );
    if (quickMeals.length > 0) {
      result.push({
        title: 'Quick & Easy',
        subtitle: 'Ready in 30 minutes or less',
        icon: '⚡',
        recipes: quickMeals.slice(0, 4)
      });
    }

    // Suggestion 3: Haven't cooked in a while
    const notRecentlyCooked = savedRecipes.filter(r =>
      !recentlyCookedIds.has(r.idMeal) && !usedThisWeek.has(r.idMeal)
    );
    if (notRecentlyCooked.length > 0) {
      result.push({
        title: 'Rediscover',
        subtitle: 'Saved recipes you haven\'t made recently',
        icon: '🔄',
        recipes: notRecentlyCooked.slice(0, 4)
      });
    }

    // Suggestion 4: Healthy options
    const healthyOptions = MOCK_RECIPES.filter(r =>
      r.dietary?.some(d => ['vegetarian', 'healthy', 'low-carb'].includes(d)) &&
      !usedThisWeek.has(r.idMeal)
    );
    if (healthyOptions.length > 0) {
      result.push({
        title: 'Healthy Choices',
        subtitle: 'Nutritious options for balanced eating',
        icon: '🥗',
        recipes: healthyOptions.slice(0, 4)
      });
    }

    // Suggestion 5: Breakfast ideas (if few breakfasts planned)
    const breakfastsPlanned = Object.values(mealPlan).filter(d => d.breakfast).length;
    if (breakfastsPlanned < 3) {
      const breakfastRecipes = MOCK_RECIPES.filter(r =>
        r.strCategory?.toLowerCase().includes('breakfast') ||
        r.strMeal?.toLowerCase().includes('egg') ||
        r.strMeal?.toLowerCase().includes('toast') ||
        r.strMeal?.toLowerCase().includes('oat')
      );
      if (breakfastRecipes.length > 0) {
        result.push({
          title: 'Breakfast Ideas',
          subtitle: 'Start your day right',
          icon: '🌅',
          recipes: breakfastRecipes.slice(0, 4)
        });
      }
    }

    return result;
  }, [savedRecipes, mealPlan, cookingHistory, recipeRatings]);

  if (suggestions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30 flex items-center justify-center">
          <span className="text-4xl">💡</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          No Suggestions Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          Save some recipes and cook a few meals to get personalized suggestions
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Meal Suggestions
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Personalized recommendations based on your preferences
        </p>
      </div>

      {suggestions.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{section.icon}</span>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {section.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {section.recipes.map((recipe, index) => (
              <motion.div
                key={recipe.idMeal}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => onRecipeClick(recipe)}
                className="cursor-pointer group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm line-clamp-2 drop-shadow-lg">
                      {recipe.strMeal}
                    </p>
                    {recipe.cookTime && (
                      <p className="text-white/80 text-xs mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {recipe.cookTime} min
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
