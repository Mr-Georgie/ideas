import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AnimationContextProvider } from "./context/AnimationContext";

import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AnimationContextProvider>
        <App />
      </AnimationContextProvider>
    </Router>
  </React.StrictMode>
);
