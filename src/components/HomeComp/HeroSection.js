import React from "react";

import linkImg from "../../images/link2.png";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center">
      <img src={linkImg} alt="" className=" h-64 lg:h-96 " />

      <div className="text-center">
        <p className="font-sans text-xl lg:text-3xl font-semibold text-[#CCD6F6]">
          Write, publish and compare analytics for your articles on{" "}
          <span className="text-custom-indigo">Hashnode</span> and{" "}
          <span className="text-custom-indigo">DEV</span>
        </p>
      </div>

      <div className="my-8 font-mono">
        <a
          href="#find-out-how"
          className="outline-btn inline-block text-xl px-4 py-2 leading-none "
        >
          Find out how
        </a>
      </div>
    </div>
  );
}
