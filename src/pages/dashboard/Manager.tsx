import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import VenueCard from "../../components/VenueCard";
import Venue from "../../types/Venue";
import Profile from "../Profile";
import BookingCard from "../../components/BookingCard";
import {
  fetchUserBookings,
  deleteBooking
} from "../../components/FetchBookings";
import { Booking } from "../../types/Bookings";

function DashboardManager() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;
  const profileName = localStorage.getItem("name");

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${profileName}/venues?_bookings=true`,
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

  useEffect(() => {
    if (!profileName || !token || !apiKey) return;

    fetchUserBookings(profileName, token, apiKey)
      .then(setBookings)
      .catch((error) => alert(error.message));
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

  return (
    <>
      <Profile />

      <section className="flex flex-wrap gap-20 justify-center ">
        <div className="flex flex-col gap-4 max-w-[1200px]">
          <div className="border rounded h-10 px-4 hover:bg-[#508484] hover:text-white transform transition-colors duration-300 focus:bg-[#508484] focus:text-white focus:border-0 hover:border-0">
            <Link
              to="/VenueCreate"
              className="flex items-center justify-center h-full "
            >
              <h2>Create new venue</h2>
            </Link>
          </div>
          {venues.map((venue) => (
            <div key={venue.id} className="border-b pb-2">
              <VenueCard venue={venue} />
              <h3>Upcoming bookings at venue</h3>
              <div className="flex flex-col gap-4">
                {venue.bookings?.slice(0, 3).map((booking, index) => (
                  <div
                    className="flex flex-col items-baseline"
                    key={booking.id || index}
                  >
                    <p>
                      {new Date(booking.dateFrom).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}{" "}
                      –{" "}
                      {new Date(booking.dateTo).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </p>

                    <p>Customer: {booking.customer.name}</p>
                    <p>Guests: {booking.guests}</p>
                  </div>
                ))}
              </div>

              <div className=" flex gap-4 justify-between mt-4">
                <div className="border rounded h-10 px-4 flex items-center hover:bg-[#508484] hover:text-white transform transition-colors duration-300 focus:bg-[#508484] focus:text-white focus:border-0 hover:border-0 cursor-pointer">
                  <Link to={`/VenueEdit/${venue.id}`}>Edit Venue</Link>
                </div>

                <button
                  className=" hover:text-white hover:bg-red-700 transition border rounded h-10 px-4  cursor-pointer"
                  onClick={() => handleDelete(venue.id)}
                >
                  Delete Venue
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2>Your bookings</h2>
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col flex-grow items-center border-b justify-between gap-4 mt-4 md:mt-0"
            >
              <img
                src={booking.venue.media[0].url}
                alt=""
                className="w-[280px] h-auto md:h-[200px] md:w-auto"
              />
              <BookingCard booking={booking} />

              <div className=" flex gap-4 justify-center my-4 ">
                <div className="border rounded h-10 px-4 flex items-center w-[100px] justify-center hover:bg-[#508484] hover:text-white transform transition-colors duration-300 focus:bg-[#508484] focus:text-white focus:border-0 hover:border-0 cursor-pointer">
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
    </>
  );
}

export default DashboardManager;
