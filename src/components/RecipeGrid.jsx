import { RecipeCard } from './RecipeCard';

export function RecipeGrid({ recipes, onRecipeClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          index={index}
          onClick={() => onRecipeClick(recipe)}
        />
      ))}
    </div>
  );
}
