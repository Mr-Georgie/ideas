import React, { useContext, useEffect } from "react";

import { Transition } from "@headlessui/react";
import { AnimationContext } from "./Utility/AnimationContext";
import useWindowSize from "./Utility/useWindowSize";
import { Link } from "react-router-dom";

export default function MembersOnlyNavbar() {
  const { showNavbar, setShowNavbar, navbarToggler } =
    useContext(AnimationContext);

  const width = useWindowSize();

  useEffect(() => {
    if (width > 1023) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, [width]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Transition
      show={true}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      {/* Navbar with logo and toggle menu button */}
      <nav className="flex items-center justify-between flex-wrap p-6 font-mono">
        {/* logo */}
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <div className="bg-custom-indigo p-3 rounded mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </div>
          <Link to="/" className="font-semibold tracking-tight">
            Ideas
          </Link>
        </div>
        {/* toggle menu button */}
        <div className="block lg:hidden">
          {!showNavbar && (
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
            </button>
          )}
        </div>
      </nav>
    </Transition>
  );
}
