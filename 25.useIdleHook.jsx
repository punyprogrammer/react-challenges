import React from "react";

/**
 * Custom Hook: useIdle
 * Tracks if the user is idle based on specific user interactions and a timeout duration.
 *
 * @param {number} ms - The time in milliseconds to wait before considering the user idle (default: 5000ms).
 * @returns {boolean} - `true` if the user is idle, `false` otherwise.
 */
function useIdle(ms = 5000) {
  const [idle, setIdle] = React.useState(false); // State to track idle status
  const timerIdRef = React.useRef(null); // Ref to store the timeout ID

  React.useEffect(() => {
    // Function to handle when the user becomes idle
    const handleTimeout = () => {
      setIdle(true);
    };

    // Function to handle user activity and reset the idle timer
    const handleUserEvent = () => {
      // Clear the previous timeout, if it exists
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }

      // Reset the idle status to active
      setIdle(false);

      // Start a new idle timeout
      timerIdRef.current = setTimeout(handleTimeout, ms);
    };

    // List of events that indicate user activity
    const events = [
      "mousedown",
      "mousemove",
      "resize",
      "keydown",
      "touchstart",
      "wheel",
      "visibilitychange"
    ];

    // Attach event listeners to track user activity
    events.forEach((event) => window.addEventListener(event, handleUserEvent));

    // Cleanup function to remove event listeners and clear the timer
    return () => {
      clearTimeout(timerIdRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, handleUserEvent)
      );
    };
  }, [ms]); // Re-run the effect if `ms` changes

  return idle;
}

export default function App() {
  const idle = useIdle(5000);
  return (
    <section>
      <h1>useIdle</h1>
      <div>
        <span className={idle ? "idle" : ""} />
        <label>Status: {idle ? "Idle" : "Active"}</label>
      </div>
      {idle ? <p>Time to move your mouse</p> : <p>Hold still and wait</p>}
    </section>
  );
}
