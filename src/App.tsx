import Clients from "./components/clients/Clients";
import Log from "./components/Log";
import Delivery from "./components/deliveries/Delivery";
import Report from "./components/Report";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import Login from "./components/auth/Login";
import { useState, useEffect } from "react";

type View = "Clients" | "Delivery" | "Setting" | "Log" | "Report";

const components: Record<View, React.ComponentType> = {
  Clients: Clients,
  Delivery: Delivery,
  Setting: Settings,
  Log: Log,
  Report: Report,
};

function App() {
  const [currentView, setCurrentView] = useState<View>("Clients");
  const [token, setToken] = useState<string | null>(null);

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
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const CurrentComponent = components[currentView];

  return (
    <div className="flex h-full">
      {!token ? (
        <Login onLogin={handleLogin} />
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
