import { Booking } from "../../types/Bookings.ts";

type BookingCardProps = {
  booking: Booking;
};

function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="border-t p-2  flex flex-col gap-2 items-start">
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
    </div>
  );
}

export default BookingCard;
