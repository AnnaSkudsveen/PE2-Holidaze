import { useState } from "react";
import { API_BASE_URL, ENDPOINTS } from "../../constants/Api.tsx";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [venueManager, setVenueManager] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const url = `${API_BASE_URL}${ENDPOINTS.REGISTER}`;

    const emailRegex = /^[\w-.]+@stud\.noroff\.no$/;

    if (!emailRegex.test(email)) {
      alert("Email must be in the format name@stud.noroff.no");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, venueManager })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.errors[0]?.message}`);
        return;
      }

      const data = await response.json();
      console.log(data.data);

      if (response.ok) {
        navigate("/Login");
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <section className="h-svh flex flex-col items-center gap-4 w-[300px] md:w-auto md:max-w-[600px] mx-auto mt-10">
      <h1 className="text-[#508484]">Holidaze</h1>
      <div className="flex items-baseline flex-col gap-2 w-full">
        <label className="text-xs" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="John Doe"
          className="border rounded h-10 px-3 w-full  focus:border-[#508484]"
        />
      </div>

      <div className="flex items-baseline flex-col gap-2 w-full">
        <label className="text-xs" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@stud.noroff.no"
          className="border rounded h-10 px-3 w-full  focus:border-[#508484]"
        />
      </div>

      <div className="flex items-baseline flex-col gap-2 w-full">
        <label className="text-xs" htmlFor="">
          Password
        </label>
        <input
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className="border rounded h-10 px-3 w-full  focus:border-[#508484]"
        />
      </div>
      <section className="flex flex-col items-center my-4">
        <h4>Register as venue manager?</h4>
        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="VenueManagerYes">Yes</label>
            <input
              type="radio"
              name="venueManager"
              value="true"
              id="VenueManagerYes"
              checked={venueManager === true}
              onChange={() => setVenueManager(true)}
            />
          </div>

          <div className="flex flex-col items-center gap-1">
            <label htmlFor="VenueManagerNo">No</label>
            <input
              type="radio"
              name="venueManager"
              value="false"
              id="VenueManagerNo"
              checked={venueManager === false}
              onChange={() => setVenueManager(false)}
            />
          </div>
        </div>
      </section>

      <button
        className="border rounded h-10 px-3 cursor-pointer hover:bg-[#508484] hover:text-white transform transition-colors duration-300 focus:bg-[#508484] focus:text-white focus:border-0 hover:border-0"
        onClick={handleRegister}
      >
        Register
      </button>
    </section>
  );
}

export default Register;
