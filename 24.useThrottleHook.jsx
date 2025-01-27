import * as React from "react";

// useThrottle should return a throttled value
// useThrottle should only update the throttled value at most every interval milliseconds
// useThrottle should update the throttled value immediately if the value changes after interval milliseconds have passed since the last update
// useThrottle should clear the timeout when the component using useThrottle is removed from the DOM

function useThrottle(value, interval = 500) {
  const [throttleValue, setThrottleValue] = React.useState(value);
  const timerIdRef = React.useRef(null);

  React.useEffect(() => {
    // If there's no active timeout, set a new one
    if (!timerIdRef.current) {
      timerIdRef.current = setTimeout(() => {
        setThrottleValue(value); // Use the latest value
        timerIdRef.current = null; // Reset the timer reference
      }, interval);
    }

    // Cleanup function to clear any pending timeout
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, [value, interval]); // Update effect when `value` or `interval` changes

  return throttleValue;
}
export default function App() {
  const [val, setVal] = React.useState("");
  const throttledValue = useThrottle(val);

  return (
    <section>
      <h1>useThrottle</h1>
      <input
        placeholder="Type some text"
        style={{ background: "var(--charcoal)" }}
        type="text"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
      <p>Val: {val}</p>
      <p>Throttled: {throttledValue}</p>
    </section>
  );
}
