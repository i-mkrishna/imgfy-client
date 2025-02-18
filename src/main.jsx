import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";  // ✅ Import BrowserRouter for routing
import { AppProvider } from "./Context/AppContext"; // ✅ Import your context provider
import App from "./App"; // ✅ Import the main app component

// Wrap everything with BrowserRouter and AppProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter> {/* Ensure BrowserRouter is outermost */}
    <AppProvider> {/* Wrap App with AppProvider to access context */}
      <App />  {/* Your main app */}
    </AppProvider>
  </BrowserRouter>
);
