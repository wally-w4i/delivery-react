import Clients from "./components/clients/Clients";
import Log from "./components/Log";
import Deliveries from "./components/deliveries/Deliveries";
import Report from "./components/Report";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register"; // Import the Register component
import { useState, useEffect } from "react";

type View = "Clients" | "Deliveries" | "Setting" | "Log" | "Report";

const components: Record<View, React.ComponentType> = {
  Clients: Clients,
  Deliveries: Deliveries,
  Setting: Settings,
  Log: Log,
  Report: Report,
};

function App() {
  const [currentView, setCurrentView] = useState<View>("Clients");
  const [token, setToken] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false); // New state for registration view

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const changeView = (view: View) => {
    setCurrentView(view);
  };

  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsRegistering(false); // Reset registration state on successful login
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const toggleRegistering = () => {
    setIsRegistering((prev) => !prev);
  };

  const CurrentComponent = components[currentView];

  return (
    <div className="flex h-full">
      {!token ? (
        isRegistering ? (
          <Register onToggleRegistering={toggleRegistering} />
        ) : (
          <Login onLogin={handleLogin} onToggleRegistering={toggleRegistering} />
        )
      ) : (
        <>
          <Sidebar changeView={changeView} onLogout={handleLogout} />
          <CurrentComponent />
        </>
      )}
    </div>
  );
}

export default App;
