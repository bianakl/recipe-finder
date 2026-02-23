import { useEffect, useCallback } from 'react';

/**
 * Hook to handle browser back button behavior
 * Pushes a history entry when modal opens, pops and closes when back is pressed
 */
export function useBackButton(isOpen, onClose, stateKey = 'modal') {
  const handlePopState = useCallback((event) => {
    // If modal is open and we get a popstate, close the modal
    if (isOpen) {
      event.preventDefault();
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      // Push a new history entry when modal opens
      window.history.pushState({ [stateKey]: true }, '');
    }
  }, [isOpen, stateKey]);

  useEffect(() => {
    // Listen for back button
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  // Clean up history entry if modal closes by other means
  useEffect(() => {
    return () => {
      if (isOpen && window.history.state?.[stateKey]) {
        window.history.back();
      }
    };
  }, [isOpen, stateKey]);
}

/**
 * Hook for tab-based navigation with history support
 */
export function useTabHistory(activeTab, setActiveTab, defaultTab = 'search') {
  const ALL_TABS = ['search', 'saved', 'planner', 'shopping', 'nutrition', 'history', 'suggestions', 'ingredients', 'pantry', 'data', 'settings'];

  // Handle initial load from URL hash (skip recipe hashes — App.jsx handles those)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash.startsWith('recipe/') && ALL_TABS.includes(hash)) {
      setActiveTab(hash);
    }
  }, [setActiveTab]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update URL hash when tab changes (only if a recipe isn't currently open)
  useEffect(() => {
    if (window.location.hash.startsWith('#recipe/')) return;
    const newHash = `#${activeTab}`;
    if (window.location.hash !== newHash) {
      window.history.pushState({ tab: activeTab }, '', newHash);
    }
  }, [activeTab]);

  // Handle browser back/forward for tabs
  useEffect(() => {
    const handlePopState = (event) => {
      const hash = window.location.hash.slice(1);
      // Recipe-hash navigation is handled by useBackButton — skip here
      if (hash.startsWith('recipe/')) return;
      if (ALL_TABS.includes(hash)) {
        setActiveTab(hash);
      } else if (event.state?.tab) {
        setActiveTab(event.state.tab);
      } else {
        setActiveTab(defaultTab);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setActiveTab, defaultTab]);
}
