// Transform between localStorage shapes and Supabase row shapes

// ---- Saved Recipes ----
export function localRecipeToRow(recipe, userId) {
  return {
    user_id: userId,
    recipe_id: recipe.idMeal,
    recipe_name: recipe.strMeal,
    recipe_thumb: recipe.strMealThumb,
    recipe_category: recipe.strCategory,
    recipe_area: recipe.strArea,
    recipe_tags: recipe.strTags || '',
  };
}

export function rowToLocalRecipe(row) {
  return {
    idMeal: row.recipe_id,
    strMeal: row.recipe_name,
    strMealThumb: row.recipe_thumb,
    strCategory: row.recipe_category,
    strArea: row.recipe_area,
    strTags: row.recipe_tags || '',
  };
}

// ---- Meal Plan ----
export function localMealPlanToRows(mealPlan, userId) {
  const rows = [];
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const meals = ['breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner'];

  days.forEach(day => {
    meals.forEach(meal => {
      const recipeId = mealPlan[day]?.[meal];
      if (recipeId) {
        rows.push({ user_id: userId, day, meal, recipe_id: recipeId });
      }
    });
  });
  return rows;
}

export function rowsToLocalMealPlan(rows) {
  const plan = {};
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const meals = ['breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner'];

  days.forEach(day => {
    plan[day] = {};
    meals.forEach(meal => {
      plan[day][meal] = null;
    });
  });

  rows.forEach(row => {
    if (plan[row.day]) {
      plan[row.day][row.meal] = row.recipe_id;
    }
  });
  return plan;
}

// ---- Cooking History ----
export function localHistoryToRow(entry, userId) {
  return {
    user_id: userId,
    recipe_id: entry.recipeId,
    cooked_at: entry.cookedAt,
  };
}

export function rowToLocalHistory(row) {
  return {
    id: row.id,
    recipeId: row.recipe_id,
    cookedAt: row.cooked_at,
  };
}

// ---- Recipe Notes ----
export function localNotesToRows(notes, userId) {
  return Object.entries(notes)
    .filter(([, note]) => note)
    .map(([recipeId, note]) => ({
      user_id: userId,
      recipe_id: recipeId,
      note,
    }));
}

export function rowsToLocalNotes(rows) {
  const notes = {};
  rows.forEach(row => {
    notes[row.recipe_id] = row.note;
  });
  return notes;
}

// ---- Recipe Ratings ----
export function localRatingsToRows(ratings, userId) {
  return Object.entries(ratings)
    .filter(([, rating]) => rating > 0)
    .map(([recipeId, rating]) => ({
      user_id: userId,
      recipe_id: recipeId,
      rating,
    }));
}

export function rowsToLocalRatings(rows) {
  const ratings = {};
  rows.forEach(row => {
    ratings[row.recipe_id] = row.rating;
  });
  return ratings;
}

// ---- Shopping List ----
export function localShoppingItemToRow(item, userId) {
  return {
    user_id: userId,
    name: item.name,
    quantity: item.quantity,
    measures: item.measures || [],
    category: item.category,
    checked: item.checked || false,
    recipes: item.recipes || [],
  };
}

export function rowToLocalShoppingItem(row) {
  return {
    id: row.id,
    name: row.name,
    quantity: row.quantity,
    measures: row.measures || [],
    category: row.category,
    checked: row.checked || false,
    recipes: row.recipes || [],
  };
}

// ---- Pantry ----
export function localPantryToRows(pantry, userId) {
  return pantry.map(ingredient => ({
    user_id: userId,
    ingredient,
  }));
}

export function rowsToLocalPantry(rows) {
  return rows.map(row => row.ingredient);
}

// ---- Settings ----
export function localSettingsToRow(settings, userId) {
  return {
    user_id: userId,
    measurement_system: settings.measurementSystem,
    temperature_unit: settings.temperatureUnit,
    default_servings: settings.defaultServings,
  };
}

export function rowToLocalSettings(row) {
  return {
    measurementSystem: row.measurement_system,
    temperatureUnit: row.temperature_unit,
    defaultServings: row.default_servings,
  };
}
