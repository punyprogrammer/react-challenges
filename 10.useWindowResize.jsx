import { useLayoutEffect, useState } from "react";

function Browser({ size }) {
  return (
    <div
      data-testid="browser"
      className="browser"
      style={{ width: size.width / 4, height: size.height / 4 }}
    />
  );
}
function useWindowSize() {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useLayoutEffect(() => {
    const handleResizeEvent = () => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    // attach the callback
    window.addEventListener("resize", handleResizeEvent);
    return () => {
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);
  return size;
}

export default function App() {
  const size = useWindowSize();

  return (
    <section>
      <h1>useWindowSize</h1>
      <p>Resize the window</p>
      <table>
        <tbody>
          <tr>
            <th>width</th>
            <td>{size.width}</td>
          </tr>
          <tr>
            <th>height</th>
            <td>{size.height}</td>
          </tr>
        </tbody>
      </table>
      <Browser size={size} />
    </section>
  );
}
