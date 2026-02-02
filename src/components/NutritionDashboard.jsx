import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';
import { calculateNutrition } from '../services/api';

export function NutritionDashboard() {
  const { mealPlan, getRecipeById } = useRecipes();

  const nutrition = useMemo(() => {
    return calculateNutrition(mealPlan, getRecipeById);
  }, [mealPlan, getRecipeById]);

  const dailyGoals = {
    calories: 2000,
    protein: 50,
    carbs: 300,
    fat: 65
  };

  const avgCalories = nutrition.totalCalories / 7;
  const avgProtein = nutrition.totalProtein / 7;
  const avgCarbs = nutrition.totalCarbs / 7;
  const avgFat = nutrition.totalFat / 7;

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
      </div>

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
