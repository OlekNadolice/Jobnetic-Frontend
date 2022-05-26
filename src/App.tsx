import RoutesDefinition from "RoutesDefinition/RoutesDefinition";
import AppContextProvider from "Context/App.context";
import "./globalStyles.css";

function App() {
  return (
    <div>
      <AppContextProvider>
        <RoutesDefinition />
      </AppContextProvider>
    </div>
  );
}

export default App;
