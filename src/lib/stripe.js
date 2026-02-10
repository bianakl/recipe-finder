import { loadStripe } from '@stripe/stripe-js';
import { supabase, isSupabaseConfigured } from './supabase';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

let stripePromise = null;

function getStripe() {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
}

export async function redirectToCheckout(priceId) {
  if (!isSupabaseConfigured()) throw new Error('Supabase not configured');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { data, error } = await supabase.functions.invoke('stripe-checkout', {
    body: {
      price_id: priceId,
      success_url: `${window.location.origin}#settings`,
      cancel_url: `${window.location.origin}#settings`,
    },
  });

  if (error) throw error;
  if (!data?.url) throw new Error('No checkout URL returned');

  window.location.href = data.url;
}

export async function openCustomerPortal() {
  if (!isSupabaseConfigured()) throw new Error('Supabase not configured');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { data, error } = await supabase.functions.invoke('create-portal-session', {
    body: {
      return_url: `${window.location.origin}#settings`,
    },
  });

  if (error) throw error;
  if (!data?.url) throw new Error('No portal URL returned');

  window.location.href = data.url;
}

export { getStripe };
