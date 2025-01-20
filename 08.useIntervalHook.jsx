import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  const intervalId = useRef(null); // Store the interval ID

  // Save the latest callback in a ref
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null || delay === undefined) return;

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    intervalId.current = setInterval(tick, delay);

    // Cleanup on unmount or when delay changes
    return () => {
      clearInterval(intervalId.current);
      intervalId.current = null;
    };
  }, [delay]);

  // Stop function to manually clear the interval
  const stop = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  return stop; // Return the stop function
}

export default useInterval;
