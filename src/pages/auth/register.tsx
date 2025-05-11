import { useState } from "react";
import { API_BASE_URL, ENDPOINTS } from "../../constants/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [venueManager, setVenueManager] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const url = `${API_BASE_URL}${ENDPOINTS.REGISTER}`;

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
        navigate("/login");
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="John Doe"
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="example@stud.noroff.no"
      />

      <label htmlFor="">Password</label>
      <input
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        type="password"
      />

      <p>Register as venue manager?</p>

      <label htmlFor="VenueManagerYes">Yes</label>
      <input
        type="radio"
        name="venueManager"
        value="true"
        id="VenueManagerYes"
        checked={venueManager === true}
        onChange={() => setVenueManager(true)}
      />

      <label htmlFor="VenueManagerNo">No</label>
      <input
        type="radio"
        name="venueManager"
        value="false"
        id="VenueManagerNo"
        checked={venueManager === false}
        onChange={() => setVenueManager(false)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
