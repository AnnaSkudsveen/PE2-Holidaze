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
        <form action="">
          <div>
            <h3>Dates</h3>
            <label htmlFor="">From</label>
            <input type="date" id="dateFrom" name="dateFrom" />
            <label htmlFor="">To</label>
            <input type="date" id="dateTo" name="dateTo" />
          </div>

          <div>
            <h3>Guests</h3>
            <label htmlFor="guests">Guests</label>
            <select name="guests" id="guests">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div>
            <h3>Price</h3>
            <p>{venue.price}</p>
          </div>
          <button>Book venue</button>
        </form>
      </div>
    </>
  );
}
export default VenueDetail;
