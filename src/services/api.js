const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';


import { MOCK_RECIPES } from '../data/mockRecipes.js';
export { MOCK_RECIPES };

export const DIETARY_OPTIONS = [
  // Lifestyle / diet style
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥬', group: 'lifestyle' },
  { id: 'vegan', label: 'Vegan', icon: '🌱', group: 'lifestyle' },
  { id: 'pescatarian', label: 'Pescatarian', icon: '🐟', group: 'lifestyle' },
  { id: 'paleo', label: 'Paleo', icon: '🫀', group: 'lifestyle' },
  { id: 'keto', label: 'Keto', icon: '🥑', group: 'lifestyle' },
  { id: 'halal', label: 'Halal', icon: '☪️', group: 'lifestyle' },
  { id: 'kosher', label: 'Kosher', icon: '✡️', group: 'lifestyle' },
  // Avoid / exclude
  { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾', group: 'avoid' },
  { id: 'dairy-free', label: 'Dairy-Free', icon: '🥛', group: 'avoid' },
  { id: 'nut-free', label: 'Nut-Free', icon: '🥜', group: 'avoid' },
  { id: 'shellfish-free', label: 'Shellfish-Free', icon: '🦐', group: 'avoid' },
  { id: 'egg-free', label: 'Egg-Free', icon: '🥚', group: 'avoid' },
  { id: 'low-carb', label: 'Low-Carb', icon: '🍞', group: 'avoid' },
  // Nutrition goals
  { id: 'high-protein', label: 'High-Protein', icon: '💪', group: 'nutrition' },
  { id: 'low-calorie', label: 'Low-Calorie', icon: '🌿', group: 'nutrition' },
  { id: 'high-fiber', label: 'High-Fiber', icon: '🫐', group: 'nutrition' },
  { id: 'low-fat', label: 'Low-Fat', icon: '🫧', group: 'nutrition' },
];

export const CUISINE_OPTIONS = [
  { id: 'Israeli', label: 'Israeli', icon: '🇮🇱' },
  { id: 'Italian', label: 'Italian', icon: '🇮🇹' },
  { id: 'Japanese', label: 'Japanese', icon: '🇯🇵' },
  { id: 'Mexican', label: 'Mexican', icon: '🇲🇽' },
  { id: 'Chinese', label: 'Chinese', icon: '🇨🇳' },
  { id: 'Indian', label: 'Indian', icon: '🇮🇳' },
  { id: 'Thai', label: 'Thai', icon: '🇹🇭' },
  { id: 'Greek', label: 'Greek', icon: '🇬🇷' },
  { id: 'American', label: 'American', icon: '🇺🇸' },
  { id: 'French', label: 'French', icon: '🇫🇷' },
  { id: 'Spanish', label: 'Spanish', icon: '🇪🇸' },
  { id: 'Korean', label: 'Korean', icon: '🇰🇷' },
  { id: 'Lebanese', label: 'Lebanese', icon: '🇱🇧' },
  { id: 'Moroccan', label: 'Moroccan', icon: '🇲🇦' },
  { id: 'Brazilian', label: 'Brazilian', icon: '🇧🇷' },
  { id: 'Caribbean', label: 'Caribbean', icon: '🏝️' },
  { id: 'Georgian', label: 'Georgian', icon: '🇬🇪' },
  { id: 'Polish', label: 'Polish', icon: '🇵🇱' },
  { id: 'Nigerian', label: 'Nigerian', icon: '🇳🇬' },
  { id: 'Sri Lankan', label: 'Sri Lankan', icon: '🇱🇰' },
  { id: 'Argentinian', label: 'Argentinian', icon: '🇦🇷' },
  { id: 'Egyptian', label: 'Egyptian', icon: '🇪🇬' },
  { id: 'Colombian', label: 'Colombian', icon: '🇨🇴' },
  { id: 'Hawaiian', label: 'Hawaiian', icon: '🌺' },
  { id: 'Scottish', label: 'Scottish', icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { id: 'Jamaican', label: 'Jamaican', icon: '🇯🇲' },
  { id: 'Malaysian', label: 'Malaysian', icon: '🇲🇾' },
  { id: 'Uzbek', label: 'Uzbek', icon: '🇺🇿' },
  { id: 'Senegalese', label: 'Senegalese', icon: '🇸🇳' },
  { id: 'Portuguese', label: 'Portuguese', icon: '🇵🇹' },
  { id: 'Swedish', label: 'Swedish', icon: '🇸🇪' },
  { id: 'British', label: 'British', icon: '🇬🇧' },
  { id: 'Ukrainian', label: 'Ukrainian', icon: '🇺🇦' },
  { id: 'Canadian', label: 'Canadian', icon: '🇨🇦' },
  { id: 'Bosnian', label: 'Bosnian', icon: '🇧🇦' },
  { id: 'Venezuelan', label: 'Venezuelan', icon: '🇻🇪' },
  { id: 'Turkish', label: 'Turkish', icon: '🇹🇷' },
  { id: 'Middle Eastern', label: 'Middle Eastern', icon: '🕌' },
];

export const COOK_TIME_OPTIONS = [
  { id: 'quick', label: 'Under 15 min', max: 15, icon: '⚡' },
  { id: 'medium', label: '15-30 min', min: 15, max: 30, icon: '⏱️' },
  { id: 'long', label: '30-60 min', min: 30, max: 60, icon: '🕐' },
  { id: 'slow', label: '60+ min', min: 60, icon: '🍲' },
];

// Ingredient keyword lists for dietary tag inference on API results
const MEAT_KEYWORDS = ['chicken', 'beef', 'pork', 'lamb', 'turkey', 'duck', 'veal', 'venison', 'bison', 'bacon', 'ham', 'sausage', 'chorizo', 'salami', 'pepperoni', 'prosciutto', 'pancetta', 'lard', 'gelatin', 'mince', 'minced meat'];
const SEAFOOD_KEYWORDS = ['fish', 'salmon', 'tuna', 'cod', 'shrimp', 'prawn', 'lobster', 'crab', 'clam', 'mussel', 'oyster', 'squid', 'octopus', 'anchovy', 'sardine', 'mackerel', 'tilapia', 'bass', 'trout', 'halibut', 'snapper', 'haddock', 'monkfish'];
const SHELLFISH_KEYWORDS = ['shrimp', 'prawn', 'lobster', 'crab', 'clam', 'mussel', 'oyster', 'scallop', 'crayfish'];
const PORK_KEYWORDS = ['pork', 'bacon', 'ham', 'salami', 'chorizo', 'sausage', 'prosciutto', 'pancetta', 'lard', 'pepperoni'];
const DAIRY_KEYWORDS = ['butter', 'milk', 'cream', 'cheese', 'yogurt', 'yoghurt', 'ghee', 'brie', 'cheddar', 'mozzarella', 'parmesan', 'ricotta', 'sour cream', 'evaporated milk', 'condensed milk', 'half-and-half'];
const GLUTEN_KEYWORDS = ['flour', 'wheat', 'bread', 'breadcrumb', 'pasta', 'soy sauce', 'barley', 'rye', 'spelt', 'semolina', 'couscous', 'bulgur', 'beer', 'noodle', 'tortilla', 'pita', 'baguette'];
const EGG_KEYWORDS = ['egg', 'mayonnaise', 'mayo'];
const NUT_KEYWORDS = ['almond', 'cashew', 'walnut', 'pecan', 'pistachio', 'hazelnut', 'macadamia', 'pine nut', 'peanut'];

function getIngredients(recipe) {
  const ings = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    if (ing && ing.trim()) ings.push(ing.toLowerCase().trim());
  }
  return ings;
}

function hasAny(ingredients, keywords) {
  return ingredients.some(ing => keywords.some(kw => ing.includes(kw)));
}

// Infer dietary tags from a recipe's ingredient list (for API results that lack explicit tags)
export function inferDietaryTags(recipe) {
  const ings = getIngredients(recipe);
  if (!ings.length) return [];

  const hasMeat = hasAny(ings, MEAT_KEYWORDS);
  const hasSeafood = hasAny(ings, SEAFOOD_KEYWORDS);
  const hasShellfish = hasAny(ings, SHELLFISH_KEYWORDS);
  const hasPork = hasAny(ings, PORK_KEYWORDS);
  const hasDairy = hasAny(ings, DAIRY_KEYWORDS);
  const hasGluten = hasAny(ings, GLUTEN_KEYWORDS);
  const hasEggs = hasAny(ings, EGG_KEYWORDS);
  const hasNuts = hasAny(ings, NUT_KEYWORDS);

  const tags = [];
  if (!hasMeat && !hasSeafood) tags.push('vegetarian');
  if (!hasMeat && !hasSeafood && !hasDairy && !hasEggs) tags.push('vegan');
  if (!hasMeat) tags.push('pescatarian'); // no land meat; seafood OK
  if (!hasGluten) tags.push('gluten-free');
  if (!hasDairy) tags.push('dairy-free');
  if (!hasEggs) tags.push('egg-free');
  if (!hasNuts) tags.push('nut-free');
  if (!hasShellfish) tags.push('shellfish-free');
  if (!hasPork) tags.push('halal'); // pork-free as proxy; can't verify slaughter method
  return tags;
}

// Fetch all meal categories from TheMealDB
export async function fetchCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories.php`);
    const data = await res.json();
    return data.categories || [];
  } catch { return []; }
}

// Fetch recipe summaries by category name
export async function fetchByCategory(category) {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    const data = await res.json();
    return data.meals || [];
  } catch { return []; }
}

// Fetch recipe summaries by cuisine area
export async function fetchByCuisine(area) {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
    const data = await res.json();
    return data.meals || [];
  } catch { return []; }
}

// Fetch the daily featured recipe.
// In production: served from the server-side cron endpoint so all users
// see the same recipe. Falls back to direct TheMealDB + localStorage in dev.
export async function fetchDailyRecipe() {
  const today = new Date().toDateString();

  // 1. Try the server-side endpoint (Vercel API route + cron)
  try {
    const res = await fetch('/api/daily-recipe');
    if (res.ok) {
      const recipe = await res.json();
      if (recipe?.idMeal) return recipe;
    }
  } catch { /* not in production — fall through */ }

  // 2. Local fallback: check localStorage, then hit TheMealDB directly
  try {
    const cached = localStorage.getItem('recipe-finder-daily');
    if (cached) {
      const { date, recipe } = JSON.parse(cached);
      if (date === today) return recipe;
    }
    const res = await fetch(`${BASE_URL}/random.php`);
    const data = await res.json();
    const recipe = data.meals?.[0] || null;
    if (recipe) {
      localStorage.setItem('recipe-finder-daily', JSON.stringify({ date: today, recipe }));
    }
    return recipe;
  } catch { return null; }
}

export async function searchRecipes(query, filters = {}) {
  if (!query.trim() && !filters.ingredients?.length) return [];

  try {
    let apiResults = [];

    // Live API search
    if (query.trim()) {
      const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
      const data = await response.json();
      // Enrich API results with inferred dietary tags so filtering works
      apiResults = (data.meals || []).map(r => ({
        ...r,
        dietary: inferDietaryTags(r),
      }));
    }

    // Mock recipe search
    const lowerQuery = query.toLowerCase();
    const mockResults = MOCK_RECIPES.filter(r =>
      r.strMeal.toLowerCase().includes(lowerQuery) ||
      r.strCategory.toLowerCase().includes(lowerQuery) ||
      r.strArea.toLowerCase().includes(lowerQuery) ||
      (r.strTags && r.strTags.toLowerCase().includes(lowerQuery))
    );

    // Combine, deduplicating by name (API results take priority as source of truth)
    const apiNames = new Set(apiResults.map(r => r.strMeal.toLowerCase()));
    const uniqueMockResults = mockResults.filter(r => !apiNames.has(r.strMeal.toLowerCase()));

    return [...apiResults, ...uniqueMockResults];
  } catch (_err) {
    // Fallback to mock data on network error
    const lowerQuery = query.toLowerCase();
    return MOCK_RECIPES.filter(r =>
      r.strMeal.toLowerCase().includes(lowerQuery) ||
      r.strCategory.toLowerCase().includes(lowerQuery) ||
      r.strArea.toLowerCase().includes(lowerQuery)
    );
  }
}

// Bidirectional substring match: checks if an ingredient name matches any pantry item
export function ingredientMatchesPantry(ingredientName, pantryItems) {
  if (!ingredientName || !pantryItems || !pantryItems.length) return false;
  const lowerIng = ingredientName.toLowerCase().trim();
  return pantryItems.some(pantryItem => {
    const lowerPantry = pantryItem.toLowerCase().trim();
    return lowerIng.includes(lowerPantry) || lowerPantry.includes(lowerIng);
  });
}

function scoreRecipeAgainstPantry(recipe, pantryItems) {
  const recipeIngredients = getIngredients(recipe);
  const matched = recipeIngredients.filter(ing => ingredientMatchesPantry(ing, pantryItems));
  const missing = recipeIngredients.filter(ing => !ingredientMatchesPantry(ing, pantryItems));
  const matchScore = recipeIngredients.length > 0 ? matched.length / recipeIngredients.length : 0;
  return {
    ...recipe,
    dietary: recipe.dietary || inferDietaryTags(recipe),
    matchScore,
    matchedCount: matched.length,
    totalIngredients: recipeIngredients.length,
    matchedIngredients: matched,
    missingIngredients: missing,
  };
}

// Smart pantry search - returns recipes ranked by ingredient match percentage
// Searches both mock recipes and the live TheMealDB API
export async function searchByPantry(pantryItems) {
  if (!pantryItems || !pantryItems.length) return [];

  // Score mock recipes locally (instant)
  const mockScored = MOCK_RECIPES.map(r => scoreRecipeAgainstPantry(r, pantryItems));

  // Fetch API results for each pantry item in parallel, deduplicate by idMeal
  let apiRecipes = [];
  try {
    const fetches = pantryItems.slice(0, 5).map(item =>
      fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(item)}`)
        .then(r => r.json())
        .then(d => d.meals || [])
        .catch(() => [])
    );
    const allFetched = await Promise.all(fetches);
    const seen = new Set();
    for (const batch of allFetched) {
      for (const r of batch) {
        if (!seen.has(r.idMeal)) {
          seen.add(r.idMeal);
          apiRecipes.push(r);
        }
      }
    }
  } catch (_err) {
    // API unavailable — fall through to mock-only results
  }

  // The filter API returns summary objects (no ingredients) — fetch full details for top candidates
  const mockIds = new Set(MOCK_RECIPES.map(r => r.idMeal));
  const newApiIds = apiRecipes.map(r => r.idMeal).filter(id => !mockIds.has(id)).slice(0, 20);

  let apiScored = [];
  if (newApiIds.length) {
    const details = await Promise.all(
      newApiIds.map(id =>
        fetch(`${BASE_URL}/lookup.php?i=${id}`)
          .then(r => r.json())
          .then(d => d.meals?.[0] || null)
          .catch(() => null)
      )
    );
    apiScored = details
      .filter(Boolean)
      .map(r => scoreRecipeAgainstPantry(r, pantryItems));
  }

  // Merge, filter to at least one match, sort by score
  return [...mockScored, ...apiScored]
    .filter(r => r.matchedCount > 0)
    .sort((a, b) =>
      b.matchScore !== a.matchScore
        ? b.matchScore - a.matchScore
        : b.matchedCount - a.matchedCount
    );
}

