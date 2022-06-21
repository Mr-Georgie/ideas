import React, { useContext, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";

import { AnimationContext } from "./context/AnimationContext";
import { UserContext } from "./context/UserContext";
import {
  Routes,
  Route,
  // useLocation
} from "react-router-dom";
import Onboard from "./pages/Onboard";
import Home from "./pages/Home";

function App() {
  const { fetchUserDetails, fetchUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetchUserDetails();
    fetchUserInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            <Route
              path="sign-in"
              element={
                <>
                  <Navbar />
                  <SignIn />
                  <Footer />
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
