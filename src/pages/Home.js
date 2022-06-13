import React, { useContext, useEffect } from "react";
import Leftsidebar from "../components/Leftsidebar";
import RightCallToAction from "../components/RightCallToAction";
import MembersOnlyNavbar from "../components/MembersOnlyNavbar";
import { AnimationContext } from "../context/AnimationContext";
import { Transition } from "@headlessui/react";
import useWindowSize from "../utils/useWindowSize";
import Newsfeed from "./Newsfeed";
import Bookmarks from "./Bookmarks";
import Account from "./Account";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const { showNavbar, navbarToggler } = useContext(AnimationContext);
  const width = useWindowSize();
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/home") {
      navigate("/home/newsfeed");
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-wrap static">
      {/* divide-x divide-gray-700 */}
      {/* Add a transparent background when navbar is toggled on */}
      {width < 710 && showNavbar && (
        <div className="fixed h-screen w-screen bg-trans-black z-10">
          <div className="fixed top-10 right-10">
            <button
              type="button"
              onClick={navbarToggler}
              className="flex items-center px-3
                          py-2 border rounded 
                        bg-custom-indigo text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
            </button>
          </div>
        </div>
      )}
      <Transition
        show={width > 709 ? true : showNavbar}
        className="w-56 h-full overflow-y-auto md:overflow-hidden md:w-1/3 lg:w-1/4 xl:w-1/6 bg-slate-800 fixed z-20"
        enter="transition duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="bg-custom-dark-blue">
          {/* hidden md:fixed md:block */}
          <Leftsidebar />
        </div>
      </Transition>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
        {/* An empty div to take the width of the leftnavbar on full screen */}
      </div>

      {/* main content */}
      <div className="w-full md:w-2/3 lg:w-3/4 xl:w-5/6">
        <span className="md:hidden">
          <MembersOnlyNavbar />
        </span>

        <div className="flex flex-col-reverse xl:flex-wrap xl:flex-row p-8">
          <div className="w-full xl:w-4/6">
            <Routes>
              <Route path="newsfeed" element={<Newsfeed />}></Route>
              <Route path="bookmarks" element={<Bookmarks />}></Route>
              <Route path="Account" element={<Account />}></Route>
            </Routes>
          </div>
          <div className="w-full xl:hidden">
            <RightCallToAction />
          </div>
          <div className="w-80 fixed right-10 hidden xl:block">
            <RightCallToAction />
          </div>
        </div>
      </div>
    </div>
  );
}
