import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  localRecipeToRow, rowToLocalRecipe,
  localMealPlanToRows, rowsToLocalMealPlan,
  localHistoryToRow, rowToLocalHistory,
  localNotesToRows, rowsToLocalNotes,
  localRatingsToRows, rowsToLocalRatings,
  localShoppingItemToRow, rowToLocalShoppingItem,
  localPantryToRows, rowsToLocalPantry,
  localSettingsToRow, rowToLocalSettings,
} from '../lib/syncTransformers';

const DEBOUNCE_MS = 500;

export function useSupabaseSync(userId) {
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'synced' | 'error' | 'offline'
  const offlineQueue = useRef([]);
  const debounceTimers = useRef({});

  // Check if sync is available
  const canSync = isSupabaseConfigured() && !!userId;

  // ---- Generic debounced push ----
  const debouncedPush = useCallback((key, pushFn) => {
    if (!canSync) return;
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }
    debounceTimers.current[key] = setTimeout(async () => {
      setSyncStatus('syncing');
      try {
        await pushFn();
        setSyncStatus('synced');
      } catch (err) {
        console.warn(`Sync error (${key}):`, err.message);
        offlineQueue.current.push({ key, pushFn, timestamp: Date.now() });
        setSyncStatus('error');
      }
    }, DEBOUNCE_MS);
  }, [canSync]);

  // ---- Push functions ----
  const pushSavedRecipes = useCallback(async (recipes) => {
    if (!canSync) return;
    // Delete all and re-insert (simple sync for small datasets)
    await supabase.from('saved_recipes').delete().eq('user_id', userId);
    if (recipes.length > 0) {
      const rows = recipes.map(r => localRecipeToRow(r, userId));
      const { error } = await supabase.from('saved_recipes').upsert(rows, { onConflict: 'user_id,recipe_id' });
      if (error) throw error;
    }
  }, [canSync, userId]);

  const pushMealPlan = useCallback(async (mealPlan) => {
    if (!canSync) return;
    await supabase.from('meal_plans').delete().eq('user_id', userId);
    const rows = localMealPlanToRows(mealPlan, userId);
    if (rows.length > 0) {
      const { error } = await supabase.from('meal_plans').upsert(rows, { onConflict: 'user_id,day,meal' });
      if (error) throw error;
    }
  }, [canSync, userId]);

  const pushCookingHistory = useCallback(async (history) => {
    if (!canSync) return;
    await supabase.from('cooking_history').delete().eq('user_id', userId);
    if (history.length > 0) {
      const rows = history.map(e => localHistoryToRow(e, userId));
      const { error } = await supabase.from('cooking_history').insert(rows);
      if (error) throw error;
    }
  }, [canSync, userId]);

  const pushRecipeNotes = useCallback(async (notes) => {
    if (!canSync) return;
    await supabase.from('recipe_notes').delete().eq('user_id', userId);
    const rows = localNotesToRows(notes, userId);
    if (rows.length > 0) {
      const { error } = await supabase.from('recipe_notes').upsert(rows, { onConflict: 'user_id,recipe_id' });
      if (error) throw error;
    }
  }, [canSync, userId]);

  const pushRecipeRatings = useCallback(async (ratings) => {
    if (!canSync) return;
    await supabase.from('recipe_ratings').delete().eq('user_id', userId);
    const rows = localRatingsToRows(ratings, userId);
    if (rows.length > 0) {
      const { error } = await supabase.from('recipe_ratings').upsert(rows, { onConflict: 'user_id,recipe_id' });
      if (error) throw error;
    }
  }, [canSync, userId]);

  const pushShoppingList = useCallback(async (list) => {
    if (!canSync) return;
    await supabase.from('shopping_list').delete().eq('user_id', userId);
    if (list.length > 0) {
      const rows = list.map(item => localShoppingItemToRow(item, userId));
      const { error } = await supabase.from('shopping_list').insert(rows);
      if (error) throw error;
    }
  }, [canSync, userId]);

  const pushPantry = useCallback(async (pantry) => {
    if (!canSync) return;
    await supabase.from('pantry').delete().eq('user_id', userId);
    if (pantry.length > 0) {
      const rows = localPantryToRows(pantry, userId);
      const { error } = await supabase.from('pantry').upsert(rows, { onConflict: 'user_id,ingredient' });
      if (error) throw error;
    }
  }, [canSync, userId]);

  const pushSettings = useCallback(async (settings) => {
    if (!canSync) return;
    const row = localSettingsToRow(settings, userId);
    const { error } = await supabase.from('user_settings').upsert(row, { onConflict: 'user_id' });
    if (error) throw error;
  }, [canSync, userId]);

  // ---- Pull all from remote ----
  const pullAllFromRemote = useCallback(async () => {
    if (!canSync) return null;
    setSyncStatus('syncing');
    try {
      const [
        { data: recipes },
        { data: mealRows },
        { data: history },
        { data: notes },
        { data: ratings },
        { data: shopping },
        { data: pantryRows },
        { data: settingsRows },
      ] = await Promise.all([
        supabase.from('saved_recipes').select('*').eq('user_id', userId),
        supabase.from('meal_plans').select('*').eq('user_id', userId),
        supabase.from('cooking_history').select('*').eq('user_id', userId).order('cooked_at', { ascending: false }),
        supabase.from('recipe_notes').select('*').eq('user_id', userId),
        supabase.from('recipe_ratings').select('*').eq('user_id', userId),
        supabase.from('shopping_list').select('*').eq('user_id', userId),
        supabase.from('pantry').select('*').eq('user_id', userId),
        supabase.from('user_settings').select('*').eq('user_id', userId),
      ]);

      setSyncStatus('synced');
      return {
        savedRecipes: (recipes || []).map(rowToLocalRecipe),
        mealPlan: rowsToLocalMealPlan(mealRows || []),
        cookingHistory: (history || []).map(rowToLocalHistory),
        recipeNotes: rowsToLocalNotes(notes || []),
        recipeRatings: rowsToLocalRatings(ratings || []),
        shoppingList: (shopping || []).map(rowToLocalShoppingItem),
        pantry: rowsToLocalPantry(pantryRows || []),
        settings: settingsRows?.[0] ? rowToLocalSettings(settingsRows[0]) : null,
      };
    } catch (err) {
      console.warn('Pull from remote failed:', err.message);
      setSyncStatus('error');
      return null;
    }
  }, [canSync, userId]);

  // ---- Push all to remote ----
  const pushAllToRemote = useCallback(async (data) => {
    if (!canSync) return;
    setSyncStatus('syncing');
    try {
      await Promise.all([
        pushSavedRecipes(data.savedRecipes || []),
        pushMealPlan(data.mealPlan || {}),
        pushCookingHistory(data.cookingHistory || []),
        pushRecipeNotes(data.recipeNotes || {}),
        pushRecipeRatings(data.recipeRatings || {}),
        pushShoppingList(data.shoppingList || []),
        pushPantry(data.pantry || []),
        ...(data.settings ? [pushSettings(data.settings)] : []),
      ]);
      setSyncStatus('synced');
    } catch (err) {
      console.warn('Push to remote failed:', err.message);
      setSyncStatus('error');
    }
  }, [canSync, pushSavedRecipes, pushMealPlan, pushCookingHistory, pushRecipeNotes, pushRecipeRatings, pushShoppingList, pushPantry, pushSettings]);

  // ---- Debounced sync handlers (call on state change) ----
  const syncSavedRecipes = useCallback((recipes) => {
    debouncedPush('savedRecipes', () => pushSavedRecipes(recipes));
  }, [debouncedPush, pushSavedRecipes]);

  const syncMealPlan = useCallback((mealPlan) => {
    debouncedPush('mealPlan', () => pushMealPlan(mealPlan));
  }, [debouncedPush, pushMealPlan]);

  const syncCookingHistory = useCallback((history) => {
    debouncedPush('cookingHistory', () => pushCookingHistory(history));
  }, [debouncedPush, pushCookingHistory]);

  const syncRecipeNotes = useCallback((notes) => {
    debouncedPush('recipeNotes', () => pushRecipeNotes(notes));
  }, [debouncedPush, pushRecipeNotes]);

  const syncRecipeRatings = useCallback((ratings) => {
    debouncedPush('recipeRatings', () => pushRecipeRatings(ratings));
  }, [debouncedPush, pushRecipeRatings]);

  const syncShoppingList = useCallback((list) => {
    debouncedPush('shoppingList', () => pushShoppingList(list));
  }, [debouncedPush, pushShoppingList]);

  const syncPantry = useCallback((pantry) => {
    debouncedPush('pantry', () => pushPantry(pantry));
  }, [debouncedPush, pushPantry]);

  const syncSettings = useCallback((settings) => {
    debouncedPush('settings', () => pushSettings(settings));
  }, [debouncedPush, pushSettings]);

  // ---- Drain offline queue on reconnect ----
  useEffect(() => {
    const handleOnline = async () => {
      if (offlineQueue.current.length === 0) return;
      setSyncStatus('syncing');
      const queue = [...offlineQueue.current];
      offlineQueue.current = [];
      for (const item of queue) {
        try {
          await item.pushFn();
        } catch (err) {
          console.warn('Retry failed:', err.message);
          offlineQueue.current.push(item);
        }
      }
      setSyncStatus(offlineQueue.current.length > 0 ? 'error' : 'synced');
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  // Track offline status
  useEffect(() => {
    const handleOffline = () => setSyncStatus('offline');
    const handleOnline = () => {
      if (syncStatus === 'offline') setSyncStatus('idle');
    };
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [syncStatus]);

  // Cleanup debounce timers
  useEffect(() => {
    const timers = debounceTimers.current;
    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  return {
    syncStatus,
    canSync,
    pullAllFromRemote,
    pushAllToRemote,
    syncSavedRecipes,
    syncMealPlan,
    syncCookingHistory,
    syncRecipeNotes,
    syncRecipeRatings,
    syncShoppingList,
    syncPantry,
    syncSettings,
  };
}
