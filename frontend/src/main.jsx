import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { EditorContextProvider } from "./context/EditorContext";
import { AppProvider } from "./context/AppContext";

createRoot(document.getElementById("root")).render(
  <>
    <AppProvider>
      <EditorContextProvider>
        <App />
      </EditorContextProvider>
    </AppProvider>
  </>
);
