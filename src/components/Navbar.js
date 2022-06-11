import React, { useState, useContext, useEffect } from "react";

import { Transition } from "@headlessui/react";
import { AnimationContext } from "./Utility/AnimationContext";
import useWindowSize from "./Utility/useWindowSize";
import { useLocation, Link } from "react-router-dom";

export default function Navbar() {
  const { isLoading, showNavbar, setShowNavbar } = useContext(AnimationContext);

  // get the browser pathname to decide navbar content
  const { pathname } = useLocation();

  const width = useWindowSize();

  useEffect(() => {
    if (width > 1023) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, [width]); // eslint-disable-line react-hooks/exhaustive-deps

  // function to toggle navbar
  const navbarToggler = () => {
    setShowNavbar((prevState) => !prevState);
  };

  return (
    <Transition
      show={!isLoading}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      {/* ...Navbar... */}
      <nav
        className={`flex items-center flex-wrap p-6 font-mono ${
          pathname === "/onboard" ? "justify-center" : "justify-between"
        }`}
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            width="54"
            height="54"
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
          <Link
            to="/"
            className={`font-semibold tracking-tight ${
              pathname === "/onboard" ? "text-3xl" : "text-xl"
            }`}
          >
            Ideas
          </Link>
        </div>
        <div
          className={`${
            pathname === "/onboard" ? "hidden" : "block lg:hidden"
          }`}
        >
          <button
            type="button"
            onClick={navbarToggler}
            className="flex items-center px-3
                            py-2 border rounded text-custom-indigo
                            border-custom-indigo hover:text-white
                            hover:border-white"
          >
            <Transition show={!showNavbar}>
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </Transition>
            <Transition show={showNavbar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Transition>
          </button>
        </div>

        <Transition
          className={`w-full flex-grow ${
            pathname === "/onboard"
              ? "hidden"
              : "lg:flex lg:items-center lg:w-auto"
          }`}
          show={showNavbar}
          enter="transform transition duration-500 ease-custom"
          enterFrom="-translate-y-1/2 scale-y-0 opacity-0"
          enterTo="translate-y-0 scale-y-100 opacity-100"
          leave="transform transition duration-300 ease-custom"
          leaveFrom="translate-y-0 scale-y-100 opacity-100"
          leaveTo="-translate-y-1/2 scale-y-0 opacity-0"
        >
          <div className="text-sm lg:flex-grow">
            <a
              href="#about"
              className="block mt-4 lg:inline-block lg:mt-0 text-custom-indigo hover:text-white mr-4"
            >
              About
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-custom-indigo hover:text-white mr-4"
            >
              Github Repo
            </a>
            <Link
              to="/onboard"
              className="solid-white-btn inline-block text-sm font-semibold px-4 py-2 leading-none"
            >
              Get started
            </Link>
          </div>
          <div>
            <Link
              to="/sign-in"
              className="outline-btn inline-block text-sm px-4 py-2 leading-none"
            >
              Sign in
            </Link>
          </div>
        </Transition>
      </nav>
    </Transition>
  );
}
