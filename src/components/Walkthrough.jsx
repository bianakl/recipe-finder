import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WALKTHROUGH_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to Recipe Finder!',
    description: 'Your personal meal planning assistant. Let me show you around in just a few steps.',
    icon: '👋',
    target: null, // Center modal
  },
  {
    id: 'search',
    title: 'Search for Recipes',
    description: 'Type any dish, ingredient, or cuisine to discover delicious recipes. Try "pasta" or "chicken"!',
    icon: '🔍',
    target: '[data-tour="search"]',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'pantry',
    title: "My Pantry",
    description: "Add the ingredients you have at home. We'll find recipes that match and show you what you can cook.",
    icon: '🫙',
    target: '[data-tour="pantry"]',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'tabs',
    title: 'Navigate the App',
    description: 'Switch between discovering recipes, your saved favorites, meal planning, shopping lists, and more!',
    icon: '📑',
    target: '[data-tour="tabs"]',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'save',
    title: 'Save Your Favorites',
    description: 'When you find a recipe you love, click the heart to save it. Your collection lives in the Saved tab.',
    icon: '💜',
    target: '[data-tour="saved-tab"]',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'planner',
    title: 'Plan Your Meals',
    description: 'Drag saved recipes into your weekly meal plan. Breakfast, lunch, and dinner — all organized!',
    icon: '📅',
    target: '[data-tour="planner-tab"]',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'shopping',
    title: 'Auto Shopping List',
    description: 'One click generates a complete shopping list from your meal plan. Grouped by category!',
    icon: '🛒',
    target: '[data-tour="shopping-tab"]',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'ready',
    title: "You're Ready!",
    description: "Start by searching for something tasty. Happy cooking! 🍳",
    icon: '🎉',
    target: null,
  }
];

export function Walkthrough({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const step = WALKTHROUGH_STEPS[currentStep];
  const isLastStep = currentStep === WALKTHROUGH_STEPS.length - 1;
  const progress = ((currentStep + 1) / WALKTHROUGH_STEPS.length) * 100;

  // Find and highlight target element
  useEffect(() => {
    if (step.target) {
      const element = document.querySelector(step.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        // Scroll element into view if needed
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setTargetRect(null);
      }
    } else {
      setTargetRect(null);
    }
  }, [step.target, currentStep]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  // Calculate tooltip position
  const getTooltipStyle = () => {
    if (!targetRect || !step.target) {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    const padding = 16;
    const tooltipWidth = 320;

    let top, left;

    switch (step.position) {
      case 'bottom':
        top = targetRect.bottom + padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'top':
        top = targetRect.top - padding - 200; // Approximate tooltip height
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - 100;
        left = targetRect.left - tooltipWidth - padding;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - 100;
        left = targetRect.right + padding;
        break;
      default:
        top = targetRect.bottom + padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
    }

    // Keep tooltip on screen
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));
    top = Math.max(padding, top);

    return {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      width: `${tooltipWidth}px`
    };
  };

  // Arrow pointing to target
  const Arrow = () => {
    if (!targetRect || !step.arrow) return null;

    const arrowStyle = {
      position: 'absolute',
      width: 0,
      height: 0,
    };

    switch (step.arrow) {
      case 'top':
        return (
          <div
            style={{
              ...arrowStyle,
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderBottom: '12px solid white',
            }}
            className="dark:border-b-gray-900"
          />
        );
      case 'bottom':
        return (
          <div
            style={{
              ...arrowStyle,
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '12px solid white',
            }}
            className="dark:border-t-gray-900"
          />
        );
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] pointer-events-none">
        {/* Backdrop with cutout for target */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-auto"
          onClick={handleComplete}
        >
          {targetRect ? (
            <svg className="w-full h-full">
              <defs>
                <mask id="spotlight-mask">
                  <rect width="100%" height="100%" fill="white" />
                  <rect
                    x={targetRect.left - 8}
                    y={targetRect.top - 8}
                    width={targetRect.width + 16}
                    height={targetRect.height + 16}
                    rx="16"
                    fill="black"
                  />
                </mask>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="rgba(0,0,0,0.75)"
                mask="url(#spotlight-mask)"
              />
            </svg>
          ) : (
            <div className="w-full h-full bg-black/75 backdrop-blur-sm" />
          )}
        </motion.div>

        {/* Spotlight ring around target */}
        {targetRect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute pointer-events-none"
            style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
            }}
          >
            <div className="w-full h-full rounded-2xl ring-4 ring-brand-500 ring-offset-4 ring-offset-transparent animate-pulse" />
          </motion.div>
        )}

        {/* Tooltip */}
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={getTooltipStyle()}
          className="pointer-events-auto"
        >
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <Arrow />

            {/* Progress Bar */}
            <div className="h-1 bg-gray-200 dark:bg-gray-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-brand-500 to-pink-500"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <motion.div
                  key={step.icon}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-pink-100 dark:from-brand-900/30 dark:to-pink-900/30 flex items-center justify-center shrink-0"
                >
                  <span className="text-2xl">{step.icon}</span>
                </motion.div>

                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1">
                  {WALKTHROUGH_STEPS.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentStep
                          ? 'w-4 bg-brand-500'
                          : index < currentStep
                          ? 'bg-brand-300 dark:bg-brand-700'
                          : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {currentStep > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePrev}
                      className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Back
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="px-4 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-lg shadow-md"
                  >
                    {isLastStep ? "Got it!" : 'Next'}
                  </motion.button>
                </div>
              </div>

              {/* Skip */}
              {!isLastStep && (
                <button
                  onClick={handleComplete}
                  className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Skip tutorial
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Floating help button component
export function ExploreButton({ onClick }) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-brand-600 to-pink-500 text-white shadow-lg shadow-brand-500/30 flex items-center justify-center group"
    >
      <span className="text-2xl group-hover:animate-bounce">?</span>
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Take a tour
      </span>
    </motion.button>
  );
}
