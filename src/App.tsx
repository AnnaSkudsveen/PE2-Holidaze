import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AllVenues from "./pages/Venues";
import Venue from "./pages/VenueDetail";
import DashboardUser from "./pages/dashboard/User";
import DashboardManager from "./pages/dashboard/Manager";
import Layout from "./layout/Layout";
import Login from "./pages/auth/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Venue/:id" element={<Venue />} />
          <Route path="/Venues" element={<AllVenues />} />
          <Route path="/DashboardManager" element={<DashboardManager />} />
          <Route path="/DashboardUser" element={<DashboardUser />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
