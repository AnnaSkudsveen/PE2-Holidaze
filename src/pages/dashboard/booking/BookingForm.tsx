import React, { useEffect, useState } from "react";
import { Booking } from "../../../types/Bookings";

interface BookingFormProps {
  venueId?: string;
  maxGuests: number;
  initialData?: Booking;
  submitButtonText?: string;
  onSubmit: (formData: {
    dateFrom: string;
    dateTo: string;
    guests: number;
  }) => void;
  onBookingSuccess?: (bookingId: string) => void;
}

const BookingForm = ({
  maxGuests,
  initialData,
  submitButtonText = "Book",
  onSubmit
}: BookingFormProps) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (initialData) {
      setDateFrom(initialData.dateFrom.slice(0, 10));
      setDateTo(initialData.dateTo.slice(0, 10));
      setGuests(initialData.guests);
    }
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const dateFromISO = new Date(dateFrom).toISOString();
    const dateToISO = new Date(dateTo).toISOString();

    onSubmit({
      dateFrom: dateFromISO,
      dateTo: dateToISO,
      guests
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dateFrom">From:</label>
        <input
          type="date"
          id="dateFrom"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="dateTo">To:</label>
        <input
          type="date"
          id="dateTo"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="guests">Guests:</label>
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          {Array.from({ length: maxGuests }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">{submitButtonText}</button>
    </form>
  );
};

export default BookingForm;
