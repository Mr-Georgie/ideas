import React from "react";

export default function Step1() {
  return (
    <div className="flex flex-col items-center">
      <form class="w-full max-w-lg font-mono">
        {/*  */}
        <div class="-mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-custom-grey text-xs font-bold mb-2"
              for="grid-password"
            >
              DEV API Token
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="******************"
            />
            <p class="text-gray-600 text-xs italic">
              We won't disclose it to anyone we promise
            </p>
          </div>
        </div>
        {/*  */}
        <div class="-mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-custom-grey text-xs font-bold mb-2"
              for="grid-password"
            >
              HASHNODE API Token
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="******************"
            />
            <p class="text-gray-600 text-xs italic">
              We won't disclose it to anyone we promise
            </p>
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button
              class="shadow bg-purple-500 hover:bg-purple-400 
                focus:shadow-outline 
                focus:outline-none text-white 
                font-bold py-2 px-4 rounded"
              type="button"
            >
              Connect
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
