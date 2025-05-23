import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Venue from "../types/Venue";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [delayedSearch, setDelayedSearch] = useState(search);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    async function fetchVenues() {
      if (!delayedSearch) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues?search=${delayedSearch}&limit=10`
        );
        const data = await response.json();
        setSuggestions(data.data || []);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [delayedSearch]);

  return (
    <div className="SearchBar flex items-center justify-between">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setShowSuggestions(true)}
        placeholder="Search venues..."
        className=" rounded p-2 w-3xs text-sm h-10 bg-white text-black"
      />

      {loading && <p>Loading...</p>}
      {!loading && delayedSearch && suggestions.length === 0 && (
        <p>No results available</p>
      )}

      {!loading &&
        delayedSearch &&
        suggestions.length > 0 &&
        showSuggestions && (
          <div className="bg-white text-[#508484]">
            <button onClick={() => setShowSuggestions(false)}>Close</button>
            {suggestions.map((venue) => (
              <div key={venue.id}>
                <Link
                  to={`/venue/${venue.id}`}
                  onClick={() => setShowSuggestions(false)}
                >
                  <div className="SearchBarLink">
                    <img
                      className="searchImg"
                      src={venue.media?.[0]?.url}
                      alt={venue.name}
                    />
                    <h2>{venue.name}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default SearchBar;
