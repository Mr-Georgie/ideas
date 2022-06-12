import React from "react";

import background from "../images/card-img1.png";
import person from "../images/person.png";

export default function Newsfeed() {
  return (
    <div className="xl:mr-8">
      <div className="text-white text-2xl font-extrabold leading-10 py-4">
        Newsfeed
      </div>

      {/*  */}
      <div className="flex flex-col -my-4">
        {/* flex item 1 */}
        <div className="w-full lg:max-w-full lg:flex py-4">
          {/*  */}
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{ backgroundImage: `url(${background})` }}
            title="post capture"
          ></div>

          {/*  */}
          <div
            className="rounded-b 
                      lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between 
                      leading-normal bg-custom-dark-blue"
          >
            <div className="mb-8">
              <div className="flex items-center pb-8">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={person}
                  alt="Avatar"
                />
                <div className="text-sm text-white">
                  <p className="leading-none">Jonathan Reinink</p>
                  <p className="text-gray-600">Aug 18</p>
                </div>
              </div>
              <div className="text-white font-bold text-xl mb-2">
                Building a web app that tracks job requirements?
              </div>
              <p className=" text-custom-white text-base font-mono">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </div>
        {/* flex item 2*/}
        <div className="w-full lg:max-w-full lg:flex py-4">
          {/*  */}
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{ backgroundImage: `url(${background})` }}
            title="post capture"
          ></div>

          {/*  */}
          <div
            className="rounded-b 
                      lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between 
                      leading-normal bg-custom-dark-blue"
          >
            <div className="mb-8">
              <div className="flex items-center pb-8">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={person}
                  alt="Avatar"
                />
                <div className="text-sm text-white">
                  <p className="leading-none">Jonathan Reinink</p>
                  <p className="text-gray-600">Aug 18</p>
                </div>
              </div>
              <div className="text-white font-bold text-xl mb-2">
                Building a web app that tracks job requirements?
              </div>
              <p className=" text-custom-white text-base font-mono">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
