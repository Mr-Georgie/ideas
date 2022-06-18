import React, { useState } from "react";

export default function ChangeSocialLinks(props) {
  // will hold all user form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  // update form user input state on change
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div className="w-full h-full fixed z-40 top-0">
      <div className="flex items-center justify-center h-full">
        <form className="flex flex-col bg-custom-dark-blue rounded-lg p-4 relative">
          <div className="-mx-3 mb-6 w-[400px] px-3 mt-12">
            {/* ------------ input field 1 ----------------- */}
            <div
              className={`bg-gray-800 px-2 rounded-md border mb-4 cursor-pointer ${
                true ? "border-custom-indigo" : "border-gray-700"
              }`}
              // onClick={emailHandleClick}
            >
              <div className="flex">
                <svg
                  className={`h-4 w-4 m-3 ${
                    true ? "text-custom-indigo" : "text-custom-white"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 
                                    10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>

                <input
                  type="email"
                  // ref={emailRef}
                  name="email"
                  onChange={handleChange}
                  // onFocus={() => emailOnFocusHandler()}
                  // onBlur={() => emailOnFocusHandler()}
                  value={formData.email}
                  className="text-white bg-transparent focus:outline-none placeholder-custom-white placeholder:font-mono"
                  placeholder="your twitter bio link"
                />
              </div>
            </div>
            {/* --------- input field 2 ------------------- */}
            <div
              className={`bg-gray-800 px-2 rounded-md border mb-4 cursor-pointer ${
                true ? "border-custom-indigo" : "border-gray-700"
              }`}
              // onClick={usernameHandleClick}
            >
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 m-3 ${
                    true ? "text-custom-indigo" : "text-custom-white"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 
                                    0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>

                <input
                  type="text"
                  // ref={usernameRef}
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                  // onFocus={() => usernameOnFocusHandler()}
                  // onBlur={() => usernameOnFocusHandler()}
                  className="text-white bg-transparent focus:outline-none placeholder-custom-white placeholder:font-mono"
                  placeholder="your linkedin bio link"
                />
              </div>
            </div>
            {/* --------- input field 3 ------------------- */}
            <div
              className={`bg-gray-800 px-2 rounded-md border mb-4 cursor-pointer ${
                true ? "border-custom-indigo" : "border-gray-700"
              }`}
              // onClick={passwordHandleClick}
            >
              <div className="flex">
                <svg
                  className={`h-4 w-4 m-3 ${
                    true ? "text-custom-indigo" : "text-custom-white"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>

                <input
                  type="password"
                  // ref={passwordRef}
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  // onFocus={() => passwordOnFocusHandler()}
                  // onBlur={() => passwordOnFocusHandler()}
                  className="text-white bg-transparent 
                              focus:outline-none placeholder-custom-white
                              placeholder:font-mono"
                  placeholder="your github bio link"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="solid-indigo-btn text-white inline-block text-lg font-bold px-16 py-4 leading-none font-mono text-center"
            >
              Update
            </button>
          </div>
          <div className="absolute top-3 right-3">
            <button
              type="button"
              onClick={() => props.toggler()}
              className="flex items-center px-3
                          py-2 border rounded 
                        bg-white text-custom-indigo"
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
        </form>
      </div>
    </div>
  );
}
