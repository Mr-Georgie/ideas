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
                      leading-normal bg-slate-800"
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
            <div className="flex justify-between">
              <span className="flex">
                <span className="flex justify-center items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  43
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </span>
                <span className="flex justify-center items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  20
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </span>
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* flex item 2*/}
      </div>
    </div>
  );
}
