import * as React from "react";

/**
 * Custom Hook: useKeyPress
 * Listens for a specific key press and executes the provided callback when the key is pressed.
 *
 * @param {string} key - The key to listen for (e.g., "ArrowUp", "ArrowDown").
 * @param {function} cb - The callback function to execute when the key is pressed.
 * @param {object} options - Additional options for event handling.
 *   - {string} options.event - The event type to listen for (default: "keydown").
 *   - {object} options.target - The target element to attach the listener to (default: window).
 *   - {object} options.eventOptions - Additional options for addEventListener (e.g., capture).
 */
function useKeyPress(key, cb, options = {}) {
  const { event = "keydown", target = window ?? null, eventOptions } = options;

  // Memoized callback to ensure stability of the handler
  const onListen = React.useCallback(cb, [cb]);

  // Event handler to check if the pressed key matches the specified key
  const handler = (event) => {
    if (event.key === key) {
      onListen(event);
    }
  };

  // Effect to attach and clean up the event listener
  React.useEffect(() => {
    if (!target) return; // Ensure the target is valid
    target.addEventListener(event, handler, eventOptions);
    return () => {
      target.removeEventListener(event, handler, eventOptions);
    };
  }, [event, target, eventOptions, handler]); // Dependencies ensure proper cleanup and reattachment
}

/**
 * App Component
 * Demonstrates the use of the `useKeyPress` hook by detecting arrow key presses.
 */
export default function App() {
  const [activeKey, setActiveKey] = React.useState(""); // State to track the currently active key

  // Set up key listeners for the arrow keys
  useKeyPress("ArrowRight", onKeyPress);
  useKeyPress("ArrowLeft", onKeyPress);
  useKeyPress("ArrowUp", onKeyPress);
  useKeyPress("ArrowDown", onKeyPress);

  /**
   * Key press handler
   * Sets the active key and clears it after a short delay.
   *
   * @param {Event} e - The keyboard event object.
   */
  function onKeyPress(e) {
    e.preventDefault(); // Prevent default browser behavior (e.g., scrolling)
    setActiveKey(e.key); // Set the active key
    setTimeout(() => {
      setActiveKey(""); // Clear the active key after 600ms
    }, 600);
  }

  return (
    <section style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>useKeyPress</h1>
      <p>Press one of the arrow keys on your keyboard</p>

      {/* Render buttons for each arrow key */}
      <article
        style={{ display: "flex", justifyContent: "center", gap: "20px" }}
      >
        <button
          className={activeKey === "ArrowUp" ? "pressed" : ""}
          style={{ width: "50px", height: "50px" }}
        >
          <span>&uarr;</span>
        </button>
        <button
          className={activeKey === "ArrowLeft" ? "pressed" : ""}
          style={{ width: "50px", height: "50px" }}
        >
          <span>&larr;</span>
        </button>
        <button
          className={activeKey === "ArrowDown" ? "pressed" : ""}
          style={{ width: "50px", height: "50px" }}
        >
          <span>&darr;</span>
        </button>
        <button
          className={activeKey === "ArrowRight" ? "pressed" : ""}
          style={{ width: "50px", height: "50px" }}
        >
          <span>&rarr;</span>
        </button>
      </article>

      {/* Display a label when a key is pressed */}
      {Boolean(activeKey) && (
        <label style={{ display: "block", marginTop: "20px" }}>
          {activeKey} was pressed
        </label>
      )}
    </section>
  );
}
