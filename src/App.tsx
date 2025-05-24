import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";
import AllVenues from "./pages/Venues.tsx";
import Venue from "./pages/VenueDetail.tsx";
import DashboardUser from "./pages/dashboard/User.tsx";
import DashboardManager from "./pages/dashboard/Manager.tsx";
import Layout from "./layout/Layout.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import BookingSuccess from "./pages/dashboard/booking/BookingSuccess.tsx";
import VenueCreate from "./pages/dashboard/venue/VenueCreate.tsx";
import VenueEdit from "./pages/dashboard/venue/VenueEdit.tsx";
import BookingEdit from "./pages/dashboard/booking/BookingEdit.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

function App() {
  return (
    <>
      <ScrollToTop />
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
