import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';

// Premium gating disabled — all features are free for now
export function usePremium() {
  const { user } = useAuth();
  const { savedRecipes } = useRecipes();

  return {
    isPremium: true,
    isLoggedIn: !!user,
    canSaveRecipe: () => true,
    savesRemaining: () => Infinity,
    canAccessFeature: () => true,
    FREE_SAVE_LIMIT: Infinity,
    savedCount: savedRecipes.length,
  };
}
