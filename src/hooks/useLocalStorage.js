import { useState, useEffect, useCallback } from 'react';

const STORAGE_PREFIX = 'recipe-finder-';

// Migrate old keys to new prefixed keys (run once)
function migrateOldKeys() {
  const keys = ['savedRecipes', 'mealPlan', 'cookingHistory', 'recipeNotes', 'recipeRatings', 'shoppingList'];
  keys.forEach(key => {
    const oldData = window.localStorage.getItem(key);
    const newKey = STORAGE_PREFIX + key;
    if (oldData && !window.localStorage.getItem(newKey)) {
      window.localStorage.setItem(newKey, oldData);
      window.localStorage.removeItem(key);
    }
  });
}

// Run migration on load
if (typeof window !== 'undefined') {
  migrateOldKeys();
}

export function useLocalStorage(key, initialValue) {
  const prefixedKey = STORAGE_PREFIX + key;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(prefixedKey);
      if (item !== null) {
        const parsed = JSON.parse(item);
        return parsed;
      }
      // Handle function initializers
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${prefixedKey}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  // Save to localStorage whenever value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(prefixedKey, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${prefixedKey}":`, error);
    }
  }, [prefixedKey, storedValue]);

  // Wrapper to ensure we're setting the state properly
  const setValue = useCallback((value) => {
    setStoredValue(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      return newValue;
    });
  }, []);

  return [storedValue, setValue];
}

// Utility to export all app data (for backup)
export function exportAppData() {
  const data = {};
  const keys = ['savedRecipes', 'mealPlan', 'cookingHistory', 'recipeNotes', 'recipeRatings', 'shoppingList'];
  keys.forEach(key => {
    const item = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (item) {
      data[key] = JSON.parse(item);
    }
  });
  return data;
}

// Utility to import app data (for restore)
export function importAppData(data) {
  Object.entries(data).forEach(([key, value]) => {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  });
  // Reload to pick up new data
  window.location.reload();
}

// Utility to clear all app data
export function clearAppData() {
  const keys = ['savedRecipes', 'mealPlan', 'cookingHistory', 'recipeNotes', 'recipeRatings', 'shoppingList'];
  keys.forEach(key => {
    window.localStorage.removeItem(STORAGE_PREFIX + key);
  });
}
