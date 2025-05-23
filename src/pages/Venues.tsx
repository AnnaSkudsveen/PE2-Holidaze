import DiplayVenues from "../components/venue/VenueDetails.tsx";
import SearchBar from "../components/Search.tsx";

function AllVenues() {
  console.log("All Venues");
  return (
    <section className="max-w-[1280px] mx-auto flex flex-col items-center mt-10 gap-10">
      <section>
        <SearchBar />
      </section>
      <section>
        <DiplayVenues />
      </section>
    </section>
  );
}
export default AllVenues;
