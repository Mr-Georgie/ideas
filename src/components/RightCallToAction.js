import React, { useState, useRef } from "react";

export default function RightCallToAction() {
  const [inputOnFocus, setInputOnFocus] = useState(false);

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
        className={`bg-custom-dark-blue px-2 rounded-md border mb-4 cursor-pointer ${
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
      <div className="bg-custom-dark-blue p-8 rounded-md border border-gray-700">
        <div className="text-white">
          <div className="font-extrabold text-3xl">Hello Daniel</div>
          <span className="font-mono text-custom-white">
            What's new with you? Would you like to share something with the
            community
          </span>
          <div className="flex justify-center pt-4">
            <button
              type="button"
              className="solid-indigo-btn text-white inline-block text-lg font-bold px-16 py-4 leading-none"
            >
              Create post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
