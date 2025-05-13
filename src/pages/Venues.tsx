import DiplayVenues from "../components/VenueDetails";
import SearchBar from "../components/Search";

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
