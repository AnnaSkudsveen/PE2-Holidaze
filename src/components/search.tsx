import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Venue from "../types/Venue";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVenue() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues"
        );
        const data = await response.json();
        setSuggestions(data.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVenue();
  }, []);

  const filteredSuggestions = suggestions.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="SearchBar">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
      <button>Search</button>
      {loading && <p>Loading...</p>}
      {filteredSuggestions.length === 0 && <p>No restults avaliable</p>}
      {search && filteredSuggestions.length > 0 && (
        <div>
          {filteredSuggestions.map((venue) => (
            <div key={venue.id}>
              <Link to={`/venue/${venue.id}`}>
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
