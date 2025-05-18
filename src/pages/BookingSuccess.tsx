import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import Venue from "../types/Venue";
import { Booking } from "../types/Bookings";

function BookingSuccess() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;

  useEffect(() => {
    async function fetchBooking() {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/bookings/${id}?_venue`,
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
    <>
      <h1>Booking Confirmed!</h1>
      <p>Booking ID: {booking.id}</p>
      <p>Guests: {booking.guests}</p>
      <p>Venue: {booking.venue?.name}</p>
      <p>City: {booking.venue?.location?.city}</p>
      <p>Guests: {booking.guests}</p>
      <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
      <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
    </>
  );
}

export default BookingSuccess;
