import { createClient } from '@supabase/supabase-js';

const MEALDB_RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';

export default async function handler(req, res) {
  // CORS headers so the frontend can call this from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // 1. Check if we already have today's recipe stored
  const { data: existing } = await supabase
    .from('daily_recipe')
    .select('recipe')
    .eq('date', today)
    .single();

  if (existing?.recipe) {
    return res.status(200).json(existing.recipe);
  }

  // 2. Fetch a fresh random recipe from TheMealDB
  try {
    const response = await fetch(MEALDB_RANDOM);
    const data = await response.json();
    const recipe = data.meals?.[0];

    if (!recipe) {
      return res.status(502).json({ error: 'TheMealDB returned no recipe' });
    }

    // 3. Save to Supabase — upsert guards against race conditions
    await supabase
      .from('daily_recipe')
      .upsert({ date: today, recipe }, { onConflict: 'date' });

    return res.status(200).json(recipe);
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to fetch daily recipe' });
  }
}
