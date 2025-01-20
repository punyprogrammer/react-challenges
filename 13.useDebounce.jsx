import React, { useState, useEffect, useCallback } from "react";

// Utility to fetch Hacker News search results
const searchHackerNews = async (query) => {
  const baseUrl = "https://hn.algolia.com/api/v1/search";
  try {
    const response = await fetch(`${baseUrl}?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch search results.");
    }
    const data = await response.json();
    return data.hits || []; // Return the list of search results
  } catch (error) {
    console.error("Error fetching Hacker News results:", error);
    throw error;
  }
};

// Custom hook for debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId); // Cleanup the timer
  }, [value, delay]);

  return debouncedValue;
}

// List item component for results
const ListItem = ({ item }) => (
  <div style={{ margin: "10px 0" }}>
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#007bff", textDecoration: "none" }}
    >
      {item.title || "No Title"}
    </a>
  </div>
);

// Main App component
export default function App() {
  const [searchTerm, setSearchTerm] = useState("js");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);

  // Handle input change
  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Fetch Hacker News results when debounced term changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearchTerm) return;
      setIsSearching(true);
      try {
        const results = await searchHackerNews(debouncedSearchTerm);
        setResults(results);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsSearching(false);
      }
    };

    fetchResults();
  }, [debouncedSearchTerm]);

  return (
    <section style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <header>
        <h1>Hacker News Search</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Allow pressing Enter to trigger the search
            const formData = new FormData(e.target);
            setSearchTerm(formData.get("search"));
            e.target.reset();
          }}
        >
          <input
            name="search"
            type="text"
            placeholder="Search Hacker News..."
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            onChange={handleChange}
          />
          <button
            className="primary"
            type="submit"
            disabled={isSearching}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
      </header>
      <main>
        {results.length > 0 ? (
          results.map((item) => <ListItem key={item.objectID} item={item} />)
        ) : (
          <p style={{ marginTop: "20px" }}>No results found.</p>
        )}
      </main>
    </section>
  );
}
