import React from "react";

import linkImg from "../../images/link2.png";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center">
      <img src={linkImg} alt="" className=" h-64 lg:h-96 " />

      <div className="text-center">
        <p className="font-sans text-xl lg:text-3xl font-semibold text-[#CCD6F6]">
          Share your crazy ideas and MVPs with like minded people
        </p>
      </div>

      <div className="my-8 font-mono">
        <a
          href="#about"
          className="outline-btn inline-block text-xl px-4 py-2 leading-none "
        >
          Learn more
        </a>
      </div>
    </div>
  );
}
