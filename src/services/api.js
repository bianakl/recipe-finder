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
    dietary: ['gluten-free', 'dairy-free', 'nut-free', 'shellfish-free', 'low-carb', 'keto', 'high-protein', 'pescatarian', 'halal'],
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
    strMealThumb: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=400&fit=crop',
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
  // CHILLI RECIPES
  {
    idMeal: 'mock26',
    strMeal: 'Texas Style Chili',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg',
    strCategory: 'Beef',
    strArea: 'American',
    strTags: 'Spicy,Hearty,Comfort',
    strInstructions: 'Cut beef chuck into cubes. Sear in batches until browned. Sauté onions, garlic, and jalapeños. Add cumin, chili powder, and cayenne. Return beef, add beef stock and tomatoes. Simmer for 2-3 hours until beef is tender. No beans in authentic Texas chili! Serve with cornbread.',
    strIngredient1: 'Beef Chuck', strMeasure1: '1kg',
    strIngredient2: 'Chili Powder', strMeasure2: '4 tbsp',
    strIngredient3: 'Cumin', strMeasure3: '2 tbsp',
    strIngredient4: 'Jalapeños', strMeasure4: '3',
    strIngredient5: 'Beef Stock', strMeasure5: '2 cups',
    strIngredient6: 'Cayenne Pepper', strMeasure6: '1 tsp',
    cookTime: 180, difficulty: 'Medium', servings: 6,
    calories: 520, protein: 42, carbs: 18, fat: 32,
    dietary: ['gluten-free', 'low-carb'],
  },
  {
    idMeal: 'mock27',
    strMeal: 'Chili Con Carne',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg',
    strCategory: 'Beef',
    strArea: 'Mexican',
    strTags: 'Spicy,Beans,Classic',
    strInstructions: 'Brown ground beef with onions and garlic. Add chili powder, cumin, paprika, and oregano. Stir in crushed tomatoes, tomato paste, and kidney beans. Simmer for 45 minutes. Season with salt, pepper, and a touch of brown sugar. Serve with rice, sour cream, and shredded cheese.',
    strIngredient1: 'Ground Beef', strMeasure1: '750g',
    strIngredient2: 'Kidney Beans', strMeasure2: '2 cans',
    strIngredient3: 'Crushed Tomatoes', strMeasure3: '400g',
    strIngredient4: 'Chili Powder', strMeasure4: '3 tbsp',
    strIngredient5: 'Cumin', strMeasure5: '1 tbsp',
    strIngredient6: 'Onion', strMeasure6: '2 large',
    cookTime: 60, difficulty: 'Easy', servings: 6,
    calories: 480, protein: 38, carbs: 32, fat: 24,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock28',
    strMeal: 'White Chicken Chili',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg',
    strCategory: 'Chicken',
    strArea: 'American',
    strTags: 'Chicken,Creamy,Mild',
    strInstructions: 'Sauté chicken breast with onions and garlic. Add green chilies, cumin, and oregano. Pour in chicken broth and white beans. Simmer until chicken is cooked through. Shred chicken and return to pot. Stir in cream cheese and sour cream. Top with cilantro and tortilla strips.',
    strIngredient1: 'Chicken Breast', strMeasure1: '600g',
    strIngredient2: 'White Beans', strMeasure2: '2 cans',
    strIngredient3: 'Green Chilies', strMeasure3: '2 cans',
    strIngredient4: 'Cream Cheese', strMeasure4: '200g',
    strIngredient5: 'Chicken Broth', strMeasure5: '3 cups',
    strIngredient6: 'Cumin', strMeasure6: '2 tsp',
    cookTime: 40, difficulty: 'Easy', servings: 6,
    calories: 420, protein: 36, carbs: 28, fat: 20,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock29',
    strMeal: 'Vegetarian Three Bean Chili',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tvttqv1504640475.jpg',
    strCategory: 'Vegetarian',
    strArea: 'American',
    strTags: 'Vegetarian,Vegan,Healthy,Spicy',
    strInstructions: 'Sauté onions, peppers, and garlic. Add diced tomatoes, black beans, kidney beans, and pinto beans. Season with chili powder, cumin, smoked paprika, and cocoa powder for depth. Simmer for 30 minutes. Add corn in the last 10 minutes. Serve with avocado and lime.',
    strIngredient1: 'Black Beans', strMeasure1: '1 can',
    strIngredient2: 'Kidney Beans', strMeasure2: '1 can',
    strIngredient3: 'Pinto Beans', strMeasure3: '1 can',
    strIngredient4: 'Diced Tomatoes', strMeasure4: '2 cans',
    strIngredient5: 'Chili Powder', strMeasure5: '3 tbsp',
    strIngredient6: 'Cocoa Powder', strMeasure6: '1 tbsp',
    cookTime: 45, difficulty: 'Easy', servings: 6,
    calories: 320, protein: 18, carbs: 52, fat: 6,
    dietary: ['vegetarian', 'vegan', 'gluten-free', 'high-fiber'],
  },
  {
    idMeal: 'mock30',
    strMeal: 'Cincinnati Chili',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1529443236.jpg',
    strCategory: 'Beef',
    strArea: 'American',
    strTags: 'Unique,Cinnamon,Pasta',
    strInstructions: 'Simmer ground beef in water with tomato paste, vinegar, and unique spice blend including cinnamon, allspice, and cloves. The meat becomes fine-textured. Serve "5-way" over spaghetti with beans, onions, and lots of shredded cheddar. Add hot sauce to taste.',
    strIngredient1: 'Ground Beef', strMeasure1: '500g',
    strIngredient2: 'Spaghetti', strMeasure2: '400g',
    strIngredient3: 'Cinnamon', strMeasure3: '1 tsp',
    strIngredient4: 'Allspice', strMeasure4: '1/2 tsp',
    strIngredient5: 'Cheddar Cheese', strMeasure5: '200g',
    strIngredient6: 'Kidney Beans', strMeasure6: '1 can',
    cookTime: 90, difficulty: 'Medium', servings: 4,
    calories: 680, protein: 42, carbs: 58, fat: 32,
    dietary: [],
  },
  // MORE CHICKEN VARIETY
  {
    idMeal: 'mock31',
    strMeal: 'Chicken Parmesan',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sypgrt1511815398.jpg',
    strCategory: 'Chicken',
    strArea: 'Italian',
    strTags: 'Chicken,Italian,Cheese',
    strInstructions: 'Pound chicken breasts thin. Dredge in flour, dip in beaten eggs, and coat with breadcrumbs mixed with parmesan. Pan-fry until golden and cooked through. Top with marinara sauce and mozzarella. Broil until cheese is bubbly and golden. Serve over spaghetti.',
    strIngredient1: 'Chicken Breast', strMeasure1: '4 pieces',
    strIngredient2: 'Breadcrumbs', strMeasure2: '1 cup',
    strIngredient3: 'Parmesan', strMeasure3: '1/2 cup',
    strIngredient4: 'Mozzarella', strMeasure4: '200g',
    strIngredient5: 'Marinara Sauce', strMeasure5: '2 cups',
    strIngredient6: 'Eggs', strMeasure6: '2',
    cookTime: 35, difficulty: 'Medium', servings: 4,
    calories: 580, protein: 48, carbs: 32, fat: 28,
    dietary: [],
  },
  {
    idMeal: 'mock32',
    strMeal: 'Honey Garlic Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg',
    strCategory: 'Chicken',
    strArea: 'Chinese',
    strTags: 'Chicken,Sweet,Quick',
    strInstructions: 'Season chicken thighs with salt and pepper. Sear skin-side down until crispy. Flip and cook through. Make sauce with honey, soy sauce, minced garlic, and rice vinegar. Pour over chicken and simmer until glazed. Garnish with sesame seeds and green onions.',
    strIngredient1: 'Chicken Thighs', strMeasure1: '8 pieces',
    strIngredient2: 'Honey', strMeasure2: '1/3 cup',
    strIngredient3: 'Soy Sauce', strMeasure3: '1/4 cup',
    strIngredient4: 'Garlic', strMeasure4: '6 cloves',
    strIngredient5: 'Rice Vinegar', strMeasure5: '2 tbsp',
    strIngredient6: 'Sesame Seeds', strMeasure6: '1 tbsp',
    cookTime: 30, difficulty: 'Easy', servings: 4,
    calories: 420, protein: 38, carbs: 24, fat: 20,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock33',
    strMeal: 'Chicken Tikka Masala',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
    strCategory: 'Chicken',
    strArea: 'Indian',
    strTags: 'Chicken,Curry,Creamy,Spicy',
    strInstructions: 'Marinate chicken in yogurt, garam masala, turmeric, and cumin. Grill or broil until charred. Make sauce by sautéing onions, ginger, and garlic. Add tomato puree, cream, and spices. Simmer chicken in sauce. Finish with fresh cilantro. Serve with basmati rice or naan.',
    strIngredient1: 'Chicken Breast', strMeasure1: '600g',
    strIngredient2: 'Greek Yogurt', strMeasure2: '1 cup',
    strIngredient3: 'Heavy Cream', strMeasure3: '1 cup',
    strIngredient4: 'Tomato Puree', strMeasure4: '400g',
    strIngredient5: 'Garam Masala', strMeasure5: '2 tbsp',
    strIngredient6: 'Turmeric', strMeasure6: '1 tsp',
    cookTime: 45, difficulty: 'Medium', servings: 4,
    calories: 520, protein: 42, carbs: 22, fat: 30,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock34',
    strMeal: 'Buffalo Chicken Wings',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xqwwpy1483908697.jpg',
    strCategory: 'Chicken',
    strArea: 'American',
    strTags: 'Chicken,Spicy,GameDay,Fried',
    strInstructions: 'Pat chicken wings dry. Season with salt and baking powder for extra crispy skin. Bake at high heat or deep fry until crispy and cooked through. Toss in buffalo sauce made from hot sauce and melted butter. Serve with celery sticks, carrot sticks, and blue cheese dressing.',
    strIngredient1: 'Chicken Wings', strMeasure1: '1kg',
    strIngredient2: 'Hot Sauce', strMeasure2: '1/2 cup',
    strIngredient3: 'Butter', strMeasure3: '4 tbsp',
    strIngredient4: 'Celery', strMeasure4: '4 stalks',
    strIngredient5: 'Blue Cheese', strMeasure5: '1/2 cup',
    strIngredient6: 'Baking Powder', strMeasure6: '1 tbsp',
    cookTime: 45, difficulty: 'Easy', servings: 4,
    calories: 580, protein: 42, carbs: 4, fat: 44,
    dietary: ['gluten-free', 'low-carb', 'keto'],
  },
  {
    idMeal: 'mock35',
    strMeal: 'Orange Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/k5tqxy1468383015.jpg',
    strCategory: 'Chicken',
    strArea: 'Chinese',
    strTags: 'Chicken,Sweet,Crispy,Takeout',
    strInstructions: 'Cut chicken into chunks and coat in cornstarch. Deep fry until golden and crispy. Make sauce with orange juice, zest, soy sauce, rice vinegar, and brown sugar. Add ginger and garlic. Simmer until thickened. Toss crispy chicken in sauce. Garnish with orange zest and green onions.',
    strIngredient1: 'Chicken Breast', strMeasure1: '600g',
    strIngredient2: 'Orange Juice', strMeasure2: '1 cup',
    strIngredient3: 'Orange Zest', strMeasure3: '2 tbsp',
    strIngredient4: 'Soy Sauce', strMeasure4: '3 tbsp',
    strIngredient5: 'Brown Sugar', strMeasure5: '1/4 cup',
    strIngredient6: 'Cornstarch', strMeasure6: '1/2 cup',
    cookTime: 30, difficulty: 'Medium', servings: 4,
    calories: 520, protein: 38, carbs: 48, fat: 18,
    dietary: [],
  },
  {
    idMeal: 'mock36',
    strMeal: 'Chicken Shawarma',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/kcv6hj1598733479.jpg',
    strCategory: 'Chicken',
    strArea: 'Israeli',
    strTags: 'Chicken,Spiced,Wrap,Street Food',
    strInstructions: 'Marinate chicken thighs in yogurt, cumin, coriander, paprika, turmeric, and garlic. Let sit for at least 2 hours. Grill or pan-fry until charred and cooked through. Slice thinly. Serve in warm pita with pickled turnips, hummus, tahini sauce, and fresh vegetables.',
    strIngredient1: 'Chicken Thighs', strMeasure1: '800g',
    strIngredient2: 'Greek Yogurt', strMeasure2: '1/2 cup',
    strIngredient3: 'Cumin', strMeasure3: '2 tsp',
    strIngredient4: 'Coriander', strMeasure4: '2 tsp',
    strIngredient5: 'Tahini', strMeasure5: '1/4 cup',
    strIngredient6: 'Pita Bread', strMeasure6: '4 pieces',
    cookTime: 25, difficulty: 'Easy', servings: 4,
    calories: 480, protein: 42, carbs: 32, fat: 22,
    dietary: ['high-protein', 'nut-free', 'shellfish-free', 'halal'],
  },
  {
    idMeal: 'mock37',
    strMeal: 'Chicken Alfredo',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg',
    strCategory: 'Chicken',
    strArea: 'Italian',
    strTags: 'Chicken,Pasta,Creamy,Comfort',
    strInstructions: 'Cook fettuccine according to package directions. Season and pan-fry chicken breasts until golden. Slice into strips. Make alfredo sauce with butter, heavy cream, and parmesan cheese. Toss pasta with sauce and top with chicken. Garnish with parsley and extra parmesan.',
    strIngredient1: 'Chicken Breast', strMeasure1: '500g',
    strIngredient2: 'Fettuccine', strMeasure2: '400g',
    strIngredient3: 'Heavy Cream', strMeasure3: '2 cups',
    strIngredient4: 'Parmesan', strMeasure4: '1 cup',
    strIngredient5: 'Butter', strMeasure5: '4 tbsp',
    strIngredient6: 'Garlic', strMeasure6: '4 cloves',
    cookTime: 30, difficulty: 'Easy', servings: 4,
    calories: 780, protein: 48, carbs: 62, fat: 38,
    dietary: [],
  },
  {
    idMeal: 'mock38',
    strMeal: 'Lemon Herb Roasted Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446352.jpg',
    strCategory: 'Chicken',
    strArea: 'Israeli',
    strTags: 'Chicken,Roasted,Healthy,Sunday',
    strInstructions: 'Spatchcock a whole chicken for even cooking. Rub with olive oil, lemon zest, minced garlic, rosemary, and thyme. Season generously with salt and pepper. Roast at high heat until skin is crispy and internal temp reaches 165°F. Rest before carving. Serve with pan juices.',
    strIngredient1: 'Whole Chicken', strMeasure1: '1.5kg',
    strIngredient2: 'Lemons', strMeasure2: '2',
    strIngredient3: 'Rosemary', strMeasure3: '4 sprigs',
    strIngredient4: 'Thyme', strMeasure4: '6 sprigs',
    strIngredient5: 'Garlic', strMeasure5: '1 head',
    strIngredient6: 'Olive Oil', strMeasure6: '4 tbsp',
    cookTime: 60, difficulty: 'Medium', servings: 4,
    calories: 420, protein: 52, carbs: 4, fat: 24,
    dietary: ['gluten-free', 'dairy-free', 'nut-free', 'shellfish-free', 'egg-free', 'low-carb', 'keto', 'high-protein', 'halal', 'kosher'],
  },
  // SWEET SNACKS & DESSERTS
  {
    idMeal: 'mock39',
    strMeal: 'Chocolate Lava Cake',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/0swsrx1511023340.jpg',
    strCategory: 'Dessert',
    strArea: 'French',
    strTags: 'Chocolate,Dessert,Indulgent,Romantic',
    strInstructions: 'Melt dark chocolate with butter. Whisk eggs with sugar until fluffy. Fold chocolate mixture into eggs. Add flour and mix until just combined. Pour into greased ramekins. Bake until edges are set but center jiggles. Invert onto plates. The center should be molten and gooey.',
    strIngredient1: 'Dark Chocolate', strMeasure1: '200g',
    strIngredient2: 'Butter', strMeasure2: '150g',
    strIngredient3: 'Eggs', strMeasure3: '4',
    strIngredient4: 'Sugar', strMeasure4: '150g',
    strIngredient5: 'Flour', strMeasure5: '50g',
    strIngredient6: 'Vanilla Extract', strMeasure6: '1 tsp',
    cookTime: 15, difficulty: 'Medium', servings: 4,
    calories: 520, protein: 8, carbs: 48, fat: 34,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock40',
    strMeal: 'Loaded Brownie Sundae',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1550441275.jpg',
    strCategory: 'Dessert',
    strArea: 'American',
    strTags: 'Chocolate,Ice Cream,Indulgent,Party',
    strInstructions: 'Bake fudgy brownies with chocolate chips. Cut into squares while warm. Top each brownie with a scoop of vanilla ice cream. Drizzle with hot fudge sauce and caramel. Add whipped cream, chopped nuts, and a cherry on top. Serve immediately.',
    strIngredient1: 'Brownie Mix', strMeasure1: '1 box',
    strIngredient2: 'Vanilla Ice Cream', strMeasure2: '1 pint',
    strIngredient3: 'Hot Fudge', strMeasure3: '1/2 cup',
    strIngredient4: 'Caramel Sauce', strMeasure4: '1/4 cup',
    strIngredient5: 'Whipped Cream', strMeasure5: '1 cup',
    strIngredient6: 'Walnuts', strMeasure6: '1/4 cup',
    cookTime: 30, difficulty: 'Easy', servings: 6,
    calories: 680, protein: 8, carbs: 82, fat: 38,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock41',
    strMeal: 'Loaded Nachos Supreme',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1529085920.jpg',
    strCategory: 'Snack',
    strArea: 'Mexican',
    strTags: 'Snack,Cheese,Party,GameDay',
    strInstructions: 'Layer tortilla chips on a baking sheet. Top with seasoned ground beef, refried beans, and loads of shredded cheese. Bake until cheese is melted and bubbly. Add fresh toppings: pico de gallo, sour cream, guacamole, jalapeños, and green onions. Serve immediately.',
    strIngredient1: 'Tortilla Chips', strMeasure1: '1 large bag',
    strIngredient2: 'Ground Beef', strMeasure2: '300g',
    strIngredient3: 'Cheddar Cheese', strMeasure3: '300g',
    strIngredient4: 'Sour Cream', strMeasure4: '1 cup',
    strIngredient5: 'Guacamole', strMeasure5: '1 cup',
    strIngredient6: 'Jalapeños', strMeasure6: '1/2 cup',
    cookTime: 20, difficulty: 'Easy', servings: 6,
    calories: 620, protein: 24, carbs: 42, fat: 42,
    dietary: [],
  },
  {
    idMeal: 'mock42',
    strMeal: 'Deep Fried Oreos',
    strMealThumb: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
    strCategory: 'Dessert',
    strArea: 'American',
    strTags: 'Fried,Sweet,Fair Food,Indulgent',
    strInstructions: 'Make pancake batter slightly thicker than usual. Freeze Oreos for 30 minutes. Dip each frozen Oreo in batter, coating completely. Deep fry at 375°F until golden brown, about 2 minutes. Drain on paper towels. Dust with powdered sugar. Serve warm with chocolate sauce.',
    strIngredient1: 'Oreo Cookies', strMeasure1: '20 cookies',
    strIngredient2: 'Pancake Mix', strMeasure2: '2 cups',
    strIngredient3: 'Milk', strMeasure3: '1 cup',
    strIngredient4: 'Vegetable Oil', strMeasure4: 'For frying',
    strIngredient5: 'Powdered Sugar', strMeasure5: '1/4 cup',
    strIngredient6: 'Chocolate Sauce', strMeasure6: '1/2 cup',
    cookTime: 15, difficulty: 'Easy', servings: 4,
    calories: 380, protein: 4, carbs: 52, fat: 18,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock43',
    strMeal: 'Churros with Chocolate',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/vwpqrw1511723001.jpg',
    strCategory: 'Dessert',
    strArea: 'Spanish',
    strTags: 'Fried,Sweet,Cinnamon,Dipping',
    strInstructions: 'Boil water with butter and salt. Add flour all at once and stir vigorously until dough forms a ball. Pipe dough through a star tip into hot oil. Fry until golden and crispy. Roll in cinnamon sugar while warm. Serve with thick hot chocolate for dipping.',
    strIngredient1: 'Flour', strMeasure1: '1 cup',
    strIngredient2: 'Butter', strMeasure2: '2 tbsp',
    strIngredient3: 'Sugar', strMeasure3: '1/2 cup',
    strIngredient4: 'Cinnamon', strMeasure4: '2 tsp',
    strIngredient5: 'Dark Chocolate', strMeasure5: '200g',
    strIngredient6: 'Heavy Cream', strMeasure6: '1/2 cup',
    cookTime: 25, difficulty: 'Medium', servings: 4,
    calories: 420, protein: 6, carbs: 58, fat: 20,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock44',
    strMeal: 'Mozzarella Sticks',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/lhqev81565090111.jpg',
    strCategory: 'Snack',
    strArea: 'American',
    strTags: 'Cheese,Fried,Appetizer,Party',
    strInstructions: 'Cut mozzarella into sticks. Freeze for 30 minutes. Set up breading station: flour, beaten eggs, Italian breadcrumbs. Coat each stick in flour, egg, breadcrumbs, egg again, and breadcrumbs again for extra crunch. Freeze again. Deep fry until golden. Serve with marinara sauce.',
    strIngredient1: 'Mozzarella Cheese', strMeasure1: '500g',
    strIngredient2: 'Breadcrumbs', strMeasure2: '2 cups',
    strIngredient3: 'Eggs', strMeasure3: '3',
    strIngredient4: 'Flour', strMeasure4: '1 cup',
    strIngredient5: 'Italian Seasoning', strMeasure5: '2 tsp',
    strIngredient6: 'Marinara Sauce', strMeasure6: '1 cup',
    cookTime: 20, difficulty: 'Easy', servings: 6,
    calories: 380, protein: 18, carbs: 28, fat: 24,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock45',
    strMeal: 'Cookie Dough Bites',
    strMealThumb: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=400&fit=crop',
    strCategory: 'Dessert',
    strArea: 'American',
    strTags: 'Sweet,No-Bake,Quick,Chocolate',
    strInstructions: 'Heat treat flour in microwave to make it safe to eat raw. Cream butter with brown and white sugar. Add vanilla and milk. Mix in heat-treated flour and salt. Fold in mini chocolate chips. Roll into bite-sized balls. Chill until firm. Optionally dip in melted chocolate.',
    strIngredient1: 'Flour', strMeasure1: '1 cup',
    strIngredient2: 'Butter', strMeasure2: '1/2 cup',
    strIngredient3: 'Brown Sugar', strMeasure3: '1/2 cup',
    strIngredient4: 'Mini Chocolate Chips', strMeasure4: '1/2 cup',
    strIngredient5: 'Vanilla Extract', strMeasure5: '1 tsp',
    strIngredient6: 'Milk', strMeasure6: '2 tbsp',
    cookTime: 15, difficulty: 'Easy', servings: 8,
    calories: 220, protein: 2, carbs: 28, fat: 12,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock46',
    strMeal: 'Triple Chocolate Brownies',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg',
    strCategory: 'Dessert',
    strArea: 'American',
    strTags: 'Chocolate,Fudgy,Dessert,Baking',
    strInstructions: 'Melt butter with dark chocolate. Whisk sugar, eggs, and vanilla. Combine with chocolate mixture. Fold in cocoa powder and flour. Add white chocolate chunks and milk chocolate chips. Pour into greased pan. Bake until top is set but center is still fudgy. Cool before cutting.',
    strIngredient1: 'Dark Chocolate', strMeasure1: '200g',
    strIngredient2: 'Butter', strMeasure2: '150g',
    strIngredient3: 'Sugar', strMeasure3: '300g',
    strIngredient4: 'Eggs', strMeasure4: '3',
    strIngredient5: 'White Chocolate Chips', strMeasure5: '100g',
    strIngredient6: 'Milk Chocolate Chips', strMeasure6: '100g',
    cookTime: 35, difficulty: 'Easy', servings: 12,
    calories: 340, protein: 4, carbs: 42, fat: 18,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock47',
    strMeal: 'Jalapeño Poppers',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sxysrt1468240488.jpg',
    strCategory: 'Snack',
    strArea: 'American',
    strTags: 'Spicy,Cheese,Appetizer,Fried',
    strInstructions: 'Cut jalapeños in half and remove seeds. Fill with cream cheese mixed with shredded cheddar and crumbled bacon. Dip in flour, egg, then breadcrumbs. Deep fry until golden or bake until crispy. Serve with ranch dressing for dipping.',
    strIngredient1: 'Jalapeños', strMeasure1: '12 large',
    strIngredient2: 'Cream Cheese', strMeasure2: '250g',
    strIngredient3: 'Cheddar Cheese', strMeasure3: '100g',
    strIngredient4: 'Bacon', strMeasure4: '4 strips',
    strIngredient5: 'Breadcrumbs', strMeasure5: '1 cup',
    strIngredient6: 'Ranch Dressing', strMeasure6: '1/2 cup',
    cookTime: 25, difficulty: 'Easy', servings: 6,
    calories: 320, protein: 12, carbs: 18, fat: 24,
    dietary: [],
  },
  {
    idMeal: 'mock48',
    strMeal: 'Peanut Butter Cups',
    strMealThumb: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop',
    strCategory: 'Dessert',
    strArea: 'American',
    strTags: 'Chocolate,Peanut Butter,No-Bake,Candy',
    strInstructions: 'Mix peanut butter with powdered sugar and a little butter until smooth. Melt chocolate with coconut oil. Line mini muffin tins with paper cups. Add a layer of chocolate, freeze until set. Add peanut butter mixture, then top with more chocolate. Refrigerate until firm.',
    strIngredient1: 'Peanut Butter', strMeasure1: '1 cup',
    strIngredient2: 'Powdered Sugar', strMeasure2: '1/2 cup',
    strIngredient3: 'Dark Chocolate', strMeasure3: '300g',
    strIngredient4: 'Coconut Oil', strMeasure4: '1 tbsp',
    strIngredient5: 'Butter', strMeasure5: '2 tbsp',
    strIngredient6: 'Salt', strMeasure6: 'Pinch',
    cookTime: 20, difficulty: 'Easy', servings: 12,
    calories: 180, protein: 4, carbs: 16, fat: 12,
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    idMeal: 'mock49',
    strMeal: 'Shakshuka',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strCategory: 'Breakfast',
    strArea: 'Israeli',
    strTags: 'Breakfast,Eggs,Spicy',
    strInstructions: 'Saute diced onion and bell pepper in olive oil until softened. Add garlic, cumin, and paprika, then stir in crushed tomatoes and simmer for 10 minutes. Create wells in the sauce and crack eggs into them. Cover and cook until whites are set but yolks remain runny. Garnish with fresh cilantro and crumbled feta.',
    strIngredient1: 'Crushed Tomatoes', strMeasure1: '400g',
    strIngredient2: 'Eggs', strMeasure2: '4',
    strIngredient3: 'Bell Pepper', strMeasure3: '1 large',
    strIngredient4: 'Onion', strMeasure4: '1 medium',
    strIngredient5: 'Cumin', strMeasure5: '1 tsp',
    strIngredient6: 'Feta Cheese', strMeasure6: '50g',
    cookTime: 25, difficulty: 'Easy', servings: 4,
    calories: 220, protein: 14, carbs: 18, fat: 12,
    dietary: ['vegetarian', 'gluten-free', 'nut-free', 'shellfish-free', 'halal', 'kosher'],
  },
  {
    idMeal: 'mock50',
    strMeal: 'Hummus',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    strCategory: 'Snack',
    strArea: 'Lebanese',
    strTags: 'Dip,Healthy,Vegan',
    strInstructions: 'Drain and rinse canned chickpeas, reserving some liquid. Blend chickpeas with tahini, lemon juice, garlic, and a splash of reserved liquid until silky smooth. Season with salt and cumin. Serve drizzled with olive oil and a sprinkle of paprika.',
    strIngredient1: 'Chickpeas', strMeasure1: '400g',
    strIngredient2: 'Tahini', strMeasure2: '3 tbsp',
    strIngredient3: 'Lemon Juice', strMeasure3: '2 tbsp',
    strIngredient4: 'Garlic', strMeasure4: '2 cloves',
    strIngredient5: 'Olive Oil', strMeasure5: '2 tbsp',
    strIngredient6: 'Cumin', strMeasure6: '1/2 tsp',
    cookTime: 10, difficulty: 'Easy', servings: 6,
    calories: 180, protein: 8, carbs: 20, fat: 9,
    dietary: ['vegan', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free', 'egg-free', 'high-fiber', 'halal', 'kosher'],
  },
  {
    idMeal: 'mock51',
    strMeal: 'Feijoada',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1529444830.jpg',
    strCategory: 'Dinner',
    strArea: 'Brazilian',
    strTags: 'Stew,Hearty,Traditional',
    strInstructions: 'Soak black beans overnight, then drain. In a large pot, brown pork ribs and smoked sausage. Add beans, bay leaves, garlic, and enough water to cover. Simmer on low heat for 2 hours until beans are tender and the broth is thick and rich. Serve over white rice with sauteed collard greens and orange slices.',
    strIngredient1: 'Black Beans', strMeasure1: '500g',
    strIngredient2: 'Pork Ribs', strMeasure2: '300g',
    strIngredient3: 'Smoked Sausage', strMeasure3: '200g',
    strIngredient4: 'Garlic', strMeasure4: '4 cloves',
    strIngredient5: 'Bay Leaves', strMeasure5: '3',
    strIngredient6: 'Onion', strMeasure6: '1 large',
    cookTime: 120, difficulty: 'Hard', servings: 8,
    calories: 550, protein: 35, carbs: 45, fat: 25,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock52',
    strMeal: 'Jerk Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
    strCategory: 'BBQ',
    strArea: 'Jamaican',
    strTags: 'Spicy,Grilled,Caribbean',
    strInstructions: 'Blend scotch bonnet peppers, allspice, thyme, garlic, soy sauce, and lime juice into a jerk marinade. Score chicken thighs and coat generously, marinating for at least 4 hours or overnight. Grill over medium-high heat, turning occasionally, until charred and cooked through, about 30 minutes. Rest for 5 minutes before serving with rice and peas.',
    strIngredient1: 'Chicken Thighs', strMeasure1: '1kg',
    strIngredient2: 'Scotch Bonnet Pepper', strMeasure2: '2',
    strIngredient3: 'Allspice', strMeasure3: '1 tbsp',
    strIngredient4: 'Thyme', strMeasure4: '4 sprigs',
    strIngredient5: 'Soy Sauce', strMeasure5: '3 tbsp',
    strIngredient6: 'Lime', strMeasure6: '2',
    cookTime: 45, difficulty: 'Medium', servings: 4,
    calories: 420, protein: 38, carbs: 5, fat: 28,
    dietary: ['gluten-free', 'high-protein'],
  },
  {
    idMeal: 'mock53',
    strMeal: 'Pierogi',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    strCategory: 'Dinner',
    strArea: 'Polish',
    strTags: 'Dumplings,Comfort,Traditional',
    strInstructions: 'Make dough from flour, egg, sour cream, and a pinch of salt; knead until smooth and rest for 30 minutes. Prepare filling by mashing boiled potatoes with sauteed onions and cheddar cheese. Roll out dough, cut circles, fill and pinch edges to seal. Boil pierogi until they float, then pan-fry in butter until golden. Serve with sour cream and chives.',
    strIngredient1: 'Flour', strMeasure1: '300g',
    strIngredient2: 'Potatoes', strMeasure2: '400g',
    strIngredient3: 'Cheddar Cheese', strMeasure3: '100g',
    strIngredient4: 'Onion', strMeasure4: '1 large',
    strIngredient5: 'Sour Cream', strMeasure5: '100ml',
    strIngredient6: 'Butter', strMeasure6: '3 tbsp',
    cookTime: 60, difficulty: 'Hard', servings: 4,
    calories: 450, protein: 14, carbs: 55, fat: 20,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock54',
    strMeal: 'Jollof Rice',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strCategory: 'Dinner',
    strArea: 'Nigerian',
    strTags: 'Rice,West African,Party',
    strInstructions: 'Blend tomatoes, red bell peppers, and scotch bonnet into a smooth paste. Fry onions in vegetable oil, add tomato paste, and cook until oil floats to the top. Stir in the blended pepper mixture and cook down for 20 minutes. Add washed rice, season with thyme, curry powder, and stock cubes. Cover tightly and cook on low heat until rice is fluffy and perfectly seasoned.',
    strIngredient1: 'Long Grain Rice', strMeasure1: '500g',
    strIngredient2: 'Tomatoes', strMeasure2: '6 large',
    strIngredient3: 'Red Bell Pepper', strMeasure3: '3',
    strIngredient4: 'Onion', strMeasure4: '2 large',
    strIngredient5: 'Tomato Paste', strMeasure5: '3 tbsp',
    strIngredient6: 'Thyme', strMeasure6: '1 tsp',
    cookTime: 50, difficulty: 'Medium', servings: 6,
    calories: 380, protein: 8, carbs: 65, fat: 10,
    dietary: ['vegan', 'gluten-free'],
  },
  {
    idMeal: 'mock55',
    strMeal: 'Khachapuri',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
    strCategory: 'Breakfast',
    strArea: 'Georgian',
    strTags: 'Bread,Cheese,Brunch',
    strInstructions: 'Make a soft yeast dough with flour, warm milk, yeast, and butter; let rise for 1 hour. Mix together sulguni and feta cheese with an egg. Shape dough into boats, fill with the cheese mixture, and bake at 220C for 15 minutes. Remove from oven, add a raw egg yolk and a pat of butter to the center, and return to oven for 2 minutes. Serve immediately, stirring the egg into the melted cheese.',
    strIngredient1: 'Flour', strMeasure1: '400g',
    strIngredient2: 'Feta Cheese', strMeasure2: '200g',
    strIngredient3: 'Mozzarella', strMeasure3: '200g',
    strIngredient4: 'Eggs', strMeasure4: '3',
    strIngredient5: 'Butter', strMeasure5: '50g',
    strIngredient6: 'Yeast', strMeasure6: '7g',
    cookTime: 90, difficulty: 'Hard', servings: 4,
    calories: 520, protein: 22, carbs: 48, fat: 28,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock56',
    strMeal: 'Cevapi',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/urzj1d1587066726.jpg',
    strCategory: 'BBQ',
    strArea: 'Bosnian',
    strTags: 'Grilled,Meat,StreetFood',
    strInstructions: 'Combine ground beef and ground lamb with minced garlic, baking soda, salt, and black pepper. Mix thoroughly and refrigerate for at least 2 hours. Shape into small finger-sized sausages. Grill over high heat for 3-4 minutes per side until nicely charred. Serve in warm flatbread with raw onion, kajmak cream, and ajvar red pepper relish.',
    strIngredient1: 'Ground Beef', strMeasure1: '400g',
    strIngredient2: 'Ground Lamb', strMeasure2: '200g',
    strIngredient3: 'Garlic', strMeasure3: '3 cloves',
    strIngredient4: 'Baking Soda', strMeasure4: '1/2 tsp',
    strIngredient5: 'Black Pepper', strMeasure5: '1 tsp',
    strIngredient6: 'Flatbread', strMeasure6: '4',
    cookTime: 20, difficulty: 'Easy', servings: 4,
    calories: 480, protein: 32, carbs: 25, fat: 28,
    dietary: ['high-protein'],
  },
  {
    idMeal: 'mock57',
    strMeal: 'Brigadeiros',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg',
    strCategory: 'Dessert',
    strArea: 'Brazilian',
    strTags: 'Sweet,Chocolate,Party',
    strInstructions: 'Combine sweetened condensed milk, cocoa powder, and butter in a saucepan over medium-low heat. Stir continuously for about 10 minutes until the mixture thickens and pulls away from the sides of the pan. Let cool, then roll into small balls and coat in chocolate sprinkles. Place in mini cupcake liners and refrigerate until firm.',
    strIngredient1: 'Condensed Milk', strMeasure1: '395g',
    strIngredient2: 'Cocoa Powder', strMeasure2: '3 tbsp',
    strIngredient3: 'Butter', strMeasure3: '1 tbsp',
    strIngredient4: 'Chocolate Sprinkles', strMeasure4: '100g',
    strIngredient5: 'Vanilla Extract', strMeasure5: '1 tsp',
    strIngredient6: 'Salt', strMeasure6: 'Pinch',
    cookTime: 20, difficulty: 'Easy', servings: 20,
    calories: 90, protein: 2, carbs: 14, fat: 3,
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    idMeal: 'mock58',
    strMeal: 'Nasi Lemak',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg',
    strCategory: 'Breakfast',
    strArea: 'Malaysian',
    strTags: 'Rice,Coconut,Traditional',
    strInstructions: 'Cook jasmine rice in coconut milk with pandan leaves and a pinch of salt until fragrant and fluffy. Prepare sambal by blending dried chillies, shallots, and belacan, then frying until oil separates. Fry anchovies until crispy and hard-boil eggs. Serve the coconut rice on a banana leaf with sambal, anchovies, roasted peanuts, cucumber slices, and halved eggs.',
    strIngredient1: 'Jasmine Rice', strMeasure1: '300g',
    strIngredient2: 'Coconut Milk', strMeasure2: '200ml',
    strIngredient3: 'Dried Chillies', strMeasure3: '10',
    strIngredient4: 'Anchovies', strMeasure4: '100g',
    strIngredient5: 'Eggs', strMeasure5: '4',
    strIngredient6: 'Peanuts', strMeasure6: '50g',
    cookTime: 35, difficulty: 'Medium', servings: 4,
    calories: 480, protein: 18, carbs: 58, fat: 20,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock59',
    strMeal: 'Plov',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
    strCategory: 'Dinner',
    strArea: 'Uzbek',
    strTags: 'Rice,Pilaf,Hearty',
    strInstructions: 'Cut lamb into chunks and brown in a heavy-bottomed pot with vegetable oil. Add sliced onions and julienned carrots, cooking until softened. Season with cumin, coriander, and salt, then add enough water to cover. Layer soaked rice on top without stirring, add whole garlic heads, cover tightly, and cook on low heat for 40 minutes. Fluff and mix before serving.',
    strIngredient1: 'Lamb', strMeasure1: '500g',
    strIngredient2: 'Basmati Rice', strMeasure2: '400g',
    strIngredient3: 'Carrots', strMeasure3: '3 large',
    strIngredient4: 'Onion', strMeasure4: '2 large',
    strIngredient5: 'Cumin Seeds', strMeasure5: '1 tbsp',
    strIngredient6: 'Garlic', strMeasure6: '2 heads',
    cookTime: 75, difficulty: 'Medium', servings: 6,
    calories: 520, protein: 28, carbs: 55, fat: 22,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock60',
    strMeal: 'Thieboudienne',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
    strCategory: 'Seafood',
    strArea: 'Senegalese',
    strTags: 'Fish,Rice,Traditional',
    strInstructions: 'Stuff fish fillets with a paste of parsley, garlic, and scotch bonnet pepper. Fry the fish until golden, then set aside. In the same pot, saute onions, add tomato paste, and cook vegetables like cassava, cabbage, and eggplant in a rich tomato broth. Add broken rice to the broth and cook until tender. Arrange fish on top and serve family-style.',
    strIngredient1: 'White Fish Fillets', strMeasure1: '600g',
    strIngredient2: 'Broken Rice', strMeasure2: '500g',
    strIngredient3: 'Tomato Paste', strMeasure3: '4 tbsp',
    strIngredient4: 'Cabbage', strMeasure4: '1/4 head',
    strIngredient5: 'Cassava', strMeasure5: '200g',
    strIngredient6: 'Parsley', strMeasure6: '1 bunch',
    cookTime: 90, difficulty: 'Hard', servings: 6,
    calories: 490, protein: 30, carbs: 60, fat: 14,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock61',
    strMeal: 'Empanadas',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1525876468.jpg',
    strCategory: 'Street Food',
    strArea: 'Argentinian',
    strTags: 'Pastry,Stuffed,Baked',
    strInstructions: 'Make dough with flour, butter, warm water, and salt; rest for 30 minutes. For the filling, brown ground beef with onion, add cumin, paprika, sliced olives, and hard-boiled egg. Roll out dough, cut circles, fill each one, fold over and crimp the edges with a fork or repulgue pattern. Brush with egg wash and bake at 200C for 20 minutes until golden.',
    strIngredient1: 'Flour', strMeasure1: '500g',
    strIngredient2: 'Ground Beef', strMeasure2: '400g',
    strIngredient3: 'Onion', strMeasure3: '2 medium',
    strIngredient4: 'Green Olives', strMeasure4: '50g',
    strIngredient5: 'Paprika', strMeasure5: '2 tsp',
    strIngredient6: 'Eggs', strMeasure6: '3',
    cookTime: 55, difficulty: 'Medium', servings: 8,
    calories: 350, protein: 18, carbs: 35, fat: 16,
    dietary: [],
  },
  {
    idMeal: 'mock62',
    strMeal: 'Koshari',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/qtuwuq1468233098.jpg',
    strCategory: 'Comfort Food',
    strArea: 'Egyptian',
    strTags: 'Vegan,Carbs,StreetFood',
    strInstructions: 'Cook rice, lentils, and macaroni separately. Make a spiced tomato sauce with garlic, vinegar, cumin, and chili flakes. Deeply caramelize sliced onions until dark and crispy. Layer rice, lentils, and pasta in a bowl, top with the spicy tomato sauce and crispy onions. Finish with a drizzle of garlic vinegar and hot sauce.',
    strIngredient1: 'Rice', strMeasure1: '200g',
    strIngredient2: 'Brown Lentils', strMeasure2: '200g',
    strIngredient3: 'Macaroni', strMeasure3: '200g',
    strIngredient4: 'Onion', strMeasure4: '3 large',
    strIngredient5: 'Tomato Sauce', strMeasure5: '400ml',
    strIngredient6: 'Cumin', strMeasure6: '1 tsp',
    cookTime: 45, difficulty: 'Medium', servings: 4,
    calories: 420, protein: 16, carbs: 72, fat: 8,
    dietary: ['vegan', 'dairy-free', 'shellfish-free', 'egg-free', 'halal', 'kosher'],
  },
  {
    idMeal: 'mock63',
    strMeal: 'Bandeja Paisa',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
    strCategory: 'Dinner',
    strArea: 'Colombian',
    strTags: 'Hearty,Traditional,Platter',
    strInstructions: 'Cook red beans with pork belly until tender and creamy. Prepare white rice and fry plantain slices until caramelized. Grill a chorizo sausage and fry an egg sunny-side-up. Cook ground beef with tomato and cumin. Arrange everything on a large platter with an arepa and avocado slices for a complete Colombian feast.',
    strIngredient1: 'Red Beans', strMeasure1: '300g',
    strIngredient2: 'Pork Belly', strMeasure2: '200g',
    strIngredient3: 'Chorizo', strMeasure3: '2 links',
    strIngredient4: 'Plantain', strMeasure4: '2',
    strIngredient5: 'Eggs', strMeasure5: '2',
    strIngredient6: 'Avocado', strMeasure6: '1',
    cookTime: 90, difficulty: 'Hard', servings: 2,
    calories: 850, protein: 45, carbs: 70, fat: 42,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock64',
    strMeal: 'Poke Bowl',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
    strCategory: 'Lunch',
    strArea: 'Hawaiian',
    strTags: 'Fresh,Raw,Healthy',
    strInstructions: 'Cut sushi-grade ahi tuna into 1cm cubes. Toss with soy sauce, sesame oil, rice vinegar, and sliced green onions. Cook sushi rice and season with rice vinegar and sugar. Build bowls with rice, marinated tuna, sliced avocado, edamame, cucumber, and pickled ginger. Top with sesame seeds and a drizzle of spicy mayo.',
    strIngredient1: 'Ahi Tuna', strMeasure1: '400g',
    strIngredient2: 'Sushi Rice', strMeasure2: '300g',
    strIngredient3: 'Soy Sauce', strMeasure3: '3 tbsp',
    strIngredient4: 'Avocado', strMeasure4: '2',
    strIngredient5: 'Sesame Oil', strMeasure5: '1 tbsp',
    strIngredient6: 'Edamame', strMeasure6: '100g',
    cookTime: 20, difficulty: 'Easy', servings: 4,
    calories: 420, protein: 32, carbs: 45, fat: 14,
    dietary: ['high-protein'],
  },
  {
    idMeal: 'mock65',
    strMeal: 'Scotch Eggs',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg',
    strCategory: 'Snack',
    strArea: 'Scottish',
    strTags: 'Eggs,Fried,Pub',
    strInstructions: 'Soft-boil eggs for exactly 6 minutes, then plunge into ice water and peel carefully. Season pork sausage meat with sage, nutmeg, and black pepper. Wrap each egg in a thin layer of sausage meat, ensuring no gaps. Dredge in flour, dip in beaten egg, and coat in breadcrumbs. Deep-fry at 170C for 7 minutes until deep golden brown. Rest for 2 minutes before cutting in half.',
    strIngredient1: 'Eggs', strMeasure1: '6',
    strIngredient2: 'Pork Sausage Meat', strMeasure2: '500g',
    strIngredient3: 'Breadcrumbs', strMeasure3: '150g',
    strIngredient4: 'Flour', strMeasure4: '50g',
    strIngredient5: 'Sage', strMeasure5: '1 tsp',
    strIngredient6: 'Nutmeg', strMeasure6: '1/2 tsp',
    cookTime: 25, difficulty: 'Medium', servings: 6,
    calories: 340, protein: 22, carbs: 15, fat: 22,
    dietary: ['high-protein'],
  },
  {
    idMeal: 'mock66',
    strMeal: 'Swedish Meatballs',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/kvbopc1581012881.jpg',
    strCategory: 'Comfort Food',
    strArea: 'Swedish',
    strTags: 'Meatballs,Creamy,Classic',
    strInstructions: 'Soak breadcrumbs in milk. Mix ground pork and beef with soaked crumbs, finely grated onion, egg, allspice, and nutmeg. Shape into small uniform balls and brown in butter. Make a roux with butter and flour, add beef stock and cream, stirring until a velvety gravy forms. Simmer meatballs in the gravy for 15 minutes. Serve with mashed potatoes, lingonberry jam, and pickled cucumber.',
    strIngredient1: 'Ground Beef', strMeasure1: '250g',
    strIngredient2: 'Ground Pork', strMeasure2: '250g',
    strIngredient3: 'Heavy Cream', strMeasure3: '200ml',
    strIngredient4: 'Beef Stock', strMeasure4: '300ml',
    strIngredient5: 'Breadcrumbs', strMeasure5: '50g',
    strIngredient6: 'Allspice', strMeasure6: '1/2 tsp',
    cookTime: 40, difficulty: 'Medium', servings: 4,
    calories: 520, protein: 30, carbs: 18, fat: 38,
    dietary: [],
  },
  {
    idMeal: 'mock67',
    strMeal: 'Pasteis de Nata',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg',
    strCategory: 'Dessert',
    strArea: 'Portuguese',
    strTags: 'Pastry,Custard,Sweet',
    strInstructions: 'Make a custard by whisking egg yolks with sugar, flour, and hot milk infused with cinnamon stick and lemon peel. Cook until thick, stirring constantly. Roll puff pastry into a tight log, slice into rounds, and press into muffin tins to form shells. Fill shells with custard and bake at 250C for 12-15 minutes until the pastry is flaky and the custard has characteristic dark spots on top.',
    strIngredient1: 'Puff Pastry', strMeasure1: '250g',
    strIngredient2: 'Egg Yolks', strMeasure2: '6',
    strIngredient3: 'Sugar', strMeasure3: '150g',
    strIngredient4: 'Milk', strMeasure4: '350ml',
    strIngredient5: 'Cinnamon Stick', strMeasure5: '1',
    strIngredient6: 'Lemon Peel', strMeasure6: '1 strip',
    cookTime: 35, difficulty: 'Hard', servings: 12,
    calories: 190, protein: 4, carbs: 22, fat: 10,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock68',
    strMeal: 'Moussaka',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg',
    strCategory: 'Dinner',
    strArea: 'Greek',
    strTags: 'Baked,Layered,Mediterranean',
    strInstructions: 'Slice eggplant, salt, and let drain for 30 minutes, then brush with oil and roast. Brown ground lamb with onion, garlic, cinnamon, and tomato paste. Make a bechamel sauce with butter, flour, milk, and nutmeg, enriched with egg yolks. Layer roasted eggplant, meat sauce, and bechamel in a baking dish. Bake at 180C for 45 minutes until golden and bubbling.',
    strIngredient1: 'Eggplant', strMeasure1: '3 large',
    strIngredient2: 'Ground Lamb', strMeasure2: '500g',
    strIngredient3: 'Tomato Paste', strMeasure3: '2 tbsp',
    strIngredient4: 'Milk', strMeasure4: '500ml',
    strIngredient5: 'Butter', strMeasure5: '50g',
    strIngredient6: 'Cinnamon', strMeasure6: '1 tsp',
    cookTime: 90, difficulty: 'Hard', servings: 6,
    calories: 480, protein: 25, carbs: 22, fat: 32,
    dietary: [],
  },
  {
    idMeal: 'mock69',
    strMeal: 'Fattoush',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strCategory: 'Salad',
    strArea: 'Lebanese',
    strTags: 'Fresh,Crunchy,Vegan',
    strInstructions: 'Toast torn pieces of pita bread with olive oil until crispy. Chop romaine lettuce, tomatoes, cucumber, radishes, and fresh herbs. Make a bright dressing with lemon juice, olive oil, sumac, and garlic. Toss everything together just before serving so the pita stays crunchy. Finish with an extra sprinkle of sumac.',
    strIngredient1: 'Romaine Lettuce', strMeasure1: '1 head',
    strIngredient2: 'Tomatoes', strMeasure2: '2 large',
    strIngredient3: 'Cucumber', strMeasure3: '1 large',
    strIngredient4: 'Pita Bread', strMeasure4: '2',
    strIngredient5: 'Sumac', strMeasure5: '2 tsp',
    strIngredient6: 'Lemon Juice', strMeasure6: '3 tbsp',
    cookTime: 15, difficulty: 'Easy', servings: 4,
    calories: 180, protein: 5, carbs: 24, fat: 8,
    dietary: ['vegan', 'dairy-free', 'shellfish-free', 'egg-free', 'halal', 'kosher'],
  },
  {
    idMeal: 'mock70',
    strMeal: 'Sri Lankan Dhal Curry',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    strCategory: 'Vegetarian',
    strArea: 'Sri Lankan',
    strTags: 'Curry,Lentils,Spicy',
    strInstructions: 'Simmer red lentils with turmeric, diced tomato, and water until completely broken down. In a separate pan, make a temper by frying mustard seeds, curry leaves, dried chillies, and sliced shallots in coconut oil until fragrant. Pour the temper over the cooked dhal and stir in coconut milk. Season with salt and a squeeze of lime.',
    strIngredient1: 'Red Lentils', strMeasure1: '300g',
    strIngredient2: 'Coconut Milk', strMeasure2: '200ml',
    strIngredient3: 'Curry Leaves', strMeasure3: '10',
    strIngredient4: 'Turmeric', strMeasure4: '1 tsp',
    strIngredient5: 'Mustard Seeds', strMeasure5: '1 tsp',
    strIngredient6: 'Tomato', strMeasure6: '2',
    cookTime: 25, difficulty: 'Easy', servings: 4,
    calories: 280, protein: 16, carbs: 38, fat: 8,
    dietary: ['vegan', 'gluten-free', 'dairy-free', 'nut-free', 'shellfish-free', 'egg-free', 'high-protein', 'high-fiber', 'halal', 'kosher'],
  },
  {
    idMeal: 'mock71',
    strMeal: 'Arepas',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1529444830.jpg',
    strCategory: 'Street Food',
    strArea: 'Venezuelan',
    strTags: 'Corn,Stuffed,GlutenFree',
    strInstructions: 'Mix pre-cooked corn flour (masarepa) with warm water, salt, and a drizzle of oil until a smooth dough forms. Divide into balls, flatten into thick discs about 1cm thick. Cook on a griddle or skillet for 5 minutes per side until a crust forms, then bake at 180C for 15 minutes until hollow-sounding when tapped. Split open and stuff with shredded chicken, black beans, and avocado.',
    strIngredient1: 'Masarepa', strMeasure1: '250g',
    strIngredient2: 'Water', strMeasure2: '300ml',
    strIngredient3: 'Salt', strMeasure3: '1 tsp',
    strIngredient4: 'Chicken Breast', strMeasure4: '200g',
    strIngredient5: 'Black Beans', strMeasure5: '200g',
    strIngredient6: 'Avocado', strMeasure6: '1',
    cookTime: 30, difficulty: 'Easy', servings: 4,
    calories: 350, protein: 20, carbs: 42, fat: 12,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock72',
    strMeal: 'Fish and Chips',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
    strCategory: 'Seafood',
    strArea: 'British',
    strTags: 'Fried,Classic,Pub',
    strInstructions: 'Make a batter by whisking flour, baking powder, salt, and cold sparkling water until smooth. Cut potatoes into thick chips, parboil for 5 minutes, and pat dry. Heat oil to 180C and double-fry chips until golden and crispy. Dip cod fillets in the batter and fry for 6-7 minutes until golden and crispy. Drain on paper towels and serve with mushy peas, tartar sauce, and lemon wedges.',
    strIngredient1: 'Cod Fillets', strMeasure1: '4',
    strIngredient2: 'Potatoes', strMeasure2: '800g',
    strIngredient3: 'Flour', strMeasure3: '200g',
    strIngredient4: 'Sparkling Water', strMeasure4: '250ml',
    strIngredient5: 'Baking Powder', strMeasure5: '1 tsp',
    strIngredient6: 'Vegetable Oil', strMeasure6: '1L',
    cookTime: 40, difficulty: 'Medium', servings: 4,
    calories: 620, protein: 28, carbs: 65, fat: 28,
    dietary: ['dairy-free', 'nut-free', 'pescatarian', 'halal'],
  },
  {
    idMeal: 'mock73',
    strMeal: 'Ramen',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    strCategory: 'Soup',
    strArea: 'Japanese',
    strTags: 'Noodles,Umami,Warming',
    strInstructions: 'Simmer pork bones, ginger, and garlic for at least 4 hours to create a rich tonkotsu broth. Season with soy sauce, mirin, and sesame oil. Marinate soft-boiled eggs in soy and mirin overnight. Cook ramen noodles according to package directions. Assemble bowls with broth, noodles, sliced chashu pork, halved marinated eggs, nori, corn, and sliced green onions.',
    strIngredient1: 'Ramen Noodles', strMeasure1: '400g',
    strIngredient2: 'Pork Belly', strMeasure2: '300g',
    strIngredient3: 'Soy Sauce', strMeasure3: '4 tbsp',
    strIngredient4: 'Eggs', strMeasure4: '4',
    strIngredient5: 'Ginger', strMeasure5: '3cm piece',
    strIngredient6: 'Garlic', strMeasure6: '4 cloves',
    cookTime: 60, difficulty: 'Hard', servings: 4,
    calories: 550, protein: 28, carbs: 50, fat: 28,
    dietary: [],
  },
  {
    idMeal: 'mock74',
    strMeal: 'Pad See Ew',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strCategory: 'Dinner',
    strArea: 'Thai',
    strTags: 'Noodles,Stir-Fry,Quick',
    strInstructions: 'Soak wide rice noodles in warm water until pliable. Heat a wok over very high heat and sear chicken until browned. Push to the side, scramble an egg, then add noodles and Chinese broccoli. Add sauce made from dark soy sauce, oyster sauce, sugar, and vinegar. Toss everything vigorously, letting the noodles char slightly on the wok for smoky flavor.',
    strIngredient1: 'Wide Rice Noodles', strMeasure1: '300g',
    strIngredient2: 'Chicken Breast', strMeasure2: '250g',
    strIngredient3: 'Chinese Broccoli', strMeasure3: '200g',
    strIngredient4: 'Dark Soy Sauce', strMeasure4: '2 tbsp',
    strIngredient5: 'Oyster Sauce', strMeasure5: '2 tbsp',
    strIngredient6: 'Eggs', strMeasure6: '2',
    cookTime: 15, difficulty: 'Medium', servings: 2,
    calories: 480, protein: 28, carbs: 55, fat: 16,
    dietary: [],
  },
  {
    idMeal: 'mock75',
    strMeal: 'Tom Yum Soup',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
    strCategory: 'Soup',
    strArea: 'Thai',
    strTags: 'Spicy,Sour,Aromatic',
    strInstructions: 'Bring water to a boil and add lemongrass, galangal, and kaffir lime leaves to infuse. Add mushrooms and shrimp, cooking until shrimp turn pink. Season with fish sauce, lime juice, and chili paste. The soup should be intensely sour, spicy, and fragrant. Finish with fresh cilantro and a splash of coconut milk for the creamy version.',
    strIngredient1: 'Shrimp', strMeasure1: '300g',
    strIngredient2: 'Lemongrass', strMeasure2: '3 stalks',
    strIngredient3: 'Mushrooms', strMeasure3: '200g',
    strIngredient4: 'Fish Sauce', strMeasure4: '3 tbsp',
    strIngredient5: 'Lime Juice', strMeasure5: '3 tbsp',
    strIngredient6: 'Chili Paste', strMeasure6: '2 tbsp',
    cookTime: 20, difficulty: 'Easy', servings: 4,
    calories: 150, protein: 20, carbs: 8, fat: 4,
    dietary: ['gluten-free', 'low-carb'],
  },
  {
    idMeal: 'mock76',
    strMeal: 'Baklava',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/urzj1d1587066726.jpg',
    strCategory: 'Dessert',
    strArea: 'Turkish',
    strTags: 'Sweet,Pastry,Nuts',
    strInstructions: 'Layer buttered sheets of phyllo dough in a baking pan, adding a mixture of finely chopped walnuts and pistachios with cinnamon between every few layers. Score the top into diamond shapes with a sharp knife. Bake at 175C for 45 minutes until crisp and golden. Meanwhile, make a syrup from sugar, water, honey, and lemon juice. Pour hot syrup over the hot baklava and let it soak in completely.',
    strIngredient1: 'Phyllo Dough', strMeasure1: '500g',
    strIngredient2: 'Walnuts', strMeasure2: '200g',
    strIngredient3: 'Pistachios', strMeasure3: '100g',
    strIngredient4: 'Butter', strMeasure4: '200g',
    strIngredient5: 'Honey', strMeasure5: '100ml',
    strIngredient6: 'Sugar', strMeasure6: '200g',
    cookTime: 60, difficulty: 'Hard', servings: 16,
    calories: 280, protein: 4, carbs: 32, fat: 16,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock77',
    strMeal: 'Tiramisu',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg',
    strCategory: 'Dessert',
    strArea: 'Italian',
    strTags: 'Coffee,NoWork,Elegant',
    strInstructions: 'Whisk egg yolks with sugar until pale and thick. Fold in mascarpone cheese until smooth. In a separate bowl, whip heavy cream to stiff peaks and gently fold into the mascarpone mixture. Dip ladyfinger biscuits briefly in strong espresso mixed with a splash of Marsala wine. Layer soaked ladyfingers and cream in a dish, refrigerate for at least 6 hours. Dust generously with cocoa powder before serving.',
    strIngredient1: 'Mascarpone', strMeasure1: '500g',
    strIngredient2: 'Ladyfingers', strMeasure2: '300g',
    strIngredient3: 'Espresso', strMeasure3: '300ml',
    strIngredient4: 'Egg Yolks', strMeasure4: '6',
    strIngredient5: 'Sugar', strMeasure5: '100g',
    strIngredient6: 'Cocoa Powder', strMeasure6: '2 tbsp',
    cookTime: 30, difficulty: 'Medium', servings: 8,
    calories: 380, protein: 8, carbs: 35, fat: 24,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock78',
    strMeal: 'Creme Brulee',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg',
    strCategory: 'Dessert',
    strArea: 'French',
    strTags: 'Custard,Elegant,Classic',
    strInstructions: 'Heat heavy cream with vanilla bean seeds and a strip of lemon zest until just simmering. Whisk egg yolks with sugar until pale. Slowly pour hot cream into yolks, whisking constantly to temper. Strain into ramekins and bake in a water bath at 150C for 40 minutes until set but jiggly in the center. Chill for at least 4 hours. Sprinkle with sugar and torch until caramelized just before serving.',
    strIngredient1: 'Heavy Cream', strMeasure1: '500ml',
    strIngredient2: 'Egg Yolks', strMeasure2: '5',
    strIngredient3: 'Sugar', strMeasure3: '100g',
    strIngredient4: 'Vanilla Bean', strMeasure4: '1',
    strIngredient5: 'Lemon Zest', strMeasure5: '1 strip',
    strIngredient6: 'Salt', strMeasure6: 'Pinch',
    cookTime: 55, difficulty: 'Hard', servings: 4,
    calories: 420, protein: 6, carbs: 28, fat: 34,
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    idMeal: 'mock79',
    strMeal: 'Tacos al Pastor',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
    strCategory: 'Street Food',
    strArea: 'Mexican',
    strTags: 'Tacos,Pork,Pineapple',
    strInstructions: 'Marinate thinly sliced pork in a blend of dried guajillo chiles, achiote paste, pineapple juice, garlic, and vinegar for at least 4 hours. Grill or pan-fry the pork until charred at the edges and caramelized. Grill pineapple slices until marked. Serve in warm corn tortillas topped with grilled pineapple, diced onion, fresh cilantro, and a squeeze of lime.',
    strIngredient1: 'Pork Shoulder', strMeasure1: '500g',
    strIngredient2: 'Pineapple', strMeasure2: '4 slices',
    strIngredient3: 'Corn Tortillas', strMeasure3: '12',
    strIngredient4: 'Guajillo Chiles', strMeasure4: '4',
    strIngredient5: 'Achiote Paste', strMeasure5: '2 tbsp',
    strIngredient6: 'Cilantro', strMeasure6: '1 bunch',
    cookTime: 30, difficulty: 'Medium', servings: 4,
    calories: 380, protein: 28, carbs: 35, fat: 15,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock80',
    strMeal: 'Gnocchi',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
    strCategory: 'Dinner',
    strArea: 'Italian',
    strTags: 'Potato,Pasta,Comfort',
    strInstructions: 'Bake potatoes until completely tender, scoop out flesh, and rice while still hot. Mix with flour, egg yolk, and salt until a soft dough forms, being careful not to overwork. Roll into ropes and cut into 2cm pieces, pressing each against a fork for ridges. Boil until they float, then pan-fry in browned butter with sage leaves until golden. Finish with parmesan.',
    strIngredient1: 'Potatoes', strMeasure1: '1kg',
    strIngredient2: 'Flour', strMeasure2: '200g',
    strIngredient3: 'Egg Yolk', strMeasure3: '1',
    strIngredient4: 'Butter', strMeasure4: '60g',
    strIngredient5: 'Sage', strMeasure5: '8 leaves',
    strIngredient6: 'Parmesan', strMeasure6: '50g',
    cookTime: 45, difficulty: 'Medium', servings: 4,
    calories: 420, protein: 12, carbs: 62, fat: 14,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock81',
    strMeal: 'Risotto ai Funghi',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1525876468.jpg',
    strCategory: 'Dinner',
    strArea: 'Italian',
    strTags: 'Rice,Creamy,Mushroom',
    strInstructions: 'Saute mixed mushrooms in butter until deeply golden. Toast arborio rice in olive oil with finely diced shallot for 2 minutes. Deglaze with white wine and stir until absorbed. Add hot stock one ladle at a time, stirring constantly for 18-20 minutes until rice is creamy and al dente. Fold in the mushrooms, butter, and grated parmesan. Rest for 2 minutes before serving.',
    strIngredient1: 'Arborio Rice', strMeasure1: '300g',
    strIngredient2: 'Mixed Mushrooms', strMeasure2: '300g',
    strIngredient3: 'Vegetable Stock', strMeasure3: '1L',
    strIngredient4: 'Parmesan', strMeasure4: '80g',
    strIngredient5: 'White Wine', strMeasure5: '150ml',
    strIngredient6: 'Butter', strMeasure6: '50g',
    cookTime: 30, difficulty: 'Medium', servings: 4,
    calories: 450, protein: 14, carbs: 58, fat: 18,
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    idMeal: 'mock82',
    strMeal: 'Poutine',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
    strCategory: 'Comfort Food',
    strArea: 'Canadian',
    strTags: 'Fries,Cheese,Gravy',
    strInstructions: 'Cut potatoes into thick fries and soak in cold water for 30 minutes. Double-fry at 150C then 190C until crispy and golden. Make a rich brown gravy by deglazing a pan with beef stock, adding Worcestershire sauce, and thickening with a flour-butter roux. Pile hot fries on a plate, scatter fresh cheese curds generously, and ladle hot gravy over the top so curds begin to melt.',
    strIngredient1: 'Potatoes', strMeasure1: '1kg',
    strIngredient2: 'Cheese Curds', strMeasure2: '200g',
    strIngredient3: 'Beef Stock', strMeasure3: '500ml',
    strIngredient4: 'Butter', strMeasure4: '30g',
    strIngredient5: 'Flour', strMeasure5: '30g',
    strIngredient6: 'Worcestershire Sauce', strMeasure6: '1 tbsp',
    cookTime: 40, difficulty: 'Medium', servings: 4,
    calories: 580, protein: 18, carbs: 55, fat: 32,
    dietary: [],
  },
  {
    idMeal: 'mock83',
    strMeal: 'Peking Duck',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/qtuwuq1468233098.jpg',
    strCategory: 'Dinner',
    strArea: 'Chinese',
    strTags: 'Duck,Roasted,Festive',
    strInstructions: 'Separate duck skin from flesh by inflating with air. Blanch the whole duck briefly, then coat with a glaze of maltose, vinegar, and five-spice powder. Hang to dry overnight in a cool place. Roast at 220C for 45 minutes, then reduce to 180C for another 30 minutes until the skin is lacquered and deeply crispy. Carve tableside and serve with thin pancakes, hoisin sauce, cucumber, and scallions.',
    strIngredient1: 'Whole Duck', strMeasure1: '2kg',
    strIngredient2: 'Maltose', strMeasure2: '3 tbsp',
    strIngredient3: 'Rice Vinegar', strMeasure3: '2 tbsp',
    strIngredient4: 'Five Spice Powder', strMeasure4: '1 tsp',
    strIngredient5: 'Hoisin Sauce', strMeasure5: '100ml',
    strIngredient6: 'Pancakes', strMeasure6: '20',
    cookTime: 120, difficulty: 'Hard', servings: 6,
    calories: 520, protein: 32, carbs: 20, fat: 36,
    dietary: [],
  },
  {
    idMeal: 'mock84',
    strMeal: 'Samosas',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
    strCategory: 'Street Food',
    strArea: 'Indian',
    strTags: 'Fried,Spiced,Snack',
    strInstructions: 'Make dough with flour, oil, ajwain seeds, and water; rest for 30 minutes. Boil and roughly mash potatoes, mix with cooked peas, cumin, coriander, garam masala, green chillies, and fresh ginger. Roll dough into thin circles, cut in half, form cones, and fill with the potato mixture. Seal edges with water and deep-fry at 170C until crispy and golden brown. Serve with tamarind and mint chutneys.',
    strIngredient1: 'Potatoes', strMeasure1: '500g',
    strIngredient2: 'Peas', strMeasure2: '100g',
    strIngredient3: 'Flour', strMeasure3: '250g',
    strIngredient4: 'Garam Masala', strMeasure4: '1 tsp',
    strIngredient5: 'Cumin Seeds', strMeasure5: '1 tsp',
    strIngredient6: 'Green Chillies', strMeasure6: '2',
    cookTime: 45, difficulty: 'Medium', servings: 8,
    calories: 220, protein: 5, carbs: 30, fat: 10,
    dietary: ['vegan'],
  },
  {
    idMeal: 'mock85',
    strMeal: 'Falafel',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg',
    strCategory: 'Street Food',
    strArea: 'Middle Eastern',
    strTags: 'Fried,Chickpea,Vegan',
    strInstructions: 'Soak dried chickpeas overnight (do not use canned). Blend soaked chickpeas with fresh parsley, cilantro, onion, garlic, cumin, and coriander until a coarse paste forms. Season with salt and add baking powder for lightness. Shape into balls or patties and deep-fry at 180C for 3-4 minutes until dark golden and crispy outside, green and fluffy inside. Serve in pita with tahini sauce, pickled turnips, and fresh vegetables.',
    strIngredient1: 'Dried Chickpeas', strMeasure1: '400g',
    strIngredient2: 'Parsley', strMeasure2: '1 bunch',
    strIngredient3: 'Cilantro', strMeasure3: '1/2 bunch',
    strIngredient4: 'Onion', strMeasure4: '1 medium',
    strIngredient5: 'Cumin', strMeasure5: '2 tsp',
    strIngredient6: 'Baking Powder', strMeasure6: '1 tsp',
    cookTime: 25, difficulty: 'Medium', servings: 6,
    calories: 250, protein: 12, carbs: 30, fat: 10,
    dietary: ['vegan', 'dairy-free', 'nut-free', 'shellfish-free', 'egg-free', 'high-fiber', 'halal', 'kosher'],
  },
  {
    idMeal: 'mock86',
    strMeal: 'Borscht',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/kvbopc1581012881.jpg',
    strCategory: 'Soup',
    strArea: 'Ukrainian',
    strTags: 'Beetroot,Warming,Traditional',
    strInstructions: 'Simmer beef shin in water with bay leaves for 1.5 hours until tender. Grate beetroot and carrot, dice potato, and shred cabbage. Saute onion and grated vegetables in oil, add tomato paste, and cook until softened. Add to the broth along with potatoes and cabbage. Simmer until all vegetables are tender. Season with vinegar, sugar, dill, and salt. Serve with a generous spoonful of sour cream.',
    strIngredient1: 'Beetroot', strMeasure1: '3 large',
    strIngredient2: 'Beef Shin', strMeasure2: '400g',
    strIngredient3: 'Cabbage', strMeasure3: '1/4 head',
    strIngredient4: 'Potatoes', strMeasure4: '2 medium',
    strIngredient5: 'Tomato Paste', strMeasure5: '2 tbsp',
    strIngredient6: 'Sour Cream', strMeasure6: '100ml',
    cookTime: 100, difficulty: 'Medium', servings: 6,
    calories: 320, protein: 22, carbs: 28, fat: 14,
    dietary: [],
  },
  {
    idMeal: 'mock87',
    strMeal: 'Croissants',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg',
    strCategory: 'Breakfast',
    strArea: 'French',
    strTags: 'Pastry,Buttery,Baking',
    strInstructions: 'Make a dough with flour, sugar, salt, yeast, milk, and a small amount of butter. Encase a cold block of butter in the dough and perform three series of folds and rolls with chilling in between to create flaky layers. Shape into triangles and roll up tightly. Proof for 2 hours until doubled, brush with egg wash, and bake at 200C for 15 minutes until deeply golden and shatteringly crispy.',
    strIngredient1: 'Flour', strMeasure1: '500g',
    strIngredient2: 'Butter', strMeasure2: '280g',
    strIngredient3: 'Milk', strMeasure3: '150ml',
    strIngredient4: 'Sugar', strMeasure4: '50g',
    strIngredient5: 'Yeast', strMeasure5: '10g',
    strIngredient6: 'Egg', strMeasure6: '1',
    cookTime: 120, difficulty: 'Hard', servings: 8,
    calories: 340, protein: 6, carbs: 36, fat: 20,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock88',
    strMeal: 'Chimichurri Steak',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg',
    strCategory: 'BBQ',
    strArea: 'Argentinian',
    strTags: 'Grilled,Steak,Herbs',
    strInstructions: 'Make chimichurri by finely chopping fresh parsley, oregano, and garlic, mixing with olive oil, red wine vinegar, and red pepper flakes. Let the sauce rest for at least 30 minutes for flavors to meld. Season thick-cut ribeye steaks generously with coarse salt. Grill over very high heat for 4 minutes per side for medium-rare. Rest for 5 minutes, then slice against the grain and spoon chimichurri over the top.',
    strIngredient1: 'Ribeye Steak', strMeasure1: '2 large',
    strIngredient2: 'Parsley', strMeasure2: '1 large bunch',
    strIngredient3: 'Oregano', strMeasure3: '2 tbsp',
    strIngredient4: 'Red Wine Vinegar', strMeasure4: '3 tbsp',
    strIngredient5: 'Olive Oil', strMeasure5: '100ml',
    strIngredient6: 'Garlic', strMeasure6: '4 cloves',
    cookTime: 15, difficulty: 'Easy', servings: 2,
    calories: 580, protein: 48, carbs: 2, fat: 42,
    dietary: ['gluten-free', 'keto', 'low-carb', 'high-protein'],
  },
  {
    idMeal: 'mock89',
    strMeal: 'Moroccan Tagine',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strCategory: 'Dinner',
    strArea: 'Moroccan',
    strTags: 'Stew,Aromatic,SlowCooked',
    strInstructions: 'Brown lamb shoulder pieces in olive oil, then set aside. Saute onions with ginger, cinnamon, saffron, and cumin until fragrant. Return lamb to the pot, add dried apricots, honey, and enough stock to cover. Simmer gently in a tagine or heavy pot for 2 hours until meat is fall-apart tender. Garnish with toasted almonds and fresh cilantro. Serve with couscous.',
    strIngredient1: 'Lamb Shoulder', strMeasure1: '800g',
    strIngredient2: 'Dried Apricots', strMeasure2: '100g',
    strIngredient3: 'Onion', strMeasure3: '2 large',
    strIngredient4: 'Honey', strMeasure4: '2 tbsp',
    strIngredient5: 'Saffron', strMeasure5: '1 pinch',
    strIngredient6: 'Almonds', strMeasure6: '50g',
    cookTime: 120, difficulty: 'Medium', servings: 6,
    calories: 480, protein: 32, carbs: 28, fat: 26,
    dietary: ['gluten-free'],
  },
  {
    idMeal: 'mock90',
    strMeal: 'Caribbean Coconut Curry Shrimp',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    strCategory: 'Seafood',
    strArea: 'Caribbean',
    strTags: 'Curry,Coconut,Quick',
    strInstructions: 'Saute diced onion, garlic, and scotch bonnet pepper in coconut oil. Add curry powder, thyme, and allspice, cooking for 1 minute until fragrant. Pour in coconut milk and diced tomatoes, bringing to a gentle simmer. Add large shrimp and cook for 5 minutes until pink and curled. Season with lime juice and salt. Serve over coconut rice with fried plantains on the side.',
    strIngredient1: 'Large Shrimp', strMeasure1: '500g',
    strIngredient2: 'Coconut Milk', strMeasure2: '400ml',
    strIngredient3: 'Curry Powder', strMeasure3: '2 tbsp',
    strIngredient4: 'Scotch Bonnet', strMeasure4: '1',
    strIngredient5: 'Thyme', strMeasure5: '3 sprigs',
    strIngredient6: 'Lime', strMeasure6: '1',
    cookTime: 20, difficulty: 'Easy', servings: 4,
    calories: 380, protein: 30, carbs: 12, fat: 24,
    dietary: ['gluten-free', 'dairy-free', 'nut-free', 'high-protein', 'pescatarian', 'halal'],
  },
  {
    idMeal: 'mock91',
    strMeal: 'Overnight Oats',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1529444830.jpg',
    strCategory: 'Breakfast',
    strArea: 'American',
    strTags: 'NoCook,Healthy,MealPrep',
    strInstructions: 'Combine rolled oats with yogurt, milk, chia seeds, and a drizzle of maple syrup in a jar. Stir well, cover, and refrigerate overnight for at least 6 hours. In the morning, stir and top with fresh berries, sliced banana, and a sprinkle of granola for crunch. Can be prepared up to 3 days in advance.',
    strIngredient1: 'Rolled Oats', strMeasure1: '80g',
    strIngredient2: 'Greek Yogurt', strMeasure2: '100g',
    strIngredient3: 'Milk', strMeasure3: '120ml',
    strIngredient4: 'Chia Seeds', strMeasure4: '1 tbsp',
    strIngredient5: 'Maple Syrup', strMeasure5: '1 tbsp',
    strIngredient6: 'Mixed Berries', strMeasure6: '100g',
    cookTime: 5, difficulty: 'Easy', servings: 1,
    calories: 350, protein: 16, carbs: 52, fat: 10,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock92',
    strMeal: 'Korean Fried Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
    strCategory: 'Dinner',
    strArea: 'Korean',
    strTags: 'Fried,Crispy,Spicy',
    strInstructions: 'Marinate chicken wings in ginger, garlic, soy sauce, and rice wine for 1 hour. Dredge in a mix of cornstarch and flour for extra crunch. Double-fry: first at 160C for 8 minutes, rest, then fry again at 190C for 3 minutes until shatteringly crispy. Toss immediately in a sticky gochujang sauce made from gochujang, honey, soy sauce, garlic, and sesame oil. Garnish with sesame seeds and scallions.',
    strIngredient1: 'Chicken Wings', strMeasure1: '1kg',
    strIngredient2: 'Gochujang', strMeasure2: '3 tbsp',
    strIngredient3: 'Honey', strMeasure3: '3 tbsp',
    strIngredient4: 'Cornstarch', strMeasure4: '100g',
    strIngredient5: 'Soy Sauce', strMeasure5: '2 tbsp',
    strIngredient6: 'Garlic', strMeasure6: '4 cloves',
    cookTime: 35, difficulty: 'Medium', servings: 4,
    calories: 520, protein: 32, carbs: 30, fat: 28,
    dietary: [],
  },
  {
    idMeal: 'mock93',
    strMeal: 'Avocado Toast',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    strCategory: 'Breakfast',
    strArea: 'American',
    strTags: 'Quick,Healthy,Brunch',
    strInstructions: 'Toast thick slices of sourdough bread until golden and crispy. Mash ripe avocados with lime juice, salt, and red pepper flakes. Spread generously on the toast. Top with everything bagel seasoning, microgreens, and a drizzle of good olive oil. For extra protein, add a soft-poached egg on top.',
    strIngredient1: 'Sourdough Bread', strMeasure1: '2 slices',
    strIngredient2: 'Avocado', strMeasure2: '1 large',
    strIngredient3: 'Lime', strMeasure3: '1/2',
    strIngredient4: 'Red Pepper Flakes', strMeasure4: '1/4 tsp',
    strIngredient5: 'Olive Oil', strMeasure5: '1 tsp',
    strIngredient6: 'Everything Seasoning', strMeasure6: '1 tsp',
    cookTime: 5, difficulty: 'Easy', servings: 1,
    calories: 310, protein: 7, carbs: 30, fat: 20,
    dietary: ['vegan'],
  },
  {
    idMeal: 'mock94',
    strMeal: 'Lamb Kofta Kebabs',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/urzj1d1587066726.jpg',
    strCategory: 'BBQ',
    strArea: 'Middle Eastern',
    strTags: 'Grilled,Lamb,Spiced',
    strInstructions: 'Mix ground lamb with grated onion, chopped parsley, cumin, coriander, paprika, cinnamon, and salt. Knead the mixture well and refrigerate for 1 hour. Shape around metal skewers in long oval shapes. Grill over medium-high heat for 4-5 minutes per side until cooked through with a nice char. Serve with warm pita, tzatziki, sliced tomato, and pickled onions.',
    strIngredient1: 'Ground Lamb', strMeasure1: '500g',
    strIngredient2: 'Onion', strMeasure2: '1 medium',
    strIngredient3: 'Parsley', strMeasure3: '1/2 bunch',
    strIngredient4: 'Cumin', strMeasure4: '2 tsp',
    strIngredient5: 'Coriander', strMeasure5: '1 tsp',
    strIngredient6: 'Paprika', strMeasure6: '1 tsp',
    cookTime: 20, difficulty: 'Easy', servings: 4,
    calories: 380, protein: 28, carbs: 5, fat: 28,
    dietary: ['gluten-free', 'high-protein'],
  },
  {
    idMeal: 'mock95',
    strMeal: 'Chocolate Lava Cake',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg',
    strCategory: 'Dessert',
    strArea: 'French',
    strTags: 'Chocolate,Elegant,Quick',
    strInstructions: 'Melt dark chocolate and butter together until smooth. Whisk eggs and sugar until thick and pale. Fold the chocolate mixture into the eggs, then sift in a small amount of flour. Pour into buttered and cocoa-dusted ramekins. Bake at 220C for exactly 12 minutes until the edges are set but the center is still jiggly. Invert onto plates immediately and serve with vanilla ice cream.',
    strIngredient1: 'Dark Chocolate', strMeasure1: '200g',
    strIngredient2: 'Butter', strMeasure2: '100g',
    strIngredient3: 'Eggs', strMeasure3: '3',
    strIngredient4: 'Sugar', strMeasure4: '80g',
    strIngredient5: 'Flour', strMeasure5: '30g',
    strIngredient6: 'Cocoa Powder', strMeasure6: '1 tbsp',
    cookTime: 20, difficulty: 'Medium', servings: 4,
    calories: 440, protein: 8, carbs: 38, fat: 30,
    dietary: ['vegetarian'],
  },
  {
    idMeal: 'mock96',
    strMeal: 'Mediterranean Quinoa Salad',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strCategory: 'Salad',
    strArea: 'Greek',
    strTags: 'Healthy,Fresh,MealPrep',
    strInstructions: 'Cook quinoa in salted water until fluffy, then spread on a tray to cool. Dice cucumber, cherry tomatoes, red onion, and kalamata olives. Crumble feta cheese. Toss everything with a bright lemon-oregano vinaigrette made from lemon juice, olive oil, dried oregano, and garlic. Serve at room temperature or chilled. Keeps well in the fridge for up to 3 days.',
    strIngredient1: 'Quinoa', strMeasure1: '200g',
    strIngredient2: 'Cucumber', strMeasure2: '1 large',
    strIngredient3: 'Cherry Tomatoes', strMeasure3: '200g',
    strIngredient4: 'Feta Cheese', strMeasure4: '100g',
    strIngredient5: 'Kalamata Olives', strMeasure5: '80g',
    strIngredient6: 'Lemon Juice', strMeasure6: '3 tbsp',
    cookTime: 20, difficulty: 'Easy', servings: 4,
    calories: 320, protein: 12, carbs: 38, fat: 14,
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    idMeal: 'mock97',
    strMeal: 'Keto Cauliflower Mac and Cheese',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
    strCategory: 'Comfort Food',
    strArea: 'American',
    strTags: 'Keto,LowCarb,Cheese',
    strInstructions: 'Cut cauliflower into small florets and steam until just tender but still with a slight bite. Make a cheese sauce by melting butter, adding cream, and stirring in sharp cheddar, cream cheese, and a touch of mustard powder. Season with garlic powder, salt, and pepper. Toss cauliflower with the cheese sauce, pour into a baking dish, top with more cheddar and crumbled bacon. Broil until bubbly and golden on top.',
    strIngredient1: 'Cauliflower', strMeasure1: '1 large head',
    strIngredient2: 'Sharp Cheddar', strMeasure2: '200g',
    strIngredient3: 'Heavy Cream', strMeasure3: '120ml',
    strIngredient4: 'Cream Cheese', strMeasure4: '60g',
    strIngredient5: 'Bacon', strMeasure5: '4 rashers',
    strIngredient6: 'Butter', strMeasure6: '30g',
    cookTime: 25, difficulty: 'Easy', servings: 4,
    calories: 380, protein: 20, carbs: 8, fat: 30,
    dietary: ['keto', 'low-carb', 'gluten-free'],
  },
  {
    idMeal: 'mock98',
    strMeal: 'Acai Bowl',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg',
    strCategory: 'Breakfast',
    strArea: 'Brazilian',
    strTags: 'Superfood,Healthy,Smoothie',
    strInstructions: 'Blend frozen acai puree packets with a frozen banana and a small splash of almond milk until thick and smooth, like soft-serve consistency. Pour into a bowl and arrange toppings artfully: sliced strawberries, blueberries, granola, shaved coconut, and a drizzle of honey. Add a spoonful of almond butter for healthy fats. Eat immediately before it melts.',
    strIngredient1: 'Acai Puree', strMeasure1: '200g',
    strIngredient2: 'Banana', strMeasure2: '1 frozen',
    strIngredient3: 'Almond Milk', strMeasure3: '60ml',
    strIngredient4: 'Granola', strMeasure4: '40g',
    strIngredient5: 'Strawberries', strMeasure5: '50g',
    strIngredient6: 'Honey', strMeasure6: '1 tbsp',
    cookTime: 5, difficulty: 'Easy', servings: 1,
    calories: 340, protein: 6, carbs: 58, fat: 10,
    dietary: ['vegan', 'gluten-free'],
  },
];

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

