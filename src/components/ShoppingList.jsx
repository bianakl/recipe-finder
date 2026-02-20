import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecipes } from '../context/RecipeContext';

const CATEGORY_ICONS = {
  'Meat & Seafood': '🥩',
  'Dairy & Eggs': '🥛',
  'Grains & Bread': '🍞',
  'Produce': '🥬',
  'Fruits': '🍎',
  'Spices': '🌶️',
  'Pantry': '🫙',
  'Other': '📦',
};

const CATEGORY_ORDER = ['Produce', 'Fruits', 'Meat & Seafood', 'Dairy & Eggs', 'Grains & Bread', 'Spices', 'Pantry', 'Other'];

export function ShoppingList() {
  const {
    shoppingList,
    generateShoppingList,
    toggleShoppingItem,
    clearShoppingList,
    removeFromShoppingList,
    addToShoppingList,
    mealPlan,
  } = useRecipes();

  const [viewMode, setViewMode] = useState('aisle'); // 'aisle' | 'recipe'
  const [hideChecked, setHideChecked] = useState(false);
  const [customItem, setCustomItem] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const inputRef = useRef(null);

  const hasMealsPlanned = useMemo(() => {
    return Object.values(mealPlan).some(day =>
      Object.values(day).some(meal => meal !== null)
    );
  }, [mealPlan]);

  const visibleList = useMemo(() => {
    return hideChecked ? shoppingList.filter(i => !i.checked) : shoppingList;
  }, [shoppingList, hideChecked]);

  const checkedCount = useMemo(() => shoppingList.filter(i => i.checked).length, [shoppingList]);
  const totalCount = shoppingList.length;
  const progress = totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100);
  const allDone = totalCount > 0 && checkedCount === totalCount;

  // Grouped by aisle/category
  const byAisle = useMemo(() => {
    const groups = {};
    visibleList.forEach(item => {
      const cat = item.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    // Sort groups by preferred store order
    return CATEGORY_ORDER
      .filter(cat => groups[cat])
      .map(cat => ({ category: cat, items: groups[cat] }))
      .concat(
        Object.keys(groups)
          .filter(cat => !CATEGORY_ORDER.includes(cat))
          .map(cat => ({ category: cat, items: groups[cat] }))
      );
  }, [visibleList]);

  // Grouped by recipe
  const byRecipe = useMemo(() => {
    const groups = {};
    const noRecipe = [];

    visibleList.forEach(item => {
      if (item.recipes && item.recipes.length > 0) {
        item.recipes.forEach(recipe => {
          if (!groups[recipe.id]) {
            groups[recipe.id] = { id: recipe.id, name: recipe.name, items: [] };
          }
          // Only add if not already in this recipe group
          if (!groups[recipe.id].items.find(i => i.id === item.id)) {
            groups[recipe.id].items.push(item);
          }
        });
      } else {
        noRecipe.push(item);
      }
    });

    const result = Object.values(groups);
    if (noRecipe.length > 0) {
      result.push({ id: 'extra', name: 'Extra Items', items: noRecipe });
    }
    return result;
  }, [visibleList]);

  const handleAddCustomItem = (e) => {
    e.preventDefault();
    const trimmed = customItem.trim();
    if (!trimmed) return;
    addToShoppingList(trimmed, '', null, null);
    setCustomItem('');
    inputRef.current?.focus();
  };

  const handleRemove = (itemId) => {
    setRemovingId(itemId);
    setTimeout(() => {
      removeFromShoppingList(itemId);
      setRemovingId(null);
    }, 200);
  };

  const handleCopyList = () => {
    const lines = shoppingList.map(item => {
      const qty = item.quantity && item.quantity !== '1' ? ` (${item.quantity})` : '';
      const done = item.checked ? '✓ ' : '• ';
      return `${done}${item.name}${qty}`;
    });
    const text = `Shopping List\n\n${lines.join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  if (shoppingList.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30 flex items-center justify-center">
            <svg className="w-12 h-12 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No Shopping List Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
            {hasMealsPlanned
              ? 'Generate a shopping list from your planned meals'
              : 'Add some recipes to your meal plan first, then generate your list here'}
          </p>
          {hasMealsPlanned && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateShoppingList}
              className="btn-primary"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generate Shopping List
            </motion.button>
          )}
        </div>

        {/* Quick add even when list is empty */}
        <QuickAdd
          value={customItem}
          onChange={setCustomItem}
          onSubmit={handleAddCustomItem}
          inputRef={inputRef}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping List</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {checkedCount} of {totalCount} items picked up
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyList}
            className="btn-ghost text-sm flex items-center gap-1.5"
          >
            <AnimatePresence mode="wait">
              {showCopied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-600 dark:text-green-400 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateShoppingList}
            className="btn-secondary text-sm"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearShoppingList}
            className="btn-ghost text-sm text-red-600 dark:text-red-400"
          >
            Clear
          </motion.button>
        </div>
      </div>

      {/* Progress */}
      <AnimatePresence>
        {allDone ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-white text-center"
          >
            <div className="text-3xl mb-1">🎉</div>
            <p className="font-bold text-lg">You got everything!</p>
            <p className="text-green-100 text-sm">Happy cooking this week!</p>
          </motion.div>
        ) : (
          <motion.div
            key="progress"
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</span>
              <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{progress}%</span>
            </div>
            <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* View mode toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setViewMode('aisle')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'aisle'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            🏪 By Aisle
          </button>
          <button
            onClick={() => setViewMode('recipe')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'recipe'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            🍳 By Recipe
          </button>
        </div>

        {/* Hide checked toggle */}
        <button
          onClick={() => setHideChecked(h => !h)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border ${
            hideChecked
              ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {hideChecked ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            )}
          </svg>
          {hideChecked ? `Showing ${visibleList.length} left` : 'Hide checked'}
        </button>
      </div>

      {/* Quick Add */}
      <QuickAdd
        value={customItem}
        onChange={setCustomItem}
        onSubmit={handleAddCustomItem}
        inputRef={inputRef}
      />

      {/* List */}
      <AnimatePresence mode="wait">
        {viewMode === 'aisle' ? (
          <motion.div
            key="aisle"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-5"
          >
            {byAisle.length === 0 ? (
              <EmptyFiltered />
            ) : (
              byAisle.map(({ category, items }) => (
                <CategorySection
                  key={category}
                  title={category}
                  icon={CATEGORY_ICONS[category] || '📦'}
                  items={items}
                  onToggle={toggleShoppingItem}
                  onRemove={handleRemove}
                  removingId={removingId}
                />
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            key="recipe"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-5"
          >
            {byRecipe.length === 0 ? (
              <EmptyFiltered />
            ) : (
              byRecipe.map(group => (
                <RecipeSection
                  key={group.id}
                  group={group}
                  onToggle={toggleShoppingItem}
                  onRemove={handleRemove}
                  removingId={removingId}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function QuickAdd({ value, onChange, onSubmit, inputRef }) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Add an item (e.g. trash bags, olive oil...)"
        className="flex-1 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 transition-colors"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!value.trim()}
        className="px-4 py-3 bg-brand-600 text-white font-semibold rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
      >
        Add
      </motion.button>
    </form>
  );
}

function CategorySection({ title, icon, items, onToggle, onRemove, removingId }) {
  const allChecked = items.every(i => i.checked);

  return (
    <div>
      <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${
        allChecked ? 'text-gray-400 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'
      }`}>
        <span>{icon}</span>
        {title}
        <span className="font-normal">({items.length})</span>
        {allChecked && <span className="text-green-500">✓</span>}
      </h3>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
        {items.map(item => (
          <ShoppingItem
            key={item.id}
            item={item}
            onToggle={onToggle}
            onRemove={onRemove}
            isRemoving={removingId === item.id}
          />
        ))}
      </div>
    </div>
  );
}

