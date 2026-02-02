import { motion } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';

export function RecipeCard({ recipe, onClick, index = 0 }) {
  const { isRecipeSaved, saveRecipe, unsaveRecipe } = useRecipes();
  const isSaved = isRecipeSaved(recipe.idMeal);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (isSaved) {
      unsaveRecipe(recipe.idMeal);
    } else {
      saveRecipe(recipe);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8 }}
      className="card cursor-pointer group glow"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        <motion.button
          onClick={handleSaveClick}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-4 right-4 w-11 h-11 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300 ${
            isSaved
              ? 'bg-red-500 shadow-red-500/30'
              : 'bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900'
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save recipe'}
        >
          <motion.svg
            animate={isSaved ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
            className={`w-5 h-5 ${isSaved ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isSaved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </motion.svg>
        </motion.button>

        <div className="absolute bottom-4 left-4 right-4">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 + 0.2 }}
            className="font-bold text-white text-lg line-clamp-2 drop-shadow-lg"
          >
            {recipe.strMeal}
          </motion.h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {recipe.strCategory && (
            <span className="badge-primary">
              {recipe.strCategory}
            </span>
          )}
          {recipe.strArea && (
            <span className="badge-secondary">
              {recipe.strArea}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
