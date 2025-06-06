import { useEffect, useState } from "react";
import VenueCard from "./VenueCard.tsx";
import Venue from "../../types/Venue.ts";
import { ENDPOINTS, API_BASE_URL } from "../../constants/Api.tsx";

function DiplayVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.VENUES}`);
        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }
        const json = await response.json();
        setVenues(json.data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchVenues();
  }, []);
  if (venues.length === 0) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-around flex-wrap gap-8 max-w-[1200px]">
      {venues.map((venue) => (
        <VenueCard venue={venue} key={venue.id} />
      ))}
    </div>
  );
}

export default DiplayVenues;