// Smart pantry search - returns recipes ranked by ingredient match percentage
export function searchByPantry(pantryItems) {
  if (!pantryItems || !pantryItems.length) return [];

  const results = MOCK_RECIPES.map(recipe => {
    // Extract all recipe ingredients
    const recipeIngredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = recipe[`strIngredient${i}`];
      if (ing && ing.trim()) {
        recipeIngredients.push(ing.trim());
      }
    }

    // Count matched and missing ingredients
    const matched = [];
    const missing = [];

    recipeIngredients.forEach(recipeIng => {
      if (ingredientMatchesPantry(recipeIng, pantryItems)) {
        matched.push(recipeIng);
      } else {
        missing.push(recipeIng);
      }
    });

    const totalIngredients = recipeIngredients.length;
    const matchedCount = matched.length;
    const matchScore = totalIngredients > 0 ? matchedCount / totalIngredients : 0;

    return {
      ...recipe,
      matchScore,
      matchedCount,
      totalIngredients,
      matchedIngredients: matched,
      missingIngredients: missing,
    };
  });

  // Filter to only recipes with at least one match, then sort by match score
  return results
    .filter(r => r.matchedCount > 0)
    .sort((a, b) => {
      // Primary: match score descending
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      // Secondary: more matched ingredients
      return b.matchedCount - a.matchedCount;
    });
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
