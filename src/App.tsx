import RoutesDefinition from "RoutesDefinition/RoutesDefinition";
import AppContextProvider from "Context/App.context";
import VerifyToken from "./VerifyToken";
import "./globalStyles.css";

function App() {
  return (
    <div>
      <AppContextProvider>
        <VerifyToken>
          <RoutesDefinition />
        </VerifyToken>
      </AppContextProvider>
    </div>
  );
}

export default App;
