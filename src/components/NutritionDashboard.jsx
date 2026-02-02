import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';
import { calculateNutrition } from '../services/api';

const EXTRAS_KEY = 'recipe-finder-nutrition-extras';

const DEFAULT_DRINKS = [
  { id: 'coffee', name: 'Coffee (black)', icon: '☕', calories: 5, protein: 0, carbs: 0, fat: 0 },
  { id: 'coffee-milk', name: 'Coffee with milk', icon: '☕', calories: 50, protein: 2, carbs: 5, fat: 2 },
  { id: 'tea', name: 'Tea', icon: '🍵', calories: 2, protein: 0, carbs: 0, fat: 0 },
  { id: 'juice', name: 'Orange juice (glass)', icon: '🍊', calories: 110, protein: 2, carbs: 26, fat: 0 },
  { id: 'soda', name: 'Soda (can)', icon: '🥤', calories: 140, protein: 0, carbs: 39, fat: 0 },
  { id: 'smoothie', name: 'Fruit smoothie', icon: '🥤', calories: 200, protein: 4, carbs: 40, fat: 2 },
  { id: 'milk', name: 'Milk (glass)', icon: '🥛', calories: 150, protein: 8, carbs: 12, fat: 8 },
  { id: 'wine', name: 'Wine (glass)', icon: '🍷', calories: 125, protein: 0, carbs: 4, fat: 0 },
  { id: 'beer', name: 'Beer (bottle)', icon: '🍺', calories: 150, protein: 1, carbs: 13, fat: 0 },
];

const DEFAULT_SNACKS = [
  { id: 'apple', name: 'Apple', icon: '🍎', calories: 95, protein: 0, carbs: 25, fat: 0 },
  { id: 'banana', name: 'Banana', icon: '🍌', calories: 105, protein: 1, carbs: 27, fat: 0 },
  { id: 'nuts', name: 'Handful of nuts', icon: '🥜', calories: 170, protein: 5, carbs: 6, fat: 15 },
  { id: 'yogurt', name: 'Yogurt cup', icon: '🥛', calories: 150, protein: 8, carbs: 20, fat: 4 },
  { id: 'cheese', name: 'Cheese stick', icon: '🧀', calories: 80, protein: 6, carbs: 1, fat: 6 },
  { id: 'crackers', name: 'Crackers (5)', icon: '🍘', calories: 80, protein: 1, carbs: 13, fat: 3 },
  { id: 'chips', name: 'Chips (small bag)', icon: '🥔', calories: 150, protein: 2, carbs: 15, fat: 10 },
  { id: 'cookie', name: 'Cookie', icon: '🍪', calories: 160, protein: 2, carbs: 22, fat: 8 },
  { id: 'chocolate', name: 'Chocolate bar', icon: '🍫', calories: 210, protein: 3, carbs: 24, fat: 13 },
  { id: 'protein-bar', name: 'Protein bar', icon: '💪', calories: 200, protein: 20, carbs: 22, fat: 7 },
];

