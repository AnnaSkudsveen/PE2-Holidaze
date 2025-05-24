import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Booking } from "../../../types/Bookings";
import BookingCard from "../../../components/BookingCard";
import { API_BASE_URL, ENDPOINTS } from "../../../constants/Api";

function BookingSuccess() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;

  useEffect(() => {
    async function fetchBooking() {
      try {
        const response = await fetch(
          `${API_BASE_URL}${ENDPOINTS.BOOKINGS}/${id}?_venue=true`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey
            }
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Fetch failed:", errorData);
          return;
        }

        const json = await response.json();
        console.log(json.data);
        setBooking(json.data);
      } catch (error) {
        console.log("Failed to fetch booking details", error);
      }
    }

    fetchBooking();
  }, [id, token, apiKey]);

  if (!apiKey || !token) {
    console.log("API key or token is not defined.");
    return;
  }

  if (!booking) {
    return <p>Loading booking details...</p>;
  }

  return (
    <section className="flex flex-col items-center justify-center p-4">
      <h1>Booking Confirmed!</h1>
      <img
        src={booking.venue?.media[0].url}
        alt=""
        className="rounded-lg my-4"
      />
      <BookingCard booking={booking} />
    </section>
  );
}

export default BookingSuccess;
