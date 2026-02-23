import { useState, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';
import { useSettings } from '../hooks/useSettings.jsx';
import { MealSlot } from './MealSlot';

const DAY_LABELS = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};

const DAY_FULL = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

const MEAL_STYLES = {
  breakfast: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  morning_snack: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  lunch: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  afternoon_snack: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
  dinner: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
};

const MEAL_LABELS = {
  breakfast: 'Breakfast',
  morning_snack: 'AM Snack',
  lunch: 'Lunch',
  afternoon_snack: 'PM Snack',
  dinner: 'Dinner'
};

const WEEKEND = new Set(['saturday', 'sunday']);

export function MealPlanner({ onRecipeClick }) {
  const { savedRecipes, mealPlan, DAYS, MEALS, addToMealPlan, removeFromMealPlan, clearMealPlan, clearDayPlan, swapMeals, getRecipeById, addToCookingHistory, setRecipeRating } = useRecipes();
  const { settings } = useSettings();

  // Reorder DAYS so the week starts on the configured day
  const orderedDays = useMemo(() => {
    if (settings.weekStartDay === 'sunday') {
      const idx = DAYS.indexOf('sunday');
      return idx === -1 ? DAYS : [...DAYS.slice(idx), ...DAYS.slice(0, idx)];
    }
    const idx = DAYS.indexOf('monday');
    return idx === -1 ? DAYS : [...DAYS.slice(idx), ...DAYS.slice(0, idx)];
  }, [DAYS, settings.weekStartDay]);

  // Check if a day has any meals
  const dayHasMeals = (day) => MEALS.some(meal => mealPlan?.[day]?.[meal]);
  const [selectingSlot, setSelectingSlot] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  // Tracks which day-meal slots have been marked cooked this session
  const [cookedSlots, setCookedSlots] = useState(new Set());
  // Rating prompt: { day, meal, recipeId } or null
  const [ratingSlot, setRatingSlot] = useState(null);

  const handleMarkCooked = (day, meal, recipeId) => {
    addToCookingHistory(recipeId);
    setCookedSlots(prev => new Set([...prev, `${day}-${meal}`]));
    setRatingSlot({ day, meal, recipeId });
  };

  const hasAnyMeals = DAYS.some(day =>
    MEALS.some(meal => mealPlan?.[day]?.[meal])
  );

  const handleSelectRecipe = (recipeId) => {
    if (selectingSlot) {
      addToMealPlan(selectingSlot.day, selectingSlot.meal, recipeId);
      setSelectingSlot(null);
    }
  };

  const handleDragStart = (day, meal, recipe) => {
    setDraggedItem({ day, meal, recipe });
  };

  const handleDragOver = (e, day, meal) => {
    e.preventDefault();
    if (draggedItem && (draggedItem.day !== day || draggedItem.meal !== meal)) {
      setDropTarget({ day, meal });
    }
  };

  const handleDrop = (e, day, meal) => {
    e.preventDefault();
    if (draggedItem) {
      swapMeals(
        { day: draggedItem.day, meal: draggedItem.meal },
        { day, meal }
      );
    }
    setDraggedItem(null);
    setDropTarget(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropTarget(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Weekly Meal Plan
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Plan your meals for the week ahead
          </p>
        </div>
        {hasAnyMeals && (
          <motion.button
            onClick={clearMealPlan}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
          >
            Clear All
          </motion.button>
        )}
      </div>

      {/* Drag hint */}
      {hasAnyMeals && (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span>Drag meals to swap them</span>
        </div>
      )}

      {savedRecipes.length === 0 && !hasAnyMeals && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-5"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <span className="text-xl">💡</span>
            </div>
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-200">
                Save some recipes first
              </p>
              <p className="text-amber-700 dark:text-amber-300/80 text-sm mt-1">
                Search for recipes and tap the heart to save them, then add them to your meal plan.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="overflow-x-auto -mx-4 px-4 pb-4 scrollbar-hide">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-8 gap-3">
            <div className="col-span-1" />
            {orderedDays.map((day, i) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`text-center rounded-t-xl pt-1 pb-1 ${WEEKEND.has(day) ? 'bg-violet-50 dark:bg-violet-900/10' : ''}`}
              >
                <span className={`text-sm font-bold uppercase tracking-wider ${
                  WEEKEND.has(day)
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {DAY_LABELS[day]}
                </span>
                {dayHasMeals(day) && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => clearDayPlan(day)}
                    className="ml-1 text-[10px] text-red-400 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400 transition-colors"
                    title={`Clear ${DAY_FULL[day]}`}
                  >
                    clear
                  </motion.button>
                )}
              </motion.div>
            ))}

            {MEALS.map((meal, mealIndex) => (
              <div key={meal} className="contents">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: mealIndex * 0.1 }}
                  className="flex items-center"
                >
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${MEAL_STYLES[meal]}`}>
                    {MEAL_LABELS[meal]}
                  </div>
                </motion.div>
                {orderedDays.map((day, dayIndex) => {
                  const recipeId = mealPlan?.[day]?.[meal];
                  const recipe = recipeId ? getRecipeById(recipeId) : null;
                  const isDragTarget = dropTarget?.day === day && dropTarget?.meal === meal;
                  const isDragging = draggedItem?.day === day && draggedItem?.meal === meal;

                  return (
                    <motion.div
                      key={`${day}-${meal}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (dayIndex + mealIndex * 7) * 0.02 }}
                      onDragOver={(e) => handleDragOver(e, day, meal)}
                      onDrop={(e) => handleDrop(e, day, meal)}
                      className={`relative transition-all rounded-xl ${
                        WEEKEND.has(day) ? 'bg-violet-50 dark:bg-violet-900/10 p-0.5' : ''
                      } ${isDragTarget ? 'ring-2 ring-brand-500 ring-offset-2' : ''
                      } ${isDragging ? 'opacity-50' : ''}`}
                    >
                      <MealSlot
                        recipe={recipe}
                        onAdd={() => setSelectingSlot({ day, meal })}
                        onRemove={() => removeFromMealPlan(day, meal)}
                        onView={() => recipe && onRecipeClick(recipe)}
                        draggable={!!recipe}
                        onDragStart={() => recipe && handleDragStart(day, meal, recipe)}
                        onDragEnd={handleDragEnd}
                        onMarkCooked={() => recipe && handleMarkCooked(day, meal, recipe.idMeal)}
                        isCooked={cookedSlots.has(`${day}-${meal}`)}
                      />
                      {/* Post-cook star rating prompt */}
                      <AnimatePresence>
                        {ratingSlot?.day === day && ratingSlot?.meal === meal && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-1 p-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <p className="text-white text-[10px] font-semibold">How was it?</p>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map(star => (
                                <motion.button
                                  key={star}
                                  whileHover={{ scale: 1.3 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => {
                                    setRecipeRating(ratingSlot.recipeId, star);
                                    setRatingSlot(null);
                                  }}
                                  className="text-base leading-none"
                                >
                                  ⭐
                                </motion.button>
                              ))}
                            </div>
                            <button
                              onClick={() => setRatingSlot(null)}
                              className="text-gray-400 text-[9px] hover:text-white transition-colors mt-0.5"
                            >
                              skip
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectingSlot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectingSlot(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="text-center mb-6">
                <div className={`inline-flex px-4 py-2 rounded-full text-sm font-bold mb-3 ${MEAL_STYLES[selectingSlot.meal]}`}>
                  {DAY_FULL[selectingSlot.day]} · {MEAL_LABELS[selectingSlot.meal]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Choose a Recipe
                </h3>
              </div>

              {savedRecipes.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📚</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    No saved recipes yet
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Search and save some recipes first!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 overflow-y-auto flex-1 scrollbar-thin pr-2">
                  {savedRecipes.map((recipe, i) => (
                    <motion.button
                      key={recipe.idMeal}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleSelectRecipe(recipe.idMeal)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-left"
                    >
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-14 h-14 rounded-xl object-cover shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 dark:text-white truncate">
                          {recipe.strMeal}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {recipe.strCategory} · {recipe.strArea}
                        </p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              )}

              <motion.button
                onClick={() => setSelectingSlot(null)}
                whileHover={{ scale: 1.02 }}
                className="mt-4 w-full py-3 text-gray-500 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
