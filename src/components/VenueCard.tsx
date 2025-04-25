import Venue from "../types/Venue";

interface IVenueCardProps {
  venue: Venue;
}

function VenueCard({ venue }: IVenueCardProps) {
  let imageContent;
  if (venue.media.length > 0) {
    imageContent = <img src={venue.media[0].url} alt={venue.media[0].alt} />;
  } else {
    imageContent = <div>No image available</div>;
  }

  return (
    <div className="venue-card" key={venue.id}>
      {imageContent}
      <h2>{venue.name}</h2>
      <p>Price: {venue.price}kr</p>
      <p>Max Guests: {venue.maxGuests}</p>
      <p>Rating: {venue.rating}</p>
      <p>Location: {venue.location.country}</p>
    </div>
  );
}

export default VenueCard;
