import * as React from "react";

/**
 * Custom hook: usePageLeave
 * Tracks when a user leaves or navigates away from a web page by listening for the `mouseout` event.
 *
 * Features:
 * - Accepts a callback function (`cb`) as its argument.
 * - Listens for the `mouseout` event on the document.
 * - Calls the provided callback function when the user mouses out of the page.
 * - Ensures the callback is not triggered if the user mouses out and then back in.
 * - Cleans up the event listener when the component using this hook unmounts.
 *
 * @param {Function} cb - Callback function to execute when the user leaves the page.
 */
function usePageLeave(cb) {
  // Memoized handler to detect mouse leaving the page
  const onLeave = React.useCallback((event) => {
    const to = event.relatedTarget || event.toElement; // Target element the mouse is moving to
    // If there is no target (null) or the target is the HTML root element, call the callback
    if (!to || to.nodeName === "HTML") {
      cb();
    }
  }, [cb]);

  // Attach and clean up the `mouseout` event listener
  React.useEffect(() => {
    document.addEventListener("mouseout", onLeave);
    return () => {
      document.removeEventListener("mouseout", onLeave);
    };
  }, [onLeave]); // Dependency ensures the effect re-runs if `onLeave` changes
}

/**
 * Example Component: App
 * Demonstrates the use of the `usePageLeave` hook.
 * Tracks how many times the user has moved their mouse out of the page.
 */
export default function App() {
  const [distractions, setDistractions] = React.useState(0); // State to track distractions

  // Increment distractions count when the user leaves the page
  usePageLeave(() => {
    console.log("User left the page");
    setDistractions((prevCount) => prevCount + 1);
  });

  return (
    <section style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>usePageLeave</h1>
      <p>(Mouse out of the page to see this in action)</p>
      <h3>
        You've been distracted {distractions}{" "}
        {distractions === 1 ? "time" : "times"}.
      </h3>
    </section>
  );
}
