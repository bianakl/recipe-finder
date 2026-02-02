import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';
import { getRecipeById, parseIngredients, scaleIngredients } from '../services/api';
import { StarRating } from './StarRating';

export function RecipeDrawer({ recipe, isOpen, onClose, onTagClick }) {
  const [fullRecipe, setFullRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [servings, setServings] = useState(4);
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const {
    isRecipeSaved,
    saveRecipe,
    unsaveRecipe,
    DAYS,
    MEALS,
    addToMealPlan,
    addToCookingHistory,
    getRecipeNote,
    setRecipeNote,
    getRecipeRating,
    setRecipeRating
  } = useRecipes();

  useEffect(() => {
    if (recipe && isOpen) {
      setIsLoading(true);
      setServings(4);
      getRecipeById(recipe.idMeal)
        .then(setFullRecipe)
        .finally(() => setIsLoading(false));
      setNote(getRecipeNote(recipe.idMeal));
    }
  }, [recipe, isOpen, getRecipeNote]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!recipe) return null;

  const isSaved = isRecipeSaved(recipe.idMeal);
  const rating = getRecipeRating(recipe.idMeal);
  const originalServings = fullRecipe?.servings || 4;
  const rawIngredients = fullRecipe ? parseIngredients(fullRecipe) : [];
  const ingredients = scaleIngredients(rawIngredients, originalServings, servings);

  const handleSave = () => {
    if (isSaved) {
      unsaveRecipe(recipe.idMeal);
    } else {
      saveRecipe(fullRecipe || recipe);
    }
  };

  const handleAddToMealPlan = (day, meal) => {
    if (!isSaved) {
      saveRecipe(fullRecipe || recipe);
    }
    addToMealPlan(day, meal, recipe.idMeal);
    setShowMealPlanModal(false);
  };

  const handleMarkAsCooked = () => {
    addToCookingHistory(recipe.idMeal);
    if (!isSaved) {
      saveRecipe(fullRecipe || recipe);
    }
  };

  const handleSaveNote = () => {
    setRecipeNote(recipe.idMeal, note);
    setShowNoteInput(false);
  };

  const DAY_LABELS = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 glass-strong">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 pr-4">
                {recipe.strMeal}
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin">
              <div className="relative aspect-[16/10]">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                  {recipe.strCategory && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTagClick?.('category', recipe.strCategory);
                      }}
                      className="px-4 py-2 rounded-full text-sm font-bold bg-white/95 text-gray-900 shadow-lg hover:bg-brand-100 hover:text-brand-700 transition-colors cursor-pointer"
                    >
                      {recipe.strCategory}
                    </motion.button>
                  )}
                  {recipe.strArea && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTagClick?.('cuisine', recipe.strArea);
                      }}
                      className="px-4 py-2 rounded-full text-sm font-bold bg-white/95 text-gray-900 shadow-lg hover:bg-brand-100 hover:text-brand-700 transition-colors cursor-pointer"
                    >
                      {recipe.strArea}
                    </motion.button>
                  )}
                  {fullRecipe?.cookTime && (
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-white/95 text-gray-900 shadow-lg flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {fullRecipe.cookTime} min
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Rating</span>
                  <StarRating
                    rating={rating}
                    onRate={(r) => setRecipeRating(recipe.idMeal, r)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleSave}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                      isSaved
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                        : 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30'
                    }`}
                  >
                    <motion.svg
                      animate={isSaved ? { scale: [1, 1.3, 1] } : {}}
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={isSaved ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </motion.svg>
                    {isSaved ? 'Saved' : 'Save'}
                  </motion.button>

                  <motion.button
                    onClick={() => setShowMealPlanModal(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 px-4 rounded-2xl font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Add to Plan
                  </motion.button>

                  <motion.button
                    onClick={handleMarkAsCooked}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-4 rounded-2xl font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Cooked
                  </motion.button>
                </div>

                {/* Nutrition Preview */}
                {fullRecipe?.nutrition && (
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {Math.round(fullRecipe.nutrition.calories * (servings / originalServings))}
                      </div>
                      <div className="text-xs text-orange-600/70 dark:text-orange-400/70">kcal</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">
                        {Math.round(fullRecipe.nutrition.protein * (servings / originalServings))}g
                      </div>
                      <div className="text-xs text-red-600/70 dark:text-red-400/70">protein</div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                        {Math.round(fullRecipe.nutrition.carbs * (servings / originalServings))}g
                      </div>
                      <div className="text-xs text-yellow-600/70 dark:text-yellow-400/70">carbs</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {Math.round(fullRecipe.nutrition.fat * (servings / originalServings))}g
                      </div>
                      <div className="text-xs text-purple-600/70 dark:text-purple-400/70">fat</div>
                    </div>
                  </div>
                )}

                {/* Personal Notes */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <span>📝</span> Personal Notes
                    </h4>
                    {!showNoteInput && (
                      <button
                        onClick={() => setShowNoteInput(true)}
                        className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline"
                      >
                        {note ? 'Edit' : 'Add note'}
                      </button>
                    )}
                  </div>
                  {showNoteInput ? (
                    <div className="space-y-2">
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Add your notes, tips, or modifications..."
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 resize-none"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveNote}
                          className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
                        >
                          Save Note
                        </button>
                        <button
                          onClick={() => {
                            setNote(getRecipeNote(recipe.idMeal));
                            setShowNoteInput(false);
                          }}
                          className="px-4 py-2 text-gray-500 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : note ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{note}</p>
                  ) : (
                    <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                      No notes yet. Add your personal tips or modifications!
                    </p>
                  )}
                </div>

                {isLoading ? (
                  <div className="space-y-6">
                    <div className="h-7 skeleton w-1/3" />
                    <div className="space-y-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-5 skeleton w-full" />
                      ))}
                    </div>
                  </div>
                ) : fullRecipe && (
                  <>
                    {/* Ingredients with Scaling */}
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                            📝
                          </span>
                          Ingredients
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Servings:</span>
                          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setServings(Math.max(1, servings - 1))}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </motion.button>
                            <span className="w-8 text-center font-bold text-gray-900 dark:text-white">
                              {servings}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setServings(Math.min(20, servings + 1))}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      <ul className="grid gap-3">
                        {ingredients.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                          >
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-500 to-pink-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                              <span className="font-semibold text-gray-900 dark:text-white">{item.measure}</span> {item.ingredient}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          👨‍🍳
                        </span>
                        Instructions
                      </h3>
                      <div className="space-y-4">
                        {fullRecipe.strInstructions.split('\n').filter(Boolean).map((paragraph, i) => (
                          <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="text-gray-600 dark:text-gray-400 leading-relaxed"
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </div>
                    </div>

                    {fullRecipe.strYoutube && (
                      <motion.a
                        href={fullRecipe.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Watch Video Tutorial
                      </motion.a>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {showMealPlanModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4"
                onClick={() => setShowMealPlanModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl max-h-[80vh] overflow-hidden"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Add to Meal Plan
                  </h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin pr-2">
                    {DAYS.map(day => (
                      <div key={day} className="space-y-2">
                        <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                          {DAY_LABELS[day]}
                        </p>
                        <div className="flex gap-2">
                          {MEALS.map(meal => (
                            <motion.button
                              key={meal}
                              onClick={() => handleAddToMealPlan(day, meal)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="flex-1 py-3 px-4 text-sm font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-700 dark:hover:text-brand-300 transition-all capitalize"
                            >
                              {meal}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    onClick={() => setShowMealPlanModal(false)}
                    whileHover={{ scale: 1.02 }}
                    className="mt-6 w-full py-3 text-gray-500 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
