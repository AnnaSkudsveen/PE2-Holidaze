function VenueCreationForm() {
  return (
    <form>
      <div>
        <label htmlFor="nameOfVenue">Name</label>
        <input type="text" id="nameOfVenue" />
      </div>

      <div>
        <label htmlFor="descriptionOfVenue">Descritption</label>
        <input type="text" id="descriptionOfVenue" />
      </div>

      <div>
        <label htmlFor="imageUrl">URL</label>
        <input type="text" id="imageUrl" />
      </div>

      <div>
        <label htmlFor="imageAlt">Alt text</label>
        <input type="text" id="imageAlt" />
      </div>

      <div>
        <label htmlFor="price">Price pr night</label>
        <input type="number" id="price" />
      </div>

      <div>
        <label htmlFor="maxGuests">Max Guests</label>
        <input type="number" id="maxGuests" />
      </div>

      <div>
        <h2>Rating</h2>

        <label htmlFor="rating1"></label>
        <input type="radio" id="rating1" name="rating" value="1" />

        <label htmlFor="rating2"></label>
        <input type="radio" id="rating2" name="rating" value="2" />

        <label htmlFor="rating3"></label>
        <input type="radio" id="rating3" name="rating" value="3" />

        <label htmlFor="rating4"></label>
        <input type="radio" id="rating4" name="rating" value="4" />

        <label htmlFor="rating5"></label>
        <input type="radio" id="rating5" name="rating" value="5" />

        <label htmlFor="rating6"></label>
        <input type="radio" id="rating6" name="rating" value="6" />
      </div>

      <div>
        <h2>Extras</h2>

        <label htmlFor="wifi"></label>
        <input type="checkbox" id="wifi" />

        <label htmlFor="parking"></label>
        <input type="checkbox" id="parking" />

        <label htmlFor="breakfast"></label>
        <input type="checkbox" id="breakfast" />

        <label htmlFor="pets"></label>
        <input type="checkbox" id="pets" />
      </div>

      <div>
        <label htmlFor="adress">Adress</label>
        <input type="text" id="adress" />
      </div>

      <div>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>

      <div>
        <label htmlFor="zip">Zip</label>
        <input type="text" id="zip" />
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input type="text" id="country" />
      </div>

      <div>
        <label htmlFor="continent">Continent</label>
        <input type="text" id="continent" />
      </div>

      <button type="submit">Book</button>
    </form>
  );
}

export default VenueCreationForm;
