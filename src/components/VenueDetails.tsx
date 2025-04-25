import { useEffect, useState } from "react";
import VenueCard from "./VenueCard";
import Venue from "../types/Venue";

function DiplayVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues"
        );
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
  if (venues.length === 0) return <div>No venues listed</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {venues.map((venue) => (
        <VenueCard venue={venue} />
      ))}
    </div>
  );
}

export default DiplayVenues;
