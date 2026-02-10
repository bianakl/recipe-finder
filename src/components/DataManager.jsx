import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { exportAppData, importAppData, clearAppData } from '../hooks/useLocalStorage';
import { useAuth } from '../context/AuthContext';
import { exportAllUserData } from '../lib/gdpr';
import { DeleteAccountModal } from './DeleteAccountModal';

export function DataManager() {
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [importStatus, setImportStatus] = useState(null);
  const [exportingCloud, setExportingCloud] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleExport = async () => {
    const localData = exportAppData();

    // If logged in, also include Supabase data
    if (user) {
      setExportingCloud(true);
      try {
        const cloudData = await exportAllUserData(user.id);
        const combined = {
          ...localData,
          cloud_data: cloudData,
        };
        downloadJson(combined);
      } catch (err) {
        console.warn('Cloud export failed, exporting local only:', err.message);
        downloadJson(localData);
      } finally {
        setExportingCloud(false);
      }
    } else {
      downloadJson(localData);
    }
  };

  const downloadJson = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recipe-finder-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        importAppData(data);
        setImportStatus('success');
      } catch (error) {
        setImportStatus('error');
        setTimeout(() => setImportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    clearAppData();
    setShowConfirmClear(false);
    window.location.reload();
  };

  const dataStats = () => {
    const data = exportAppData();
    return {
      savedRecipes: data.savedRecipes?.length || 0,
      mealPlanDays: Object.values(data.mealPlan || {}).filter(d =>
        Object.values(d).some(m => m)
      ).length,
      historyItems: data.cookingHistory?.length || 0,
      shoppingItems: data.shoppingList?.length || 0,
    };
  };

  const stats = dataStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-pink-500 text-white text-3xl mb-4 shadow-lg"
        >
          💾
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your Data
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Export your data to transfer to another device, or import a backup
        </p>
      </div>

      {/* Current Data Stats */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>📊</span> Your Saved Data
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
              {stats.savedRecipes}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Saved Recipes</div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.mealPlanDays}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Days Planned</div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {stats.historyItems}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">History Items</div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              {stats.shoppingItems}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Shopping Items</div>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span>📤</span> Export Data
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Download all your data as a JSON file. Use this to backup your data or transfer to another device (like your phone).
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Backup File
        </motion.button>
      </div>

      {/* Import Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span>📥</span> Import Data
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Restore your data from a backup file. This will replace your current data.
        </p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".json"
          className="hidden"
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-brand-500 dark:hover:border-brand-500 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Choose Backup File
        </motion.button>

        {importStatus === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm text-green-600 dark:text-green-400 text-center"
          >
            Data imported successfully! Reloading...
          </motion.p>
        )}
        {importStatus === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm text-red-600 dark:text-red-400 text-center"
          >
            Invalid backup file. Please try again.
          </motion.p>
        )}
      </div>

      {/* Clear Data Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-900 p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span>🗑️</span> Clear All Data
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Permanently delete all your saved recipes, meal plans, and history. This cannot be undone.
        </p>

        {!showConfirmClear ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowConfirmClear(true)}
            className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            Clear All Data
          </motion.button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium text-red-600 dark:text-red-400 text-center">
              Are you sure? This cannot be undone!
            </p>
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl"
              >
                Cancel
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleClear}
                className="flex-1 py-2 bg-red-600 text-white font-medium rounded-xl"
              >
                Yes, Delete Everything
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Account */}
      {user && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-900 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <span>⚠️</span> Delete Account
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Permanently delete your account and all associated data from our servers. This cannot be undone.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDeleteAccount(true)}
            className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            Delete My Account
          </motion.button>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
          <span>📱</span> Transfer to Mobile
        </h3>
        <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-2 list-decimal list-inside">
          <li>Click "Download Backup File" above</li>
          <li>Send the file to your phone (email, AirDrop, cloud storage)</li>
          <li>Open this app on your phone</li>
          <li>Go to the Data tab and click "Choose Backup File"</li>
          <li>Select the file you sent - your data will be restored!</li>
        </ol>
      </div>

      <DeleteAccountModal isOpen={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} />
    </div>
  );
}
