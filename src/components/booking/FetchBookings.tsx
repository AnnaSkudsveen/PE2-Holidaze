import { Booking } from "../../types/Bookings";
import { API_BASE_URL, ENDPOINTS } from "../../constants/Api";

export async function fetchUserBookings(
  name: string,
  token: string,
  apiKey: string
): Promise<Booking[]> {
  const response = await fetch(
    `${API_BASE_URL}${ENDPOINTS.PROFILES}/${name}/bookings?_venue=true`,
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
  const response = await fetch(`${API_BASE_URL}${ENDPOINTS.BOOKINGS}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.errors?.[0]?.message || "Failed to delete booking"
    );
  }
}
