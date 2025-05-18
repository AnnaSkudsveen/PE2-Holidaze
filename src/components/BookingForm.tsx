import React, { useState } from "react";

interface BookingFormProps {
  venueId: string;
  maxGuests: number;
  onBookingSuccess: (bookingId: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  venueId,
  maxGuests,
  onBookingSuccess
}) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;
  if (!apiKey) {
    console.log("API key is not defined.");
    return;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem("bearerToken");

    if (!token) {
      alert("You need to be logged in to make a booking.");
      return;
    }

    const dateFromISO = new Date(dateFrom).toISOString();
    const dateToISO = new Date(dateTo).toISOString();

    try {
      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-Noroff-API-Key": `${apiKey}`
          },
          body: JSON.stringify({
            dateFrom: dateFromISO,
            dateTo: dateToISO,
            guests,
            venueId
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.errors[0]?.message}`);
        console.log(`Error: ${errorData.errors[0]?.message}`);
        return;
      }

      const data = await response.json();
      console.log("Booking confirmed:", data.data);
      onBookingSuccess(data.data.id);
    } catch (error) {
      alert(error);
      console.error("Booking-error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dateFrom">From:</label>
        <input
          type="date"
          id="dateFrom"
          name="dateFrom"
          value={dateFrom}
          onChange={(event) => {
            setDateFrom(event.target.value);
            console.log(dateFrom);
          }}
          required
        />
      </div>
      <div>
        <label htmlFor="dateTo">To:</label>
        <input
          type="date"
          id="dateTo"
          name="dateTo"
          value={dateTo}
          onChange={(event) => {
            setDateTo(event.target.value);
            console.log(dateFrom);
          }}
          required
        />
      </div>
      <div>
        <label htmlFor="guests">Guests:</label>
        <select
          id="guests"
          name="guests"
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
          required
        >
          {Array.from({ length: maxGuests }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;
