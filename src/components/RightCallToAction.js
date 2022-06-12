import React from "react";

export default function RightCallToAction() {
  return (
    <>
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
