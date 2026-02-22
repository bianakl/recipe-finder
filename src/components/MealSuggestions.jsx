import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';
import { useSettings } from '../hooks/useSettings.jsx';
import { MOCK_RECIPES, searchByPantry, fetchByCategory } from '../services/api';

// One discover category per day of the week — feels intentional, not random
const DISCOVER_CATEGORIES = ['Chicken', 'Beef', 'Seafood', 'Vegetarian', 'Pasta', 'Dessert', 'Lamb'];

function RecipeCard({ recipe, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(recipe)}
      className="cursor-pointer group"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
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
  );
}

function CardSkeleton() {
  return (
    <div className="aspect-square rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
  );
}

function Section({ icon, title, subtitle, recipes, isLoading, onRecipeClick, delay = 0 }) {
  if (!isLoading && !recipes.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : recipes.slice(0, 4).map((recipe, i) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} onClick={onRecipeClick} index={i} />
            ))
        }
      </div>
    </motion.div>
  );
}

export function MealSuggestions({ onRecipeClick }) {
  const { savedRecipes, mealPlan, cookingHistory, recipeRatings, pantry } = useRecipes();
  const { settings } = useSettings();
  const dietaryPrefs = settings.dietaryPreferences || [];

  const [pantryMatches, setPantryMatches] = useState([]);
  const [pantryLoading, setPantryLoading] = useState(false);
  const [discoverRecipes, setDiscoverRecipes] = useState([]);
  const [discoverLoading, setDiscoverLoading] = useState(true);

  const safePantry = Array.isArray(pantry) ? pantry : [];

  // Load pantry-based suggestions
  useEffect(() => {
    if (safePantry.length === 0) return;
    setPantryLoading(true); // eslint-disable-line react-hooks/set-state-in-effect
    searchByPantry(safePantry)
      .then(results => setPantryMatches(results.slice(0, 4)))
      .catch(() => setPantryMatches([]))
      .finally(() => setPantryLoading(false));
  }, [safePantry.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load discover section — category rotates by day of week
  useEffect(() => {
    const dayIndex = new Date().getDay(); // 0 = Sunday
    const category = DISCOVER_CATEGORIES[dayIndex];
    setDiscoverLoading(true); // eslint-disable-line react-hooks/set-state-in-effect
    fetchByCategory(category)
      .then(results => {
        // Shuffle and pick 4
        const shuffled = results.sort(() => Math.random() - 0.5);
        setDiscoverRecipes(shuffled.slice(0, 4));
      })
      .catch(() => setDiscoverRecipes([]))
      .finally(() => setDiscoverLoading(false));
  }, []);

  // Personalized sync sections
  const { favorites, quickMeals, rediscover, healthyOptions } = useMemo(() => {
    const usedThisWeek = new Set();
    Object.values(mealPlan).forEach(day =>
      Object.values(day).forEach(id => { if (id) usedThisWeek.add(id); })
    );

    const recentlyCookedIds = new Set(cookingHistory.slice(0, 10).map(h => h.recipeId));
    const topRatedIds = new Set(
      Object.entries(recipeRatings)
        .filter(([, r]) => r >= 4)
        .map(([id]) => id)
    );

    const allRecipes = [
      ...savedRecipes,
      ...MOCK_RECIPES.filter(r => !savedRecipes.some(s => s.idMeal === r.idMeal)),
    ];

    return {
      favorites: allRecipes.filter(r => topRatedIds.has(r.idMeal) && !usedThisWeek.has(r.idMeal)),
      quickMeals: MOCK_RECIPES.filter(r => r.cookTime && r.cookTime <= 30 && !usedThisWeek.has(r.idMeal)),
      rediscover: savedRecipes.filter(r => !recentlyCookedIds.has(r.idMeal) && !usedThisWeek.has(r.idMeal)),
      healthyOptions: MOCK_RECIPES.filter(r =>
        r.dietary?.some(d => ['vegetarian', 'low-carb', 'high-protein'].includes(d)) &&
        !usedThisWeek.has(r.idMeal)
      ),
    };
  }, [savedRecipes, mealPlan, cookingHistory, recipeRatings]);

  const discoverDayName = DISCOVER_CATEGORIES[new Date().getDay()];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meal Ideas</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {dietaryPrefs.length > 0
            ? `Suggestions based on your preferences · ${dietaryPrefs.join(', ')}`
            : 'Personalized suggestions based on your pantry and history'}
        </p>
      </div>

      {/* Make it tonight — pantry based, only shown if pantry has items */}
      {safePantry.length > 0 && (
        <Section
          icon="🫙"
          title="Make it Tonight"
          subtitle={`Based on your ${safePantry.length} pantry ingredient${safePantry.length !== 1 ? 's' : ''}`}
          recipes={pantryMatches}
          isLoading={pantryLoading}
          onRecipeClick={onRecipeClick}
          delay={0}
        />
      )}

      {/* Personalized sections */}
      <Section
        icon="⭐"
        title="Your Favorites"
        subtitle="Highly rated recipes you might want to cook again"
        recipes={favorites}
        onRecipeClick={onRecipeClick}
        delay={0.05}
      />
      <Section
        icon="⚡"
        title="Quick & Easy"
        subtitle="Ready in 30 minutes or less"
        recipes={quickMeals}
        onRecipeClick={onRecipeClick}
        delay={0.1}
      />
      <Section
        icon="🔄"
        title="Rediscover"
        subtitle="Saved recipes you haven't made recently"
        recipes={rediscover}
        onRecipeClick={onRecipeClick}
        delay={0.15}
      />
      <Section
        icon="🥗"
        title="Healthy Choices"
        subtitle="Nutritious options for balanced eating"
        recipes={healthyOptions}
        onRecipeClick={onRecipeClick}
        delay={0.2}
      />

      {/* Discover — always visible, pulls from TheMealDB */}
      <Section
        icon="✨"
        title={`Discover · ${discoverDayName}`}
        subtitle="Fresh ideas from today's featured category"
        recipes={discoverRecipes}
        isLoading={discoverLoading}
        onRecipeClick={onRecipeClick}
        delay={0.25}
      />

      {/* Prompt to add pantry if empty */}
      {safePantry.length === 0 && !pantryLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 flex items-start gap-4"
        >
          <span className="text-2xl mt-0.5">🫙</span>
          <div>
            <p className="font-semibold text-brand-800 dark:text-brand-200">
              Add ingredients to your pantry
            </p>
            <p className="text-sm text-brand-600 dark:text-brand-400 mt-0.5">
              The "Make it Tonight" section will show recipes you can cook with what you already have.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
