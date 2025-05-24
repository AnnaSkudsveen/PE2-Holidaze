import { Outlet } from "react-router-dom";
import Navbar from "./Nav.tsx";
import Footer from "./Footer.tsx";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
