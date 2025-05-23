import Venue from "../types/Venue";
import HeaderImg from "../../public/header_img.jpg";
import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import { Link } from "react-router-dom";

function Home() {
  console.log("Homepage");
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const fetchLatestVenues = async () => {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues?sort=created&sortOrder=desc&limit=4"
        );
        const data = await response.json();
        setVenues(data.data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    };

    fetchLatestVenues();
  }, []);

  const headerImage =
    venues.length > 0 && venues[0].media.length > 0
      ? venues[0].media[0].url
      : HeaderImg;

  const otherVenues = venues.slice(1);

  return (
    <>
      <header className="lg:max-w-[1280px] mx-auto">
        <Link to={venues.length > 0 ? `/Venue/${venues[0].id}` : "/Venues"}>
          <div className="relative">
            <img
              src={headerImage}
              alt="Venue header"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/40 z-10" />
          </div>
          <div className="text-white absolute bottom-2 z-20 pl-10 text-left">
            <h1 className="text-xl font-bold max-w-full">
              {venues.length > 0
                ? window.innerWidth < 400
                  ? venues[0].name.slice(0, 10) + "..."
                  : window.innerWidth > 1024
                  ? venues[0].name.slice(0, 20) + "..."
                  : venues[0].name
                : "See all our venues"}
            </h1>
            <div className="flex gap-10">
              <p>
                {venues.length > 0
                  ? venues[0].location.country.slice(0, 40) + "..."
                  : ""}
              </p>
              <p>{venues.length > 0 ? `${venues[0].maxGuests} guests` : ""}</p>
              <p>{venues.length > 0 ? `${venues[0].price} kr pr night` : ""}</p>
            </div>
          </div>
        </Link>
      </header>

      <section className="flex flex-col items-center justify-center">
        <div className="h-14 w-[280px] rounded-full bg-[#508484] flex items-center justify-center text-white text-sm font-light m-8">
          <Link to="/Venues" className="">
            100+ Unique places to visit
          </Link>
        </div>

        <h2 className="text-left">Latest Venues</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 px-10 justify-center gap-8 max-w-[1200px]">
          {otherVenues.map((venue) => (
            <VenueCard venue={venue} key={venue.id} />
          ))}
        </div>

        <Link to="/Venues">See all venues</Link>
      </section>
    </>
  );
}
export default Home;
