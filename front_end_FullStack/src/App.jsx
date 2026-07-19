import { useState } from "react";
import "./App.css";
import Login from "../pages/login";
import DashBoard from "../pages/dashBoard";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLoginSuccess = (loggedUser) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <DashBoard user={user} onLogout={handleLogout} />;
}

export default App;
