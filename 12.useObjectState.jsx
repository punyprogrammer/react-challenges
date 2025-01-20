import * as React from "react";
const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};
// useObjectState is a hook that behaves similar to useState,however it merges the new one
function useObjectState(initialState) {
  const [state, setState] = React.useState(initialState);
  const handleChange = (arg) => {
    setState((prevState) => {
      if (typeof arg === "function") {
        // if the argument is a function then the value to be merged is the value obtained by invoking the callback with the current state
        const newValue = arg(prevState);
        // check if the returned value is a function or not
        if (isPlainObject(newValue)) {
          return { ...prevState, ...newValue };
        }
        return prevState;
      } else if (isPlainObject(arg)) {
        return { ...prevState, ...arg };
      }
    });
  };

  return [state, handleChange];
}
const initialState = {
  team: "Utah Jazz",
  wins: 2138,
  losses: 1789,
  championships: 0,
};

export default function App() {
  const [stats, setStats] = useObjectState(initialState);

  const addWin = () => {
    setStats((s) => ({
      wins: s.wins + 1,
    }));
  };

  const addLoss = () => {
    setStats((s) => ({
      losses: s.losses + 1,
    }));
  };

  const reset = () => {
    setStats(initialState);
  };

  return (
    <section>
      <h1>useObjectState</h1>

      <button className="link" onClick={addWin}>
        Add Win
      </button>
      <button className="link" onClick={addLoss}>
        Add Loss
      </button>

      <button className="link" onClick={() => alert("lol")}>
        Add Championship
      </button>
      <button className="link" onClick={reset}>
        Reset
      </button>

      <table>
        <thead>
          <tr>
            {Object.keys(stats).map((key) => {
              return <th>{key}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(stats).map((key) => {
              return <td>{`${stats[key]}`}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </section>
  );
}
