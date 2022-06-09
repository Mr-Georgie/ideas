import React from "react";

import compareImg from "../../images/compare.png";
import uploadImg from "../../images/upload.png";
import writeImg from "../../images/write.png";

import { Link } from "react-router-dom";

export default function CoreFeatures() {
  return (
    <div id="find-out-how" className="flex flex-col items-center my-16">
      {/* ---- Core feature header ---- */}
      <div className="text-center mb-10 mt-16">
        <span className="text-4xl text-white font-extrabold">Core Feature</span>
      </div>
      {/* ---- Core feature header ends---- */}

      {/* ---- Core feature content ---- */}
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
              Write an article using a markdown editor that is similar to that
              on Hashnode and DEV
            </span>
          </div>
        </div>

        {/* flex item two */}
        <div className="p-10 border rounded text-white border-custom-green">
          <div className="text-center">
            <span className="font-sans text-2xl font-bold">Publish</span>
          </div>
          <div className="icon">
            <img src={uploadImg} alt="" />
          </div>
          <div className="text">
            <span className="font-mono">
              Simultaneously publish the article across the two platforms
            </span>
          </div>
        </div>

        {/* flex item three */}
        <div className="p-10 border rounded text-white border-custom-indigo">
          <div className="text-center">
            <span className="ffont-sans text-2xl font-bold">Compare</span>
          </div>
          <div className="icon">
            <img src={compareImg} alt="" />
          </div>
          <div className="text">
            <span className="font-mono">
              View and compare the article&#39;s engagement on each platform and
              learn
            </span>
          </div>
        </div>
      </div>

      {/* core features button */}
      <div className="my-8 font-mono">
        <Link
          to="onboard"
          className="solid-white-btn inline-block text-3xl font-semibold px-4 py-2 leading-none"
        >
          Get started
        </Link>
      </div>

      {/* ---- Core feature content end ---- */}
    </div>
  );
}
