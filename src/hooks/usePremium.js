import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';

const FREE_SAVE_LIMIT = 5;

const PREMIUM_FEATURES = new Set([
  'pantry',
  'planner',
  'shopping',
  'nutrition',
]);

export function usePremium() {
  const { isPremium, user } = useAuth();
  const { savedRecipes } = useRecipes();

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
