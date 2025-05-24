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
    <div className="SearchBar flex flex-col items-center gap-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setShowSuggestions(true)}
        placeholder="Search venues..."
        className="border border-[#50848] rounded  p-2 w-3xs text-sm h-10 bg-white text-black"
      />

      {loading && <p>Loading...</p>}
      {!loading && delayedSearch && suggestions.length === 0 && (
        <p>No results available</p>
      )}

      {!loading &&
        delayedSearch &&
        suggestions.length > 0 &&
        showSuggestions && (
          <div className="bg-white text-[#508484] w-3xs md:w-[600px] flex flex-col gap-2 p-4 rounded shadow-lg max-h-[400px] overflow-y-auto">
            <button
              className="cursor-pointer border-b pb-2"
              onClick={() => setShowSuggestions(false)}
            >
              Close search
            </button>
            {suggestions.map((venue) => (
              <div key={venue.id}>
                <Link
                  to={`/venue/${venue.id}`}
                  onClick={() => setShowSuggestions(false)}
                >
                  <div className="SearchBarLink flex justify-baseline gap-4">
                    <img
                      src={venue.media?.[0]?.url}
                      alt={venue.name}
                      className="w-16 h-16 object-cover rounded"
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
