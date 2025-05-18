import { Booking } from "../types/Bookings";

type BookingCardProps = {
  booking: Booking;
};

function BookingCard({ booking }: BookingCardProps) {
  return (
    <>
      <p>
        <strong>Booking ID:</strong> {booking.id}
      </p>
      <p>
        <strong>Guests:</strong> {booking.guests}
      </p>
      <p>
        <strong>Venue:</strong> {booking.venue?.name}
      </p>
      <p>
        <strong>City:</strong> {booking.venue?.location?.city}
      </p>
      <p>
        <strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
      </p>
      <p>
        <strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}
      </p>
    </>
  );
}

export default BookingCard;
