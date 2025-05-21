import { useState } from "react";
import { API_BASE_URL, ENDPOINTS } from "../../constants/Api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const url = `${API_BASE_URL}${ENDPOINTS.LOGIN}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.errors[0]?.message}`);
        return;
      }

      const data = await response.json();
      const { accessToken, venueManager, name } = data.data;

      localStorage.setItem("bearerToken", accessToken);
      localStorage.setItem("name", name);

      console.log(name);

      if (venueManager) {
        navigate("/DashboardManager");
        localStorage.setItem("venueManager", "true");
      } else {
        navigate("/DashboardUser");
      }

      console.log(accessToken);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="example@stud.noroff.no"
      />

      <label htmlFor=""></label>
      <input
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        type="password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
