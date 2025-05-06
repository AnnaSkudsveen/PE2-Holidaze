import { NavLink } from "react-router-dom";
import SearchBar from "../components/search";

function Navbar() {
  return (
    <header>
      <nav>
        <p>HOLIDAZE</p>

        <SearchBar />

        <NavLink to="/">Home</NavLink>
        <NavLink to="/Venues">All Venues</NavLink>
        <NavLink to="/DashboardManager">Dashboard Manager</NavLink>
        <NavLink to="/DashboardUser">Dashboard User</NavLink>
      </nav>
    </header>
  );
}
export default Navbar;
