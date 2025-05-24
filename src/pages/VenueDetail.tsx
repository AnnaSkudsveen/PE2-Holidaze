import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Venue from "../types/Venue.ts";
import BookingForm from "./dashboard/booking/BookingForm.tsx";
import { API_BASE_URL, ENDPOINTS } from "../constants/Api.tsx";

function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;

  useEffect(() => {
    async function getVenue() {
      try {
        const response = await fetch(
          `${API_BASE_URL}${ENDPOINTS.VENUES}/${id}?_bookings=true`
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
      const res = await fetch(`${API_BASE_URL}${ENDPOINTS.BOOKINGS}`, {
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
    <section className="flex flex-col items-center gap-4 overflow-hidden mb-10">
      <img
        src={venue.media[0].url}
        alt=""
        className="w-full lg:max-w-[1280px] h-[400px] object-cover"
      />
      <h1>{venue.name}</h1>
      <div className="flex gap-4">
        <p>{venue.location.city}</p>
        <p>{venue.price} kr pr night</p>
      </div>
      <div>
        {venue.description.length > 200 ? (
          <p
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer max-w-[600px]"
          >
            {isExpanded
              ? venue.description + "  Show less"
              : venue.description.slice(0, 200) + "...    Read more"}
          </p>
        ) : (
          <p>{venue.description}</p>
        )}
      </div>
      <div className="border rounded-2xl w-[270px] p-4 flex flex-col gap-4">
        <h2 className="border-b pb-2">Amenities</h2>
        <div className="flex justify-baseline gap-2 items-center">
          <i className="fa-light fa-user-group-simple"></i>
          <p>Guests:</p>
          <p>{venue.maxGuests}</p>
        </div>
        {venue.meta.wifi && (
          <div className="flex justify-baseline gap-2 items-center">
            <i className="fa-light fa-wifi"></i>
            <p>Wifi</p>
          </div>
        )}
        {venue.meta.parking && (
          <div className="flex justify-baseline gap-2 items-center">
            <i className="fa-light fa-square-parking"></i>
            <p>Parking</p>
          </div>
        )}
        {venue.meta.breakfast && (
          <div className="flex justify-baseline gap-2 items-center">
            <i className="fa-light fa-bread-slice-butter"></i>
            <p>Breakfast</p>
          </div>
        )}
        {venue.meta.pets && (
          <div className="flex justify-baseline gap-2 items-center">
            <i className="fa-light fa-dog"></i>
            <p>Pets allowed</p>
          </div>
        )}
      </div>
      <div className="border rounded-2xl w-[270px] p-4 flex flex-col gap-4">
        <h2 className="border-b pb-2">Booking</h2>
        <BookingForm
          venueId={venue.id}
          maxGuests={venue.maxGuests}
          onSubmit={handleBookingSubmit}
          onBookingSuccess={handleBookingSuccess}
          bookedDates={venue.bookings}
        />
      </div>
    </section>
  );
}

export default VenueDetail;
