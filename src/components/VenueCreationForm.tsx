import { useState } from "react";
import { API_BASE_URL, ENDPOINTS } from "../constants/Api";

function VenueCreationForm({
  onVenueSuccess
}: {
  onVenueSuccess: (id: string) => void;
}) {
  const [nameOfVenue, setNameOfVenue] = useState("");
  const [descriptionOfVenue, setDescriptionOfVenue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(1);
  const [rating, setRating] = useState(0);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");

  const token = localStorage.getItem("bearerToken");
  const apiKey = import.meta.env.VITE_X_NOROFF_API_KEY;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!apiKey) {
      console.log("API key is not defined.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.VENUES}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "X-Noroff-API-Key": `${apiKey}`
        },
        body: JSON.stringify({
          name: nameOfVenue,
          description: descriptionOfVenue,
          media: [
            {
              url: imageUrl,
              alt: imageAlt
            }
          ],
          price,
          maxGuests,
          rating: Number(rating),
          meta: {
            wifi,
            parking,
            breakfast,
            pets
          },
          location: {
            address,
            city,
            zip,
            country,
            continent
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.errors[0]?.message}`);
        return;
      }

      const data = await response.json();
      console.log("Venue Created:", data.data);
      onVenueSuccess(data.data.id);
    } catch (error) {
      alert(error);
      console.error("Error:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nameOfVenue">Name</label>
        <input
          type="text"
          id="nameOfVenue"
          value={nameOfVenue}
          onChange={(event) => setNameOfVenue(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="descriptionOfVenue">Descritption</label>
        <input
          type="text"
          value={descriptionOfVenue}
          id="descriptionOfVenue"
          onChange={(event) => setDescriptionOfVenue(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="imageUrl">URL</label>
        <input
          type="text"
          value={imageUrl}
          id="imageUrl"
          onChange={(event) => setImageUrl(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="imageAlt">Alt text</label>
        <input
          type="text"
          value={imageAlt}
          id="imageAlt"
          onChange={(event) => setImageAlt(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="price">Price pr night</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
          required
        />
      </div>

      <div>
        <label htmlFor="maxGuests">Max Guests</label>
        <input
          type="number"
          id="maxGuests"
          value={maxGuests}
          onChange={(event) => setMaxGuests(Number(event.target.value))}
          required
        />
      </div>

      <div>
        <h2>Rating</h2>

        <label htmlFor="rating1">1</label>
        <input
          type="radio"
          id="rating1"
          name="rating"
          value="1"
          checked={rating === 1}
          onChange={(event) => setRating(Number(event.target.value))}
        />

        <label htmlFor="rating2">2</label>
        <input
          type="radio"
          id="rating2"
          name="rating"
          value="2"
          checked={rating === 2}
          onChange={(event) => setRating(Number(event.target.value))}
        />

        <label htmlFor="rating3">3</label>
        <input
          type="radio"
          id="rating3"
          name="rating"
          value="3"
          checked={rating === 3}
          onChange={(event) => setRating(Number(event.target.value))}
        />

        <label htmlFor="rating4">4</label>
        <input
          type="radio"
          id="rating4"
          name="rating"
          value="4"
          checked={rating === 4}
          onChange={(event) => setRating(Number(event.target.value))}
        />

        <label htmlFor="rating5">5</label>
        <input
          type="radio"
          id="rating5"
          name="rating"
          value="5"
          checked={rating === 5}
          onChange={(event) => setRating(Number(event.target.value))}
        />
      </div>

      <div>
        <h2>Extras</h2>

        <label htmlFor="wifi">Wifi</label>
        <input
          type="checkbox"
          id="wifi"
          checked={wifi}
          onChange={(event) => setWifi(event.target.checked)}
        />

        <label htmlFor="parking">Parking</label>
        <input
          type="checkbox"
          id="parking"
          checked={parking}
          onChange={(event) => setParking(event.target.checked)}
        />

        <label htmlFor="breakfast">Breakfast</label>
        <input
          type="checkbox"
          id="breakfast"
          checked={breakfast}
          onChange={(event) => setBreakfast(event.target.checked)}
        />

        <label htmlFor="pets">Pets allowed</label>
        <input
          type="checkbox"
          id="pets"
          checked={pets}
          onChange={(event) => setPets(event.target.checked)}
        />
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          value={address}
          id="address"
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          value={city}
          id="city"
          onChange={(event) => setCity(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="zip">Zip</label>
        <input
          type="text"
          value={zip}
          id="zip"
          onChange={(event) => setZip(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          value={country}
          id="country"
          onChange={(event) => setCountry(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="continent">Continent</label>
        <input
          type="text"
          value={continent}
          id="continent"
          onChange={(event) => setContinent(event.target.value)}
        />
      </div>

      <button type="submit">Book</button>
    </form>
  );
}

export default VenueCreationForm;
