const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Mock recipe database with extended data for features
export const MOCK_RECIPES = [
  {
    idMeal: 'mock1',
    strMeal: 'Spaghetti Carbonara',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strTags: 'Pasta,Quick',
    strInstructions: 'Cook spaghetti according to package directions. Meanwhile, cook pancetta in a large skillet until crispy. Beat eggs with parmesan cheese. Drain pasta, reserving some water. Toss hot pasta with pancetta, then quickly stir in egg mixture. The heat from the pasta will cook the eggs. Add pasta water if needed. Season with black pepper and serve immediately.',
    strIngredient1: 'Spaghetti', strMeasure1: '400g',
    strIngredient2: 'Pancetta', strMeasure2: '200g',
    strIngredient3: 'Eggs', strMeasure3: '4',
    strIngredient4: 'Parmesan Cheese', strMeasure4: '100g',
    strIngredient5: 'Black Pepper', strMeasure5: 'To taste',
    strIngredient6: 'Garlic', strMeasure6: '2 cloves',
    cookTime: 25, difficulty: 'Medium', servings: 4,
    calories: 650, protein: 28, carbs: 72, fat: 28,
    dietary: [],
  },
  {
    idMeal: 'mock2',
    strMeal: 'Chicken Teriyaki Bowl',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strCategory: 'Chicken',
    strArea: 'Japanese',
    strTags: 'Chicken,Healthy',
    strInstructions: 'Cut chicken into bite-sized pieces. Mix soy sauce, mirin, sake, and sugar to make teriyaki sauce. Cook chicken in a pan until browned. Add teriyaki sauce and simmer until chicken is glazed. Serve over steamed rice with steamed vegetables. Garnish with sesame seeds and green onions.',
    strIngredient1: 'Chicken Breast', strMeasure1: '500g',
    strIngredient2: 'Soy Sauce', strMeasure2: '4 tbsp',
    strIngredient3: 'Mirin', strMeasure3: '2 tbsp',
    strIngredient4: 'Sugar', strMeasure4: '1 tbsp',
    strIngredient5: 'Rice', strMeasure5: '2 cups',
    strIngredient6: 'Sesame Seeds', strMeasure6: '1 tbsp',
    cookTime: 30, difficulty: 'Easy', servings: 4,
    calories: 520, protein: 42, carbs: 58, fat: 12,
    dietary: ['high-protein'],
  },
  {
    idMeal: 'mock3',
    strMeal: 'Greek Salad',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/k29viq1585565980.jpg',
    strCategory: 'Salad',
    strArea: 'Greek',
    strTags: 'Salad,Vegetarian,Quick',
    strInstructions: 'Chop tomatoes, cucumber, and red onion into chunks. Add olives and crumbled feta cheese. Dress with olive oil, red wine vinegar, dried oregano, salt and pepper. Toss gently and serve immediately. Perfect as a side dish or light lunch.',
    strIngredient1: 'Tomatoes', strMeasure1: '4 large',
    strIngredient2: 'Cucumber', strMeasure2: '1',
    strIngredient3: 'Red Onion', strMeasure3: '1',
    strIngredient4: 'Feta Cheese', strMeasure4: '200g',
    strIngredient5: 'Olives', strMeasure5: '1 cup',
    strIngredient6: 'Olive Oil', strMeasure6: '4 tbsp',
    cookTime: 10, difficulty: 'Easy', servings: 4,
    calories: 280, protein: 8, carbs: 12, fat: 24,
    dietary: ['vegetarian', 'gluten-free', 'low-carb'],
  },
  {
    idMeal: 'mock4',
    strMeal: 'Beef Tacos',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ypxvwv1505333929.jpg',
    strCategory: 'Beef',
    strArea: 'Mexican',
    strTags: 'Beef,Quick',
    strInstructions: 'Brown ground beef with onion and garlic. Add taco seasoning and water, simmer until thickened. Warm taco shells. Fill shells with beef mixture and top with shredded lettuce, diced tomatoes, cheese, sour cream, and salsa. Serve immediately with lime wedges.',
    strIngredient1: 'Ground Beef', strMeasure1: '500g',
    strIngredient2: 'Taco Seasoning', strMeasure2: '1 packet',
    strIngredient3: 'Taco Shells', strMeasure3: '8',
    strIngredient4: 'Lettuce', strMeasure4: '1 cup shredded',
    strIngredient5: 'Tomatoes', strMeasure5: '2 diced',
    strIngredient6: 'Cheese', strMeasure6: '1 cup shredded',
    cookTime: 20, difficulty: 'Easy', servings: 4,
    calories: 480, protein: 32, carbs: 28, fat: 28,
    dietary: [],
  },
  {
    idMeal: 'mock5',
    strMeal: 'Vegetable Stir Fry',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ouyswv1511553755.jpg',
    strCategory: 'Vegetarian',
    strArea: 'Chinese',
    strTags: 'Vegetarian,Vegan,Quick,Healthy',
    strInstructions: 'Prepare all vegetables by slicing into similar-sized pieces. Heat oil in a wok over high heat. Add vegetables starting with the firmest ones first. Stir fry quickly, keeping vegetables crisp. Add sauce made from soy sauce, garlic, and ginger. Toss to coat and serve over rice or noodles.',
    strIngredient1: 'Broccoli', strMeasure1: '2 cups',
    strIngredient2: 'Bell Peppers', strMeasure2: '2',
    strIngredient3: 'Carrots', strMeasure3: '2',
    strIngredient4: 'Snow Peas', strMeasure4: '1 cup',
    strIngredient5: 'Soy Sauce', strMeasure5: '3 tbsp',
    strIngredient6: 'Ginger', strMeasure6: '1 inch',
    cookTime: 15, difficulty: 'Easy', servings: 4,
    calories: 180, protein: 6, carbs: 24, fat: 8,
    dietary: ['vegetarian', 'vegan', 'low-calorie'],
  },
  {
    idMeal: 'mock6',
    strMeal: 'Margherita Pizza',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg',
    strCategory: 'Pizza',
    strArea: 'Italian',
    strTags: 'Pizza,Vegetarian',
    strInstructions: 'Stretch pizza dough into a round. Spread tomato sauce evenly, leaving a border for the crust. Add sliced fresh mozzarella and a drizzle of olive oil. Bake at 450°F for 12-15 minutes until crust is golden. Top with fresh basil leaves after baking. Slice and serve hot.',
    strIngredient1: 'Pizza Dough', strMeasure1: '1 ball',
    strIngredient2: 'Tomato Sauce', strMeasure2: '1/2 cup',
    strIngredient3: 'Mozzarella', strMeasure3: '200g',
    strIngredient4: 'Fresh Basil', strMeasure4: 'Handful',
    strIngredient5: 'Olive Oil', strMeasure5: '2 tbsp',
    strIngredient6: 'Salt', strMeasure6: 'Pinch',
    cookTime: 25, difficulty: 'Medium', servings: 2,
    calories: 720, protein: 28, carbs: 82, fat: 32,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock7',
    strMeal: 'Salmon with Lemon Dill',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
    strCategory: 'Seafood',
    strArea: 'Scandinavian',
    strTags: 'Seafood,Healthy,Quick',
    strInstructions: 'Season salmon fillets with salt and pepper. Place on a baking sheet lined with parchment. Top with lemon slices and fresh dill. Drizzle with olive oil. Bake at 400°F for 12-15 minutes until salmon flakes easily. Serve with roasted vegetables or rice.',
    strIngredient1: 'Salmon Fillets', strMeasure1: '4 fillets',
    strIngredient2: 'Lemon', strMeasure2: '1',
    strIngredient3: 'Fresh Dill', strMeasure3: '1/4 cup',
    strIngredient4: 'Olive Oil', strMeasure4: '2 tbsp',
    strIngredient5: 'Salt', strMeasure5: 'To taste',
    strIngredient6: 'Black Pepper', strMeasure6: 'To taste',
    cookTime: 20, difficulty: 'Easy', servings: 4,
    calories: 380, protein: 42, carbs: 2, fat: 22,
    dietary: ['gluten-free', 'low-carb', 'keto', 'high-protein'],
  },
  {
    idMeal: 'mock8',
    strMeal: 'Thai Green Curry',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg',
    strCategory: 'Curry',
    strArea: 'Thai',
    strTags: 'Curry,Spicy',
    strInstructions: 'Fry green curry paste in oil until fragrant. Add coconut milk and bring to simmer. Add chicken pieces and cook until done. Add vegetables like bamboo shoots and Thai eggplant. Season with fish sauce and palm sugar. Finish with Thai basil. Serve over jasmine rice.',
    strIngredient1: 'Chicken', strMeasure1: '500g',
    strIngredient2: 'Green Curry Paste', strMeasure2: '3 tbsp',
    strIngredient3: 'Coconut Milk', strMeasure3: '400ml',
    strIngredient4: 'Thai Basil', strMeasure4: 'Handful',
    strIngredient5: 'Fish Sauce', strMeasure5: '2 tbsp',
    strIngredient6: 'Jasmine Rice', strMeasure6: '2 cups',
    cookTime: 35, difficulty: 'Medium', servings: 4,
    calories: 580, protein: 38, carbs: 42, fat: 32,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock9',
    strMeal: 'Avocado Toast',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wpuvqv1511640296.jpg',
    strCategory: 'Breakfast',
    strArea: 'American',
    strTags: 'Breakfast,Quick,Vegetarian,Healthy',
    strInstructions: 'Toast bread until golden and crispy. Mash ripe avocado with lime juice, salt, and pepper. Spread generously on toast. Top with cherry tomatoes, red pepper flakes, and a drizzle of olive oil. Optional: add a poached egg on top for extra protein.',
    strIngredient1: 'Bread', strMeasure1: '2 slices',
    strIngredient2: 'Avocado', strMeasure2: '1 ripe',
    strIngredient3: 'Lime', strMeasure3: '1/2',
    strIngredient4: 'Cherry Tomatoes', strMeasure4: '6',
    strIngredient5: 'Red Pepper Flakes', strMeasure5: 'Pinch',
    strIngredient6: 'Olive Oil', strMeasure6: '1 tbsp',
    cookTime: 10, difficulty: 'Easy', servings: 1,
    calories: 320, protein: 8, carbs: 28, fat: 22,
    dietary: ['vegetarian', 'vegan'],
  },
  {
    idMeal: 'mock10',
    strMeal: 'Overnight Oats',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/rsqwus1511640214.jpg',
    strCategory: 'Breakfast',
    strArea: 'American',
    strTags: 'Breakfast,Healthy,MealPrep',
    strInstructions: 'Combine oats, milk, yogurt, chia seeds, and honey in a jar. Stir well, cover, and refrigerate overnight. In the morning, top with fresh berries, sliced banana, and a drizzle of almond butter. Can be eaten cold or heated.',
    strIngredient1: 'Rolled Oats', strMeasure1: '1/2 cup',
    strIngredient2: 'Milk', strMeasure2: '1/2 cup',
    strIngredient3: 'Greek Yogurt', strMeasure3: '1/4 cup',
    strIngredient4: 'Chia Seeds', strMeasure4: '1 tbsp',
    strIngredient5: 'Honey', strMeasure5: '1 tbsp',
    strIngredient6: 'Berries', strMeasure6: '1/2 cup',
    cookTime: 5, difficulty: 'Easy', servings: 1,
    calories: 380, protein: 14, carbs: 58, fat: 12,
    dietary: ['vegetarian', 'high-fiber'],
  },
  {
    idMeal: 'mock11',
    strMeal: 'Eggs Benedict',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1550440197.jpg',
    strCategory: 'Breakfast',
    strArea: 'American',
    strTags: 'Breakfast,Brunch',
    strInstructions: 'Toast English muffins until golden. Cook Canadian bacon in a pan. Poach eggs in simmering water with a splash of vinegar. Make hollandaise by whisking egg yolks with lemon juice over gentle heat, then slowly adding melted butter. Assemble: muffin, bacon, poached egg, hollandaise. Garnish with chives.',
    strIngredient1: 'English Muffins', strMeasure1: '2',
    strIngredient2: 'Canadian Bacon', strMeasure2: '4 slices',
    strIngredient3: 'Eggs', strMeasure3: '4',
    strIngredient4: 'Butter', strMeasure4: '1/2 cup',
    strIngredient5: 'Egg Yolks', strMeasure5: '3',
    strIngredient6: 'Lemon Juice', strMeasure6: '1 tbsp',
    cookTime: 30, difficulty: 'Hard', servings: 2,
    calories: 680, protein: 32, carbs: 28, fat: 52,
    dietary: [],
  },
  {
    idMeal: 'mock12',
    strMeal: 'Quinoa Buddha Bowl',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1525876226.jpg',
    strCategory: 'Vegetarian',
    strArea: 'American',
    strTags: 'Healthy,Vegetarian,Vegan,MealPrep',
    strInstructions: 'Cook quinoa according to package directions. Roast chickpeas with cumin and paprika. Prepare tahini dressing with tahini, lemon juice, garlic, and water. Arrange quinoa in bowl, top with roasted chickpeas, sliced avocado, cucumber, cherry tomatoes, and red cabbage. Drizzle with tahini dressing.',
    strIngredient1: 'Quinoa', strMeasure1: '1 cup',
    strIngredient2: 'Chickpeas', strMeasure2: '1 can',
    strIngredient3: 'Avocado', strMeasure3: '1',
    strIngredient4: 'Tahini', strMeasure4: '3 tbsp',
    strIngredient5: 'Cucumber', strMeasure5: '1',
    strIngredient6: 'Cherry Tomatoes', strMeasure6: '1 cup',
    cookTime: 25, difficulty: 'Easy', servings: 2,
    calories: 520, protein: 18, carbs: 62, fat: 24,
    dietary: ['vegetarian', 'vegan', 'gluten-free', 'high-fiber'],
  },
  // POTATO DISHES
  {
    idMeal: 'mock26',
    strMeal: 'Loaded Baked Potatoes',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/trpwpy1511724497.jpg',
    strCategory: 'Side',
    strArea: 'American',
    strTags: 'Potato,Comfort,Easy',
    strInstructions: 'Preheat oven to 400°F. Scrub potatoes and prick with a fork. Bake directly on oven rack for 60-75 minutes until tender. Cut a slit in the top and squeeze ends to open. Fluff the inside with a fork. Top with butter, sour cream, shredded cheese, crispy bacon bits, and chives. Season with salt and pepper.',
    strIngredient1: 'Potato', strMeasure1: '4 large russet',
    strIngredient2: 'Butter', strMeasure2: '4 tbsp',
    strIngredient3: 'Sour Cream', strMeasure3: '1/2 cup',
    strIngredient4: 'Cheddar Cheese', strMeasure4: '1 cup shredded',
    strIngredient5: 'Bacon', strMeasure5: '6 strips',
    strIngredient6: 'Chives', strMeasure6: '2 tbsp chopped',
    cookTime: 75, difficulty: 'Easy', servings: 4,
    calories: 380, protein: 12, carbs: 42, fat: 20,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock27',
    strMeal: 'Crispy Garlic Roasted Potatoes',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ebvuyr1511732569.jpg',
    strCategory: 'Side',
    strArea: 'British',
    strTags: 'Potato,Roasted,Crispy',
    strInstructions: 'Preheat oven to 425°F. Cut potatoes into 1-inch chunks. Parboil in salted water for 8 minutes, drain and shake in pot to roughen edges. Toss with olive oil, minced garlic, rosemary, salt and pepper. Spread on baking sheet in single layer. Roast for 40-45 minutes, flipping halfway, until golden and crispy.',
    strIngredient1: 'Potato', strMeasure1: '2 lbs baby potatoes',
    strIngredient2: 'Olive Oil', strMeasure2: '3 tbsp',
    strIngredient3: 'Garlic', strMeasure3: '4 cloves minced',
    strIngredient4: 'Rosemary', strMeasure4: '2 tbsp fresh',
    strIngredient5: 'Salt', strMeasure5: '1 tsp',
    strIngredient6: 'Black Pepper', strMeasure6: '1/2 tsp',
    cookTime: 55, difficulty: 'Easy', servings: 4,
    calories: 220, protein: 4, carbs: 38, fat: 8,
    dietary: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    idMeal: 'mock28',
    strMeal: 'Creamy Mashed Potatoes',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1550441882.jpg',
    strCategory: 'Side',
    strArea: 'American',
    strTags: 'Potato,Comfort,Classic',
    strInstructions: 'Peel and cut potatoes into chunks. Boil in salted water until fork-tender, about 15-20 minutes. Drain well. Add warm milk, butter, and sour cream. Mash until smooth or leave slightly chunky. Season with salt, pepper, and a pinch of garlic powder. Serve hot topped with more butter.',
    strIngredient1: 'Potato', strMeasure1: '3 lbs Yukon Gold',
    strIngredient2: 'Butter', strMeasure2: '1/2 cup',
    strIngredient3: 'Milk', strMeasure3: '1 cup warm',
    strIngredient4: 'Sour Cream', strMeasure4: '1/2 cup',
    strIngredient5: 'Salt', strMeasure5: '1 tsp',
    strIngredient6: 'Garlic Powder', strMeasure6: '1/2 tsp',
    cookTime: 30, difficulty: 'Easy', servings: 6,
    calories: 280, protein: 5, carbs: 32, fat: 16,
    dietary: ['vegetarian', 'gluten-free'],
  },
  // EXOTIC & UNIQUE DISHES
  {
    idMeal: 'mock13',
    strMeal: 'Escargot à la Bourguignonne',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg',
    strCategory: 'Starter',
    strArea: 'French',
    strTags: 'Exotic,French,Gourmet',
    strInstructions: 'Rinse canned escargot and pat dry. Prepare garlic butter by mixing softened butter with minced garlic, parsley, shallots, and a splash of white wine. Place escargot in shells or a special escargot dish. Top each with a generous amount of garlic butter. Bake at 400°F for 10-12 minutes until butter is bubbling. Serve immediately with crusty bread to soak up the butter.',
    strIngredient1: 'Escargot', strMeasure1: '24 snails',
    strIngredient2: 'Butter', strMeasure2: '200g',
    strIngredient3: 'Garlic', strMeasure3: '6 cloves',
    strIngredient4: 'Parsley', strMeasure4: '1/4 cup',
    strIngredient5: 'Shallots', strMeasure5: '2',
    strIngredient6: 'White Wine', strMeasure6: '2 tbsp',
    cookTime: 20, difficulty: 'Medium', servings: 4,
    calories: 420, protein: 18, carbs: 4, fat: 38,
    dietary: ['gluten-free'],
    exoticIngredients: ['Escargot'],
  },
  {
    idMeal: 'mock14',
    strMeal: 'Japanese Wagyu Beef Tataki',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446352.jpg',
    strCategory: 'Beef',
    strArea: 'Japanese',
    strTags: 'Exotic,Japanese,Gourmet,Quick',
    strInstructions: 'Bring wagyu to room temperature. Season with salt. Sear in a very hot pan for 30 seconds per side. Immediately plunge into ice water to stop cooking. Slice thinly against the grain. Arrange on plate with ponzu sauce, grated daikon, sliced green onions, and shiso leaves. Drizzle with sesame oil.',
    strIngredient1: 'Wagyu Beef', strMeasure1: '400g',
    strIngredient2: 'Ponzu Sauce', strMeasure2: '1/4 cup',
    strIngredient3: 'Daikon Radish', strMeasure3: '1 cup grated',
    strIngredient4: 'Shiso Leaves', strMeasure4: '10',
    strIngredient5: 'Sesame Oil', strMeasure5: '1 tbsp',
    strIngredient6: 'Green Onions', strMeasure6: '3',
    cookTime: 15, difficulty: 'Medium', servings: 4,
    calories: 380, protein: 32, carbs: 6, fat: 26,
    dietary: ['gluten-free', 'low-carb'],
    exoticIngredients: ['Wagyu Beef', 'Shiso Leaves', 'Ponzu Sauce'],
  },
  {
    idMeal: 'mock15',
    strMeal: 'Moroccan Lamb Tagine',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/yuwtuu1511295751.jpg',
    strCategory: 'Lamb',
    strArea: 'Moroccan',
    strTags: 'Exotic,SlowCooked,Spiced',
    strInstructions: 'Brown lamb pieces in olive oil. Add onions, garlic, and spices (ras el hanout, cumin, cinnamon, ginger). Add preserved lemons, olives, and honey. Pour in stock, cover, and simmer for 2 hours until lamb is tender. Garnish with fresh cilantro and toasted almonds. Serve with couscous.',
    strIngredient1: 'Lamb Shoulder', strMeasure1: '1kg',
    strIngredient2: 'Ras el Hanout', strMeasure2: '2 tbsp',
    strIngredient3: 'Preserved Lemons', strMeasure3: '2',
    strIngredient4: 'Green Olives', strMeasure4: '1 cup',
    strIngredient5: 'Honey', strMeasure5: '2 tbsp',
    strIngredient6: 'Couscous', strMeasure6: '2 cups',
    cookTime: 150, difficulty: 'Medium', servings: 6,
    calories: 580, protein: 42, carbs: 38, fat: 28,
    dietary: [],
    exoticIngredients: ['Ras el Hanout', 'Preserved Lemons'],
  },
  {
    idMeal: 'mock16',
    strMeal: 'Peruvian Ceviche',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1520084413.jpg',
    strCategory: 'Seafood',
    strArea: 'Peruvian',
    strTags: 'Exotic,Raw,Fresh,Quick',
    strInstructions: 'Cut fresh sea bass into 1-inch cubes. Marinate in fresh lime juice for 15-20 minutes until fish turns opaque. Add aji amarillo paste, red onion, cilantro, and salt. Serve immediately with sweet potato slices, corn, and cancha (toasted corn).',
    strIngredient1: 'Sea Bass', strMeasure1: '500g',
    strIngredient2: 'Lime Juice', strMeasure2: '1 cup',
    strIngredient3: 'Aji Amarillo Paste', strMeasure3: '2 tbsp',
    strIngredient4: 'Red Onion', strMeasure4: '1 large',
    strIngredient5: 'Sweet Potato', strMeasure5: '1 large',
    strIngredient6: 'Cancha', strMeasure6: '1/2 cup',
    cookTime: 25, difficulty: 'Easy', servings: 4,
    calories: 220, protein: 28, carbs: 18, fat: 4,
    dietary: ['gluten-free', 'low-fat'],
    exoticIngredients: ['Aji Amarillo Paste', 'Cancha'],
  },
  {
    idMeal: 'mock17',
    strMeal: 'Korean Bibimbap',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/z0ageb1583189517.jpg',
    strCategory: 'Rice',
    strArea: 'Korean',
    strTags: 'Korean,Healthy,Colorful',
    strInstructions: 'Cook rice and keep warm. Prepare vegetables: julienne carrots, zucchini, spinach, bean sprouts, and mushrooms. Sauté each separately with sesame oil. Cook beef with soy sauce and garlic. Arrange rice in a hot stone bowl, top with vegetables, beef, and a fried egg. Serve with gochujang and mix everything together before eating.',
    strIngredient1: 'Short Grain Rice', strMeasure1: '2 cups',
    strIngredient2: 'Beef Bulgogi', strMeasure2: '200g',
    strIngredient3: 'Gochujang', strMeasure3: '3 tbsp',
    strIngredient4: 'Sesame Oil', strMeasure4: '3 tbsp',
    strIngredient5: 'Kimchi', strMeasure5: '1/2 cup',
    strIngredient6: 'Eggs', strMeasure6: '4',
    cookTime: 45, difficulty: 'Medium', servings: 4,
    calories: 620, protein: 28, carbs: 72, fat: 24,
    dietary: [],
    exoticIngredients: ['Gochujang', 'Kimchi'],
  },
  {
    idMeal: 'mock18',
    strMeal: 'Vietnamese Pho Bo',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/whvwsq1511882084.jpg',
    strCategory: 'Soup',
    strArea: 'Vietnamese',
    strTags: 'Soup,Exotic,Comforting',
    strInstructions: 'Char onion and ginger over open flame. Toast star anise, cinnamon, cloves, and coriander seeds. Simmer beef bones with charred aromatics and spices for 6-8 hours. Strain broth and season with fish sauce. Cook rice noodles. Slice rare beef thinly. Assemble with noodles, raw beef (the hot broth will cook it), and garnish with bean sprouts, Thai basil, lime, and sriracha.',
    strIngredient1: 'Beef Bones', strMeasure1: '2kg',
    strIngredient2: 'Rice Noodles', strMeasure2: '400g',
    strIngredient3: 'Star Anise', strMeasure3: '4 whole',
    strIngredient4: 'Fish Sauce', strMeasure4: '4 tbsp',
    strIngredient5: 'Thai Basil', strMeasure5: '1 cup',
    strIngredient6: 'Beef Sirloin', strMeasure6: '300g',
    cookTime: 480, difficulty: 'Hard', servings: 6,
    calories: 420, protein: 32, carbs: 48, fat: 12,
    dietary: ['gluten-free'],
    exoticIngredients: ['Star Anise', 'Fish Sauce', 'Thai Basil'],
  },
  {
    idMeal: 'mock19',
    strMeal: 'Ethiopian Doro Wat',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1520081754.jpg',
    strCategory: 'Chicken',
    strArea: 'Ethiopian',
    strTags: 'Exotic,Spicy,African',
    strInstructions: 'Caramelize onions slowly without oil until deep brown. Add berbere spice and niter kibbeh (spiced butter). Add chicken pieces and hard-boiled eggs. Simmer for 45 minutes. The stew should be thick and deeply spiced. Serve on injera bread, using the bread to scoop up the stew.',
    strIngredient1: 'Chicken Legs', strMeasure1: '8 pieces',
    strIngredient2: 'Berbere Spice', strMeasure2: '4 tbsp',
    strIngredient3: 'Niter Kibbeh', strMeasure3: '1/2 cup',
    strIngredient4: 'Onions', strMeasure4: '4 large',
    strIngredient5: 'Hard Boiled Eggs', strMeasure5: '6',
    strIngredient6: 'Injera Bread', strMeasure6: '4 pieces',
    cookTime: 90, difficulty: 'Medium', servings: 6,
    calories: 520, protein: 38, carbs: 24, fat: 32,
    dietary: [],
    exoticIngredients: ['Berbere Spice', 'Niter Kibbeh', 'Injera Bread'],
  },
  {
    idMeal: 'mock20',
    strMeal: 'Japanese Uni Donburi',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    strCategory: 'Seafood',
    strArea: 'Japanese',
    strTags: 'Exotic,Sushi,Luxury,Raw',
    strInstructions: 'Cook sushi rice with rice vinegar, sugar, and salt. Let cool to room temperature. Place rice in a bowl. Arrange fresh uni (sea urchin) on top. Add ikura (salmon roe), shiso leaves, and a small amount of wasabi. Drizzle with soy sauce. Eat immediately for best flavor.',
    strIngredient1: 'Uni (Sea Urchin)', strMeasure1: '100g',
    strIngredient2: 'Sushi Rice', strMeasure2: '2 cups',
    strIngredient3: 'Ikura (Salmon Roe)', strMeasure3: '50g',
    strIngredient4: 'Shiso Leaves', strMeasure4: '4',
    strIngredient5: 'Wasabi', strMeasure5: '1 tsp',
    strIngredient6: 'Nori', strMeasure6: '1 sheet',
    cookTime: 30, difficulty: 'Easy', servings: 2,
    calories: 380, protein: 22, carbs: 52, fat: 8,
    dietary: ['gluten-free'],
    exoticIngredients: ['Uni (Sea Urchin)', 'Ikura (Salmon Roe)', 'Shiso Leaves'],
  },
  {
    idMeal: 'mock21',
    strMeal: 'Indian Butter Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
    strCategory: 'Chicken',
    strArea: 'Indian',
    strTags: 'Indian,Curry,Creamy',
    strInstructions: 'Marinate chicken in yogurt, garam masala, and kashmiri chili. Grill or pan-fry until charred. Make sauce by sautéing ginger, garlic, and tomatoes with fenugreek leaves. Add cream and butter. Simmer chicken in sauce. Finish with more cream and kasuri methi. Serve with naan bread and basmati rice.',
    strIngredient1: 'Chicken Thighs', strMeasure1: '800g',
    strIngredient2: 'Kashmiri Chili', strMeasure2: '2 tbsp',
    strIngredient3: 'Garam Masala', strMeasure3: '2 tbsp',
    strIngredient4: 'Kasuri Methi', strMeasure4: '2 tbsp',
    strIngredient5: 'Heavy Cream', strMeasure5: '1 cup',
    strIngredient6: 'Butter', strMeasure6: '100g',
    cookTime: 45, difficulty: 'Medium', servings: 4,
    calories: 620, protein: 42, carbs: 18, fat: 44,
    dietary: ['gluten-free'],
    exoticIngredients: ['Kashmiri Chili', 'Kasuri Methi', 'Garam Masala'],
  },
  {
    idMeal: 'mock22',
    strMeal: 'Sichuan Mapo Tofu',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1525874812.jpg',
    strCategory: 'Tofu',
    strArea: 'Chinese',
    strTags: 'Spicy,Sichuan,Numbing',
    strInstructions: 'Cube silken tofu and blanch gently. Brown pork mince with doubanjiang (fermented chili bean paste). Add Sichuan peppercorns and dried chilies. Make a slurry with stock and starch. Add tofu gently, being careful not to break it. Garnish with more Sichuan pepper and green onions. Serve with steamed rice.',
    strIngredient1: 'Silken Tofu', strMeasure1: '400g',
    strIngredient2: 'Pork Mince', strMeasure2: '150g',
    strIngredient3: 'Doubanjiang', strMeasure3: '2 tbsp',
    strIngredient4: 'Sichuan Peppercorns', strMeasure4: '1 tbsp',
    strIngredient5: 'Fermented Black Beans', strMeasure5: '1 tbsp',
    strIngredient6: 'Shaoxing Wine', strMeasure6: '2 tbsp',
    cookTime: 25, difficulty: 'Medium', servings: 4,
    calories: 320, protein: 22, carbs: 12, fat: 22,
    dietary: [],
    exoticIngredients: ['Doubanjiang', 'Sichuan Peppercorns', 'Fermented Black Beans', 'Shaoxing Wine'],
  },
  {
    idMeal: 'mock23',
    strMeal: 'Spanish Paella Valenciana',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg',
    strCategory: 'Rice',
    strArea: 'Spanish',
    strTags: 'Spanish,Seafood,Classic',
    strInstructions: 'Toast saffron in a dry pan, then steep in warm stock. Sear rabbit and chicken in a wide paella pan. Add green beans, garrofón beans, tomatoes, and paprika. Add bomba rice and saffron stock. Do not stir! Cook until rice absorbs liquid and develops socarrat (crispy bottom). Rest before serving.',
    strIngredient1: 'Bomba Rice', strMeasure1: '400g',
    strIngredient2: 'Saffron', strMeasure2: '1g',
    strIngredient3: 'Rabbit', strMeasure3: '500g',
    strIngredient4: 'Garrofón Beans', strMeasure4: '200g',
    strIngredient5: 'Smoked Paprika', strMeasure5: '1 tbsp',
    strIngredient6: 'Chicken', strMeasure6: '500g',
    cookTime: 60, difficulty: 'Hard', servings: 6,
    calories: 580, protein: 38, carbs: 62, fat: 18,
    dietary: ['gluten-free'],
    exoticIngredients: ['Saffron', 'Bomba Rice', 'Garrofón Beans'],
  },
  {
    idMeal: 'mock24',
    strMeal: 'Filipino Adobo',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/d1vps41614349961.jpg',
    strCategory: 'Chicken',
    strArea: 'Filipino',
    strTags: 'Filipino,Braised,Tangy',
    strInstructions: 'Combine chicken pieces with soy sauce, vinegar, garlic, bay leaves, and black peppercorns. Marinate for 30 minutes. Brown chicken in oil, then add marinade. Simmer until chicken is tender and sauce is reduced. Some prefer it saucy, others like it dry-fried. Serve with steamed jasmine rice.',
    strIngredient1: 'Chicken Thighs', strMeasure1: '1kg',
    strIngredient2: 'Coconut Vinegar', strMeasure2: '1/2 cup',
    strIngredient3: 'Soy Sauce', strMeasure3: '1/2 cup',
    strIngredient4: 'Garlic', strMeasure4: '1 head',
    strIngredient5: 'Bay Leaves', strMeasure5: '5',
    strIngredient6: 'Black Peppercorns', strMeasure6: '1 tbsp',
    cookTime: 50, difficulty: 'Easy', servings: 4,
    calories: 480, protein: 42, carbs: 8, fat: 32,
    dietary: [],
    exoticIngredients: ['Coconut Vinegar'],
  },
  {
    idMeal: 'mock25',
    strMeal: 'Turkish Lamb Kofte',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/b79r6f1585566277.jpg',
    strCategory: 'Lamb',
    strArea: 'Turkish',
    strTags: 'Turkish,Grilled,Spiced',
    strInstructions: 'Mix ground lamb with grated onion, sumac, cumin, Aleppo pepper, and fresh parsley. Shape into oval patties around flat skewers. Grill over high heat until charred outside but juicy inside. Serve with lavash bread, grilled vegetables, sumac onions, and cacik (Turkish yogurt sauce).',
    strIngredient1: 'Ground Lamb', strMeasure1: '500g',
    strIngredient2: 'Sumac', strMeasure2: '2 tbsp',
    strIngredient3: 'Aleppo Pepper', strMeasure3: '1 tbsp',
    strIngredient4: 'Lavash Bread', strMeasure4: '4 pieces',
    strIngredient5: 'Greek Yogurt', strMeasure5: '1 cup',
    strIngredient6: 'Cumin', strMeasure6: '1 tsp',
    cookTime: 25, difficulty: 'Easy', servings: 4,
    calories: 420, protein: 32, carbs: 18, fat: 26,
    dietary: [],
    exoticIngredients: ['Sumac', 'Aleppo Pepper', 'Lavash Bread'],
  },
];

