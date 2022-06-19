import React from "react";
import background from "../images/card-img1.png";
import person from "../images/person.png";

export default function Post() {
  return (
    <div className="xl:mr-8">
      <div className="text-white text-4xl text-center font-extrabold leading-10 py-4">
        Building a web app that tracks job requirements?
      </div>

      {/*  */}
      <div className="flex flex-col">
        <div className="w-full ">
          <img
            src={background}
            alt="cover screenshot"
            className="w-full h-full"
          />
        </div>

        <div className="flex items-center gap-4 py-6">
          <img
            className="w-12 h-12 rounded-full mr-4 cursor-pointer hover:opacity-70"
            src={person}
            alt="Avatar"
          />
          <div className="text-lg text-white cursor-pointer hover:underline">
            <p className="leading-none">Jonathan Reinink</p>
          </div>

          <div className="text-sm text-white cursor-pointer hover:underline">
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
  );
}
