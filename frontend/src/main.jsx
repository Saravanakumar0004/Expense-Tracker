import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store/store.js";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Add debugging
console.log("App starting...");
console.log("Environment:", import.meta.env.MODE);
console.log(
  "API URL:",
  import.meta.env.VITE_API_URL ||
    "https://expencetrackerapp-1.onrender.com/api/v1"
);

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);