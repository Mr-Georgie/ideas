import React, { useContext, useEffect } from "react";
import Leftsidebar from "../components/Leftsidebar";
import RightCallToAction from "../components/RightCallToAction";
import MembersOnlyNavbar from "../components/MembersOnlyNavbar";
import { AnimationContext } from "../context/AnimationContext";
import { Transition } from "@headlessui/react";
import useWindowSize from "../utils/useWindowSize";
import Newsfeed from "./Newsfeed";
import Bookmarks from "./Bookmarks";
import Profile from "./Profile";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import CreatePost from "./CreatePost";
import Post from "./Post";

export default function Home() {
  const { showNavbar, navbarToggler } = useContext(AnimationContext);
  const width = useWindowSize();
  let location = useLocation();
  let navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (location.pathname === "/home") {
      navigate("/home/newsfeed");
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(user);

  return (
    <div className="flex flex-wrap static">
      {/* divide-x divide-gray-700 */}
      {/* Add a transparent background when navbar is toggled on */}
      {width < 710 && showNavbar && (
        <div
          className="fixed h-screen w-screen bg-trans-black z-10"
          onClick={navbarToggler}
        >
          <div className="fixed top-10 right-10">
            {/* { close button will be here} */}
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
              <Route path="profile" element={<Profile />}></Route>
              <Route path="create-post" element={<CreatePost />}></Route>
              <Route path="post" element={<Post />}></Route>
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
