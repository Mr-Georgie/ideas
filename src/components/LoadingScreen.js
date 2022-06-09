import React, { useEffect, useContext } from 'react';

import { Transition } from '@headlessui/react';
import { AnimationContext } from './Utility/AnimationContext';

// import navLogo from '../images/Logo-100px.png'

export default function LoadingScreen() {
  // get all the loading state variables from loading context
  const {
    loadingDots,
    setLoadingDots,
    animationCount,
    setAnimationCount,
    isLoading,
    setIsLoading,
  } = useContext(AnimationContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // if the loading dots are less than 4 on mount/re-render, increment dots
      if (loadingDots.length < 2) {
        setLoadingDots((prevState) => `${prevState}.`);
      }

      // if the loading dots are 4 on re-render, set loading dots to 1
      if (loadingDots.length === 2) {
        setLoadingDots('.');

        setAnimationCount((prevState) => prevState + 1);
        console.log('animationCount : ', animationCount);
      }
    }, 500);

    if (animationCount >= 2) {
      setIsLoading(false);
      clearInterval(intervalId);
    }

    // clear interval using the interval id
    return () => clearInterval(intervalId);

    // add loading dots as dependency so this components re-render when loading dots changes
  }, [loadingDots]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Headless UI Transition component */}
      <Transition
        show={isLoading}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-600 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div
          className="h-screen flex flex-col
                    justify-center items-center
                    font-mono text-white text-4xl
                    italic font-extrabold"
        >
          {/* Animated Logo */}
          <span className="animate-spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </span>
          {/* Animated Logo ends */}
        </div>
      </Transition>
    </>
  );
}
