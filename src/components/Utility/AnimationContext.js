import React, { useState } from 'react';

const AnimationContext = React.createContext();

function AnimationContextProvider(props) {
  // use state to hold incremented value of loading dots animation
  const [loadingDots, setLoadingDots] = useState('.');

  const [animationCount, setAnimationCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [showNavbar, setShowNavbar] = useState(false);

  //
  return (
    <AnimationContext.Provider value={
        {
          loadingDots, setLoadingDots, animationCount, setAnimationCount, isLoading, setIsLoading, showNavbar, setShowNavbar,
        }
      }
    >
      {props.children}
    </AnimationContext.Provider>
  );
}

export { AnimationContextProvider, AnimationContext };
