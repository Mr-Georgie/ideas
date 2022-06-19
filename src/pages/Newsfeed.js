import React from "react";
import PostCard from "../components/PostCard";

export default function Newsfeed() {
  return (
    <div className="xl:mr-8">
      <div className="text-white text-2xl font-extrabold leading-10 py-4">
        Newsfeed
      </div>

      {/*  */}
      <div className="flex flex-col -my-4">
        {/* flex item 1 */}
        <PostCard />
        {/* flex item 2*/}
        <PostCard />
      </div>
    </div>
  );
}
