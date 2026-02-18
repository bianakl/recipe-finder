---
name: add-recipe
description: Add new recipes to the local MOCK_RECIPES collection in src/services/api.js
argument-hint: "[recipe name or cuisine]"
---

Add new recipe(s) to the `MOCK_RECIPES` array in `src/services/api.js`.

## Instructions

1. Read `src/services/api.js` to see the existing recipes and their format
2. Based on `$ARGUMENTS`, create new recipe entries following this exact structure:
   - `idMeal`: Use format `'mock{N}'` where N is the next available number
   - `strMeal`: Recipe name
   - `strMealThumb`: Use a real TheMealDB image URL or a relevant placeholder
   - `strCategory`: e.g. Pasta, Chicken, Beef, Seafood, Vegetarian, Dessert, etc.
   - `strArea`: Country of origin (e.g. Italian, Japanese, Mexican)
   - `strTags`: Comma-separated tags
   - `strInstructions`: Detailed cooking instructions (3-6 sentences)
   - `strIngredient1` through `strIngredientN` with matching `strMeasure1` through `strMeasureN`
   - `cookTime`: Minutes (number)
   - `difficulty`: 'Easy', 'Medium', or 'Hard'
   - `servings`: Number
   - `calories`, `protein`, `carbs`, `fat`: Realistic nutritional values (numbers)
   - `dietary`: Array of tags like `'vegetarian'`, `'vegan'`, `'gluten-free'`, `'dairy-free'`

3. Ensure no duplicate `idMeal` values
4. Use realistic nutritional data and accurate ingredient measurements
5. If the user specifies a cuisine, add 5-10 recipes from that cuisine
6. If the user specifies a specific recipe, add just that one

After adding, report what was added.
