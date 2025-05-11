export const handleLogout = () => {
  localStorage.removeItem("bearerToken");
  localStorage.removeItem("author");
  location.replace("/");
};

export default handleLogout;
