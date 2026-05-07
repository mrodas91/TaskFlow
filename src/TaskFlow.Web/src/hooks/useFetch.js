import { useState, useEffect } from 'react';

export function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function execute() {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction();
            if (!cancelled) setData(result);
        } catch (err) {
            if (!cancelled) setError(err.message);
        } finally {
            if (!cancelled) setLoading(false);
        }
    }
    execute();

    return () => { cancelled = true; };
    }, dependencies);

  return { data, loading, error };
}