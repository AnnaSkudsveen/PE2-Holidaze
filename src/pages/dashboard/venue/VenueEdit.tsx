import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VenueForm from "./VenueForm";
import { VenueCreation } from "../../../types/VenueCreation";

function VenueEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<VenueCreation | null>(null);

  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}`
        );
        const data = await response.json();
        setVenue(data.data);
      } catch (error) {
        console.error("Error loading venue:", error);
      }
    }

    if (id) fetchVenue();
  }, [id]);

  async function handleEdit(updatedVenue: VenueCreation) {
    if (!id || !token || !apiKey) {
      console.log("Error with Id, token or apiKey");
      return;
    }

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey
          },
          body: JSON.stringify(updatedVenue)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.errors?.[0]?.message);
        return;
      }

      console.log("Venue updated:", result.data);
      navigate("/dashboardManager");
    } catch (error) {
      console.error("Error updating venue:", error);
      alert("Update failed.");
    }
  }

  if (!venue) return <p>Loading venue...</p>;

  return (
    <VenueForm
      initialData={venue}
      onSubmit={handleEdit}
      submitButtonText="Update Venue"
    />
  );
}

export default VenueEdit;
