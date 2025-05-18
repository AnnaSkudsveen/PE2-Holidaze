import { NavLink } from "react-router-dom";
import SearchBar from "../components/Search";
import handleLogout from "../components/logout";

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
        <NavLink to="/Login">Log In</NavLink>
        <NavLink to="/Register">Register</NavLink>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}
export default Navbar;
