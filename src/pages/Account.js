import React from "react";

import background from "../images/bg.jpg";
import person from "../images/person.png";
import twitter from "../images/twitter.png";
import linkedin from "../images/LinkedIn.png";
import github from "../images/github.png";

export default function Account() {
  return (
    <div className="xl:mr-8">
      <div className="text-white text-2xl font-extrabold leading-10 py-4">
        Account
      </div>

      <div>
        {/* account card goes here */}
        <div className="w-full lg:max-w-full rounded overflow-hidden bg-gray-800 relative">
          <img
            className="w-full h-40 object-cover"
            src={background}
            alt="Sunset in the mountains"
          />
          <div className="mt-16">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold text-4xl">
                  George Isiguzo
                </span>
                <span
                  className="outline-btn inline-block 
                            text-xs px-4 py-2 leading-none
                            cursor-pointer"
                >
                  Edit account
                </span>
              </div>
              <p className="text-custom-white text-xl font-normal">
                Very cool guy with six packs and six foot tall and smart and
                funny and this is weird
              </p>
            </div>
            <div className="font-mono px-6 pb-2">
              <span className="inline-block text-sm font-semibold mr-6 mb-2 text-custom-green">
                32 Bookmarks
              </span>
              <span className="inline-block text-sm font-semibold mr-6 mb-2 text-custom-green">
                32 Comments
              </span>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Frontend Web Developer
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                ReactJs
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Python
              </span>
            </div>
            {/* socials goes here */}
            <div className="flex items-center justify-end px-6 pt-4 pb-2">
              <span className="text-white mr-6 italic text-xs">
                Find me on:
              </span>
              <img
                src={twitter}
                alt="twitter"
                className="inline-block bg-custom-white rounded-full w-[30px] p-2 text-sm font-semibold mr-2 mb-2"
              />
              <img
                src={linkedin}
                alt="twitter"
                className="inline-block bg-custom-white rounded-full w-[30px] p-2 text-sm font-semibold mr-2 mb-2"
              />
              <img
                src={github}
                alt="twitter"
                className="inline-block bg-custom-white rounded-full w-[30px] p-2 text-sm font-semibold mr-2 mb-2"
              />
            </div>
          </div>
          <div className="absolute top-20 left-6 bg-black rounded-full">
            <img className="rounded-full w-32 h-32" src={person} alt="Avatar" />
          </div>
        </div>
      </div>
    </div>
  );
}
