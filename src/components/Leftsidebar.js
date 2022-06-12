import React from "react";

import { Link } from "react-router-dom";

export default function Leftsidebar() {
  return (
    <div className="flex flex-col">
      <Link to="/" className="font-semibold tracking-tight text-xl">
        <div className="flex items-center flex-shrink-0 text-white p-4">
          <div className="bg-custom-indigo p-3 rounded mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              width="54"
              height="54"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          Ideas
        </div>
      </Link>

      <div className="mt-8">
        <div
          className="flex items-center 
                    flex-shrink-0 text-white 
                    font-bold font-mono p-6 
                    active:bg-custom-indigo hover:bg-gray-800 focus:bg-custom-indigo"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="px-2">Newsfeed</span>
        </div>
        <div
          className="flex items-center 
                    flex-shrink-0 text-white 
                    font-bold font-mono p-6 
                    active:bg-custom-indigo hover:bg-gray-800 focus:bg-custom-indigo"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </span>
          <span className="px-2">Bookmarks</span>
        </div>
        <div
          className="flex items-center 
                    flex-shrink-0 text-white 
                    font-bold font-mono p-6 
                    active:bg-custom-indigo hover:bg-gray-800 focus:bg-custom-indigo"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
              />
            </svg>
          </span>
          <span className="px-2">Drafts</span>
        </div>
        <div
          className="flex items-center 
                    flex-shrink-0 text-white 
                    font-bold font-mono p-6 
                    active:bg-custom-indigo hover:bg-gray-800 focus:bg-custom-indigo"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
          <span className="px-2">Account</span>
        </div>

        <div className="mt-16 px-6">
          <div className="flex flex-wrap text-xs">
            <span className="text-white hover:text-custom-indigo cursor-pointer font-mono w-1/2">
              About
            </span>
            <span className="text-white hover:text-custom-indigo cursor-pointer font-mono w-1/2">
              Github Repo
            </span>
            <span className="text-white hover:text-custom-indigo cursor-pointer font-mono w-1/2">
              Privacy Policy
            </span>
            <span className="text-white hover:text-custom-indigo cursor-pointer font-mono w-1/2">
              Terms {"&"} Condition
            </span>
          </div>

          <div className="flex justify-center text-center font-mono text-md font-bold mt-4 text-custom-green">
            Powered by <br />
            Linode X Hashnode Hackathon
          </div>
        </div>
      </div>
    </div>
  );
}
