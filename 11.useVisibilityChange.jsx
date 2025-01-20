import * as React from "react";

function useVisibilityChange() {
  const subscribe = (callback) => {
    document.addEventListener("visibilitychange", callback);
    return () => {
      document.removeEventListener("visibilitychange", callback);
    };
  };
  const getSnapshot = () => {
    return document.visibilityState;
  };
  const getServerSnapshot = () => {
    throw Error("This is a client supported hook");
  };
  const visibilityState = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  return visibilityState === "visible";
}
export default function App() {
  const documentVisible = useVisibilityChange();
  const [tabAwayCount, setTabAwayCount] = React.useState(0);

  React.useEffect(() => {
    if (documentVisible === false) {
      setTabAwayCount((c) => c + 1);
    }
  }, [documentVisible]);

  return (
    <section>
      <h1>useVisibilityChange</h1>
      <div>Tab Away Count: {tabAwayCount}</div>
    </section>
  );
}
