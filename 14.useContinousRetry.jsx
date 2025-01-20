import React from "react";
// The useContinuousRetry hook allows you to repeatedly call a specified callback function at a 
// defined interval until the callback returns a truthy value, indicating a successful resolution. 
// This hook is particularly handy when dealing with asynchronous operations or API calls that may fail temporarily and need to be retried automatically.
// It encapsulates the logic of retrying and provides a clean interface to handle retry-related states, such as whether the retry process has resolved or not.
function useContinuousRetry(callback, delay, maxRetries = 15) {
  const [hasResolved, setHasResolved] = React.useState(false);

  const memoizedCallback = React.useCallback(callback, []);

  React.useEffect(() => {
    let retries = 0;

    const id = setInterval(() => {
      if (retries === maxRetries) {
        clearInterval(id); // Stop retrying if max retries reached
      } else if (memoizedCallback()) {
        setHasResolved(true);
        clearInterval(id); // Stop retrying if resolved
      } else {
        retries++;
      }
    }, delay);

    return () => clearInterval(id); // Cleanup interval on unmount
  }, [memoizedCallback, delay, maxRetries]);

  return hasResolved;
}

export default useContinuousRetry;
