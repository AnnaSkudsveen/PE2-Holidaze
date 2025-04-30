import Venue from "../types/Venue";
import { Link } from "react-router-dom";

interface IVenueCardProps {
  venue: Venue;
}

function VenueCard({ venue }: IVenueCardProps) {
  let imageContent;
  let venueName;

  if (venue.media.length > 0) {
    imageContent = (
      <img
        src={venue.media[0].url}
        alt={venue.media[0].alt}
        className="w-[262px] h-[169px] object-cover"
      />
    );
  } else {
    imageContent = <div>No image available</div>;
  }

  if (venue.name.length > 15) {
    venueName = venue.name.substring(0, 15) + "...";
  } else {
    venueName = venue.name;
  }

  return (
    <Link
      to={`/venue/${venue.id}`}
      className="venue-card w-[262px] h-[210px] flex flex-col items-center"
      key={venue.id}
    >
      {imageContent}
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-start">
          <p className="h-3">{venueName}</p>
          <p>Location: {venue.location.country}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="h-3">{venue.price}kr </p>
          <p>pr night</p>
        </div>

        {/* <p>Max Guests: {venue.maxGuests}</p>
      <p>Rating: {venue.rating}</p> */}
      </div>
    </Link>
  );
}

export default VenueCard;
