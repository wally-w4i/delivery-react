import Clients from "./components/Clients";
import Log from "./components/Log";
import Delivery from "./components/Delivery";
import Report from "./components/Report";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

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

  const changeView = (view: View) => {
    setCurrentView(view);
  };

  const CurrentComponent = components[currentView];

  return (
    <div className="flex h-full">
      <Sidebar changeView={changeView} />
      <CurrentComponent />
    </div>
  );
}

export default App;
