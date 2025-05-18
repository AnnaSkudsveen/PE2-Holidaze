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

  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        alert(errorData?.errors?.[0]?.message || "Failed to delete venue.");
        return;
      }

      setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== id));
      alert("Venue deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the venue.");
    }
  }

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
          <div key={venue.id}>
            <VenueCard venue={venue} />
            <Link to={`/VenueEdit/${venue.id}`}>Edit Venue</Link>
            <button onClick={() => handleDelete(venue.id)}>Delete Venue</button>
          </div>
        ))}
      </section>
    </>
  );
}

export default DashboardManager;
