import { motion } from 'framer-motion';

export function PrivacyPolicy({ onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: February 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">1. What Data We Collect</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Account data:</strong> Email address, display name, and profile picture (from Google, if used)</li>
            <li><strong>Recipe data:</strong> Saved recipes, meal plans, cooking history, recipe notes, ratings, shopping lists, and pantry items</li>
            <li><strong>Settings:</strong> Measurement preferences and temperature unit</li>
            <li><strong>Payment data:</strong> Processed by Stripe. We store your Stripe customer ID but never your card details</li>
            <li><strong>Consent records:</strong> Timestamps and types of consent you've given or withdrawn</li>
          </ul>
        </section>

        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">2. Why We Collect It</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Account features:</strong> To provide cross-device sync, cloud backup, and premium features (contractual necessity)</li>
            <li><strong>Payment:</strong> To process subscriptions via Stripe (contractual necessity)</li>
            <li><strong>Marketing:</strong> Recipe tips and updates via email, only with your explicit consent</li>
          </ul>
        </section>

        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">3. Third-Party Services</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Supabase:</strong> Database and authentication. Your data is stored in an EU-region Supabase project. Supabase is GDPR-compliant and offers a Data Processing Agreement (DPA).</li>
            <li><strong>Stripe:</strong> Payment processing. Stripe is GDPR-compliant and retains payment data per legal obligations (tax/fraud requirements). See Stripe's privacy policy for details.</li>
            <li><strong>TheMealDB:</strong> Recipe search API (public, no personal data sent)</li>
          </ul>
        </section>

        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">4. Data Storage</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Local:</strong> Your recipe data is stored in your browser's localStorage for offline access</li>
            <li><strong>Cloud:</strong> When logged in, data syncs to Supabase (EU region) for cross-device access</li>
            <li><strong>Retention:</strong> Data is retained while your account exists. Deleted accounts have all data removed immediately</li>
          </ul>
        </section>

        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">5. Your Rights (GDPR)</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Access:</strong> Export all your data anytime from the Data tab (JSON download)</li>
            <li><strong>Rectification:</strong> Edit your profile, notes, ratings, and other data directly in the app</li>
            <li><strong>Erasure:</strong> Delete your account and all associated data from Settings or Data tab</li>
            <li><strong>Portability:</strong> Download all your data in machine-readable JSON format</li>
            <li><strong>Withdraw consent:</strong> Manage your consent preferences in Settings at any time</li>
          </ul>
        </section>

        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">6. Data We Never Collect</h3>
          <p>We do not use analytics trackers, advertising cookies, or any third-party tracking. We do not sell your data. We do not share your data with anyone except the service providers listed above.</p>
        </section>

        <section>
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">7. Contact</h3>
          <p>For questions about this privacy policy or your data, please contact us through the app's Settings page.</p>
        </section>
      </div>
    </motion.div>
  );
}
