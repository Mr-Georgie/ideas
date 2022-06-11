import React from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

import { AnimationContextProvider } from "./components/Utility/AnimationContext";
import { Routes, Route, useLocation } from "react-router-dom";
import Onboard from "./components/Onboard";
import Newsfeed from "./components/Newsfeed";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="app">
      <AnimationContextProvider>
        {/* Animation screen */}
        <LoadingScreen />
        {/* Animation screen ends */}

        {/* Don't show Navbar on the newsfeed */}
        {pathname !== "/newsfeed" && <Navbar />}
        {/*  */}

        {/* Main app component */}
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="onboard" element={<Onboard />}></Route>
          <Route path="newsfeed" element={<Newsfeed />}></Route>
        </Routes>

        {/* Main app component ends */}

        {/* Don't show Footer on the onboarding pages */}
        {pathname !== "/onboard" && pathname !== "/newsfeed" && <Footer />}
        {/*  */}
      </AnimationContextProvider>
    </div>
  );
}

export default App;
