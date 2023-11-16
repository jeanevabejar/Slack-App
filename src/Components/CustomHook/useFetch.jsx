import { useState, useEffect } from 'react';

import { useState, useEffect } from 'react';

const useFetch = (url, config = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...config,
          headers: {
            'Content-Type': 'application/json',
            ...(config.headers || {}),
          },
          body: config.body ? JSON.stringify(config.body) : undefined,
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return { data, loading, error };
};

export default useFetch;