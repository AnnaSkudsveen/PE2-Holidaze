import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookingCard from "../../components/BookingCard";
import { Booking } from "../../types/Bookings";
import Profile from "../Profile";
import {
  fetchUserBookings,
  deleteBooking
} from "../../components/FetchBookings";

function DashboardUser() {
  console.log("Dashboard User");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const name = localStorage.getItem("name");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;
  const token = localStorage.getItem("bearerToken");

  useEffect(() => {
    if (!name || !token || !apiKey) return;

    fetchUserBookings(name, token, apiKey)
      .then(setBookings)
      .catch((err) => setError(err.message));
  }, [name, token, apiKey]);

  async function handleDeleteBooking(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBooking(id, token!, apiKey!);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      alert("Booking deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      alert((err as Error).message);
    }
  }

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
    <>
      <h1>Dashboard</h1>
      <Profile />
      <div className="flex justify-around flex-wrap gap-8 max-w-[1200px]">
        {bookings.map((booking) => (
          <div key={booking.id}>
            <BookingCard booking={booking} />
            <Link to={`/BookingEdit/${booking.id}`}>Edit booking</Link>
            <button onClick={() => handleDeleteBooking(booking.id)}>
              Delete Booking
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default DashboardUser;