export const DIETARY_OPTIONS = [
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
  { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
  { id: 'low-carb', label: 'Low Carb', icon: '🥩' },
  { id: 'keto', label: 'Keto', icon: '🥑' },
  { id: 'high-protein', label: 'High Protein', icon: '💪' },
];

export const CUISINE_OPTIONS = [
  { id: 'Italian', label: 'Italian', icon: '🇮🇹' },
  { id: 'Japanese', label: 'Japanese', icon: '🇯🇵' },
  { id: 'Mexican', label: 'Mexican', icon: '🇲🇽' },
  { id: 'Chinese', label: 'Chinese', icon: '🇨🇳' },
  { id: 'Thai', label: 'Thai', icon: '🇹🇭' },
  { id: 'Greek', label: 'Greek', icon: '🇬🇷' },
  { id: 'American', label: 'American', icon: '🇺🇸' },
  { id: 'Scandinavian', label: 'Nordic', icon: '🇸🇪' },
];

export const COOK_TIME_OPTIONS = [
  { id: 'quick', label: 'Under 15 min', max: 15, icon: '⚡' },
  { id: 'medium', label: '15-30 min', min: 15, max: 30, icon: '⏱️' },
  { id: 'long', label: '30-60 min', min: 30, max: 60, icon: '🕐' },
  { id: 'slow', label: '60+ min', min: 60, icon: '🍲' },
];

export async function searchRecipes(query, filters = {}) {
  if (!query.trim() && !filters.ingredients?.length) return [];

  try {
    let results = [];

    // API search
    if (query.trim()) {
      const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
      const data = await response.json();
      results = data.meals || [];
    }

    // Also search mock recipes
    const lowerQuery = query.toLowerCase();
    let mockResults = MOCK_RECIPES.filter(r =>
      r.strMeal.toLowerCase().includes(lowerQuery) ||
      r.strCategory.toLowerCase().includes(lowerQuery) ||
      r.strArea.toLowerCase().includes(lowerQuery) ||
      (r.strTags && r.strTags.toLowerCase().includes(lowerQuery))
    );

    // Apply filters to mock results
    if (filters.dietary?.length) {
      mockResults = mockResults.filter(r =>
        filters.dietary.every(d => r.dietary?.includes(d))
      );
    }

    if (filters.cuisine) {
      mockResults = mockResults.filter(r => r.strArea === filters.cuisine);
    }

    if (filters.cookTime) {
      const timeFilter = COOK_TIME_OPTIONS.find(o => o.id === filters.cookTime);
      if (timeFilter) {
        mockResults = mockResults.filter(r => {
          if (timeFilter.max && r.cookTime > timeFilter.max) return false;
          if (timeFilter.min && r.cookTime < timeFilter.min) return false;
          return true;
        });
      }
    }

    // Combine results
    return [...results, ...mockResults];
  } catch (error) {
    // Fallback to mock data on network error
    const lowerQuery = query.toLowerCase();
    return MOCK_RECIPES.filter(r =>
      r.strMeal.toLowerCase().includes(lowerQuery) ||
      r.strCategory.toLowerCase().includes(lowerQuery) ||
      r.strArea.toLowerCase().includes(lowerQuery)
    );
  }
}

export async function searchByIngredients(ingredients) {
  if (!ingredients.length) return [];

  const lowerIngredients = ingredients.map(i => i.toLowerCase().trim());

  return MOCK_RECIPES.filter(recipe => {
    const recipeIngredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = recipe[`strIngredient${i}`];
      if (ing && ing.trim()) {
        recipeIngredients.push(ing.toLowerCase());
      }
    }
    return lowerIngredients.some(searchIng =>
      recipeIngredients.some(recipeIng => recipeIng.includes(searchIng))
    );
  });
}

export async function getRecipeById(id) {
  const mockRecipe = MOCK_RECIPES.find(r => r.idMeal === id);
  if (mockRecipe) return mockRecipe;

  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
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
    const match = item.measure.match(/^([\d.\/]+)\s*(.*)$/);
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

export function calculateNutrition(mealPlan, getRecipeById) {
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
    .filter(([_, data]) => data.rarity === 'exotic')
    .map(([name, data]) => ({ name, ...data }));
}

// Get all common ingredients from database
export function getCommonIngredients() {
  return Object.entries(INGREDIENTS_DATABASE)
    .filter(([_, data]) => data.rarity === 'common')
    .map(([name, data]) => ({ name, ...data }));
}

// Get ingredients by category
export function getIngredientsByCategory(category) {
  return Object.entries(INGREDIENTS_DATABASE)
    .filter(([_, data]) => data.category === category)
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
