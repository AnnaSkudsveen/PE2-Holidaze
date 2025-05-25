export function handleLogout() {
  localStorage.removeItem("bearerToken");
  localStorage.removeItem("name");
  localStorage.removeItem("venueManager");
  location.replace("/");
}

export default handleLogout;
