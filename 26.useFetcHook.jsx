import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

// Reducer function to handle fetch states
const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: null, data: null };
    case "fetched":
      return { ...state, loading: false, data: action.payload, error: null };
    case "error":
      return { ...state, loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

// Initial state for the hook
const initialState = {
  loading: false,
  data: null,
  error: null,
};

function useFetch(url, options) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const cacheRef = React.useRef({}); // Initialize cache as an empty object

  React.useEffect(() => {
    // Skip fetch if the URL is not a valid string
    if (typeof url !== "string") return;

    // Check for cached response
    const cachedResponse = cacheRef.current?.[url];
    if (cachedResponse) {
      dispatch({ type: "fetched", payload: cachedResponse });
      return;
    }

    // Create an AbortController to handle fetch cancellation
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) {
          throw new Error(response.statusText || "An error occurred");
        }
        const responseData = await response.json();
        cacheRef.current[url] = responseData; // Cache the response
        dispatch({ type: "fetched", payload: responseData });
      } catch (error) {
        // Handle fetch errors (ignore AbortError as it is expected during cancellation)
        if (error.name !== "AbortError") {
          dispatch({
            type: "error",
            payload: error.message || "Unknown error",
          });
        }
      }
    };

    fetchData();

    // Cleanup: Abort fetch if URL changes or component unmounts
    return () => controller.abort();
  }, [url, options]); // Include `options` in the dependency array

  return state;
}
function Card({ data, loading }) {
  if (loading) {
    return <span>{loading ?? "Loading"}</span>;
  }
  return (
    <div>
      <span>{data?.species?.name}</span>
      <img src={data?.sprites?.back_default} />
    </div>
  );
}
export default function App() {
  const [count, setCount] = React.useState(1);

  const { error, data } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${count}`
  );
  console.log("Data", data);
  console.log("Error", error);
  return (
    <section>
      <h1>useFetch</h1>
      <button
        disabled={count < 2}
        className="link"
        onClick={() => setCount((c) => c - 1)}
      >
        Prev
      </button>
      <button className="link" onClick={() => setCount((c) => c + 1)}>
        Next
      </button>
      <Card loading={!data} error={error} data={data} />
    </section>
  );
}
