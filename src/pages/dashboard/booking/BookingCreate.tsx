import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { API_BASE_URL, ENDPOINTS } from "../../../constants/Api";

function BookingCreate() {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();

  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;

  const handleSubmit = async ({
    dateFrom,
    dateTo,
    guests
  }: {
    dateFrom: string;
    dateTo: string;
    guests: number;
  }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.BOOKINGS}/${venueId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey
          },
          body: JSON.stringify({
            dateFrom,
            dateTo,
            guests,
            venueId
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.errors?.[0]?.message || "Failed to create booking");
        return;
      }

      console.log("Booking created:", result.data);
      navigate("/dashboardUser");
    } catch (err) {
      console.error("Create booking error:", err);
      alert("An error occurred.");
    }
  };

  const [maxGuests, setMaxGuests] = useState<number | null>(null);

  useEffect(() => {
    async function fetchVenue() {
      const res = await fetch(`${API_BASE_URL}${ENDPOINTS.VENUES}/${venueId}`);
      const data = await res.json();
      setMaxGuests(data.data.maxGuests);
    }

    if (venueId) fetchVenue();
  }, [venueId]);

  if (!venueId || maxGuests === null) return <p>Loading...</p>;

  return (
    <BookingForm
      venueId={venueId}
      maxGuests={maxGuests}
      onSubmit={handleSubmit}
      submitButtonText="Create Booking"
    />
  );
}

export default BookingCreate;
