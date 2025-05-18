import { useState, useEffect } from "react";
import BookingCard from "../../components/BookingCard";
import { Booking } from "../../types/Bookings";
// import Venue from "../../types/Venue";

function DashboardUser() {
  console.log("Dashboard User");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const name = localStorage.getItem("name");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;
  const token = localStorage.getItem("bearerToken");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${name}/bookings?_venue=true`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "X-Noroff-API-Key": `${apiKey}`
            }
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const json = await response.json();
        setBookings(json.data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchBookings();
  }, [name, token, apiKey]);

  if (!apiKey || !token) {
    console.log("API key or token is not defined.");
    return;
  }

  if (bookings.length === 0)
    return (
      <div>No bookings yet, take a look at some venues to get started!</div>
    );
  if (error) return <h2>{error}</h2>;

  return (
    <div className="flex justify-around flex-wrap gap-8 max-w-[1200px]">
      {bookings.map((booking) => (
        <BookingCard booking={booking} key={booking.id} />
      ))}
    </div>
  );
}

export default DashboardUser;