export async function getRecipeById(id) {
  const mockRecipe = MOCK_RECIPES.find(r => r.idMeal === id);
  if (mockRecipe) return mockRecipe;

  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (_err) {
    return null;
  }
}

export function parseIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || '',
      });
    }
  }
  return ingredients;
}

export function scaleIngredients(ingredients, originalServings, newServings) {
  const ratio = newServings / originalServings;

  return ingredients.map(item => {
    const scaled = { ...item };
    // Try to parse and scale numeric measures
    const match = item.measure.match(/^([\d./]+)\s*(.*)$/);
    if (match) {
      let num = match[1];
      // Handle fractions
      if (num.includes('/')) {
        const [n, d] = num.split('/');
        num = parseFloat(n) / parseFloat(d);
      } else {
        num = parseFloat(num);
      }
      const scaledNum = num * ratio;
      // Format nicely
      const formatted = scaledNum % 1 === 0 ? scaledNum.toString() : scaledNum.toFixed(1);
      scaled.measure = `${formatted} ${match[2]}`.trim();
    }
    return scaled;
  });
}

export function calculateNutrition(mealPlan, _getRecipeById) {
  const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, meals: 0 };

  Object.values(mealPlan).forEach(day => {
    Object.values(day).forEach(recipeId => {
      if (recipeId) {
        const recipe = MOCK_RECIPES.find(r => r.idMeal === recipeId);
        if (recipe && recipe.calories) {
          totals.calories += recipe.calories;
          totals.protein += recipe.protein || 0;
          totals.carbs += recipe.carbs || 0;
          totals.fat += recipe.fat || 0;
          totals.meals += 1;
        }
      }
    });
  });

  // Calculate by day
  const byDay = {};
  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  DAYS.forEach(day => {
    byDay[day] = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    const dayPlan = mealPlan[day];
    if (dayPlan) {
      Object.values(dayPlan).forEach(recipeId => {
        if (recipeId) {
          const recipe = MOCK_RECIPES.find(r => r.idMeal === recipeId);
          if (recipe && recipe.calories) {
            byDay[day].calories += recipe.calories;
            byDay[day].protein += recipe.protein || 0;
            byDay[day].carbs += recipe.carbs || 0;
            byDay[day].fat += recipe.fat || 0;
          }
        }
      });
    }
  });

  return {
    totalCalories: totals.calories,
    totalProtein: totals.protein,
    totalCarbs: totals.carbs,
    totalFat: totals.fat,
    mealsPlanned: totals.meals,
    byDay
  };
}

