import React from "react";

export default function Step2() {
  return (
    <div className="font-mono">
      <form class="flex flex-col">
        <label
          class="block uppercase tracking-wide text-custom-grey text-xs font-bold mb-2"
          for="grid-password"
        >
          Choose profile photo
        </label>
        <div className="flex items-center space-x-6 mt-4 mb-8">
          <div class="shrink-0">
            <img
              class="h-32 w-32 object-cover rounded-full"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
              alt="Current profile photo"
            />
          </div>
          <label class="block">
            <span class="sr-only">Choose profile photo</span>
            <input
              type="file"
              class="block w-full text-sm text-slate-500
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
        <div class="-mx-3 mb-6">
          <div class="w-full px-3">
            <div class=" bg-slate-800 p-8 rounded-md border border-gray-700">
              <div class="mb-3">
                <label
                  class="block uppercase tracking-wide text-custom-grey text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Your Bio
                </label>
                <textarea
                  rows="4"
                  class="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border focus:outline-none
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
