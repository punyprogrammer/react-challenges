import React from "react";

function useEventListener(target, eventName, handler, options) {
  const memoizedHandler = React.useCallback(handler, [handler]);

  React.useEffect(() => {
    // Resolve the target (supports React ref objects and direct DOM nodes)
    const targetElement = target?.current || target;

    if (!targetElement?.addEventListener) {
      console.warn(`Target is not a valid event target: ${targetElement}`);
      return;
    }

    // Attach the event listener
    targetElement.addEventListener(eventName, memoizedHandler, options);

    // Cleanup the event listener on unmount or dependency change
    return () => {
      targetElement.removeEventListener(eventName, memoizedHandler, options);
    };
  }, [target, eventName, memoizedHandler, options]); // Include memoizedHandler as a dependency
}

export default useEventListener;