// Ingredients database with rarity and location-aware sourcing
export const INGREDIENTS_DATABASE = {
  // EXOTIC INGREDIENTS
  'Escargot': {
    rarity: 'exotic',
    description: 'Edible land snails, a French delicacy typically prepared with garlic butter.',
    category: 'Protein',
    sourcing: {
      US: { store: 'Whole Foods, specialty grocers', link: 'https://www.amazon.com/s?k=canned+escargot' },
      UK: { store: 'Waitrose, Selfridges Food Hall', link: 'https://www.amazon.co.uk/s?k=escargot' },
      Finland: { store: 'Stockmann Herkku, K-Citymarket gourmet section', link: 'https://www.amazon.de/s?k=escargot' },
      Israel: { store: 'Mahane Yehuda specialty shops', link: 'https://www.amazon.com/s?k=canned+escargot' },
      default: { store: 'Order online - French gourmet suppliers', link: 'https://www.gourmetfoodstore.com/search?q=escargot' }
    }
  },
  'Wagyu Beef': {
    rarity: 'exotic',
    description: 'Premium Japanese beef known for intense marbling and rich flavor.',
    category: 'Protein',
    sourcing: {
      US: { store: 'Costco, Snake River Farms, specialty butchers', link: 'https://www.snakeriverfarms.com' },
      UK: { store: 'Harrods, The Ginger Pig', link: 'https://www.finefoodspecialist.co.uk/wagyu' },
      Finland: { store: 'K-Citymarket premium, Stockmann', link: 'https://www.lihatukku.fi' },
      Israel: { store: 'Basar delicatessen, Mahane Yehuda', link: 'https://www.amazon.com/s?k=wagyu+beef' },
      default: { store: 'Order from specialty meat suppliers', link: 'https://www.crowdcow.com/wagyu' }
    }
  },
  'Uni (Sea Urchin)': {
    rarity: 'exotic',
    description: 'Sea urchin roe with a creamy, briny ocean flavor. Prized in Japanese cuisine.',
    category: 'Seafood',
    sourcing: {
      US: { store: 'Japanese markets, Catalina Offshore', link: 'https://catalinaop.com' },
      UK: { store: 'Billingsgate Market, Japanese grocery stores', link: 'https://www.japancentre.com' },
      Finland: { store: 'Torvehallerne, specialty fish markets', link: 'https://www.amazon.de/s?k=uni+sea+urchin' },
      Israel: { store: 'Tel Aviv Port fish market', link: 'https://www.amazon.com/s?k=uni+sea+urchin' },
      default: { store: 'Japanese grocery stores or sushi suppliers', link: 'https://www.catalinaop.com/Uni-Sea-Urchin-s/35.htm' }
    }
  },
  'Ikura (Salmon Roe)': {
    rarity: 'exotic',
    description: 'Large salmon eggs with a satisfying pop and briny taste.',
    category: 'Seafood',
    sourcing: {
      US: { store: 'Costco, Japanese markets', link: 'https://www.amazon.com/s?k=ikura+salmon+roe' },
      UK: { store: 'Waitrose, Japan Centre', link: 'https://www.japancentre.com' },
      Finland: { store: 'Stockmann, Asian supermarkets', link: 'https://www.prisma.fi' },
      Israel: { store: 'Supersal, specialty fish shops', link: 'https://www.amazon.com/s?k=salmon+roe' },
      default: { store: 'Asian grocery stores', link: 'https://www.amazon.com/s?k=ikura' }
    }
  },
  'Saffron': {
    rarity: 'exotic',
    description: 'World\'s most expensive spice, harvested from crocus flowers. Adds golden color and unique flavor.',
    category: 'Spice',
    sourcing: {
      US: { store: 'Whole Foods, Trader Joe\'s, Persian markets', link: 'https://www.amazon.com/s?k=saffron+threads' },
      UK: { store: 'Sainsbury\'s, Waitrose', link: 'https://www.amazon.co.uk/s?k=saffron' },
      Finland: { store: 'Stockmann, Middle Eastern shops', link: 'https://www.prisma.fi' },
      Israel: { store: 'Shuk HaCarmel, supermarkets', link: 'https://www.rami-levy.co.il' },
      default: { store: 'Most supermarkets carry small amounts', link: 'https://www.amazon.com/s?k=saffron' }
    }
  },
  'Ras el Hanout': {
    rarity: 'exotic',
    description: 'Complex North African spice blend with up to 30 ingredients including rose petals.',
    category: 'Spice',
    sourcing: {
      US: { store: 'Whole Foods, Middle Eastern markets', link: 'https://www.amazon.com/s?k=ras+el+hanout' },
      UK: { store: 'Waitrose, Morrisons', link: 'https://www.amazon.co.uk/s?k=ras+el+hanout' },
      Finland: { store: 'Ethnic food stores, Hakaniemi Market Hall', link: 'https://www.amazon.de/s?k=ras+el+hanout' },
      Israel: { store: 'Levinsky Market, spice shops', link: 'https://www.amazon.com/s?k=ras+el+hanout' },
      default: { store: 'Middle Eastern groceries or make your own blend', link: 'https://www.thespicehouse.com/ras-el-hanout' }
    }
  },
  'Preserved Lemons': {
    rarity: 'exotic',
    description: 'Salt-cured lemons used in Moroccan cuisine with intense citrus flavor.',
    category: 'Condiment',
    sourcing: {
      US: { store: 'Whole Foods, Trader Joe\'s', link: 'https://www.amazon.com/s?k=preserved+lemons' },
      UK: { store: 'Waitrose, specialty food shops', link: 'https://www.amazon.co.uk/s?k=preserved+lemons' },
      Finland: { store: 'Make at home (4 weeks) or ethnic food stores', link: 'https://www.amazon.de/s?k=preserved+lemons' },
      Israel: { store: 'Common in supermarkets', link: 'https://www.rami-levy.co.il' },
      default: { store: 'Easy to make at home with lemons and salt', link: 'https://www.amazon.com/s?k=preserved+lemons' }
    }
  },
  'Berbere Spice': {
    rarity: 'exotic',
    description: 'Ethiopian spice blend with chili, fenugreek, and warming spices.',
    category: 'Spice',
    sourcing: {
      US: { store: 'Ethiopian markets, Whole Foods', link: 'https://www.amazon.com/s?k=berbere+spice' },
      UK: { store: 'Ethiopian restaurants, online', link: 'https://www.amazon.co.uk/s?k=berbere' },
      Finland: { store: 'Ethnic food stores in Helsinki', link: 'https://www.amazon.de/s?k=berbere+spice' },
      Israel: { store: 'Ethiopian community shops in Tel Aviv', link: 'https://www.amazon.com/s?k=berbere' },
      default: { store: 'African grocery stores or online spice shops', link: 'https://www.thespicehouse.com/berbere' }
    }
  },
  'Niter Kibbeh': {
    rarity: 'exotic',
    description: 'Ethiopian spiced clarified butter with aromatics like fenugreek and cardamom.',
    category: 'Fat',
    sourcing: {
      US: { store: 'Ethiopian markets, make at home', link: 'https://www.amazon.com/s?k=niter+kibbeh' },
      UK: { store: 'Make at home with ghee and spices', link: 'https://www.amazon.co.uk/s?k=ethiopian+butter' },
      Finland: { store: 'Make at home - recipe widely available', link: 'https://www.amazon.de/s?k=ghee' },
      Israel: { store: 'Ethiopian shops or homemade', link: 'https://www.amazon.com/s?k=ghee' },
      default: { store: 'Best made at home with clarified butter and spices', link: 'https://www.seriouseats.com/niter-kibbeh' }
    }
  },
  'Injera Bread': {
    rarity: 'exotic',
    description: 'Spongy Ethiopian sourdough flatbread made from teff flour.',
    category: 'Bread',
    sourcing: {
      US: { store: 'Ethiopian restaurants, African markets', link: 'https://www.amazon.com/s?k=injera+bread' },
      UK: { store: 'Ethiopian restaurants (takeaway)', link: 'https://www.amazon.co.uk/s?k=teff+flour' },
      Finland: { store: 'African food stores, make with teff flour', link: 'https://www.amazon.de/s?k=teff+flour' },
      Israel: { store: 'Ethiopian restaurants in Tel Aviv', link: 'https://www.amazon.com/s?k=teff+flour' },
      default: { store: 'Buy teff flour and ferment 2-3 days to make at home', link: 'https://www.bobsredmill.com/teff' }
    }
  },
  'Gochujang': {
    rarity: 'exotic',
    description: 'Korean fermented chili paste with sweet, savory, and spicy notes.',
    category: 'Condiment',
    sourcing: {
      US: { store: 'H-Mart, Whole Foods, most supermarkets', link: 'https://www.amazon.com/s?k=gochujang' },
      UK: { store: 'Tesco, Sainsbury\'s, Asian supermarkets', link: 'https://www.amazon.co.uk/s?k=gochujang' },
      Finland: { store: 'Asian supermarkets, K-Supermarket', link: 'https://www.prisma.fi' },
      Israel: { store: 'Asian specialty stores in Tel Aviv', link: 'https://www.amazon.com/s?k=gochujang' },
      default: { store: 'Increasingly available in regular supermarkets', link: 'https://www.amazon.com/s?k=gochujang' }
    }
  },
  'Kimchi': {
    rarity: 'exotic',
    description: 'Korean fermented vegetables, usually napa cabbage with chili and fish sauce.',
    category: 'Fermented',
    sourcing: {
      US: { store: 'Most supermarkets, H-Mart, Costco', link: 'https://www.amazon.com/s?k=kimchi' },
      UK: { store: 'Waitrose, Tesco, Korean supermarkets', link: 'https://www.amazon.co.uk/s?k=kimchi' },
      Finland: { store: 'K-Supermarket, Asian stores', link: 'https://www.prisma.fi' },
      Israel: { store: 'Asian markets, some supermarkets', link: 'https://www.amazon.com/s?k=kimchi' },
      default: { store: 'Widely available or easy to make at home', link: 'https://www.amazon.com/s?k=kimchi' }
    }
  },
  'Doubanjiang': {
    rarity: 'exotic',
    description: 'Sichuan fermented chili bean paste - the soul of mapo tofu.',
    category: 'Condiment',
    sourcing: {
      US: { store: 'Chinese supermarkets, H-Mart', link: 'https://www.amazon.com/s?k=doubanjiang' },
      UK: { store: 'Wing Yip, Chinese supermarkets', link: 'https://www.amazon.co.uk/s?k=doubanjiang' },
      Finland: { store: 'Asian supermarkets in Helsinki', link: 'https://www.amazon.de/s?k=doubanjiang' },
      Israel: { store: 'Chinese grocery stores', link: 'https://www.amazon.com/s?k=doubanjiang' },
      default: { store: 'Any Chinese grocery store', link: 'https://www.amazon.com/s?k=pixian+doubanjiang' }
    }
  },
  'Sichuan Peppercorns': {
    rarity: 'exotic',
    description: 'Not actually pepper - creates a unique numbing, tingling sensation.',
    category: 'Spice',
    sourcing: {
      US: { store: 'Whole Foods, Chinese markets, Penzeys', link: 'https://www.amazon.com/s?k=sichuan+peppercorns' },
      UK: { store: 'Waitrose, Chinese supermarkets', link: 'https://www.amazon.co.uk/s?k=sichuan+peppercorns' },
      Finland: { store: 'Asian supermarkets', link: 'https://www.amazon.de/s?k=sichuan+peppercorns' },
      Israel: { store: 'Asian food stores', link: 'https://www.amazon.com/s?k=sichuan+peppercorns' },
      default: { store: 'Chinese groceries or online spice shops', link: 'https://www.amazon.com/s?k=sichuan+peppercorns' }
    }
  },
  'Aji Amarillo Paste': {
    rarity: 'exotic',
    description: 'Peruvian yellow chili paste with fruity, medium heat.',
    category: 'Condiment',
    sourcing: {
      US: { store: 'Latin markets, Amazon', link: 'https://www.amazon.com/s?k=aji+amarillo+paste' },
      UK: { store: 'Cool Chile Co, online', link: 'https://www.amazon.co.uk/s?k=aji+amarillo' },
      Finland: { store: 'Specialty food stores, online', link: 'https://www.amazon.de/s?k=aji+amarillo' },
      Israel: { store: 'Online ordering recommended', link: 'https://www.amazon.com/s?k=aji+amarillo' },
      default: { store: 'Latin American groceries or online', link: 'https://www.amazon.com/s?k=aji+amarillo+paste' }
    }
  },
  'Sumac': {
    rarity: 'exotic',
    description: 'Tangy, lemony Middle Eastern spice made from dried berries.',
    category: 'Spice',
    sourcing: {
      US: { store: 'Whole Foods, Middle Eastern markets', link: 'https://www.amazon.com/s?k=sumac+spice' },
      UK: { store: 'Sainsbury\'s, Waitrose', link: 'https://www.amazon.co.uk/s?k=sumac' },
      Finland: { store: 'Middle Eastern shops, Hakaniemi Market', link: 'https://www.amazon.de/s?k=sumac' },
      Israel: { store: 'Supermarkets - very common', link: 'https://www.rami-levy.co.il' },
      default: { store: 'Middle Eastern groceries', link: 'https://www.amazon.com/s?k=sumac' }
    }
  },
  'Shiso Leaves': {
    rarity: 'exotic',
    description: 'Japanese herb with a unique flavor between mint and basil.',
    category: 'Herb',
    sourcing: {
      US: { store: 'Japanese markets, Asian grocers', link: 'https://www.amazon.com/s?k=shiso+seeds' },
      UK: { store: 'Japan Centre, grow your own', link: 'https://www.japancentre.com' },
      Finland: { store: 'Asian stores or grow from seeds', link: 'https://www.amazon.de/s?k=shiso+seeds' },
      Israel: { store: 'Asian markets in Tel Aviv', link: 'https://www.amazon.com/s?k=shiso+seeds' },
      default: { store: 'Japanese grocers or grow from seed (easy)', link: 'https://www.amazon.com/s?k=shiso+seeds' }
    }
  },
  'Fish Sauce': {
    rarity: 'exotic',
    description: 'Fermented fish condiment essential to Southeast Asian cooking.',
    category: 'Condiment',
    sourcing: {
      US: { store: 'Most supermarkets', link: 'https://www.amazon.com/s?k=fish+sauce' },
      UK: { store: 'Tesco, Sainsbury\'s, any supermarket', link: 'https://www.amazon.co.uk/s?k=fish+sauce' },
      Finland: { store: 'K-Supermarket, Asian stores', link: 'https://www.prisma.fi' },
      Israel: { store: 'Asian supermarkets', link: 'https://www.amazon.com/s?k=fish+sauce' },
      default: { store: 'Available in most supermarkets worldwide', link: 'https://www.amazon.com/s?k=red+boat+fish+sauce' }
    }
  },
  'Kashmiri Chili': {
    rarity: 'exotic',
    description: 'Mild Indian chili known for vibrant red color more than heat.',
    category: 'Spice',
    sourcing: {
      US: { store: 'Indian grocery stores', link: 'https://www.amazon.com/s?k=kashmiri+chili+powder' },
      UK: { store: 'Indian supermarkets, Tesco', link: 'https://www.amazon.co.uk/s?k=kashmiri+chili' },
      Finland: { store: 'Indian food stores in Helsinki', link: 'https://www.amazon.de/s?k=kashmiri+chili' },
      Israel: { store: 'Indian spice shops', link: 'https://www.amazon.com/s?k=kashmiri+chili' },
      default: { store: 'Indian grocery stores', link: 'https://www.amazon.com/s?k=kashmiri+chili' }
    }
  },
  'Kasuri Methi': {
    rarity: 'exotic',
    description: 'Dried fenugreek leaves with a distinctive bitter-sweet flavor.',
    category: 'Herb',
    sourcing: {
      US: { store: 'Indian grocery stores', link: 'https://www.amazon.com/s?k=kasuri+methi' },
      UK: { store: 'Indian supermarkets', link: 'https://www.amazon.co.uk/s?k=kasuri+methi' },
      Finland: { store: 'Indian food stores', link: 'https://www.amazon.de/s?k=kasuri+methi' },
      Israel: { store: 'Indian or Middle Eastern shops', link: 'https://www.amazon.com/s?k=kasuri+methi' },
      default: { store: 'Indian grocery stores - very affordable', link: 'https://www.amazon.com/s?k=kasuri+methi' }
    }
  },
  'Garam Masala': {
    rarity: 'exotic',
    description: 'Warming Indian spice blend with cinnamon, cardamom, cloves, and more.',
    category: 'Spice',
    sourcing: {
      US: { store: 'Most supermarkets', link: 'https://www.amazon.com/s?k=garam+masala' },
      UK: { store: 'All supermarkets', link: 'https://www.amazon.co.uk/s?k=garam+masala' },
      Finland: { store: 'K-Supermarket, Indian stores', link: 'https://www.prisma.fi' },
      Israel: { store: 'Supermarkets, Indian shops', link: 'https://www.rami-levy.co.il' },
      default: { store: 'Widely available in supermarkets', link: 'https://www.amazon.com/s?k=garam+masala' }
    }
  },
  'Star Anise': {
    rarity: 'exotic',
    description: 'Star-shaped spice with intense licorice flavor, key to pho.',
    category: 'Spice',
    sourcing: {
      US: { store: 'Most supermarkets, Asian markets', link: 'https://www.amazon.com/s?k=star+anise' },
      UK: { store: 'Supermarkets, Chinese grocers', link: 'https://www.amazon.co.uk/s?k=star+anise' },
      Finland: { store: 'K-Supermarket, Asian stores', link: 'https://www.prisma.fi' },
      Israel: { store: 'Spice shops, Asian markets', link: 'https://www.rami-levy.co.il' },
      default: { store: 'Widely available', link: 'https://www.amazon.com/s?k=star+anise+whole' }
    }
  },

  // COMMON INGREDIENTS
  'Chicken': {
    rarity: 'common',
    description: 'Versatile poultry used worldwide in countless dishes.',
    category: 'Protein',
    sourcing: {
      default: { store: 'Any supermarket or butcher', link: null }
    }
  },
  'Beef': {
    rarity: 'common',
    description: 'Red meat from cattle, available in many cuts.',
    category: 'Protein',
    sourcing: {
      default: { store: 'Any supermarket or butcher', link: null }
    }
  },
  'Salmon': {
    rarity: 'common',
    description: 'Popular fatty fish rich in omega-3.',
    category: 'Seafood',
    sourcing: {
      default: { store: 'Any supermarket or fish market', link: null }
    }
  },
  'Eggs': {
    rarity: 'common',
    description: 'Essential cooking ingredient for baking, breakfast, and more.',
    category: 'Protein',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Rice': {
    rarity: 'common',
    description: 'Staple grain consumed by billions worldwide.',
    category: 'Grain',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Pasta': {
    rarity: 'common',
    description: 'Italian staple in countless shapes and sizes.',
    category: 'Grain',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Garlic': {
    rarity: 'common',
    description: 'Aromatic bulb essential to cuisines worldwide.',
    category: 'Vegetable',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Onion': {
    rarity: 'common',
    description: 'Foundation ingredient for most savory cooking.',
    category: 'Vegetable',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Tomatoes': {
    rarity: 'common',
    description: 'Versatile fruit used in sauces, salads, and more.',
    category: 'Vegetable',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Olive Oil': {
    rarity: 'common',
    description: 'Mediterranean cooking fat with health benefits.',
    category: 'Fat',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Butter': {
    rarity: 'common',
    description: 'Dairy fat used in cooking and baking.',
    category: 'Fat',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Soy Sauce': {
    rarity: 'common',
    description: 'Fermented soybean condiment used in Asian cooking.',
    category: 'Condiment',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Lemon': {
    rarity: 'common',
    description: 'Citrus fruit used for juice, zest, and garnish.',
    category: 'Fruit',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Salt': {
    rarity: 'common',
    description: 'Essential seasoning for all cooking.',
    category: 'Seasoning',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Black Pepper': {
    rarity: 'common',
    description: 'Universal spice that adds heat and depth.',
    category: 'Spice',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Flour': {
    rarity: 'common',
    description: 'Ground wheat used for baking and thickening.',
    category: 'Grain',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Sugar': {
    rarity: 'common',
    description: 'Sweetener for baking and beverages.',
    category: 'Sweetener',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Milk': {
    rarity: 'common',
    description: 'Dairy liquid used in cooking and baking.',
    category: 'Dairy',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Cheese': {
    rarity: 'common',
    description: 'Fermented dairy product in many varieties.',
    category: 'Dairy',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
  'Carrots': {
    rarity: 'common',
    description: 'Sweet root vegetable used in countless dishes.',
    category: 'Vegetable',
    sourcing: {
      default: { store: 'Any supermarket', link: null }
    }
  },
};

// Get user's country from browser
export function getUserCountry() {
  try {
    // Use timezone as a rough estimate
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countryMap = {
      'Europe/Helsinki': 'Finland',
      'Asia/Jerusalem': 'Israel',
      'Asia/Tel_Aviv': 'Israel',
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'America/Chicago': 'US',
      'Europe/London': 'UK',
      'Europe/Stockholm': 'Finland', // Nordic fallback
      'Europe/Oslo': 'Finland',
    };
    return countryMap[timezone] || 'default';
  } catch {
    return 'default';
  }
}

// Get sourcing info for an ingredient based on user location
export function getIngredientSourcing(ingredientName, country = null) {
  const ingredient = INGREDIENTS_DATABASE[ingredientName];
  if (!ingredient) return null;

  const userCountry = country || getUserCountry();
  return ingredient.sourcing[userCountry] || ingredient.sourcing.default;
}

// Get all exotic ingredients from database
export function getExoticIngredients() {
  return Object.entries(INGREDIENTS_DATABASE)
    .filter(([, data]) => data.rarity === 'exotic')
    .map(([name, data]) => ({ name, ...data }));
}

// Get all common ingredients from database
export function getCommonIngredients() {
  return Object.entries(INGREDIENTS_DATABASE)
    .filter(([, data]) => data.rarity === 'common')
    .map(([name, data]) => ({ name, ...data }));
}

// Get ingredients by category
export function getIngredientsByCategory(category) {
  return Object.entries(INGREDIENTS_DATABASE)
    .filter(([, data]) => data.category === category)
    .map(([name, data]) => ({ name, ...data }));
}

// Get all unique categories
export function getIngredientCategories() {
  const categories = new Set();
  Object.values(INGREDIENTS_DATABASE).forEach(data => {
    categories.add(data.category);
  });
  return Array.from(categories).sort();
}

// Comprehensive drinks database
export const DRINKS_DATABASE = [
  // Hot drinks
  { id: 'coffee-black', name: 'Coffee (black)', icon: '☕', category: 'Hot Drinks', calories: 5, protein: 0, carbs: 0, fat: 0 },
  { id: 'coffee-milk', name: 'Coffee with milk', icon: '☕', category: 'Hot Drinks', calories: 50, protein: 2, carbs: 5, fat: 2 },
  { id: 'coffee-latte', name: 'Latte', icon: '☕', category: 'Hot Drinks', calories: 150, protein: 8, carbs: 15, fat: 6 },
  { id: 'coffee-cappuccino', name: 'Cappuccino', icon: '☕', category: 'Hot Drinks', calories: 120, protein: 6, carbs: 12, fat: 5 },
  { id: 'coffee-mocha', name: 'Mocha', icon: '☕', category: 'Hot Drinks', calories: 290, protein: 10, carbs: 35, fat: 12 },
  { id: 'espresso', name: 'Espresso', icon: '☕', category: 'Hot Drinks', calories: 3, protein: 0, carbs: 0, fat: 0 },
  { id: 'tea-black', name: 'Black tea', icon: '🍵', category: 'Hot Drinks', calories: 2, protein: 0, carbs: 0, fat: 0 },
  { id: 'tea-green', name: 'Green tea', icon: '🍵', category: 'Hot Drinks', calories: 2, protein: 0, carbs: 0, fat: 0 },
  { id: 'tea-chai', name: 'Chai latte', icon: '🍵', category: 'Hot Drinks', calories: 180, protein: 4, carbs: 30, fat: 5 },
  { id: 'hot-chocolate', name: 'Hot chocolate', icon: '🍫', category: 'Hot Drinks', calories: 190, protein: 8, carbs: 27, fat: 6 },

  // Cold drinks
  { id: 'water', name: 'Water', icon: '💧', category: 'Cold Drinks', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { id: 'sparkling-water', name: 'Sparkling water', icon: '💧', category: 'Cold Drinks', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { id: 'iced-coffee', name: 'Iced coffee', icon: '🧊', category: 'Cold Drinks', calories: 80, protein: 1, carbs: 10, fat: 3 },
  { id: 'iced-tea', name: 'Iced tea', icon: '🧊', category: 'Cold Drinks', calories: 90, protein: 0, carbs: 22, fat: 0 },
  { id: 'lemonade', name: 'Lemonade', icon: '🍋', category: 'Cold Drinks', calories: 100, protein: 0, carbs: 26, fat: 0 },

  // Juices
  { id: 'orange-juice', name: 'Orange juice', icon: '🍊', category: 'Juices', calories: 110, protein: 2, carbs: 26, fat: 0 },
  { id: 'apple-juice', name: 'Apple juice', icon: '🍎', category: 'Juices', calories: 120, protein: 0, carbs: 28, fat: 0 },
  { id: 'grape-juice', name: 'Grape juice', icon: '🍇', category: 'Juices', calories: 150, protein: 1, carbs: 37, fat: 0 },
  { id: 'cranberry-juice', name: 'Cranberry juice', icon: '🍒', category: 'Juices', calories: 140, protein: 0, carbs: 34, fat: 0 },
  { id: 'tomato-juice', name: 'Tomato juice', icon: '🍅', category: 'Juices', calories: 40, protein: 2, carbs: 9, fat: 0 },
  { id: 'carrot-juice', name: 'Carrot juice', icon: '🥕', category: 'Juices', calories: 80, protein: 2, carbs: 18, fat: 0 },
  { id: 'green-juice', name: 'Green juice', icon: '🥬', category: 'Juices', calories: 60, protein: 2, carbs: 12, fat: 0 },

  // Smoothies
  { id: 'fruit-smoothie', name: 'Fruit smoothie', icon: '🥤', category: 'Smoothies', calories: 200, protein: 4, carbs: 40, fat: 2 },
  { id: 'green-smoothie', name: 'Green smoothie', icon: '🥬', category: 'Smoothies', calories: 150, protein: 5, carbs: 28, fat: 3 },
  { id: 'protein-smoothie', name: 'Protein smoothie', icon: '💪', category: 'Smoothies', calories: 280, protein: 25, carbs: 30, fat: 6 },
  { id: 'berry-smoothie', name: 'Berry smoothie', icon: '🫐', category: 'Smoothies', calories: 180, protein: 3, carbs: 35, fat: 2 },
  { id: 'banana-smoothie', name: 'Banana smoothie', icon: '🍌', category: 'Smoothies', calories: 220, protein: 6, carbs: 42, fat: 4 },

  // Dairy
  { id: 'milk-whole', name: 'Whole milk', icon: '🥛', category: 'Dairy', calories: 150, protein: 8, carbs: 12, fat: 8 },
  { id: 'milk-skim', name: 'Skim milk', icon: '🥛', category: 'Dairy', calories: 90, protein: 8, carbs: 12, fat: 0 },
  { id: 'milk-almond', name: 'Almond milk', icon: '🥛', category: 'Dairy', calories: 40, protein: 1, carbs: 2, fat: 3 },
  { id: 'milk-oat', name: 'Oat milk', icon: '🥛', category: 'Dairy', calories: 120, protein: 3, carbs: 16, fat: 5 },
  { id: 'milk-soy', name: 'Soy milk', icon: '🥛', category: 'Dairy', calories: 100, protein: 7, carbs: 8, fat: 4 },
  { id: 'chocolate-milk', name: 'Chocolate milk', icon: '🍫', category: 'Dairy', calories: 210, protein: 8, carbs: 30, fat: 8 },
  { id: 'kefir', name: 'Kefir', icon: '🥛', category: 'Dairy', calories: 110, protein: 11, carbs: 12, fat: 2 },

  // Sodas
  { id: 'cola', name: 'Cola', icon: '🥤', category: 'Sodas', calories: 140, protein: 0, carbs: 39, fat: 0 },
  { id: 'diet-cola', name: 'Diet cola', icon: '🥤', category: 'Sodas', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { id: 'sprite', name: 'Lemon-lime soda', icon: '🥤', category: 'Sodas', calories: 140, protein: 0, carbs: 38, fat: 0 },
  { id: 'ginger-ale', name: 'Ginger ale', icon: '🥤', category: 'Sodas', calories: 130, protein: 0, carbs: 34, fat: 0 },
  { id: 'root-beer', name: 'Root beer', icon: '🥤', category: 'Sodas', calories: 150, protein: 0, carbs: 40, fat: 0 },

  // Energy & Sports
  { id: 'energy-drink', name: 'Energy drink', icon: '⚡', category: 'Energy & Sports', calories: 110, protein: 0, carbs: 28, fat: 0 },
  { id: 'sports-drink', name: 'Sports drink', icon: '🏃', category: 'Energy & Sports', calories: 80, protein: 0, carbs: 21, fat: 0 },
  { id: 'coconut-water', name: 'Coconut water', icon: '🥥', category: 'Energy & Sports', calories: 45, protein: 0, carbs: 9, fat: 0 },

  // Alcohol
  { id: 'beer', name: 'Beer (bottle)', icon: '🍺', category: 'Alcohol', calories: 150, protein: 1, carbs: 13, fat: 0 },
  { id: 'light-beer', name: 'Light beer', icon: '🍺', category: 'Alcohol', calories: 100, protein: 1, carbs: 5, fat: 0 },
  { id: 'wine-red', name: 'Red wine (glass)', icon: '🍷', category: 'Alcohol', calories: 125, protein: 0, carbs: 4, fat: 0 },
  { id: 'wine-white', name: 'White wine (glass)', icon: '🥂', category: 'Alcohol', calories: 120, protein: 0, carbs: 4, fat: 0 },
  { id: 'champagne', name: 'Champagne (glass)', icon: '🥂', category: 'Alcohol', calories: 85, protein: 0, carbs: 1, fat: 0 },
  { id: 'cocktail', name: 'Cocktail', icon: '🍹', category: 'Alcohol', calories: 200, protein: 0, carbs: 20, fat: 0 },
];

// Comprehensive snacks database
export const SNACKS_DATABASE = [
  // Fruits
  { id: 'apple', name: 'Apple', icon: '🍎', category: 'Fruits', calories: 95, protein: 0, carbs: 25, fat: 0 },
  { id: 'banana', name: 'Banana', icon: '🍌', category: 'Fruits', calories: 105, protein: 1, carbs: 27, fat: 0 },
  { id: 'orange', name: 'Orange', icon: '🍊', category: 'Fruits', calories: 65, protein: 1, carbs: 16, fat: 0 },
  { id: 'grapes', name: 'Grapes (cup)', icon: '🍇', category: 'Fruits', calories: 100, protein: 1, carbs: 27, fat: 0 },
  { id: 'strawberries', name: 'Strawberries (cup)', icon: '🍓', category: 'Fruits', calories: 50, protein: 1, carbs: 12, fat: 0 },
  { id: 'blueberries', name: 'Blueberries (cup)', icon: '🫐', category: 'Fruits', calories: 85, protein: 1, carbs: 21, fat: 0 },
  { id: 'mango', name: 'Mango', icon: '🥭', category: 'Fruits', calories: 135, protein: 1, carbs: 35, fat: 0 },
  { id: 'pineapple', name: 'Pineapple (cup)', icon: '🍍', category: 'Fruits', calories: 80, protein: 1, carbs: 22, fat: 0 },
  { id: 'watermelon', name: 'Watermelon (cup)', icon: '🍉', category: 'Fruits', calories: 45, protein: 1, carbs: 12, fat: 0 },
  { id: 'peach', name: 'Peach', icon: '🍑', category: 'Fruits', calories: 60, protein: 1, carbs: 15, fat: 0 },
  { id: 'pear', name: 'Pear', icon: '🍐', category: 'Fruits', calories: 100, protein: 1, carbs: 27, fat: 0 },
  { id: 'dried-fruit', name: 'Dried fruit mix', icon: '🍇', category: 'Fruits', calories: 130, protein: 1, carbs: 31, fat: 0 },

  // Nuts & Seeds
  { id: 'almonds', name: 'Almonds (handful)', icon: '🥜', category: 'Nuts & Seeds', calories: 165, protein: 6, carbs: 6, fat: 14 },
  { id: 'walnuts', name: 'Walnuts (handful)', icon: '🥜', category: 'Nuts & Seeds', calories: 185, protein: 4, carbs: 4, fat: 18 },
  { id: 'cashews', name: 'Cashews (handful)', icon: '🥜', category: 'Nuts & Seeds', calories: 155, protein: 5, carbs: 9, fat: 12 },
  { id: 'peanuts', name: 'Peanuts (handful)', icon: '🥜', category: 'Nuts & Seeds', calories: 165, protein: 7, carbs: 5, fat: 14 },
  { id: 'pistachios', name: 'Pistachios (handful)', icon: '🥜', category: 'Nuts & Seeds', calories: 160, protein: 6, carbs: 8, fat: 13 },
  { id: 'mixed-nuts', name: 'Mixed nuts', icon: '🥜', category: 'Nuts & Seeds', calories: 170, protein: 5, carbs: 6, fat: 15 },
  { id: 'trail-mix', name: 'Trail mix', icon: '🥜', category: 'Nuts & Seeds', calories: 140, protein: 4, carbs: 13, fat: 9 },
  { id: 'sunflower-seeds', name: 'Sunflower seeds', icon: '🌻', category: 'Nuts & Seeds', calories: 165, protein: 5, carbs: 7, fat: 14 },
  { id: 'pumpkin-seeds', name: 'Pumpkin seeds', icon: '🎃', category: 'Nuts & Seeds', calories: 125, protein: 5, carbs: 5, fat: 10 },
  { id: 'peanut-butter', name: 'Peanut butter (2 tbsp)', icon: '🥜', category: 'Nuts & Seeds', calories: 190, protein: 8, carbs: 6, fat: 16 },

  // Dairy Snacks
  { id: 'yogurt', name: 'Yogurt cup', icon: '🥛', category: 'Dairy Snacks', calories: 150, protein: 8, carbs: 20, fat: 4 },
  { id: 'greek-yogurt', name: 'Greek yogurt', icon: '🥛', category: 'Dairy Snacks', calories: 130, protein: 17, carbs: 8, fat: 4 },
  { id: 'cheese-stick', name: 'Cheese stick', icon: '🧀', category: 'Dairy Snacks', calories: 80, protein: 6, carbs: 1, fat: 6 },
  { id: 'cheese-cubes', name: 'Cheese cubes (5)', icon: '🧀', category: 'Dairy Snacks', calories: 120, protein: 8, carbs: 1, fat: 10 },
  { id: 'cottage-cheese', name: 'Cottage cheese (cup)', icon: '🧀', category: 'Dairy Snacks', calories: 110, protein: 14, carbs: 5, fat: 4 },
  { id: 'cream-cheese', name: 'Cream cheese (2 tbsp)', icon: '🧀', category: 'Dairy Snacks', calories: 100, protein: 2, carbs: 1, fat: 10 },

  // Savory Snacks
  { id: 'chips', name: 'Potato chips (bag)', icon: '🥔', category: 'Savory Snacks', calories: 150, protein: 2, carbs: 15, fat: 10 },
  { id: 'pretzels', name: 'Pretzels', icon: '🥨', category: 'Savory Snacks', calories: 110, protein: 3, carbs: 23, fat: 1 },
  { id: 'popcorn', name: 'Popcorn (3 cups)', icon: '🍿', category: 'Savory Snacks', calories: 95, protein: 3, carbs: 19, fat: 1 },
  { id: 'crackers', name: 'Crackers (6)', icon: '🍘', category: 'Savory Snacks', calories: 80, protein: 1, carbs: 13, fat: 3 },
  { id: 'rice-cakes', name: 'Rice cakes (2)', icon: '🍘', category: 'Savory Snacks', calories: 70, protein: 2, carbs: 15, fat: 0 },
  { id: 'tortilla-chips', name: 'Tortilla chips', icon: '🌮', category: 'Savory Snacks', calories: 140, protein: 2, carbs: 18, fat: 7 },
  { id: 'hummus', name: 'Hummus (2 tbsp)', icon: '🥙', category: 'Savory Snacks', calories: 50, protein: 2, carbs: 4, fat: 3 },
  { id: 'guacamole', name: 'Guacamole (2 tbsp)', icon: '🥑', category: 'Savory Snacks', calories: 50, protein: 1, carbs: 3, fat: 4 },
  { id: 'olives', name: 'Olives (10)', icon: '🫒', category: 'Savory Snacks', calories: 40, protein: 0, carbs: 2, fat: 4 },
  { id: 'edamame', name: 'Edamame (cup)', icon: '🫛', category: 'Savory Snacks', calories: 190, protein: 17, carbs: 15, fat: 8 },

  // Sweet Snacks
  { id: 'cookie', name: 'Cookie', icon: '🍪', category: 'Sweet Snacks', calories: 160, protein: 2, carbs: 22, fat: 8 },
  { id: 'brownie', name: 'Brownie', icon: '🍫', category: 'Sweet Snacks', calories: 230, protein: 3, carbs: 30, fat: 12 },
  { id: 'muffin', name: 'Muffin', icon: '🧁', category: 'Sweet Snacks', calories: 340, protein: 5, carbs: 50, fat: 14 },
  { id: 'donut', name: 'Donut', icon: '🍩', category: 'Sweet Snacks', calories: 270, protein: 4, carbs: 31, fat: 15 },
  { id: 'chocolate-bar', name: 'Chocolate bar', icon: '🍫', category: 'Sweet Snacks', calories: 210, protein: 3, carbs: 24, fat: 13 },
  { id: 'dark-chocolate', name: 'Dark chocolate (2 sq)', icon: '🍫', category: 'Sweet Snacks', calories: 90, protein: 1, carbs: 8, fat: 6 },
  { id: 'ice-cream', name: 'Ice cream (scoop)', icon: '🍦', category: 'Sweet Snacks', calories: 140, protein: 2, carbs: 16, fat: 7 },
  { id: 'frozen-yogurt', name: 'Frozen yogurt', icon: '🍦', category: 'Sweet Snacks', calories: 100, protein: 3, carbs: 18, fat: 2 },
  { id: 'candy', name: 'Candy (handful)', icon: '🍬', category: 'Sweet Snacks', calories: 150, protein: 0, carbs: 38, fat: 0 },
  { id: 'gummy-bears', name: 'Gummy bears', icon: '🐻', category: 'Sweet Snacks', calories: 130, protein: 3, carbs: 30, fat: 0 },

  // Candy Bars & Junk Food
  { id: 'snickers', name: 'Snickers bar', icon: '🍫', category: 'Candy Bars', calories: 280, protein: 4, carbs: 35, fat: 14 },
  { id: 'mars-bar', name: 'Mars bar', icon: '🍫', category: 'Candy Bars', calories: 260, protein: 2, carbs: 40, fat: 10 },
  { id: 'milky-way', name: 'Milky Way bar', icon: '🍫', category: 'Candy Bars', calories: 240, protein: 2, carbs: 38, fat: 9 },
  { id: 'twix', name: 'Twix bar', icon: '🍫', category: 'Candy Bars', calories: 250, protein: 2, carbs: 34, fat: 12 },
  { id: 'kit-kat', name: 'Kit Kat bar', icon: '🍫', category: 'Candy Bars', calories: 210, protein: 3, carbs: 27, fat: 11 },
  { id: 'bounty', name: 'Bounty bar', icon: '🥥', category: 'Candy Bars', calories: 280, protein: 2, carbs: 32, fat: 15 },
  { id: 'kinder-bueno', name: 'Kinder Bueno', icon: '🍫', category: 'Candy Bars', calories: 240, protein: 4, carbs: 24, fat: 14 },
  { id: 'kinder-egg', name: 'Kinder Surprise Egg', icon: '🥚', category: 'Candy Bars', calories: 110, protein: 2, carbs: 11, fat: 7 },
  { id: 'reeses-cups', name: "Reese's Peanut Butter Cups", icon: '🥜', category: 'Candy Bars', calories: 210, protein: 5, carbs: 24, fat: 12 },
  { id: 'toblerone', name: 'Toblerone', icon: '🏔️', category: 'Candy Bars', calories: 170, protein: 2, carbs: 19, fat: 10 },
  { id: 'ferrero-rocher', name: 'Ferrero Rocher (3)', icon: '🍫', category: 'Candy Bars', calories: 220, protein: 3, carbs: 17, fat: 15 },
  { id: 'butterfinger', name: 'Butterfinger', icon: '🍫', category: 'Candy Bars', calories: 250, protein: 3, carbs: 41, fat: 10 },
  { id: '3-musketeers', name: '3 Musketeers bar', icon: '🍫', category: 'Candy Bars', calories: 240, protein: 1, carbs: 42, fat: 7 },
  { id: 'baby-ruth', name: 'Baby Ruth', icon: '🍫', category: 'Candy Bars', calories: 275, protein: 4, carbs: 39, fat: 12 },
  { id: 'crunch-bar', name: 'Crunch bar', icon: '🍫', category: 'Candy Bars', calories: 220, protein: 2, carbs: 29, fat: 11 },

  // Gummies & Sweets
  { id: 'haribo-goldbears', name: 'Haribo Gold-Bears', icon: '🐻', category: 'Gummies', calories: 140, protein: 3, carbs: 31, fat: 0 },
  { id: 'sour-patch-kids', name: 'Sour Patch Kids', icon: '😝', category: 'Gummies', calories: 150, protein: 0, carbs: 37, fat: 0 },
  { id: 'skittles', name: 'Skittles', icon: '🌈', category: 'Gummies', calories: 250, protein: 0, carbs: 56, fat: 3 },
  { id: 'mms-plain', name: "M&M's (plain)", icon: '🔴', category: 'Gummies', calories: 240, protein: 2, carbs: 34, fat: 10 },
  { id: 'mms-peanut', name: "M&M's (peanut)", icon: '🟤', category: 'Gummies', calories: 250, protein: 5, carbs: 30, fat: 13 },
  { id: 'jelly-beans', name: 'Jelly beans', icon: '🫘', category: 'Gummies', calories: 150, protein: 0, carbs: 37, fat: 0 },
  { id: 'twizzlers', name: 'Twizzlers', icon: '🍬', category: 'Gummies', calories: 140, protein: 1, carbs: 32, fat: 1 },
  { id: 'swedish-fish', name: 'Swedish Fish', icon: '🐟', category: 'Gummies', calories: 140, protein: 0, carbs: 36, fat: 0 },
  { id: 'starburst', name: 'Starburst', icon: '⭐', category: 'Gummies', calories: 160, protein: 0, carbs: 34, fat: 3 },
  { id: 'jolly-ranchers', name: 'Jolly Ranchers', icon: '💎', category: 'Gummies', calories: 70, protein: 0, carbs: 17, fat: 0 },
  { id: 'cotton-candy', name: 'Cotton candy', icon: '☁️', category: 'Gummies', calories: 110, protein: 0, carbs: 28, fat: 0 },
  { id: 'lollipop', name: 'Lollipop', icon: '🍭', category: 'Gummies', calories: 60, protein: 0, carbs: 16, fat: 0 },
  { id: 'licorice', name: 'Licorice', icon: '⬛', category: 'Gummies', calories: 140, protein: 1, carbs: 35, fat: 0 },
  { id: 'nerds', name: 'Nerds candy', icon: '🤓', category: 'Gummies', calories: 50, protein: 0, carbs: 13, fat: 0 },
  { id: 'laffy-taffy', name: 'Laffy Taffy', icon: '🍬', category: 'Gummies', calories: 140, protein: 0, carbs: 32, fat: 1 },
  { id: 'airheads', name: 'Airheads', icon: '🎈', category: 'Gummies', calories: 60, protein: 0, carbs: 15, fat: 1 },

  // Healthy Bars
  { id: 'granola-bar', name: 'Granola bar', icon: '🥜', category: 'Healthy Bars', calories: 120, protein: 2, carbs: 20, fat: 4 },
  { id: 'protein-bar', name: 'Protein bar', icon: '💪', category: 'Healthy Bars', calories: 200, protein: 20, carbs: 22, fat: 7 },
  { id: 'energy-bar', name: 'Energy bar', icon: '⚡', category: 'Healthy Bars', calories: 230, protein: 4, carbs: 45, fat: 5 },
  { id: 'fruit-bar', name: 'Fruit bar', icon: '🍓', category: 'Healthy Bars', calories: 100, protein: 1, carbs: 24, fat: 0 },
  { id: 'nut-bar', name: 'Nut bar', icon: '🥜', category: 'Healthy Bars', calories: 180, protein: 4, carbs: 18, fat: 11 },

  // Vegetables
  { id: 'carrot-sticks', name: 'Carrot sticks', icon: '🥕', category: 'Vegetables', calories: 35, protein: 1, carbs: 8, fat: 0 },
  { id: 'celery-sticks', name: 'Celery sticks', icon: '🥬', category: 'Vegetables', calories: 15, protein: 1, carbs: 3, fat: 0 },
  { id: 'cucumber-slices', name: 'Cucumber slices', icon: '🥒', category: 'Vegetables', calories: 15, protein: 1, carbs: 3, fat: 0 },
  { id: 'cherry-tomatoes', name: 'Cherry tomatoes (10)', icon: '🍅', category: 'Vegetables', calories: 30, protein: 1, carbs: 6, fat: 0 },
  { id: 'bell-pepper', name: 'Bell pepper slices', icon: '🫑', category: 'Vegetables', calories: 25, protein: 1, carbs: 5, fat: 0 },
  { id: 'snap-peas', name: 'Snap peas (cup)', icon: '🫛', category: 'Vegetables', calories: 40, protein: 3, carbs: 7, fat: 0 },

  // Prepared Snacks
  { id: 'hard-boiled-egg', name: 'Hard boiled egg', icon: '🥚', category: 'Prepared', calories: 70, protein: 6, carbs: 0, fat: 5 },
  { id: 'deviled-eggs', name: 'Deviled eggs (2)', icon: '🥚', category: 'Prepared', calories: 130, protein: 6, carbs: 1, fat: 11 },
  { id: 'mini-sandwich', name: 'Mini sandwich', icon: '🥪', category: 'Prepared', calories: 180, protein: 8, carbs: 20, fat: 8 },
  { id: 'wrap-roll', name: 'Wrap roll', icon: '🌯', category: 'Prepared', calories: 200, protein: 10, carbs: 25, fat: 7 },
  { id: 'spring-rolls', name: 'Spring rolls (2)', icon: '🥟', category: 'Prepared', calories: 150, protein: 4, carbs: 20, fat: 6 },
];

// Search drinks and snacks
export function searchDrinksAndSnacks(query) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return { drinks: DRINKS_DATABASE, snacks: SNACKS_DATABASE };

  const drinks = DRINKS_DATABASE.filter(d =>
    d.name.toLowerCase().includes(lowerQuery) ||
    d.category.toLowerCase().includes(lowerQuery)
  );
  const snacks = SNACKS_DATABASE.filter(s =>
    s.name.toLowerCase().includes(lowerQuery) ||
    s.category.toLowerCase().includes(lowerQuery)
  );

  return { drinks, snacks };
}

// Get drink/snack categories
export function getDrinkCategories() {
  return [...new Set(DRINKS_DATABASE.map(d => d.category))];
}

export function getSnackCategories() {
  return [...new Set(SNACKS_DATABASE.map(s => s.category))];
}

export function filterRecipes(recipes, filters) {
  if (!recipes?.length) return [];
  if (!filters.dietary?.length && !filters.cookTime && !filters.cuisine) {
    return recipes;
  }

  return recipes.filter(recipe => {
    // Dietary filter
    if (filters.dietary?.length > 0) {
      const recipeDietary = recipe.dietary || [];
      if (!filters.dietary.every(d => recipeDietary.includes(d))) {
        return false;
      }
    }

    // Cuisine filter
    if (filters.cuisine && recipe.strArea !== filters.cuisine) {
      return false;
    }

    // Cook time filter
    if (filters.cookTime) {
      const timeFilter = COOK_TIME_OPTIONS.find(o => o.id === filters.cookTime);
      if (timeFilter && recipe.cookTime) {
        if (timeFilter.max && recipe.cookTime > timeFilter.max) return false;
        if (timeFilter.min && recipe.cookTime < timeFilter.min) return false;
      }
    }

    return true;
  });
}
