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
    <section className="w-full mx-auto flex flex-col items-center mb-10">
      <Profile />
      <h1 className="text-2xl mb-8 text-center">Your bookings</h1>

      <div className="flex flex-wrap justify-center items-center gap-4 max-w-[1200px]">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white border h-[510px] flex-col rounded-lg p-6 flex items-center"
          >
            <img
              src={booking.venue.media[0].url}
              alt=""
              className="h-[200px] w-[400px] object-cover rounded mb-6"
            />
            <BookingCard booking={booking} />

            <div className=" flex gap-4 justify-between">
              <div className="border rounded h-10 px-4 flex items-center justify-center cursor-pointer hover:bg-[#508484] hover:text-white transform transition-colors duration-300 focus:bg-[#508484] focus:text-white focus:border-0 hover:border-0">
                <Link to={`/BookingEdit/${booking.id}`}>Edit</Link>
              </div>
              <button
                className="border rounded h-10 px-4 w-[100px] cursor-pointer hover:text-white hover:bg-red-700 transition"
                onClick={() => handleDeleteBooking(booking.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardUser;
