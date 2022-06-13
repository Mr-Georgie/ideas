import React, { useState } from "react";

const AnimationContext = React.createContext();

function AnimationContextProvider(props) {
  // use state to hold incremented value of loading dots animation
  const [loadingDots, setLoadingDots] = useState(".");

  const [animationCount, setAnimationCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [showNavbar, setShowNavbar] = useState(false);

  // function to toggle navbar
  const navbarToggler = () => {
    setShowNavbar((prevState) => !prevState);
  };

  //
  return (
    <AnimationContext.Provider
      value={{
        loadingDots,
        setLoadingDots,
        animationCount,
        setAnimationCount,
        isLoading,
        setIsLoading,
        showNavbar,
        setShowNavbar,
        navbarToggler,
      }}
    >
      {props.children}
    </AnimationContext.Provider>
  );
}

export { AnimationContextProvider, AnimationContext };
