import React, { useContext } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

import { AnimationContext } from "./components/Utility/AnimationContext";
import { Routes, Route, useLocation } from "react-router-dom";
import Onboard from "./components/Onboard";
// import Newsfeed from "./components/Newsfeed";
import Main from "./components/Main";

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
          {/* Don't show Navbar on the newsfeed */}
          {pathname !== "/newsfeed" && <Navbar />}
          {/* Main app component */}
          <Routes>
            <Route index path="/" element={<Home />}></Route>
            <Route path="onboard" element={<Onboard />}></Route>
            <Route path="newsfeed" element={<Main />}></Route>
          </Routes>
          {/* Main app component ends */
          /* Don't show Footer on the
          onboarding pages */}
          {pathname !== "/onboard" && pathname !== "/newsfeed" && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
