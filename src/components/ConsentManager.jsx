import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function ConsentManager() {
  const { user, profile, refreshProfile } = useAuth();
  const [dataConsent, setDataConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [consentHistory, setConsentHistory] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setDataConsent(profile.data_processing_consent || false);
      setMarketingConsent(profile.marketing_consent || false);
    }
  }, [profile]);

  useEffect(() => {
    if (!user || !isSupabaseConfigured()) return;
    supabase
      .from('consent_records')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setConsentHistory(data);
      });
  }, [user]);

  const handleSaveConsent = async (type, value) => {
    if (!user || !isSupabaseConfigured()) return;
    setSaving(true);
    setSaved(false);

    // Log to consent_records
    await supabase.from('consent_records').insert({
      user_id: user.id,
      consent_type: type,
      granted: value,
      user_agent: navigator.userAgent,
    });

    // Update profile
    const updates = type === 'data_processing'
      ? { data_processing_consent: value, consent_updated_at: new Date().toISOString() }
      : { marketing_consent: value, consent_updated_at: new Date().toISOString() };

    await supabase.from('profiles').update(updates).eq('id', user.id);
    await refreshProfile();

    // Refresh history
    const { data } = await supabase
      .from('consent_records')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);
    if (data) setConsentHistory(data);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-500 dark:text-gray-400">
        Sign in to manage your consent preferences.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Data Processing Consent */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white text-sm">Data Processing</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Required for account features and cloud sync</p>
          </div>
          <button
            onClick={() => {
              const newValue = !dataConsent;
              setDataConsent(newValue);
              handleSaveConsent('data_processing', newValue);
            }}
            disabled={saving}
            className={`relative w-11 h-6 rounded-full transition-colors ${dataConsent ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <motion.div
              animate={{ x: dataConsent ? 20 : 2 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
            />
          </button>
        </div>
      </div>

      {/* Marketing Consent */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white text-sm">Marketing Emails</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Recipe tips and product updates</p>
          </div>
          <button
            onClick={() => {
              const newValue = !marketingConsent;
              setMarketingConsent(newValue);
              handleSaveConsent('marketing', newValue);
            }}
            disabled={saving}
            className={`relative w-11 h-6 rounded-full transition-colors ${marketingConsent ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <motion.div
              animate={{ x: marketingConsent ? 20 : 2 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
            />
          </button>
        </div>
      </div>

      {saved && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-green-600 dark:text-green-400 text-center"
        >
          Consent preferences updated
        </motion.p>
      )}

      {/* Consent History */}
      {consentHistory.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="font-medium text-gray-900 dark:text-white text-sm mb-3">Consent History</p>
          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
            {consentHistory.map((record) => (
              <div key={record.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${record.granted ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-gray-600 dark:text-gray-400">
                    {record.consent_type === 'data_processing' ? 'Data Processing' : 'Marketing'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={record.granted ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {record.granted ? 'Granted' : 'Withdrawn'}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500">
                    {new Date(record.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
