import React from "react";

export default function Step2() {
  return (
    <div className="">
      <form className="flex flex-col">
        <label
          className="block uppercase tracking-wide text-custom-grey text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Choose profile photo
        </label>
        <div className="flex items-center space-x-6 mt-4 mb-8">
          <div className="shrink-0">
            <img
              className="h-32 w-32 object-cover rounded-full"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
              alt="Current profile photo"
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
        {/*  */}
        <div className="-mx-3 mb-6">
          <div className="w-full px-3">
            <div className=" bg-slate-800 p-8 rounded-md border border-gray-700">
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
      </form>
    </div>
  );
}
