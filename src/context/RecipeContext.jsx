import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MOCK_RECIPES } from '../services/api';

const RecipeContext = createContext(null);

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const MEALS = ['breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner'];

const createEmptyMealPlan = () => {
  const plan = {};
  DAYS.forEach(day => {
    plan[day] = {
      breakfast: null,
      morning_snack: null,
      lunch: null,
      afternoon_snack: null,
      dinner: null
    };
  });
  return plan;
};

const validateMealPlan = (plan) => {
  if (!plan || typeof plan !== 'object') {
    return createEmptyMealPlan();
  }
  const validPlan = {};
  DAYS.forEach(day => {
    validPlan[day] = {
      breakfast: plan[day]?.breakfast || null,
      morning_snack: plan[day]?.morning_snack || null,
      lunch: plan[day]?.lunch || null,
      afternoon_snack: plan[day]?.afternoon_snack || null,
      dinner: plan[day]?.dinner || null,
    };
  });
  return validPlan;
};

export function RecipeProvider({ children }) {
  const [savedRecipes, setSavedRecipes] = useLocalStorage('savedRecipes', []);
  const [rawMealPlan, setMealPlan] = useLocalStorage('mealPlan', createEmptyMealPlan);
  const [cookingHistory, setCookingHistory] = useLocalStorage('cookingHistory', []);
  const [recipeNotes, setRecipeNotes] = useLocalStorage('recipeNotes', {});
  const [recipeRatings, setRecipeRatings] = useLocalStorage('recipeRatings', {});
  const [shoppingList, setShoppingList] = useLocalStorage('shoppingList', []);

  const mealPlan = useMemo(() => validateMealPlan(rawMealPlan), [rawMealPlan]);

  const saveRecipe = useCallback((recipe) => {
    if (!recipe) return;
    setSavedRecipes(prev => {
      const prevArray = Array.isArray(prev) ? prev : [];
      if (prevArray.some(r => r.idMeal === recipe.idMeal)) {
        return prevArray;
      }
      return [...prevArray, {
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        strCategory: recipe.strCategory,
        strArea: recipe.strArea,
        strTags: recipe.strTags || '',
      }];
    });
  }, [setSavedRecipes]);

  const unsaveRecipe = useCallback((recipeId) => {
    setSavedRecipes(prev => {
      const prevArray = Array.isArray(prev) ? prev : [];
      return prevArray.filter(r => r.idMeal !== recipeId);
    });
    setMealPlan(prev => {
      const updated = validateMealPlan(prev);
      DAYS.forEach(day => {
        MEALS.forEach(meal => {
          if (updated[day][meal] === recipeId) {
            updated[day] = { ...updated[day], [meal]: null };
          }
        });
      });
      return updated;
    });
  }, [setSavedRecipes, setMealPlan]);

  const isRecipeSaved = useCallback((recipeId) => {
    const recipes = Array.isArray(savedRecipes) ? savedRecipes : [];
    return recipes.some(r => r.idMeal === recipeId);
  }, [savedRecipes]);

  const addToMealPlan = useCallback((day, meal, recipeId) => {
    setMealPlan(prev => {
      const validated = validateMealPlan(prev);
      return {
        ...validated,
        [day]: { ...validated[day], [meal]: recipeId }
      };
    });
  }, [setMealPlan]);

  const removeFromMealPlan = useCallback((day, meal) => {
    setMealPlan(prev => {
      const validated = validateMealPlan(prev);
      return {
        ...validated,
        [day]: { ...validated[day], [meal]: null }
      };
    });
  }, [setMealPlan]);

  const swapMeals = useCallback((from, to) => {
    setMealPlan(prev => {
      const validated = validateMealPlan(prev);
      const fromRecipe = validated[from.day][from.meal];
      const toRecipe = validated[to.day][to.meal];
      return {
        ...validated,
        [from.day]: { ...validated[from.day], [from.meal]: toRecipe },
        [to.day]: { ...validated[to.day], [to.meal]: fromRecipe }
      };
    });
  }, [setMealPlan]);

  const clearMealPlan = useCallback(() => {
    setMealPlan(createEmptyMealPlan());
  }, [setMealPlan]);

  const getRecipeById = useCallback((recipeId) => {
    const recipes = Array.isArray(savedRecipes) ? savedRecipes : [];
    const saved = recipes.find(r => r.idMeal === recipeId);
    if (saved) return saved;
    return MOCK_RECIPES.find(r => r.idMeal === recipeId) || null;
  }, [savedRecipes]);

  // Cooking History
  const addToCookingHistory = useCallback((recipeId) => {
    setCookingHistory(prev => {
      const newEntry = {
        recipeId,
        cookedAt: new Date().toISOString(),
        id: Date.now().toString()
      };
      return [newEntry, ...(Array.isArray(prev) ? prev : [])].slice(0, 100);
    });
  }, [setCookingHistory]);

  // Recipe Notes
  const setRecipeNote = useCallback((recipeId, note) => {
    setRecipeNotes(prev => ({
      ...(prev || {}),
      [recipeId]: note
    }));
  }, [setRecipeNotes]);

  const getRecipeNote = useCallback((recipeId) => {
    return recipeNotes?.[recipeId] || '';
  }, [recipeNotes]);

  // Recipe Ratings
  const setRecipeRating = useCallback((recipeId, rating) => {
    setRecipeRatings(prev => ({
      ...(prev || {}),
      [recipeId]: rating
    }));
  }, [setRecipeRatings]);

  const getRecipeRating = useCallback((recipeId) => {
    return recipeRatings?.[recipeId] || 0;
  }, [recipeRatings]);

  // Shopping List
  const generateShoppingList = useCallback(() => {
    const ingredients = {};

    DAYS.forEach(day => {
      MEALS.forEach(meal => {
        const recipeId = mealPlan[day]?.[meal];
        if (recipeId) {
          const recipe = MOCK_RECIPES.find(r => r.idMeal === recipeId);
          if (recipe) {
            for (let i = 1; i <= 20; i++) {
              const ingredient = recipe[`strIngredient${i}`];
              const measure = recipe[`strMeasure${i}`];
              if (ingredient && ingredient.trim()) {
                const key = ingredient.toLowerCase().trim();
                if (!ingredients[key]) {
                  ingredients[key] = {
                    name: ingredient.trim(),
                    measures: [],
                    checked: false
                  };
                }
                if (measure && measure.trim()) {
                  ingredients[key].measures.push(measure.trim());
                }
              }
            }
          }
        }
      });
    });

    const list = Object.values(ingredients).map((item, index) => ({
      id: index.toString(),
      ...item,
      quantity: item.measures.length > 0 ? item.measures.join(' + ') : '1',
      category: categorizeIngredient(item.name)
    }));

    setShoppingList(list);
    return list;
  }, [mealPlan, setShoppingList]);

  const toggleShoppingItem = useCallback((itemId) => {
    setShoppingList(prev =>
      (prev || []).map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  }, [setShoppingList]);

  const clearShoppingList = useCallback(() => {
    setShoppingList([]);
  }, [setShoppingList]);

  const safeRecipes = Array.isArray(savedRecipes) ? savedRecipes : [];
  const safeHistory = Array.isArray(cookingHistory) ? cookingHistory : [];
  const safeShoppingList = Array.isArray(shoppingList) ? shoppingList : [];

  return (
    <RecipeContext.Provider value={{
      savedRecipes: safeRecipes,
      mealPlan,
      saveRecipe,
      unsaveRecipe,
      isRecipeSaved,
      addToMealPlan,
      removeFromMealPlan,
      swapMeals,
      clearMealPlan,
      getRecipeById,
      cookingHistory: safeHistory,
      addToCookingHistory,
      recipeNotes,
      setRecipeNote,
      getRecipeNote,
      recipeRatings,
      setRecipeRating,
      getRecipeRating,
      shoppingList: safeShoppingList,
      generateShoppingList,
      toggleShoppingItem,
      clearShoppingList,
      DAYS,
      MEALS,
    }}>
      {children}
    </RecipeContext.Provider>
  );
}

function categorizeIngredient(name) {
  const lower = name.toLowerCase();
  if (/chicken|beef|pork|lamb|fish|salmon|shrimp|bacon|sausage|meat/.test(lower)) return 'Meat & Seafood';
  if (/milk|cheese|cream|yogurt|butter|egg/.test(lower)) return 'Dairy & Eggs';
  if (/bread|flour|pasta|rice|noodle|tortilla/.test(lower)) return 'Grains & Bread';
  if (/tomato|onion|garlic|pepper|carrot|potato|lettuce|spinach|broccoli|cucumber/.test(lower)) return 'Produce';
  if (/apple|banana|lemon|lime|orange|berry/.test(lower)) return 'Fruits';
  if (/salt|pepper|cumin|paprika|oregano|basil|thyme|cinnamon/.test(lower)) return 'Spices';
  if (/oil|vinegar|sauce|soy|honey|sugar/.test(lower)) return 'Pantry';
  return 'Other';
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}
