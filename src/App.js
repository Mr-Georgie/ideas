import React, { useContext } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import Footer from "./components/Footer";

import { AnimationContext } from "./context/AnimationContext";
import { Routes, Route, useLocation } from "react-router-dom";
import Onboard from "./pages/Onboard";
import Home from "./pages/Home";

function App() {
  const { pathname } = useLocation();

  const { isLoading } = useContext(AnimationContext);

  return (
    <div className="app">
      {/* Animation screen */}
      <LoadingScreen />
      {/* Animation screen ends */}

      {!isLoading && (
        <>
          {/* Main app component */}
          <Routes>
            <Route
              index
              path="/"
              element={
                <>
                  <Navbar />
                  <Welcome />
                  <Footer />
                </>
              }
            ></Route>
            <Route
              path="onboard"
              element={
                <>
                  <Navbar />
                  <Onboard />
                </>
              }
            ></Route>
            <Route path="home/*" element={<Home />}></Route>
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
