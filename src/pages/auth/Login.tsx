import { useState } from "react";
import { API_BASE_URL, ENDPOINTS } from "../../constants/Api.tsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
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
    <form className="h-svh flex flex-col items-center gap-4 w-[300px] md:w-auto md:max-w-[600px] mx-auto mt-10">
      <h1 className="text-[#508484]">Holidaze</h1>
      <div className="flex items-baseline flex-col gap-2 w-full">
        <label className="text-xs " htmlFor="email">
          Email
        </label>
        <input
          id="email"
          value={email}
          className="border rounded h-10 px-3 w-full focus:outline-none focus:border-[#508484]"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@stud.noroff.no"
        />
      </div>

      <div className="flex items-baseline flex-col gap-2 w-full">
        <label className="text-xs" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          value={password}
          className="border rounded h-10 px-3 w-full focus:outline-none focus:border-[#508484]"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
        />
      </div>

      <button
        className="border rounded h-10 px-3 cursor-pointer hover:bg-[#508484] hover:text-white transform transition-colors duration-300 focus:bg-[#508484] focus:text-white focus:border-0 hover:border-0"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
}

export default Login;
