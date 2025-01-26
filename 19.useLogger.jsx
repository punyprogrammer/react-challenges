import * as React from "react";

function useLogger(name, ...rest) {
  const initialRenderRef = React.useRef(true);
  const handleLog = React.useCallback((event) => {
    console.log(`${name} ${event} :${rest}`);
  }, []);
  // On every render
  React.useEffect(() => {
    if (!initialRenderRef.current) {
      handleLog("updated");
    }
  });
  // On initial mount
  React.useEffect(() => {
    handleLog(`mounted`);
    initialRenderRef.current = false;
    return () => {
      handleLog("unmounted");
      initialRenderRef.current = true;
    };
  }, []);
}
function FirstChild(props) {
  useLogger(props.name, props);
  return (
    <li className={props.isActive ? "active" : ""}>
      <h5>{props.name}</h5>
      <p>{props.count}</p>
    </li>
  );
}

export default function App() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => setCount(count + 1);

  return (
    <section>
      <h1>useLogger</h1>
      <h6>(Check the console)</h6>
      <button className="primary" onClick={handleClick}>
        Increment Count
      </button>
      <ul>
        {["First", "Second", "Third"].map((item, index) => {
          const isActive = count % 3 === index;
          return (
            <FirstChild
              key={index}
              name={item}
              isActive={isActive}
              count={count}
            />
          );
        })}
      </ul>
    </section>
  );
}
