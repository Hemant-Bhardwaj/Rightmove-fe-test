import { useState, useEffect } from 'react';

/**
 * useProperties
 *
 * A custom React hook to load the full list of properties
 * from the backend `/api/properties` endpoint.
 *
 * Returns:
 *   properties  – Array of property objects (initially empty)
 *   isLoading   – Boolean flag, true while the fetch is in progress
 *   error       – Any error encountered during fetch (or null)
 */
export default function useProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    // Create an AbortController to cancel fetch if the component unmounts
    const controller = new AbortController();
    const { signal } = controller;

    async function load() {
      // Reset state before each load
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/properties', { signal });

        // Throw on non-2xx status codes
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();

        // Only update state if request wasn't aborted
        if (!signal.aborted) {
          setProperties(data);
        }
      } catch (err) {
        // Ignore abort errors, handle all others
        if (err.name !== 'AbortError') {
          console.error('useProperties failed:', err);
          setError(err);
        }
      } finally {
        // Mark loading as finished if still mounted
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    load();

    // Cleanup: abort fetch on unmount
    return () => {
      controller.abort();
    };
  }, []);

  return { properties, isLoading, error };
}
