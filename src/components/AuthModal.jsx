import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useBackButton } from '../hooks/useBackButton';

export function AuthModal({ isOpen, onClose }) {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataConsent, setDataConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useBackButton(isOpen, onClose, 'authModal');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDataConsent(false);
    setMarketingConsent(false);
    setError('');
    setSuccess('');
  };

  const friendlyError = (msg) => {
    if (!msg) return 'Something went wrong. Please try again in a moment.';
    if (msg.includes('Invalid login')) return 'Hmm, that email/password combo doesn\'t look right. Double-check and try again?';
    if (msg.includes('Email not confirmed') || msg.includes('email_not_confirmed')) return 'Your email hasn\'t been verified yet. Try signing up again or contact support.';
    if (msg.includes('User already registered')) return 'Looks like you already have an account with this email. Try signing in instead!';
    if (msg.includes('Password should be')) return 'Your password needs to be at least 6 characters. Make it a good one!';
    if (msg.includes('rate limit') || msg.includes('too many')) return 'Whoa, slow down! Too many attempts. Please wait a minute and try again.';
    if (msg.includes('network') || msg.includes('fetch')) return 'Looks like you\'re offline. Check your connection and try again.';
    if (msg.includes('Database error')) return 'We hit a small hiccup on our end. Please try again in a moment.';
    return msg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!dataConsent) {
          setError('Please agree to the Privacy Policy to create your account.');
          setLoading(false);
          return;
        }
        const result = await signUp(email, password, {
          dataProcessing: dataConsent,
          marketing: marketingConsent,
        });
        // Supabase returns an empty identities array if the email is already registered
        if (result?.user?.identities?.length === 0) {
          setError('Looks like you already have an account with this email. Try signing in instead!');
          setLoading(false);
          return;
        }
        setEmail('');
        setPassword('');
        setDataConsent(false);
        setMarketingConsent(false);
        setError('');
        setSuccess('Welcome aboard! Your account is ready. Signing you in...');
        setTimeout(() => {
          resetForm();
          onClose();
        }, 1500);
      } else {
        await signIn(email, password);
        resetForm();
        onClose();
      }
    } catch (err) {
      setError(friendlyError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
    setSuccess('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-pink-500 text-white text-2xl mb-3 shadow-lg">
                {mode === 'signin' ? '👋' : '🎉'}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {mode === 'signin'
                  ? 'Sign in to sync your recipes across devices'
                  : 'Start saving your recipes in the cloud'}
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="input-field"
                  placeholder="At least 6 characters"
                />
              </div>

              {/* Consent checkboxes for signup */}
              {mode === 'signup' && (
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dataConsent}
                      onChange={(e) => setDataConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      I agree to the <button type="button" className="text-brand-600 dark:text-brand-400 underline hover:no-underline" onClick={() => window.open('#privacy', '_blank')}>Privacy Policy</button> and consent to the processing of my personal data. <span className="text-red-500">*</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      I'd like to receive recipe tips and updates via email (optional)
                    </span>
                  </label>
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-200 dark:border-red-800"
                >
                  <span className="text-lg shrink-0">oops</span>
                  <p>{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-start gap-3 text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-200 dark:border-green-800"
                >
                  <span className="text-lg shrink-0">yay!</span>
                  <p>{success}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? (mode === 'signin' ? 'Signing you in...' : 'Creating your account...')
                  : (mode === 'signin' ? 'Sign In' : 'Create Account')
                }
              </motion.button>
            </form>

            {/* Switch mode */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={switchMode}
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>

            {/* Close button */}
            <button
              onClick={() => { onClose(); resetForm(); }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
