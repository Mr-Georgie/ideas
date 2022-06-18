import React from "react";

import compareImg from "../../images/compare.png";
import uploadImg from "../../images/upload.png";
import writeImg from "../../images/write.png";

import { Link } from "react-router-dom";

export default function CoreFeatures() {
  return (
    <div id="about" className="flex flex-col items-center my-16">
      {/* ---- About header ---- */}
      <div className="text-center mb-10 mt-16">
        <span className="text-4xl text-white font-extrabold">About Ideas</span>
      </div>
      {/* ---- About header ends---- */}

      {/* ---- About content ---- */}
      <div className="flex gap-4 flex-col md:flex-row">
        {/* flex item one */}
        <div className="p-10 border rounded text-white border-white">
          <div className="text-center">
            <span className="font-sans text-2xl font-bold">Write</span>
          </div>
          <div className="">
            <img src={writeImg} alt="" />
          </div>
          <div className="">
            <span className="font-mono">
              Write about your idea in a blog-like editor. Add links, codes and
              images
            </span>
          </div>
        </div>

        {/* flex item two */}
        <div className="p-10 border rounded text-white border-custom-green">
          <div className="text-center">
            <span className="font-sans text-2xl font-bold">Engage</span>
          </div>
          <div className="icon">
            <img src={uploadImg} alt="" />
          </div>
          <div className="text">
            <span className="font-mono">
              Engage with other peoples posts by upvoting and commenting
            </span>
          </div>
        </div>

        {/* flex item three */}
        <div className="p-10 border rounded text-white border-custom-indigo">
          <div className="text-center">
            <span className="ffont-sans text-2xl font-bold">Collaborate</span>
          </div>
          <div className="icon">
            <img src={compareImg} alt="" />
          </div>
          <div className="text">
            <span className="font-mono">
              Ultimately make friends with people you can build more crazy ideas
              with
            </span>
          </div>
        </div>
      </div>

      {/* About button */}
      <div className="my-8 font-mono">
        <Link
          to="onboard"
          className="solid-white-btn inline-block text-xl lg:text-3xl font-semibold px-4 py-2 leading-none"
        >
          Get Started
        </Link>
      </div>

      {/* ---- About content end ---- */}
    </div>
  );
}
