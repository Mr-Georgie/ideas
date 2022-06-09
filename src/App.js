import React from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

import { AnimationContextProvider } from "./components/Utility/AnimationContext";
import { Routes, Route } from "react-router-dom";
import Onboard from "./components/Onboard";

function App() {
  return (
    <div className="app">
      <AnimationContextProvider>
        {/* Animation screen */}
        <LoadingScreen />
        {/* Animation screen ends */}

        {/*  */}
        <Navbar />
        {/*  */}

        {/* Main app component */}
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="onboard" element={<Onboard />}></Route>
        </Routes>

        {/* Main app component ends */}

        {/*  */}
        <Footer />
        {/*  */}
      </AnimationContextProvider>
    </div>
  );
}

export default App;
