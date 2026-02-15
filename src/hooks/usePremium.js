import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';

const FREE_SAVE_LIMIT = 5;

const PREMIUM_FEATURES = new Set([
  'pantry',
  'planner',
  'shopping',
  'nutrition',
]);

const DEV_PREMIUM = import.meta.env.DEV;

export function usePremium() {
  const { isPremium: _isPremium, user } = useAuth();
  const { savedRecipes } = useRecipes();
  const isPremium = DEV_PREMIUM || _isPremium;

  const canSaveRecipe = () => {
    if (isPremium) return true;
    return savedRecipes.length < FREE_SAVE_LIMIT;
  };

  const savesRemaining = () => {
    if (isPremium) return Infinity;
    return Math.max(0, FREE_SAVE_LIMIT - savedRecipes.length);
  };

  const canAccessFeature = (featureId) => {
    if (isPremium) return true;
    return !PREMIUM_FEATURES.has(featureId);
  };

  return {
    isPremium,
    isLoggedIn: !!user,
    canSaveRecipe,
    savesRemaining,
    canAccessFeature,
    FREE_SAVE_LIMIT,
    savedCount: savedRecipes.length,
  };
}
