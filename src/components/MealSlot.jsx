import { motion } from 'framer-motion';

export function MealSlot({ recipe, onAdd, onRemove, onView, draggable, onDragStart, onDragEnd, onMarkCooked, isCooked }) {
  if (!recipe) {
    return (
      <motion.button
        onClick={onAdd}
        whileHover={{ scale: 1.05, borderColor: 'rgb(168 85 247)' }}
        whileTap={{ scale: 0.95 }}
        className="w-full h-24 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-all duration-200 flex items-center justify-center group"
      >
        <motion.div
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/30 flex items-center justify-center transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-brand-500 transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      className="relative h-24 rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-200"
      onClick={onView}
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart?.();
      }}
      onDragEnd={onDragEnd}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-colors duration-300 ${isCooked ? 'mix-blend-normal bg-green-900/20' : ''}`} />
      {isCooked && (
        <div className="absolute inset-0 bg-green-900/20 pointer-events-none" />
      )}

      {/* Drag handle - hidden on mobile (drag doesn't work well), visible on desktop hover */}
      {draggable && (
        <div
          className="absolute top-2 left-2 cursor-grab active:cursor-grabbing group/drag hidden sm:block"
          title="Drag to swap with another meal"
        >
          <div className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover/drag:bg-brand-500 transition-all duration-200 shadow-lg">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="6" r="2" />
              <circle cx="15" cy="6" r="2" />
              <circle cx="9" cy="12" r="2" />
              <circle cx="15" cy="12" r="2" />
              <circle cx="9" cy="18" r="2" />
              <circle cx="15" cy="18" r="2" />
            </svg>
          </div>
          {/* Tooltip on hover - desktop only */}
          <div className="absolute left-0 top-9 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/drag:opacity-100 transition-opacity pointer-events-none z-10">
            Drag to move
          </div>
        </div>
      )}

      <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-bold line-clamp-2 drop-shadow-lg">
        {recipe.strMeal}
      </p>

      {/* Action buttons — top right */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        {/* Mark as cooked */}
        {isCooked ? (
          <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-green-500 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <motion.button
            onClick={(e) => { e.stopPropagation(); onMarkCooked?.(); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-green-500 transition-colors duration-200 shadow-lg"
            aria-label="Mark as cooked"
            title="Mark as cooked"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </motion.button>
        )}

        {/* Remove */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-red-500/80 sm:bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 transition-colors duration-200 shadow-lg"
          aria-label="Remove from meal plan"
        >
          <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
