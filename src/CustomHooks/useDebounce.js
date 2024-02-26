import { useEffect, useState } from "react";

export const useDebounce = (query, delay = 1000) => {
  const [debounceValue, setDebounceValue] = useState(query);
  useEffect(() => {
    const setTimmer = setTimeout(() => {
      setDebounceValue(query);
    }, delay);
    return () => clearTimeout(setTimmer);
  }, [query, delay]);
  return debounceValue;
};