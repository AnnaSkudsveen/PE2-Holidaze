import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import handleLogout from "../components/Logout.tsx";

function Navbar() {
  const token = localStorage.getItem("bearerToken");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const goToDashboard = () => {
    const isVenueManager = localStorage.getItem("venueManager") === "true";
    if (isVenueManager) {
      navigate("/DashboardManager");
    } else {
      navigate("/DashboardUser");
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header>
      <nav className="bg-[#508484] text-white px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-aboreto">
          HOLIDAZE
        </Link>

        <div className="lg:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <p className="cursor-pointer">X</p>
          ) : (
            <i className="fa-light fa-bars"></i>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4">
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
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden bg-[#508484] text-white px-6 py-4 flex flex-col gap-4">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/Venues" onClick={() => setIsOpen(false)}>
            All Venues
          </NavLink>
          {token ? (
            <>
              <button
                onClick={() => {
                  goToDashboard();
                  setIsOpen(false);
                }}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/Login" onClick={() => setIsOpen(false)}>
                Log In
              </NavLink>
              <NavLink to="/Register" onClick={() => setIsOpen(false)}>
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}
export default Navbar;
