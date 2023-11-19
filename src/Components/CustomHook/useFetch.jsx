import { useState } from "react";
import { toastError } from "@/Utils";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = async (url, config = {}) => {
    try {
      const response = await fetch(url, {
        method: config.method,
        headers: {
          "Content-Type": "application/json",
          ...(config.headers || {}),
        },
        body: config.body ? JSON.stringify(config.body) : undefined,
      });
    
      setResponse(response)
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
      toastError("Unable to fetch data...")
      console.log("Unable to fetch data...");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, response, fetchData };
};

export default useFetch;
