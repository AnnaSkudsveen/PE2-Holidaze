import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import { Booking } from "../../../types/Bookings";

function BookingEdit() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;
  console.log("API Key:", apiKey);
  console.log("Token:", token);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/bookings/${id}?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey
            }
          }
        );
        const data = await res.json();
        setBooking(data.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    }

    if (id) fetchBooking();
  }, [id, apiKey, token]);

  const handleUpdate = async ({
    dateFrom,
    dateTo,
    guests
  }: {
    dateFrom: string;
    dateTo: string;
    guests: number;
  }) => {
    if (!booking) return;

    try {
      const res = await fetch(
        `https://v2.api.noroff.dev/holidaze/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey
          },
          body: JSON.stringify({
            ...booking,
            dateFrom,
            dateTo,
            guests
          })
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.errors?.[0]?.message);
        return;
      }

      console.log("Booking updated:", result.data);
      navigate("/dashboardUser");
    } catch (err) {
      console.error("Update booking error:", err);
      alert("Failed to update booking.");
    }
  };

  if (!booking) return <p>Loading booking...</p>;

  return (
    <BookingForm
      maxGuests={booking.venue.maxGuests}
      initialData={booking}
      onSubmit={handleUpdate}
      submitButtonText="Update Booking"
    />
  );
}

export default BookingEdit;