function RecipeSection({ group, onToggle, onRemove, removingId }) {
  const checked = group.items.filter(i => i.checked).length;
  const total = group.items.length;
  const isComplete = checked === total;
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h3 className={`text-xs font-bold uppercase tracking-wider flex-1 ${
          isComplete ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {group.id === 'extra' ? '➕' : '🍳'} {group.name}
        </h3>
        <span className={`text-xs font-medium ${
          isComplete ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'
        }`}>
          {checked}/{total}
        </span>
      </div>
      {total > 1 && (
        <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4 }}
            className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-brand-500'}`}
          />
        </div>
      )}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
        {group.items.map(item => (
          <ShoppingItem
            key={item.id}
            item={item}
            onToggle={onToggle}
            onRemove={onRemove}
            isRemoving={removingId === item.id}
            showCategory
          />
        ))}
      </div>
    </div>
  );
}

function ShoppingItem({ item, onToggle, onRemove, isRemoving, showCategory }) {
  return (
    <motion.div
      animate={{ opacity: isRemoving ? 0 : 1, x: isRemoving ? 20 : 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-3 px-4 py-3.5 transition-colors group ${
        item.checked
          ? 'bg-gray-50 dark:bg-gray-800/30'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'
      }`}
    >
      {/* Large tap target checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        className={`w-7 h-7 shrink-0 rounded-lg border-2 flex items-center justify-center transition-all ${
          item.checked
            ? 'bg-brand-600 border-brand-600 shadow-sm shadow-brand-500/30'
            : 'border-gray-300 dark:border-gray-600 hover:border-brand-400'
        }`}
        aria-label={item.checked ? 'Uncheck item' : 'Check item'}
      >
        {item.checked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </button>

      {/* Item info */}
      <div className="flex-1 min-w-0" onClick={() => onToggle(item.id)}>
        <p className={`font-medium text-sm transition-all cursor-pointer ${
          item.checked
            ? 'text-gray-400 dark:text-gray-500 line-through'
            : 'text-gray-900 dark:text-white'
        }`}>
          {item.name}
        </p>
        {showCategory && item.category && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {CATEGORY_ICONS[item.category] || '📦'} {item.category}
          </p>
        )}
        {item.recipes && item.recipes.length > 0 && !showCategory && (
          <div className="flex flex-wrap gap-1 mt-1">
            {item.recipes.map(r => (
              <span
                key={r.id}
                className="inline-block px-1.5 py-0.5 text-[10px] font-medium rounded bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
              >
                {r.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Quantity */}
      {item.quantity && item.quantity !== '1' && (
        <span className={`text-xs font-medium shrink-0 transition-colors ${
          item.checked
            ? 'text-gray-300 dark:text-gray-600'
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {item.quantity}
        </span>
      )}

      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 dark:text-gray-600 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Remove item"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

function EmptyFiltered() {
  return (
    <div className="text-center py-8 text-gray-400 dark:text-gray-500">
      <p className="text-4xl mb-2">✓</p>
      <p className="font-medium">All items checked off!</p>
    </div>
  );
}
