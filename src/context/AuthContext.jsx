import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fetchProfile = useCallback(async (userId) => {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      console.warn('Error fetching profile:', error.message);
      return null;
    }
    return data;
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const p = await fetchProfile(session.user.id);
        setProfile(p);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const p = await fetchProfile(session.user.id);
        setProfile(p);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signUp = useCallback(async (email, password, consentData) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // Log consent after signup (non-blocking — user may not be confirmed yet)
    if (data.user && consentData) {
      try {
        await supabase.from('consent_records').insert([
          {
            user_id: data.user.id,
            consent_type: 'data_processing',
            granted: consentData.dataProcessing,
            ip_address: consentData.ipAddress || null,
            user_agent: navigator.userAgent,
          },
          ...(consentData.marketing !== undefined ? [{
            user_id: data.user.id,
            consent_type: 'marketing',
            granted: consentData.marketing,
            ip_address: consentData.ipAddress || null,
            user_agent: navigator.userAgent,
          }] : []),
        ]);
        await supabase.from('profiles').update({
          data_processing_consent: consentData.dataProcessing,
          marketing_consent: consentData.marketing || false,
          consent_updated_at: new Date().toISOString(),
        }).eq('id', data.user.id);
      } catch (err) {
        console.warn('Consent logging deferred:', err.message);
      }
    }

    return data;
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    try {
      if (supabase) await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase sign out error:', err.message);
    }
    // Clear any persisted Supabase session from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('sb-')) localStorage.removeItem(key);
    });
    setUser(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const p = await fetchProfile(user.id);
    setProfile(p);
  }, [user, fetchProfile]);

  const isPremium = profile?.subscription_tier === 'premium' &&
    (profile?.subscription_status === 'active' || profile?.subscription_status === 'trialing' ||
     (profile?.subscription_status === 'past_due' && profile?.subscription_period_end && new Date(profile.subscription_period_end) > new Date()) ||
     (profile?.subscription_status === 'canceled' && profile?.subscription_period_end && new Date(profile.subscription_period_end) > new Date()));

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      isPremium,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      refreshProfile,
      showAuthModal,
      setShowAuthModal,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
