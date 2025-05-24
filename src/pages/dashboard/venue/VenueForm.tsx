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

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;

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
      } else if (
        name === "price" ||
        name === "maxGuests" ||
        name === "rating"
      ) {
        setVenueData({ ...venueData, [name]: Number(value) });
      } else {
        setVenueData({ ...venueData, [name]: value });
      }
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
    <form
      onSubmit={handleSubmit}
      className="venueForm flex flex-col  gap-4 items-center w-full mx-auto py-4"
    >
      <h1>Venue Form</h1>

      <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
        <label className="">Name</label>
        <input
          name="name"
          value={venueData.name}
          onChange={handleChange}
          required
          className="border rounded p-2 "
        />
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
        <label>Description</label>
        <textarea
          name="description"
          value={venueData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
        <label>Image URL</label>
        <input
          value={venueData.media[0]?.url || ""}
          onChange={(event) => handleMediaChange(event, "url")}
        />
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
        <label>Alt text</label>
        <input
          value={venueData.media[0]?.alt || ""}
          onChange={(event) => handleMediaChange(event, "alt")}
        />
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
        <label>Price</label>
        <input
          name="price"
          type="number"
          value={venueData.price}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
        <label>Max Guests</label>
        <input
          name="maxGuests"
          type="number"
          value={venueData.maxGuests}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
        <label>Rating</label>
        <div className="flex gap-4 justify-around">
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
      <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
        <h3 className="text-left">Extras</h3>
        <div className="flex  gap-2 w-full max-w-[600px] items-baseline">
          <div>
            <label>Wifi</label>
            <input
              type="checkbox"
              name="wifi"
              checked={venueData.meta.wifi}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Parking</label>
            <input
              type="checkbox"
              name="parking"
              checked={venueData.meta.parking}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Breakfast</label>
            <input
              type="checkbox"
              name="breakfast"
              checked={venueData.meta.breakfast}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Pets</label>
            <input
              type="checkbox"
              name="pets"
              checked={venueData.meta.pets}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
        <h3>Location</h3>

        <div className="flex flex-col gap-4 w-full max-w-[600px] items-baseline">
          <label htmlFor="address">Address</label>
          <input
            name="address"
            placeholder="Address"
            value={venueData.location.address || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
          <label htmlFor="city">City</label>
          <input
            name="city"
            placeholder="City"
            value={venueData.location.city || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
          <label htmlFor="zip">Zip</label>
          <input
            name="zip"
            placeholder="Zip"
            value={venueData.location.zip || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[600px] items-baseline">
          <label htmlFor="country">Country</label>
          <input
            name="country"
            placeholder="Country"
            value={venueData.location.country || ""}
            onChange={handleChange}
          />
        </div>

        <label htmlFor="continent">Continent</label>
        <input
          name="continent"
          placeholder="Continent"
          value={venueData.location.continent || ""}
          onChange={handleChange}
        />
      </div>

      <button
        className="border rounded h-10 px-3 cursor-pointer hover:bg-[#508484] hover:text-white transform transition-colors duration-300 focus:bg-[#508484] focus:text-white focus:border-0 hover:border-0"
        type="submit"
      >
        {submitButtonText}
      </button>
    </form>
  );
}

export default VenueForm;
