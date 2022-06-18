import React from "react";

export default function ChangeBio(props) {
  return (
    <div className="w-full h-full fixed z-40 top-0">
      <div className="flex items-center justify-center h-full">
        <form className="flex flex-col bg-custom-dark-blue rounded-lg p-4 relative">
          <div className="-mx-3 mb-6 w-[400px]">
            <div className="w-full px-3 mt-14">
              <div className=" bg-slate-800 p-4 rounded-md border border-gray-700">
                <div className="mb-3">
                  <label
                    className="block uppercase tracking-wide text-custom-grey text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Your Bio
                  </label>
                  <textarea
                    rows="4"
                    className="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border focus:outline-none
                border-gray-600 placeholder-gray-400 focus:ring-custom-indigo focus:border-custom-indigo"
                    placeholder="Just a paragraph about yourself will do"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-4 flex justify-center">
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
