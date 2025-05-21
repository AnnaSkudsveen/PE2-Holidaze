import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Venue from "../types/Venue";
import BookingForm from "./dashboard/booking/BookingForm";

function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;

  useEffect(() => {
    async function getVenue() {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`
        );
        const json = await response.json();
        setVenue(json.data as Venue);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    if (id) getVenue();
  }, [id]);

  if (!venue) return <div>Loading venue details...</div>;

  const handleBookingSuccess = (bookingId: string) => {
    navigate(`/BookingSuccess/${bookingId}`);
  };

  const handleBookingSubmit = async ({
    dateFrom,
    dateTo,
    guests
  }: {
    dateFrom: string;
    dateTo: string;
    guests: number;
  }) => {
    try {
      const res = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/`, {
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
          venueId: venue.id
        })
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.errors?.[0]?.message || "Failed to create booking");
        return;
      }

      console.log("Booking created:", result.data);
      handleBookingSuccess(result.data.id);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <h1>{venue.name}</h1>
      <div>
        <p>{venue.location.city}</p>
        <p>{venue.price} kr pr night</p>
      </div>
      <div>
        <p>{venue.description}</p>
        <p>Read more</p>
      </div>
      <div>
        <h2>Amenities</h2>
        <div>
          <i className="fa-light fa-user-group-simple"></i>
          <p>Guests:</p>
          <p>{venue.maxGuests}</p>
        </div>
        {venue.meta.wifi && (
          <div>
            <i className="fa-light fa-wifi"></i>
            <p>Wifi</p>
          </div>
        )}
        {venue.meta.parking && (
          <div>
            <i className="fa-light fa-square-parking"></i>
            <p>Parking</p>
          </div>
        )}
        {venue.meta.breakfast && (
          <div>
            <i className="fa-light fa-bread-slice-butter"></i>
            <p>Breakfast</p>
          </div>
        )}
        {venue.meta.pets && (
          <div>
            <i className="fa-light fa-dog"></i>
            <p>Pets allowed</p>
          </div>
        )}
      </div>
      <div>
        <h2>Booking</h2>
        <BookingForm
          venueId={venue.id}
          maxGuests={venue.maxGuests}
          onSubmit={handleBookingSubmit}
          onBookingSuccess={handleBookingSuccess}
          bookedDates={venue.bookings}
        />
      </div>
    </>
  );
}

export default VenueDetail;
