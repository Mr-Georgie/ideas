import React from "react";
import { Link } from "react-router-dom";

export default function Step3(props) {
  return (
    <div className="flex gap-4 flex-col text-white">
      {/* option one goes here */}
      <Link
        to="/home/create-post"
        className="flex bg-gray-700 rounded-lg 
                  border border-gray-600 px-10 
                  py-4 cursor-pointer hover:ring-custom-indigo hover:border-custom-indigo"
      >
        <div className="w-1/6 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
        <div className="w-5/6 flex flex-col">
          <span className="font-bold text-2xl">Write your first post</span>
          <span className="font-mono">
            Already have a great idea for an app? Share right away! We can't
            wait to contribute to it
          </span>
        </div>
      </Link>
      {/* option 2 goes here */}
      <Link
        to="/home/newsfeed"
        className="flex bg-gray-700 rounded-lg 
                  border border-gray-600 px-10
                  py-4 cursor-pointer hover:ring-custom-indigo hover:border-custom-indigo"
      >
        <div className=" w-1/6 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div className="w-5/6 flex flex-col">
          <span className="font-bold text-2xl">Browse and read</span>
          <span className="font-mono">
            Browse and see what others are up to. Comment, connect and engage.
            Awesome collaborations awaits you.
          </span>
        </div>
      </Link>

      <div className="flex justify-between gap-10 mt-4 pb-20 font-mono">
        <div>
          <button
            type="button"
            onClick={() => props.navHandler("previous")}
            className="solid-white-btn inline-block text-lg font-bold px-16 py-4 leading-none"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
