import React from "react";
import twitter from "../images/twitter.png";
import linkedin from "../images/LinkedIn.png";
import github from "../images/github.png";

export default function SocialIcons() {
  return (
    <div className="flex items-center justify-end px-6 pt-4 pb-2">
      <div className="text-white mr-6 italic text-xs">Find me on:</div>
      <div className="has-tooltip relative">
        <img
          src={twitter}
          alt="twitter"
          className="inline-block bg-custom-white rounded-full 
                              w-[30px] p-2 text-sm font-semibold mr-2 
                              mb-2 cursor-pointer hover:bg-custom-indigo"
        />
        <span
          className="tooltip tooltip rounded shadow-lg 
                          p-1 bg-custom-dark-blue text-white 
                          text-xs font-bold left-0 bottom-10"
        >
          Twitter
        </span>
      </div>
      <div className="has-tooltip relative">
        <img
          src={linkedin}
          alt="linkedin"
          className="inline-block bg-custom-white rounded-full 
                            w-[30px] p-2 text-sm font-semibold mr-2 
                            mb-2 cursor-pointer hover:bg-custom-indigo"
        />
        <span
          className="tooltip tooltip rounded shadow-lg 
                          p-1 bg-custom-dark-blue text-white 
                          text-xs font-bold right-0 bottom-10"
        >
          LinkedIn
        </span>
      </div>
      <div className="has-tooltip relative">
        <img
          src={github}
          alt="github"
          className="inline-block bg-custom-white rounded-full 
                            w-[30px] p-2 text-sm font-semibold mr-2 
                            mb-2 cursor-pointer hover:bg-custom-indigo"
        />
        <span
          className="tooltip tooltip rounded shadow-lg 
                          p-1 bg-custom-dark-blue text-white 
                          text-xs font-bold right-0 bottom-10"
        >
          Github
        </span>
      </div>
    </div>
  );
}
