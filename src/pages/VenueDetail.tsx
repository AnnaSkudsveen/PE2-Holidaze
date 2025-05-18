import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Venue from "../types/Venue";
import BookingForm from "../components/BookingForm";
import { useNavigate } from "react-router-dom";

function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getVenue(url: string) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setVenue(json.data as Venue);
        console.log(json.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    getVenue(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`);
  }, [id]);

  if (!venue) {
    return <div>Loading venue details...</div>;
  }

  const handleBookingSuccess = (bookingId: string) => {
    navigate(`/BookingSuccess/${bookingId}`);
  };

  console.log("Venue in detail");

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
          onBookingSuccess={handleBookingSuccess}
        />
      </div>
    </>
  );
}
export default VenueDetail;
