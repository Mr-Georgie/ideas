import React from "react";
import background from "../images/card-img1.png";
import person from "../images/person.png";

import useToggler from "../utils/useToggler";
import { Link } from "react-router-dom";

export default function PostCard() {
  const { on: isBookmarked, toggler: isBookmarkedToggler } = useToggler();

  return (
    <div className="w-full lg:max-w-full lg:flex py-4">
      {/* entire post content */}
      <div
        className="rounded p-4 flex flex-col justify-between 
                    leading-normal bg-slate-800 
                    hover:drop-shadow-2xl focus:drop-shadow-2xl"
      >
        <Link to="/home" className="mb-8">
          {/* post author name and date */}
          <div className="flex items-center pb-8">
            <img
              className="w-10 h-10 rounded-full mr-4 cursor-pointer hover:opacity-70"
              src={person}
              alt="Avatar"
            />
            <div className="text-sm text-white cursor-pointer hover:underline">
              <p className="leading-none">Jonathan Reinink</p>
              <p className="text-gray-600">Aug 18</p>
            </div>
          </div>
          {/* --------------------- */}
          {/* post body and image */}
          <Link to="/home/post">
            <div className="flex gap-3 flex-col lg:flex-row cursor-pointer">
              <div className="flex flex-col w-full lg:w-3/4">
                <div className="text-white font-bold text-xl mb-2">
                  Building a web app that tracks job requirements?
                </div>
                <p className=" text-custom-white text-base font-mono">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="w-full lg:w-1/4">
                <img
                  src={background}
                  alt="cover screenshot"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Link>
          {/* --------------------------- */}
        </Link>

        {/* card footer */}
        <div className="flex justify-between">
          <span className="flex">
            <Link
              to="/home"
              className="flex justify-center 
                            items-center bg-gray-200 rounded-full 
                            px-3 py-1 text-sm font-semibold text-gray-500 
                            mr-2 mb-2 hover:text-custom-dark-blue cursor-pointer"
            >
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
            </Link>
            <Link
              to="/home"
              className="flex justify-center 
                            items-center bg-gray-200 rounded-full 
                            px-3 py-1 text-sm font-semibold text-gray-500 
                            mr-2 mb-2 hover:text-custom-dark-blue cursor-pointer"
            >
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
            </Link>
          </span>

          {isBookmarked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white cursor-pointer hover:text-custom-indigo"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => isBookmarkedToggler()}
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white cursor-pointer hover:text-custom-indigo"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={() => isBookmarkedToggler()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          )}
        </div>
        {/* ------------------------ */}
      </div>
    </div>
  );
}
