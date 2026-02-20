import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../hooks/useSettings';
import { useAuth } from '../context/AuthContext';
import { openCustomerPortal } from '../lib/stripe';
import { DIETARY_OPTIONS } from '../services/api';
import { PricingModal } from './PricingModal';
import { ConsentManager } from './ConsentManager';
import { DeleteAccountModal } from './DeleteAccountModal';

export function Settings({ onShowPrivacyPolicy }) {
  const { settings, updateSetting, resetSettings } = useSettings();
  const { user, profile, isPremium, signOut, setShowAuthModal } = useAuth();
  const [showPricing, setShowPricing] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

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

      {/* Account Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span>👤</span> Account
        </h3>
        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile avatar" className="w-10 h-10 rounded-xl object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {(profile?.display_name || user.email)?.[0]?.toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {profile?.display_name || user.email?.split('@')[0]}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <span className="text-sm text-gray-600 dark:text-gray-400">Subscription</span>
              <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${isPremium ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                {isPremium ? 'Premium' : 'Free'}
              </span>
            </div>
            {isPremium ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  setPortalLoading(true);
                  try { await openCustomerPortal(); } catch (err) { console.warn(err); }
                  setPortalLoading(false);
                }}
                disabled={portalLoading}
                className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {portalLoading ? 'Opening...' : 'Manage Subscription'}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPricing(true)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25"
              >
                Upgrade to Premium
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={signOut}
              className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              Sign Out
            </motion.button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in to sync your data across devices and unlock premium features.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAuthModal(true)}
              className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25"
            >
              Sign In / Sign Up
            </motion.button>
          </div>
        )}
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

      {/* My Diet */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          <span>🥗</span> My Diet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Your selections are always applied when browsing recipes. Change anytime.
        </p>

        {/* Lifestyle group */}
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
          Lifestyle
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {DIETARY_OPTIONS.filter(o => o.group === 'lifestyle').map(option => {
            const active = (settings.dietaryPreferences || []).includes(option.id);
            return (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const current = settings.dietaryPreferences || [];
                  const next = active ? current.filter(d => d !== option.id) : [...current, option.id];
                  updateSetting('dietaryPreferences', next);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2 ${
                  active
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Avoid group */}
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
          I Avoid
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {DIETARY_OPTIONS.filter(o => o.group === 'avoid').map(option => {
            const active = (settings.dietaryPreferences || []).includes(option.id);
            return (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const current = settings.dietaryPreferences || [];
                  const next = active ? current.filter(d => d !== option.id) : [...current, option.id];
                  updateSetting('dietaryPreferences', next);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2 ${
                  active
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Nutrition group */}
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
          Nutrition Goals
        </p>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.filter(o => o.group === 'nutrition').map(option => {
            const active = (settings.dietaryPreferences || []).includes(option.id);
            return (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const current = settings.dietaryPreferences || [];
                  const next = active ? current.filter(d => d !== option.id) : [...current, option.id];
                  updateSetting('dietaryPreferences', next);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2 ${
                  active
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </motion.button>
            );
          })}
        </div>

        {(settings.dietaryPreferences || []).length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-xs text-center text-brand-600 dark:text-brand-400"
          >
            {(settings.dietaryPreferences || []).length} preference{(settings.dietaryPreferences || []).length !== 1 ? 's' : ''} saved — applied automatically when you browse
          </motion.p>
        )}
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

      {/* Privacy & Data */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>🔒</span> Privacy & Data
        </h3>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onShowPrivacyPolicy}
            className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <span>Privacy Policy</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {user && (
            <>
              <div className="pt-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Consent Preferences</p>
                <ConsentManager />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteAccount(true)}
                className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                Delete My Account
              </motion.button>
            </>
          )}
        </div>
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

      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
      <DeleteAccountModal isOpen={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} />
    </div>
  );
}
