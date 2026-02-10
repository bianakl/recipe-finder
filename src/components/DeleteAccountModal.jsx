import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { exportAllUserData, requestAccountDeletion } from '../lib/gdpr';
import { clearAppData } from '../hooks/useLocalStorage';
import { useBackButton } from '../hooks/useBackButton';

export function DeleteAccountModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: confirm, 2: type DELETE, 3: processing, 4: done
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState(false);

  useBackButton(isOpen, onClose, 'deleteAccountModal');

  const handleExportBeforeDelete = async () => {
    if (!user) return;
    setExporting(true);
    try {
      const data = await exportAllUserData(user.id);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recipe-finder-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.warn('Export failed:', err.message);
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') return;
    setStep(3);
    setError('');

    try {
      await requestAccountDeletion(user.id);
      clearAppData();
      localStorage.removeItem('recipe-finder-consent');
      localStorage.removeItem('recipe-finder-walkthrough-completed');
      localStorage.removeItem('recipe-finder-theme');
      localStorage.removeItem('recipe-finder-settings');
      setStep(4);
      setTimeout(() => {
        window.location.href = '/';
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Deletion failed. Please try again.');
      setStep(2);
    }
  };

  const handleClose = () => {
    setStep(1);
    setConfirmText('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-200 dark:border-gray-800 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 text-3xl mb-3">
                    ⚠️
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delete Account</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    This will permanently delete your account and all data. This action cannot be undone.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">What will be deleted:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li className="flex items-center gap-2"><span className="text-red-500">x</span> Your profile and account</li>
                    <li className="flex items-center gap-2"><span className="text-red-500">x</span> All saved recipes, meal plans, and history</li>
                    <li className="flex items-center gap-2"><span className="text-red-500">x</span> Shopping lists and pantry data</li>
                    <li className="flex items-center gap-2"><span className="text-red-500">x</span> Your Stripe subscription (if active)</li>
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExportBeforeDelete}
                  disabled={exporting}
                  className="w-full py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  {exporting ? 'Exporting...' : 'Download My Data First'}
                </motion.button>

                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl"
                  >
                    Continue
                  </motion.button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Deletion</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Type <strong>DELETE</strong> below to confirm
                  </p>
                </div>

                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="input-field text-center font-mono text-lg"
                  autoFocus
                />

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                )}

                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDelete}
                    disabled={confirmText !== 'DELETE'}
                    className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete Forever
                  </motion.button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 text-3xl animate-pulse">
                  🗑️
                </div>
                <p className="font-bold text-gray-900 dark:text-white">Deleting your account...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we remove all your data.</p>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 text-3xl">
                  ✓
                </div>
                <p className="font-bold text-gray-900 dark:text-white">Account deleted</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting to homepage...</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
