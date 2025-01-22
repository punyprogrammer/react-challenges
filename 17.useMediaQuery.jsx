import * as React from "react";
import "./styles.css";
function useMediaQuery(query) {
  const subscribe = React.useCallback(
    (callback) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query]
  );
  const getSnapshot = () => {
    console.log("Match media", window.matchMedia(query).matches);
    return window.matchMedia(query).matches;
  };
  const getServerSnapshot = () => {
    throw new Error("Hook not supported on server side");
  };
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function App() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px) and (max-width : 1200px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1201px)"
  );

  return (
    <section>
      <h1>useMediaQuery</h1>
      Resize your browser windows to see changes.
      <article>
        <figure className={isSmallDevice ? "active" : ""}>
          {"Phone"}
          <figcaption>Small</figcaption>
        </figure>
        <figure className={isMediumDevice ? "active" : ""}>
          {"Tablet"}
          <figcaption>Medium</figcaption>
        </figure>
        <figure className={isLargeDevice ? "active" : ""}>
          {"Laptop"}
          <figcaption>Large</figcaption>
        </figure>
        <figure className={isExtraLargeDevice ? "active" : ""}>
          {"Desktop"}
          <figcaption>Extra Large</figcaption>
        </figure>
      </article>
    </section>
  );
}
