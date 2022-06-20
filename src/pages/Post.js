import React from "react";
import background from "../images/card-img1.png";
import person from "../images/person.png";

export default function Post() {
  return (
    <div className="xl:mr-8">
      <div className="text-white text-4xl text-center font-extrabold leading-10 py-4">
        Building a web app that tracks job requirements?
      </div>

      {/*  */}
      <div className="flex flex-col">
        <div className="w-full ">
          <img
            src={background}
            alt="cover screenshot"
            className="w-full h-full"
          />
        </div>

        <div className="flex items-center gap-4 py-6">
          <img
            className="w-12 h-12 rounded-full mr-4 cursor-pointer hover:opacity-70"
            src={person}
            alt="Avatar"
          />
          <div className="text-lg text-white cursor-pointer hover:underline">
            <p className="leading-none">Jonathan Reinink</p>
          </div>

          <div className="text-sm text-white cursor-pointer hover:underline">
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>

        <div className="mb-10">
          <p className=" text-custom-white text-base font-mono">
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
      </div>
    </div>
  );
}
