import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AllVenues from "./pages/Venues";
import Venue from "./pages/VenueDetail";
import DashboardUser from "./pages/dashboard/User";
import DashboardManager from "./pages/dashboard/Manager";
import Layout from "./layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BookingSuccess from "./pages/dashboard/booking/BookingSuccess";
import VenueCreate from "./pages/dashboard/venue/VenueCreate";
import VenueEdit from "./pages/dashboard/venue/VenueEdit";
import BookingEdit from "./pages/dashboard/booking/BookingEdit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Venue/:id" element={<Venue />} />
          <Route path="/BookingSuccess/:id" element={<BookingSuccess />} />
          <Route path="/BookingEdit/:id" element={<BookingEdit />} />
          <Route path="/Venues" element={<AllVenues />} />
          <Route path="/DashboardManager" element={<DashboardManager />} />
          <Route path="/DashboardUser" element={<DashboardUser />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/VenueCreate" element={<VenueCreate />} />
          <Route path="/VenueEdit/:id" element={<VenueEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