export function NutritionDashboard() {
  const { mealPlan, getRecipeById } = useRecipes();
  const [extras, setExtras] = useState({ drinks: {}, snacks: {} });
  const [showExtrasModal, setShowExtrasModal] = useState(false);
  const [extrasTab, setExtrasTab] = useState('drinks');

  // Load extras from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(EXTRAS_KEY);
      if (saved) {
        setExtras(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load extras:', e);
    }
  }, []);

  // Save extras to localStorage
  useEffect(() => {
    localStorage.setItem(EXTRAS_KEY, JSON.stringify(extras));
  }, [extras]);

  const nutrition = useMemo(() => {
    return calculateNutrition(mealPlan, getRecipeById);
  }, [mealPlan, getRecipeById]);

  // Calculate extras totals
  const extrasTotals = useMemo(() => {
    let calories = 0, protein = 0, carbs = 0, fat = 0;

    // Sum drinks
    Object.entries(extras.drinks).forEach(([id, count]) => {
      const drink = DEFAULT_DRINKS.find(d => d.id === id);
      if (drink && count > 0) {
        calories += drink.calories * count;
        protein += drink.protein * count;
        carbs += drink.carbs * count;
        fat += drink.fat * count;
      }
    });

    // Sum snacks
    Object.entries(extras.snacks).forEach(([id, count]) => {
      const snack = DEFAULT_SNACKS.find(s => s.id === id);
      if (snack && count > 0) {
        calories += snack.calories * count;
        protein += snack.protein * count;
        carbs += snack.carbs * count;
        fat += snack.fat * count;
      }
    });

    return { calories, protein, carbs, fat };
  }, [extras]);

  const dailyGoals = {
    calories: 2000,
    protein: 50,
    carbs: 300,
    fat: 65
  };

  // Include extras in daily averages
  const totalWithExtras = {
    calories: nutrition.totalCalories + extrasTotals.calories,
    protein: nutrition.totalProtein + extrasTotals.protein,
    carbs: nutrition.totalCarbs + extrasTotals.carbs,
    fat: nutrition.totalFat + extrasTotals.fat,
  };

  const avgCalories = totalWithExtras.calories / 7;
  const avgProtein = totalWithExtras.protein / 7;
  const avgCarbs = totalWithExtras.carbs / 7;
  const avgFat = totalWithExtras.fat / 7;

  const updateExtra = (type, id, delta) => {
    setExtras(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: Math.max(0, (prev[type][id] || 0) + delta)
      }
    }));
  };

  const clearExtras = () => {
    setExtras({ drinks: {}, snacks: {} });
  };

  const NutrientBar = ({ label, value, goal, color, unit = 'g' }) => {
    const percentage = Math.min((value / goal) * 100, 100);
    const isOver = value > goal;

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          <span className={`text-sm font-bold ${isOver ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
            {Math.round(value)}{unit}
            <span className="text-gray-400 dark:text-gray-500 font-normal"> / {goal}{unit}</span>
          </span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${color}`}
          />
        </div>
      </div>
    );
  };

  if (nutrition.mealsPlanned === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          No Nutrition Data Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          Add recipes to your meal plan to see weekly nutrition insights
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Weekly Nutrition
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Based on {nutrition.mealsPlanned} planned meals
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 rounded-2xl p-4"
        >
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
            {Math.round(nutrition.totalCalories).toLocaleString()}
          </div>
          <div className="text-sm text-orange-600/70 dark:text-orange-400/70">
            Total Calories
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 rounded-2xl p-4"
        >
          <div className="text-3xl mb-2">🥩</div>
          <div className="text-2xl font-bold text-red-700 dark:text-red-300">
            {Math.round(nutrition.totalProtein)}g
          </div>
          <div className="text-sm text-red-600/70 dark:text-red-400/70">
            Total Protein
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-2xl p-4"
        >
          <div className="text-3xl mb-2">🍞</div>
          <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
            {Math.round(nutrition.totalCarbs)}g
          </div>
          <div className="text-sm text-yellow-600/70 dark:text-yellow-400/70">
            Total Carbs
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl p-4"
        >
          <div className="text-3xl mb-2">🥑</div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            {Math.round(nutrition.totalFat)}g
          </div>
          <div className="text-sm text-purple-600/70 dark:text-purple-400/70">
            Total Fat
          </div>
        </motion.div>
      </div>

      {/* Daily Average */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Daily Average vs Goals
        </h3>
        <div className="space-y-4">
          <NutrientBar
            label="Calories"
            value={avgCalories}
            goal={dailyGoals.calories}
            color="bg-gradient-to-r from-orange-400 to-orange-500"
            unit="kcal"
          />
          <NutrientBar
            label="Protein"
            value={avgProtein}
            goal={dailyGoals.protein}
            color="bg-gradient-to-r from-red-400 to-red-500"
          />
          <NutrientBar
            label="Carbohydrates"
            value={avgCarbs}
            goal={dailyGoals.carbs}
            color="bg-gradient-to-r from-yellow-400 to-yellow-500"
          />
          <NutrientBar
            label="Fat"
            value={avgFat}
            goal={dailyGoals.fat}
            color="bg-gradient-to-r from-purple-400 to-purple-500"
          />
        </div>

        {extrasTotals.calories > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Includes {extrasTotals.calories} kcal from drinks & snacks
            </p>
          </div>
        )}
      </div>

      {/* Drinks & Snacks */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🥤</span> Drinks & Snacks
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowExtrasModal(true)}
            className="px-4 py-2 text-sm font-bold bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-xl hover:bg-brand-200 dark:hover:bg-brand-900/50 transition-colors"
          >
            + Add
          </motion.button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Track drinks and snacks for more accurate nutrition data
        </p>

        {/* Current extras summary */}
        {extrasTotals.calories > 0 ? (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="font-bold text-orange-600 dark:text-orange-400">{extrasTotals.calories}</div>
                <div className="text-xs text-orange-500/70">kcal</div>
              </div>
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="font-bold text-red-600 dark:text-red-400">{extrasTotals.protein}g</div>
                <div className="text-xs text-red-500/70">protein</div>
              </div>
              <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="font-bold text-yellow-600 dark:text-yellow-400">{extrasTotals.carbs}g</div>
                <div className="text-xs text-yellow-500/70">carbs</div>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="font-bold text-purple-600 dark:text-purple-400">{extrasTotals.fat}g</div>
                <div className="text-xs text-purple-500/70">fat</div>
              </div>
            </div>

            {/* List of added items */}
            <div className="space-y-2">
              {Object.entries(extras.drinks).map(([id, count]) => {
                if (count === 0) return null;
                const drink = DEFAULT_DRINKS.find(d => d.id === id);
                if (!drink) return null;
                return (
                  <div key={id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm">
                      <span className="mr-2">{drink.icon}</span>
                      {drink.name} x{count}
                    </span>
                    <span className="text-xs text-gray-500">{drink.calories * count} kcal</span>
                  </div>
                );
              })}
              {Object.entries(extras.snacks).map(([id, count]) => {
                if (count === 0) return null;
                const snack = DEFAULT_SNACKS.find(s => s.id === id);
                if (!snack) return null;
                return (
                  <div key={id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm">
                      <span className="mr-2">{snack.icon}</span>
                      {snack.name} x{count}
                    </span>
                    <span className="text-xs text-gray-500">{snack.calories * count} kcal</span>
                  </div>
                );
              })}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={clearExtras}
              className="w-full py-2 text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium"
            >
              Clear all
            </motion.button>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 dark:text-gray-500">
            <span className="text-3xl mb-2 block">🥤🍎</span>
            <p className="text-sm">No drinks or snacks added yet</p>
          </div>
        )}
      </div>

      {/* Extras Modal */}
      <AnimatePresence>
        {showExtrasModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowExtrasModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[80vh] overflow-hidden"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Add Drinks & Snacks
              </h3>

              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExtrasTab('drinks')}
                  className={`flex-1 py-2 px-4 rounded-xl font-bold text-sm transition-all ${
                    extrasTab === 'drinks'
                      ? 'bg-brand-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  🥤 Drinks
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExtrasTab('snacks')}
                  className={`flex-1 py-2 px-4 rounded-xl font-bold text-sm transition-all ${
                    extrasTab === 'snacks'
                      ? 'bg-brand-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  🍎 Snacks
                </motion.button>
              </div>

              {/* Items list */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {(extrasTab === 'drinks' ? DEFAULT_DRINKS : DEFAULT_SNACKS).map(item => {
                  const count = extras[extrasTab][item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.calories} kcal</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateExtra(extrasTab, item.id, -1)}
                          disabled={count === 0}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            count > 0
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600'
                          }`}
                        >
                          -
                        </motion.button>
                        <span className="w-6 text-center font-bold text-gray-900 dark:text-white">
                          {count}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateExtra(extrasTab, item.id, 1)}
                          className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold"
                        >
                          +
                        </motion.button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowExtrasModal(false)}
                className="mt-6 w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold rounded-xl"
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Breakdown */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Daily Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                <th className="pb-3 font-medium">Day</th>
                <th className="pb-3 font-medium text-right">Calories</th>
                <th className="pb-3 font-medium text-right">Protein</th>
                <th className="pb-3 font-medium text-right">Carbs</th>
                <th className="pb-3 font-medium text-right">Fat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {Object.entries(nutrition.byDay).map(([day, data]) => (
                <tr key={day} className="text-sm">
                  <td className="py-3 font-medium text-gray-900 dark:text-white capitalize">
                    {day}
                  </td>
                  <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                    {data.calories > 0 ? `${Math.round(data.calories)} kcal` : '-'}
                  </td>
                  <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                    {data.protein > 0 ? `${Math.round(data.protein)}g` : '-'}
                  </td>
                  <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                    {data.carbs > 0 ? `${Math.round(data.carbs)}g` : '-'}
                  </td>
                  <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                    {data.fat > 0 ? `${Math.round(data.fat)}g` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
