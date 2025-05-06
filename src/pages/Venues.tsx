
import DiplayVenues from "../components/VenueDetails";
import SearchBar from "../components/search";


function AllVenues() {
  console.log("All Venues");
  return (
    <>
      <section>

        <SearchBar />

      </section>
      <section>
        <DiplayVenues />
      </section>
    </>
  );
}
export default AllVenues;
