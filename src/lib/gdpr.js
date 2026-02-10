import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Export all user data from Supabase (GDPR Article 15 & 20)
 */
export async function exportAllUserData(userId) {
  if (!isSupabaseConfigured() || !userId) return null;

  const tables = [
    'profiles',
    'saved_recipes',
    'meal_plans',
    'cooking_history',
    'recipe_notes',
    'recipe_ratings',
    'shopping_list',
    'pantry',
    'user_settings',
    'consent_records',
  ];

  const results = {};

  await Promise.all(
    tables.map(async (table) => {
      const column = table === 'profiles' ? 'id' : 'user_id';
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq(column, userId);

      if (error) {
        console.warn(`Error exporting ${table}:`, error.message);
        results[table] = { error: error.message };
      } else {
        results[table] = data;
      }
    })
  );

  return {
    exported_at: new Date().toISOString(),
    user_id: userId,
    data: results,
  };
}

/**
 * Request account deletion (GDPR Article 17)
 * Calls the delete-account Edge Function which handles:
 * - Stripe subscription cancellation
 * - Stripe customer deletion
 * - consent_records anonymization
 * - auth.users deletion (CASCADE removes all data)
 */
export async function requestAccountDeletion(userId) {
  if (!isSupabaseConfigured() || !userId) {
    throw new Error('Unable to process deletion request');
  }

  const { data, error } = await supabase.functions.invoke('delete-account', {
    body: { user_id: userId },
  });

  if (error) throw error;
  return data;
}
