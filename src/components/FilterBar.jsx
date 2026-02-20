import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DIETARY_OPTIONS, COOK_TIME_OPTIONS, CUISINE_OPTIONS } from '../services/api';

export function FilterBar({ filters, onFilterChange, onClear, profileDietary = [] }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const activeFilterCount = [
    filters.dietary?.length || 0,
    filters.cookTime ? 1 : 0,
    filters.cuisine ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleDietaryToggle = (dietaryId) => {
    const current = filters.dietary || [];
    const updated = current.includes(dietaryId)
      ? current.filter(d => d !== dietaryId)
      : [...current, dietaryId];
    onFilterChange({ ...filters, dietary: updated });
  };

  return (
    <div className="space-y-4">
      {/* Profile dietary indicator */}
      {profileDietary.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-brand-600 dark:text-brand-400">
          <span>🥗</span>
          <span>Diet profile active: {profileDietary.map(id => DIETARY_OPTIONS.find(o => o.id === id)?.label || id).join(', ')}</span>
          <span className="text-gray-400 dark:text-gray-500">· Edit in Settings</span>
        </div>
      )}

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Filters:
        </span>

        {/* Cook Time */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleSection('time')}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
            filters.cookTime
              ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {filters.cookTime
            ? COOK_TIME_OPTIONS.find(o => o.id === filters.cookTime)?.label
            : 'Cook Time'
          }
          <svg className={`w-4 h-4 transition-transform ${expandedSection === 'time' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        {/* Dietary */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleSection('dietary')}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
            filters.dietary?.length > 0
              ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 ring-2 ring-green-500/20'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span>🥗</span>
          Dietary
          {filters.dietary?.length > 0 && (
            <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {filters.dietary.length}
            </span>
          )}
          <svg className={`w-4 h-4 transition-transform ${expandedSection === 'dietary' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        {/* Cuisine */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleSection('cuisine')}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
            filters.cuisine
              ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 ring-2 ring-orange-500/20'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span>🌍</span>
          {filters.cuisine
            ? CUISINE_OPTIONS.find(o => o.id === filters.cuisine)?.label
            : 'Cuisine'
          }
          <svg className={`w-4 h-4 transition-transform ${expandedSection === 'cuisine' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        {/* Clear All */}
        {activeFilterCount > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className="px-3 py-2 rounded-full text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Clear all ({activeFilterCount})
          </motion.button>
        )}
      </div>

      {/* Expanded Filter Sections */}
      <AnimatePresence>
        {expandedSection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
              {expandedSection === 'time' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {COOK_TIME_OPTIONS.map(option => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onFilterChange({
                          ...filters,
                          cookTime: filters.cookTime === option.id ? null : option.id
                        });
                      }}
                      className={`p-3 rounded-xl text-left transition-all ${
                        filters.cookTime === option.id
                          ? 'bg-brand-100 dark:bg-brand-900/40 border-2 border-brand-500'
                          : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{option.icon}</span>
                      <span className={`text-sm font-medium ${
                        filters.cookTime === option.id
                          ? 'text-brand-700 dark:text-brand-300'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}

              {expandedSection === 'dietary' && (
                <div className="space-y-3">
                  {[
                    { group: 'lifestyle', label: 'Lifestyle' },
                    { group: 'avoid', label: 'I Avoid' },
                    { group: 'nutrition', label: 'Nutrition Goals' },
                  ].map(({ group, label }) => {
                    const groupOptions = DIETARY_OPTIONS.filter(o => o.group === group);
                    return (
                      <div key={group}>
                        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{label}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {groupOptions.map(option => {
                            const fromProfile = profileDietary.includes(option.id);
                            const fromSession = filters.dietary?.includes(option.id);
                            const active = fromProfile || fromSession;
                            return (
                              <motion.button
                                key={option.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => !fromProfile && handleDietaryToggle(option.id)}
                                title={fromProfile ? 'Set in your diet profile (edit in Settings)' : undefined}
                                className={`p-3 rounded-xl text-left transition-all relative ${
                                  fromProfile
                                    ? 'bg-brand-50 dark:bg-brand-900/30 border-2 border-brand-400 cursor-default'
                                    : active
                                    ? 'bg-green-100 dark:bg-green-900/40 border-2 border-green-500'
                                    : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                                }`}
                              >
                                {fromProfile && (
                                  <span className="absolute top-1 right-1 text-[9px] text-brand-500 font-bold">Profile</span>
                                )}
                                <span className="text-2xl mb-1 block">{option.icon}</span>
                                <span className={`text-sm font-medium ${
                                  fromProfile
                                    ? 'text-brand-700 dark:text-brand-300'
                                    : active
                                    ? 'text-green-700 dark:text-green-300'
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                  {option.label}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {expandedSection === 'cuisine' && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {CUISINE_OPTIONS.map(option => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onFilterChange({
                          ...filters,
                          cuisine: filters.cuisine === option.id ? null : option.id
                        });
                      }}
                      className={`p-3 rounded-xl text-center transition-all ${
                        filters.cuisine === option.id
                          ? 'bg-orange-100 dark:bg-orange-900/40 border-2 border-orange-500'
                          : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{option.icon}</span>
                      <span className={`text-xs font-medium ${
                        filters.cuisine === option.id
                          ? 'text-orange-700 dark:text-orange-300'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
