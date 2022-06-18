import React from "react";

export default function ChangeProfilePic(props) {
  return (
    <div className="w-full h-full fixed z-40 top-0">
      <div className="flex items-center justify-center h-full">
        <form className="flex flex-col bg-custom-dark-blue rounded-lg p-4 relative">
          <label
            className="block uppercase tracking-wide text-custom-grey text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Choose profile photo
          </label>
          <div className="flex flex-col items-center space-x-6 mt-4 mb-8">
            <div className="shrink-0 mb-6">
              <img
                className="h-32 w-32 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                alt="add avatar"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500 font-mono
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
        "
              />
            </label>
          </div>
          <div className="w-full mt-4 flex justify-center">
            <button
              type="submit"
              className="solid-indigo-btn text-white inline-block text-lg font-bold px-16 py-4 leading-none font-mono text-center"
            >
              Upload
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
