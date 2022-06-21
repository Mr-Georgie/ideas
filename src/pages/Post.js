import React from "react";
import background from "../images/card-img1.png";
import person from "../images/person.png";

import { Link } from "react-router-dom";

export default function Post() {
  return (
    <div className="xl:mr-8">
      {/*  */}
      <div className="flex flex-col">
        <div className="w-full ">
          <img
            src={background}
            alt="cover screenshot"
            className="w-full h-full"
          />
        </div>

        <div className="text-white text-4xl text-center font-extrabold leading-10 py-4">
          Building a web app that tracks job requirements?
        </div>

        <div className="flex items-center justify-center gap-4 pb-4">
          <div className="text-sm text-white cursor-pointer hover:underline">
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>

        <div className="mb-10">
          <p className=" text-custom-white text-base">
            Hi there 👋 and welcome! I'm participating in the #HasuraHackathon
            and in this article, I will be writing about the App I built and how
            I built it. But firstly, allow me to talk about the inspiration
            behind the App The Inspiration The App which I will call JobTracker
            is majorly for aspiring programmers (like myself) who are on a goal
            to secure their first "Tech" job. I noticed that in my attempts to
            secure a Tech job so far, it has become overwhelming keeping track
            of the requirements in each job ad I come across. There's always
            that one important job requirement that I don't have which prevents
            me from applying for the job. So I started thinking of different
            ways I could keep track of job details and requirements so that I
            can set goals around the most important one. That way, if I can
            confidently tick the boxes for the important ones, I can overcome my
            imposter syndrome and apply for that dream job I've long been
            waiting for.
          </p>
        </div>

        {/* about author */}
        <div className="border-t border-b py-8 border-custom-grey mb-10">
          <div className="flex">
            <img
              className="w-12 h-12 rounded-full mr-4 cursor-pointer hover:opacity-70"
              src={person}
              alt="Avatar"
            />
            <div className="">
              <span className="text-base uppercase text-custom-white">
                Written By
              </span>
              <div className="text-lg mb-4 text-white">
                <span className="leading-none cursor-pointer hover:underline">
                  Jonathan Reinink
                </span>
              </div>
              <p className="text-sm text-custom-white font-mono">
                I love spending my time learning and challenging myself with new
                experiences. Technical tools : Node.js, React, GitHub, VS code,
                Heroku, PostgreSQL, Netlify, Kaggle, Vercel, Replit, Jupiter,
                Seaborn, Tailwind CSS, next.js...
              </p>
            </div>
          </div>
        </div>

        {/* comments */}

        <div className="bg-gray-800 p-8 rounded-md flex justify-between">
          <span className="text-white font-semibold">Comments (8)</span>
          <span className="outline-btn inline-block px-4 py-2 leading-none">
            Write a comment
          </span>
        </div>

        {/* comments list */}
        <div className="my-4 bg-gray-800 p-8 rounded-md">
          {/* post author name and date */}
          <div className="flex items-center pb-8">
            <Link to="/home">
              <img
                className="w-10 h-10 rounded-full mr-4 cursor-pointer hover:opacity-70"
                src={person}
                alt="Avatar"
              />
            </Link>

            <Link
              to="/home"
              className="text-sm text-white cursor-pointer hover:underline"
            >
              <p className="leading-none">Jonathan Reinink</p>
              <p className="text-gray-600">Aug 18</p>
            </Link>
          </div>
          {/* --------------------- */}
          {/* post body and image */}
          <div className="flex">
            <div className="">
              <p className=" text-custom-white text-base font-mono">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Voluptatibus quia, nulla! Maiores et
                perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>
          </div>
          {/* --------------------------- */}
        </div>
      </div>
    </div>
  );
}
