import { useState, useEffect, useRef } from 'react';
import { searchRecipes } from '../services/api';

export function useRecipeSearch(query, debounceMs = 300) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const timeoutId = setTimeout(async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const meals = await searchRecipes(query);
        setResults(meals);
        setHasSearched(true);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to search recipes. Please try again.');
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      clearTimeout(timeoutId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, debounceMs]);

  return { results, isLoading, error, hasSearched };
}
