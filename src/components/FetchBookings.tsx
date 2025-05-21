import { Booking } from "../types/Bookings";

export async function fetchUserBookings(
  name: string,
  token: string,
  apiKey: string
): Promise<Booking[]> {
  const response = await fetch(
    `https://v2.api.noroff.dev/holidaze/profiles/${name}/bookings?_venue=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey
      }
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.errors?.[0]?.message || "Failed to fetch bookings"
    );
  }

  const data = await response.json();
  return data.data;
}

export async function deleteBooking(
  id: string,
  token: string,
  apiKey: string
): Promise<void> {
  const response = await fetch(
    `https://v2.api.noroff.dev/holidaze/bookings/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey
      }
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.errors?.[0]?.message || "Failed to delete booking"
    );
  }
}
