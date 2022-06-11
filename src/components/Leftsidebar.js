import React from "react";

export default function Leftsidebar() {
  return (
    <>
      <div className="flex flex-wrap h-80 divide-x divide-gray-600">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4 h-screen"></div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-3/4 mb-4"></div>
      </div>
    </>
  );
}
