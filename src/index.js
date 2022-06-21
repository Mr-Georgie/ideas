import React from "react";
// import ReactDOM from "react-dom/client"; - react v18.0.1
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { AnimationContextProvider } from "./context/AnimationContext";
import { UserContextProvider } from "./context/UserContext";
import { ImageContextProvider } from "./context/ImageContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AnimationContextProvider>
        <UserContextProvider>
          <ImageContextProvider>
            <App />
          </ImageContextProvider>
        </UserContextProvider>
      </AnimationContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
