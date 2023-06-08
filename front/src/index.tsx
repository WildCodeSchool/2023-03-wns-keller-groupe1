import ReactDOM from "react-dom";
import App from "./navigation/AppContainer";
import { GlobalStateProvider } from './GlobalStateContext';

ReactDOM.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById("root")
);
