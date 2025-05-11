import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Venue from "../types/Venue";

function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);

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
  console.log("Venue in detail");
  return (
    <>
      <h1>{venue.name}</h1>
      <div>
        <p>{venue.location.city}</p>
        <p>{venue.price}</p>
      </div>
      <div>
        <p>{venue.description}</p>
        <p>Read more</p>
      </div>
      <div>
        <h2>Amenities</h2>
        <div>
          <img src="" alt="" />
          <p>Guests:</p>
          <p>{venue.maxGuests}</p>
        </div>
        {venue.meta.wifi && (
          <div>
            <img src="" alt="" />
            <p>Wifi</p>
          </div>
        )}
        {venue.meta.parking && (
          <div>
            <img src="" alt="" />
            <p>Parking</p>
          </div>
        )}
        {venue.meta.breakfast && (
          <div>
            <img src="" alt="" />
            <p>Breakfast</p>
          </div>
        )}
        {venue.meta.pets && (
          <div>
            <img src="" alt="" />
            <p>Pets allowed</p>
          </div>
        )}
      </div>
      <div>
        <h2>Booking</h2>
        <div>Dates</div>
        <div>People</div>
        <div>Pricing</div>
        <button>Book venue</button>
      </div>
    </>
  );
}
export default VenueDetail;
