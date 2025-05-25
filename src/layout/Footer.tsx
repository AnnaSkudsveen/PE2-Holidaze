import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#508484] text-white h-[386px] md:h-[200px] flex flex-col items-center w-full">
      <h3 className="text-4xl pt-16">HOLIDAZE</h3>
      <div className="flex flex-col md:flex-row gap-4 pt-8 text-sm font-light">
        <Link to="/" className="text-white">
          About us
        </Link>
        <Link to="/" className="text-white">
          Contact
        </Link>
        <Link to="#faq" className="text-white">
          FAQ
        </Link>
      </div>
      <div className="text-[10px] flex flex-col md:flex-row gap-4 pt-8 bottom-2 relative">
        <div className="flex gap-8">
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
        </div>
        <p>@Copyright Anna Skudsveen 2025</p>
      </div>
    </footer>
  );
}

export default Footer;
