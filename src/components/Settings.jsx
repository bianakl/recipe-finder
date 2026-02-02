import { motion } from 'framer-motion';
import { useSettings } from '../hooks/useSettings';

export function Settings() {
  const { settings, updateSetting, resetSettings } = useSettings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 text-white text-3xl mb-4 shadow-lg"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Customize your recipe experience
        </p>
      </div>

      {/* Measurement System */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span>📏</span> Measurement System
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Choose how ingredients are measured in recipes
        </p>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateSetting('measurementSystem', 'imperial')}
            className={`p-4 rounded-xl border-2 transition-all ${
              settings.measurementSystem === 'imperial'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-2xl mb-2">🇺🇸</div>
            <div className="font-bold text-gray-900 dark:text-white">Imperial</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              cups, tbsp, oz, lbs
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateSetting('measurementSystem', 'metric')}
            className={`p-4 rounded-xl border-2 transition-all ${
              settings.measurementSystem === 'metric'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-2xl mb-2">🌍</div>
            <div className="font-bold text-gray-900 dark:text-white">Metric</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ml, L, g, kg
            </div>
          </motion.button>
        </div>
      </div>

      {/* Temperature Unit */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span>🌡️</span> Temperature Unit
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Choose how temperatures are displayed
        </p>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateSetting('temperatureUnit', 'fahrenheit')}
            className={`p-4 rounded-xl border-2 transition-all ${
              settings.temperatureUnit === 'fahrenheit'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">°F</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Fahrenheit</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              350°F, 400°F
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateSetting('temperatureUnit', 'celsius')}
            className={`p-4 rounded-xl border-2 transition-all ${
              settings.temperatureUnit === 'celsius'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">°C</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Celsius</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              180°C, 200°C
            </div>
          </motion.button>
        </div>
      </div>

      {/* Default Servings */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span>👥</span> Default Servings
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Set your default number of servings when scaling recipes
        </p>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => updateSetting('defaultServings', Math.max(1, settings.defaultServings - 1))}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            -
          </motion.button>
          <div className="flex-1 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {settings.defaultServings}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">servings</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => updateSetting('defaultServings', Math.min(20, settings.defaultServings + 1))}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            +
          </motion.button>
        </div>
      </div>

      {/* Reset Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span>🔄</span> Reset Settings
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Restore all settings to their default values
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetSettings}
          className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Reset to Defaults
        </motion.button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
          <span>💡</span> Tip
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          You can also toggle between measurement systems directly in any recipe by clicking the unit toggle button in the ingredients section.
        </p>
      </div>
    </div>
  );
}
