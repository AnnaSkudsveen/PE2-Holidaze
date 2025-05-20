import { useState } from "react";
import { VenueCreation } from "../../../types/VenueCreation";

interface Props {
  initialData?: VenueCreation;
  onSubmit: (venue: VenueCreation) => Promise<void>;
  submitButtonText?: string;
}

function VenueForm({
  initialData,
  onSubmit,
  submitButtonText = "Submit"
}: Props) {
  const [venueData, setVenueData] = useState<VenueCreation>(
    initialData ?? {
      id: "",
      name: "",
      description: "",
      media: [{ url: "", alt: "" }],
      price: 0,
      maxGuests: 1,
      rating: 0,
      created: "",
      updated: "",
      meta: { wifi: false, parking: false, breakfast: false, pets: false },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: ""
      }
    }
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = event.target;

    if (name in venueData.meta) {
      setVenueData({
        ...venueData,
        meta: {
          ...venueData.meta,
          [name]: checked
        }
      });
    } else if (name in venueData.location) {
      setVenueData({
        ...venueData,
        location: {
          ...venueData.location,
          [name]: value
        }
      });
    } else if (name === "price" || name === "maxGuests" || name === "rating") {
      setVenueData({ ...venueData, [name]: Number(value) });
    } else {
      setVenueData({ ...venueData, [name]: value });
    }
  }

  function handleMediaChange(
    event: React.ChangeEvent<HTMLInputElement>,
    field: "url" | "alt"
  ) {
    const newMedia = [{ ...venueData.media[0], [field]: event.target.value }];
    setVenueData({ ...venueData, media: newMedia });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await onSubmit(venueData);
    console.log(response);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Venue Form</h1>

      <label>
        Name
        <input
          name="name"
          value={venueData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description
        <input
          name="description"
          value={venueData.description}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Image URL
        <input
          value={venueData.media[0]?.url || ""}
          onChange={(event) => handleMediaChange(event, "url")}
        />
      </label>

      <label>
        Alt text
        <input
          value={venueData.media[0]?.alt || ""}
          onChange={(event) => handleMediaChange(event, "alt")}
        />
      </label>

      <label>
        Price
        <input
          name="price"
          type="number"
          value={venueData.price}
          onChange={handleChange}
        />
      </label>

      <label>
        Max Guests
        <input
          name="maxGuests"
          type="number"
          value={venueData.maxGuests}
          onChange={handleChange}
        />
      </label>

      <div>
        <label>Rating</label>
        <div>
          <label>
            <input
              type="radio"
              name="rating"
              value={1}
              checked={venueData.rating === 1}
              onChange={handleChange}
            />
            1
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value={2}
              checked={venueData.rating === 2}
              onChange={handleChange}
            />
            2
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value={3}
              checked={venueData.rating === 3}
              onChange={handleChange}
            />
            3
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value={4}
              checked={venueData.rating === 4}
              onChange={handleChange}
            />
            4
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value={5}
              checked={venueData.rating === 5}
              onChange={handleChange}
            />
            5
          </label>
        </div>
      </div>

      <div>
        <h3>Extras</h3>
        <label>
          <input
            type="checkbox"
            name="wifi"
            checked={venueData.meta.wifi}
            onChange={handleChange}
          />
          Wifi
        </label>
        <label>
          <input
            type="checkbox"
            name="parking"
            checked={venueData.meta.parking}
            onChange={handleChange}
          />
          Parking
        </label>
        <label>
          <input
            type="checkbox"
            name="breakfast"
            checked={venueData.meta.breakfast}
            onChange={handleChange}
          />
          Breakfast
        </label>
        <label>
          <input
            type="checkbox"
            name="pets"
            checked={venueData.meta.pets}
            onChange={handleChange}
          />
          Pets
        </label>
      </div>

      <div>
        <h3>Location</h3>
        <input
          name="address"
          placeholder="Address"
          value={venueData.location.address || ""}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          value={venueData.location.city || ""}
          onChange={handleChange}
        />
        <input
          name="zip"
          placeholder="Zip"
          value={venueData.location.zip || ""}
          onChange={handleChange}
        />
        <input
          name="country"
          placeholder="Country"
          value={venueData.location.country || ""}
          onChange={handleChange}
        />
        <input
          name="continent"
          placeholder="Continent"
          value={venueData.location.continent || ""}
          onChange={handleChange}
        />
      </div>

      <button type="submit">{submitButtonText}</button>
    </form>
  );
}

export default VenueForm;
