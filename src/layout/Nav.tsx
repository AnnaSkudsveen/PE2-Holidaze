import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../components/Search";
import handleLogout from "../components/Logout";

function Navbar() {
  const token = localStorage.getItem("bearerToken");
  const navigate = useNavigate();
  const goToDashboard = () => {
    const isVenueManager = localStorage.getItem("venueManager") === "true";
    if (isVenueManager) {
      navigate("/DashboardManager");
    } else {
      navigate("/DashboardUser");
    }
  };
  return (
    <header>
      <nav>
        <p>HOLIDAZE</p>

        <SearchBar />

        <NavLink to="/">Home</NavLink>
        <NavLink to="/Venues">All Venues</NavLink>
        {token ? (
          <>
            <button onClick={goToDashboard}>Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/Login">Log In</NavLink>
            <NavLink to="/Register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
export default Navbar;
