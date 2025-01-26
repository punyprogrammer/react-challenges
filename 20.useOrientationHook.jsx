import * as React from "react";

/**
 * Custom hook to listen for changes in screen orientation.
 * - Supports modern browsers using `screen.orientation` API.
 * - Falls back to `window.orientation` for older browsers.
 */
function useOrientation() {
  // State to track the current orientation type and angle
  const [state, setState] = React.useState({
    angle: 0,
    type: "UNKNOWN", // Default type if orientation data is unavailable
  });

  React.useLayoutEffect(() => {
    // Handler for modern browsers supporting `screen.orientation`
    const handleChange = () => {
      const { type, angle } = window.screen.orientation;
      setState({ type, angle });
    };

    // Handler for older browsers using `window.orientation`
    const handleChangeOld = () => {
      setState({
        type: "UNKNOWN",
        angle: window.orientation || 0, // Default angle to 0 if undefined
      });
    };

    // Check if `screen.orientation` is supported
    if (window.screen.orientation) {
      handleChange(); // Set initial state
      window.screen.orientation.addEventListener("change", handleChange); // Listen for changes
    } else {
      handleChangeOld(); // Set initial state for older browsers
      window.addEventListener("orientationchange", handleChangeOld); // Listen for fallback event
    }

    // Cleanup event listeners on unmount
    return () => {
      if (window.screen.orientation) {
        window.screen.orientation.removeEventListener("change", handleChange);
      } else {
        window.removeEventListener("orientationchange", handleChangeOld);
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return state; // Return the current orientation state
}

export default function App() {
  // Use the `useOrientation` hook to get orientation details
  const orientation = useOrientation();
  console.log("ORIENTATION", orientation);

  return (
    <section>
      <h1>useOrientation</h1>

      {/* Display an element that rotates based on the orientation angle */}
      <article
        style={{
          transform: `rotate(${orientation.angle}deg)`,
          width: "100px",
          height: "100px",
          background: "lightseagreen",
          margin: "20px auto",
          borderRadius: "8px",
        }}
        className={orientation.type.toLowerCase()}
      />

      {/* Display a table showing the current orientation type and angle */}
      <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "50%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>
              Property
            </th>
            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(orientation).map(([key, value]) => (
            <tr key={key}>
              <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>
                {key}
              </th>
              <td style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
