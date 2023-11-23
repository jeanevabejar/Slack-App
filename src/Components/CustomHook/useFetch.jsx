import { useState } from "react";
import { toastError } from "@/Utils";

const useFetch = () => {
  // State variables to manage data fetching
  const [data, setData] = useState(null); // Store fetched data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Store any encountered errors
  const [response, setResponse] = useState(null); // Store the raw HTTP response

  // Function to fetch data from the specified URL with optional configuration
  const fetchData = async (url, config = {}) => {
    try {
      // Perform the HTTP request
      const response = await fetch(url, {
        method: config.method,
        headers: {
          "Content-Type": "application/json",
          ...(config.headers || {}),
        },
        body: config.body ? JSON.stringify(config.body) : null,
      });

      // Store the raw HTTP response for reference
      setResponse(response);

      // Parse the response as JSON and store it in the 'data' state
      const result = await response.json();
      setData(result);
    } catch (error) {
      // If an error occurs during the fetch, set the 'error' state and show a toast
      setError(error);
      toastError("Unable to fetch data...");
      console.log("Unable to fetch data...", error);
    } finally {
      // Regardless of success or failure, set 'loading' state to false
      setLoading(false);
    }
  };

  // Return the state variables and the fetchData function for external use
  return { data, loading, error, response, fetchData };
};

export default useFetch;
