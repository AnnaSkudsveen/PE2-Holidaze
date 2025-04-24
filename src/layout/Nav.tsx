import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <header>
      <nav>
        <p>HOLIDAZE</p>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Venues">All Venues</NavLink>
        <NavLink to="/DashboardManager">Dashboard Manager</NavLink>
        <NavLink to="/DashboardUser">Dashboard User</NavLink>
      </nav>
    </header>
  );
}
export default Navbar;
