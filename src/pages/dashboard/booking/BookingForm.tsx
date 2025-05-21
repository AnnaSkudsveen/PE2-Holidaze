import React, { useEffect, useState } from "react";
import { Booking } from "../../../types/Bookings";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  venueId?: string;
  maxGuests: number;
  initialData?: Booking;
  submitButtonText?: string;
  bookedDates?: {
    dateFrom: string;
    dateTo: string;
  }[];
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
  onSubmit,
  bookedDates = []
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

  const disabledIntervals = bookedDates.map(({ dateFrom, dateTo }) => ({
    start: new Date(dateFrom),
    end: new Date(dateTo)
  }));

  const isDateDisabled = (date: Date) => {
    return disabledIntervals.some((interval) => {
      return date >= interval.start && date <= interval.end;
    });
  };

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
        <DatePicker
          selected={dateFrom ? new Date(dateFrom) : null}
          onChange={(date: Date | null) => {
            if (date) {
              setDateFrom(date.toISOString().slice(0, 10));
            } else {
              setDateFrom("");
            }
          }}
          startDate={dateFrom ? new Date(dateFrom) : null}
          endDate={dateTo ? new Date(dateTo) : null}
          selectsStart
          filterDate={(date: Date) => !isDateDisabled(date)}
          id="dateFrom"
          required
        />
      </div>

      <div>
        <label htmlFor="dateTo">To:</label>
        <DatePicker
          selected={dateTo ? new Date(dateTo) : null}
          onChange={(date: Date | null) => {
            if (date) {
              setDateTo(date.toISOString().slice(0, 10));
            } else {
              setDateTo("");
            }
          }}
          startDate={dateFrom ? new Date(dateFrom) : null}
          endDate={dateTo ? new Date(dateTo) : null}
          selectsEnd
          minDate={new Date(dateFrom)}
          filterDate={(date: Date) => !isDateDisabled(date)}
          required
          id="dateTo"
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
