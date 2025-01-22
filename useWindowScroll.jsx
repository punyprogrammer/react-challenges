import * as React from "react";
import "./styles.css";
function useWindowScroll() {
  // returns the current position and a callback to scrollTo a given
  // arguments can be object {left,top:behavior}. or {x,y}
  const [state, setState] = React.useState({ x: null, y: null });
  const scrollTo = (...args) => {
    // if object
    if (typeof args[0] === "object") {
      window.scrollTo(args[0]);
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      window.scrollTo(args[0], args[1]);
    } else {
      throw new Error("Invalid arguments passed!");
    }
  };
  const handleScroll = () => {
    setState({ x: window.scrollX, y: window.scrollY });
  };

  React.useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return [state, scrollTo];
}
export default function App() {
  const [{ x, y }, scrollTo] = useWindowScroll();
  return (
    <section>
      <header>
        <h1>useWindowScroll</h1>
        <button className="link" onClick={() => scrollTo(0, 1000)}>
          Scroll To (0, 1000)
        </button>
        <button
          className="link"
          onClick={() => scrollTo({ left: 0, top: 2000, behavior: "smooth" })}
        >
          Scroll To (0, 2000) (Smoothly)
        </button>
        <button
          className="link"
          onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
        >
          Back To The Top
        </button>
      </header>

      {new Array(50).fill().map((_, index) => {
        return <p key={index}>{index}</p>;
      })}
      <aside style={{ position: "fixed", bottom: 0, right: 0 }}>
        Coordinates <span className="x">x: {x}</span>{" "}
        <span className="y">y: {y}</span>{" "}
      </aside>
    </section>
  );
}
