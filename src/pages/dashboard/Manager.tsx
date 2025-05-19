import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import VenueCard from "../../components/VenueCard";
import Venue from "../../types/Venue";

function DashboardManager() {
  const [venues, setVenues] = useState<Venue[]>([]);

  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;
  const profileName = localStorage.getItem("name");

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${profileName}/venues`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error: ${errorData.errors[0]?.message}`);
          console.log(`Error: ${errorData.errors[0]?.message}`);
          return;
        }
        const data = await response.json();
        setVenues(data.data as Venue[]);
      } catch (error) {
        console.log(error);
      }
    }

    if (profileName && token && apiKey) {
      fetchVenues();
    }
  }, [profileName, token, apiKey]);

  return (
    <>
      <h1>Dashboard Manager</h1>

      <div>
        <Link to="/VenueCreate">
          <h2>Create new venue</h2>
        </Link>
      </div>

      <section>
        {venues.map((venue) => (
          <div>
            <VenueCard key={venue.id} venue={venue} />
            <Link to={`/VenueEdit/${venue.id}`}>Edit Venue</Link>
          </div>
        ))}
      </section>
    </>
  );
}

export default DashboardManager;
