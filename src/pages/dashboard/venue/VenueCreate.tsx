import VenueForm from "./VenueForm";
import { useNavigate } from "react-router-dom";
import { VenueCreation } from "../../../types/VenueCreation";

function VenueCreate() {
  const navigate = useNavigate();
  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;

  if (!apiKey) {
    console.log("Api Key is not defined.");
  }

  async function handleCreate(venue: VenueCreation) {
    try {
      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey
          },
          body: JSON.stringify(venue)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.errors?.[0]?.message);
        return;
      }

      console.log("Venue created:", data.data);
      navigate(`/venues/${data.data.id}`);
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  }

  return <VenueForm onSubmit={handleCreate} submitButtonText="Create Venue" />;
}

export default VenueCreate;
