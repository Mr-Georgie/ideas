import React, { useState, useRef } from "react";

import { Link, useLocation } from "react-router-dom";

export default function RightCallToAction() {
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const { pathname } = useLocation();

  const ref = useRef(null);

  const onFocusHandler = (action) => {
    if (action === "focusIn") {
      setInputOnFocus(true);
    } else {
      setInputOnFocus(false);
    }
  };

  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <>
      <div
        className={`bg-gray-800 px-2 rounded-md border mb-4 cursor-pointer ${
          inputOnFocus ? "border-custom-indigo" : "border-gray-700"
        }`}
        onClick={handleClick}
      >
        <div className="flex px-4 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 mr-4  ${
              inputOnFocus ? "text-custom-indigo" : "text-custom-white"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            ref={ref}
            onFocus={() => onFocusHandler("focusIn")}
            onBlur={() => onFocusHandler("focusOut")}
            className="text-white bg-transparent focus:outline-none placeholder-custom-white "
            placeholder="Search"
          />
        </div>
      </div>
      <div className="bg-gray-800 p-8 rounded-md border border-gray-700">
        {/* show this on create post page */}
        {pathname === "/home/create-post" && (
          <div className="text-white">
            <div className="font-semibold text-xl mb-8 pb-3 border-b w-fit">
              Post Summary
            </div>
            <div className="flex flex-col mb-6">
              <span className="font-bold text-base text-custom-white">
                Title
              </span>
              <span className="font-extrabold text-2xl">No title</span>
            </div>
            <div className="flex flex-col mb-6">
              <span className="font-bold text-base text-custom-white">
                Cover image
              </span>
              <span className="font-extrabold text-2xl">No image added</span>
            </div>

            <div className="flex flex-col gap-3 justify-center pt-4">
              <button
                type="button"
                className="solid-white-btn inline-block text-lg font-bold leading-none font-mono text-center py-2 px-10"
              >
                Save as draft
              </button>
              <button
                type="button"
                className="solid-indigo-btn text-white inline-block text-lg font-bold px-16 py-4 leading-none font-mono text-center"
              >
                Publish
              </button>
            </div>
          </div>
        )}

        {/* show this on profile page */}
        {pathname === "/home/profile" && (
          <div className="text-white">
            <div className="font-extrabold text-3xl mb-3">Daniel's Profile</div>
            <div
              className="flex 
                    flex-shrink-0 text-white 
                    font-bold font-mono py-3 
                    hover:underline cursor-pointer"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </span>
              <span className="px-2">Posts</span>
            </div>
            <div
              className="flex 
                    flex-shrink-0 text-white 
                    font-bold font-mono py-3 
                    hover:underline cursor-pointer"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
              <span className="px-2">Drafts</span>
            </div>
            <div
              className="flex 
                    flex-shrink-0 text-white 
                    font-bold font-mono py-3 
                    hover:underline cursor-pointer"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </span>
              <span className="px-2">Comments</span>
            </div>
            <div className="w-full mt-8">
              <Link
                to="/home/create-post"
                className="solid-indigo-btn text-white text-lg font-bold px-16 py-4 leading-none font-mono"
              >
                Create post
              </Link>
            </div>
          </div>
        )}

        {/* show this on other pages */}
        {pathname !== "/home/create-post" && pathname !== "/home/profile" && (
          <div className="text-white">
            <div className="font-extrabold text-3xl">Hello Daniel</div>
            <span className="font-mono text-custom-white">
              What's new with you? Would you like to share something with the
              community
            </span>
            <div className="w-full mt-8">
              <Link
                to="/home/create-post"
                className="solid-indigo-btn text-white text-lg font-bold px-16 py-4 leading-none font-mono"
              >
                Create post
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
