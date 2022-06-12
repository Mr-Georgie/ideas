import React from "react";
import Leftsidebar from "./Leftsidebar";
import Newsfeed from "./Newsfeed";
import RightCallToAction from "./RightCallToAction";
import TopMainContent from "./TopMainContent";

export default function Main() {
  return (
    <div className="flex flex-wrap divide-x divide-gray-700">
      <div className="w-full hidden md:fixed md:block md:w-1/3 lg:w-1/4 xl:w-1/6">
        <Leftsidebar />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"></div>
      <div className="w-full md:w-2/3 lg:w-3/4 xl:w-5/6 bg-slate-800">
        <TopMainContent />

        <div className="flex flex-col-reverse xl:flex-wrap xl:flex-row p-8">
          <div className="w-full xl:w-4/6">
            <Newsfeed />
          </div>
          <div className="w-full xl:hidden">
            <RightCallToAction />
          </div>
          <div className="w-80 fixed right-10 hidden xl:block">
            <RightCallToAction />
          </div>
        </div>
      </div>
    </div>
  );
}
