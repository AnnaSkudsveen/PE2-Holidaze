import DiplayVenues from "../components/DisplayVenues";

function AllVenues() {
  console.log("All Venues");
  return (
    <>
      <section>
        <form action="">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </form>
      </section>
      <section>
        <DiplayVenues />
      </section>
    </>
  );
}
export default AllVenues;
